import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import url from "./config.js";
import $ from "jquery";
import DataTable from "datatables.net";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");
const brandInfo = getStyle("--info");
const brandWarning = getStyle("--warning");
const brandDanger = getStyle("--danger");

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  componentDidMount() {
    var data = new get_search_data("", "", "", "", "", "").get_data();
    $("body").on("click", "#refresh", function () {
      var from_date = $("#from_date").val();
      var to_date = $("#to_date").val();
      //alert(from_date+"<>"+to_date)
      var data = new get_search_data(
        "",
        "",
        "",
        "",
        from_date,
        to_date
      ).get_data();
    });

    document
      .querySelector("#export_report")
      .addEventListener("click", function (e) {
        e.preventDefault();

        
          var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
          var msisdn = localStorage.getItem("ootel_admin_msisdn");

          var csvData = [];
          var fileName = "Hotelowners to Vendors_contacthistory"
          var from_date = $("#from_date").val();
          var to_date = $("#to_date").val();
          var postData = {
              auth_token: ootel_auth_token,
              column: "id",
              search: "",
              direction: "desc",
              length: 1,
              role: "admin",
              msisdn: msisdn,
              start: 0,
              page: 1,  
              per_page: 1,
              to_date: to_date,
              from_date: from_date,
              isExport: "Y",
          };
       
          const rawResponse1 = fetch(url.server_url + "/get_request_history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }).then((res) => res.json())
            .then((result) => {
          
              var data = result.data;
              var data1 = result.data1;
              // alert(data.length);
                for (var i = 0; i < data.length; i++) {
                  csvData.push({
                      CreatedOn: data[i].created_on,
                      Item: data[i].items,
                      Description: data[i].description,

                      AdminRate: data[i].admin_rate,
                      Status: data[i].status + "-" + data[i].modified_on,
                      From: data[i].from_name + "-" + data[i].msisdn,
                      To: data[i].vendor_name + "-" + data[i].vendor_msisdn,
                  });
                  
                };
         
              console.log(csvData);
                const fileType =
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
                const fileExtension = ".xlsx";

                const ws = XLSX.utils.json_to_sheet(csvData);
                const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
                const excelBuffer = XLSX.write(wb, {
                  bookType: "xlsx",
                  type: "array",
                });
                const exceldata = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(exceldata, fileName + fileExtension);
              
            }).catch((err) => {
              console.error("Error: ", err);
            });
        
      });


  }
  render() {
    return (
      <div style={{ width: "1000px", overflow: "auto" }}>
        From:
        <input type="date" id="from_date" />
        To:
        <input type="date" id="to_date" />
        &nbsp;
        <button className="btn btn-primary" id="refresh">
          Submit
        </button>
        <br />
        <br />
        <table className="table table-striped table-bordered" id="table1">
          <thead style={{ background: "lightsteelblue" }}>
            <tr>
              <th>Created On</th>
              <th>Item</th>
              <th>Description</th>

              <th>Max Rate</th>
              <th>Status</th>
              <th>Request From</th>
              <th>Request To</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

        <br />
        <br />
        <button
          id="export_report"
          className="btn btn-primary"
          style={{ width: "110px", fontSize: "15px", float: "right" }}
        >
          Export Excel
        </button>
        <br />
        <br />

      </div>
    );
  }
}

export default Dashboard;
var that;
class get_search_data extends React.Component {
  constructor(page, per_page, column, direction, from_date, to_date) {
    super(page, per_page, column, direction, from_date, to_date);

    //this.search=search;
    this.column = column;
    this.direction = direction;
    this.per_page = per_page;
    this.page = page;
    this.from_date = from_date;
    this.to_date = to_date;
    that = this;

    //alert(this.to_date)
  }
  componentDidMount() {}
  get_data() {
    var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    var role = localStorage.getItem("ootel_admin_role");

    var search_value;

    var tab = $("#table1").DataTable();
    try {
      tab.destroy();
    } catch (e) {}

    tab = $("#table1").DataTable({
      processing: true,
      serverSide: true,
      bPaginate: true, // Pagination True
      sPaginationType: "full_numbers", // And its type.
      iDisplayLength: 10,
      //Initial no order.
      search: {
        search: "",
      },
      ajax: {
        //  "url": "get_completed_tests_for_print_backup.php",
        url: url.server_url + "/get_request_history",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          role: "admin",
          msisdn: msisdn,
          page: this.page,
          to_date: that.to_date,
          from_date: that.from_date,
        },

        dataSrc: function (json1) {
          var return_data = new Array();
          var data = json1.data;
          var data1 = json1.data1;
          var k = 1;
          for (var i = 0; i < data.length; i++) {
            return_data.push({
              created_on: data[i].created_on,
              item: data[i].items,
              description: data[i].description,

              admin_rate: data[i].admin_rate,
              status: data[i].status + "<br/>" + data[i].modified_on,
              from: data[i].from_name + "<br/>" + data[i].msisdn,
              to: data[i].vendor_name + "<br/>" + data[i].vendor_msisdn,

              recordsTotal: 11,

              recordsFiltered: 11,
            });
          }
          $("#table_filter")
            .find("input")
            .css({ width: "700px", "margin-left": "-80%" });
          $("#table_filter")
            .find("input")
            .attr("placeholder", "Search  Name or mobile no");

          return return_data;
        },
      },
      createdRow: function (row, data, index) {},
      columnDefs: [
        {
          targets: [0, 1], //first column / numbering column
          orderable: false, //set not orderable
        },
      ],
      columns: [
        { data: "created_on" },
        { data: "item" },
        { data: "description" },

        { data: "admin_rate" },
        { data: "status" },
        { data: "from" },
        { data: "to" },
      ],
    });
  }
}

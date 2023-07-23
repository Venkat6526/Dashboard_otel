import React, {
  useState,
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
} from "react";
import ReactDOM from "react-dom";
import { Bar, Line } from "react-chartjs-2";
import url from "./config.js";
import $ from "jquery";
import DataTable from "datatables.net";
import MicroModal from "micromodal";
import { Photo_details } from "../views/photo_gallery.js";
import { Basic_details } from "../views/profile_template.js";
import { act } from "react-test-renderer";
import Vendor_edit from "../views/supplier_edit.js";
import { Accept_payment } from "../views/accept_payment_serviceproviders.js";
import { func } from "prop-types";
import { ExportReactCSV } from "../views/exportexcel/ExportReactCSV.js";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

//import {Basic_details_edit,Business_details_edit,Contact_details_edit} from "views/UserProfile/profile_template_edit.js";
const onChange = (e) => {
  console.log(e.target.files);
};

var ht;
var is_catering;
var catering_type;
var capacity;
var that;
var business_description;
var establishment_type;
var specialization_area;
var alt_msisdn;
var email_id;
var website;
var no_of_employees;
var year_of_establishment;
var business_name;
var state;
var address;
var address1;
var name;
var images1;
var msisdn;
var experience_area;
var city;
var locality;
var pin;
var is_catering = "no";
var select_options;
var grand_data;
var reportcolumndate = "";
var reportdata = [];

const mystyle = {
  width: "250px",
  fontSize: "14px",
};
const mystyle1 = {
  fontSize: "14px",
};
const FileInput = (props) => (
  <input type="file" name="file" multiple value={props.value} />
);

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

var form_value = 0;

var that;
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

 componentDidMount() {
    document
      .querySelector("#btnfilter")
      .addEventListener("click", function (e) {
        document.querySelector("#tblGetPayment").style.display = "none";
        document.querySelector("#tblFilterPayment").style.display = "block";
        document.querySelector("#btnBack").style.display = "block";
      });

    document.querySelector("#btnBack").addEventListener("click", function (e) {
      document.querySelector("#tblGetPayment").style.display = "block";
      document.querySelector("#tblFilterPayment").style.display = "none";
      document.querySelector("#btnBack").style.display = "none";
    });
  }

 render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          id="btnBack"
          style={{
            float: "left",
            fontSize: "18px",
            marginBottom: "20px",
            display: "none",
          }}
        >
          Back
        </button>
        <button
          className="btn btn-primary"
          id="btnfilter"
          style={{ float: "right", fontSize: "18px", marginBottom: "20px" }}
        >
          Filter
        </button>
        <br />
        <br />
        <div id="tblGetPayment" style={{ display: "block" }}>
          <Table />
        </div>
        <div id="tblFilterPayment" style={{ display: "none" }}>
          <Payment_Filter />
        </div>
      </div>
    );
  }
}

class Rate_card extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <h6>Item Details</h6>

        <table
          id="experience_table"
          border="0"
          style={{ width: "100%", fontSize: "13px" }}
        >
          <thead>
            <tr>
              <th>
                Item Name
                <div id="multi_select"></div>
              </th>
            </tr>
            <tr>
              {" "}
              <th>
                Description
                <br />
                <textarea disabled id="description" />
              </th>
            </tr>
            <tr>
              {" "}
              <th>
                UOM:
                <br />
                <input
                  disabled="true"
                  type="text"
                  id="uom"
                  style={{ width: "100px" }}
                />
              </th>{" "}
            </tr>
            <tr>
              {" "}
              <th>
                Admin Rate(Rs)
                <br />
                <input
                  disabled
                  type="text"
                  id="admin_rate"
                  style={{ width: "100px" }}
                />
              </th>{" "}
            </tr>
            <tr>
              <th>
                Vendor Rate(Rs)
                <br />
                <input type="text" id="my_rate" style={{ width: "100px" }} />
              </th>{" "}
            </tr>

            <tr>
              <th>
                <button className="btn btn-primary" id="add_work">
                  Add
                </button>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}

class get_multi {
  get_data(cb) {
    var ootel_auth_token = localStorage.getItem("ootel_auth_token");
    var postData = { auth_token: ootel_auth_token };
    const rawResponse1 = fetch(url.server_url + "/get_supplier_supplier_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.error != "undefined") {
          try {
            alert(data.error);
          } catch (e) {
            console.log(e.message);
          }
        } else {
          return cb(data.data);
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }
}
var d;

class add extends React.Component {
  constructor(props) {
    super(props);
    this.item = props.item;
    this.rate = props.rate;
    this.id = props.id;
  }
  get_data(cb) {
    var ootel_auth_token = localStorage.getItem("ootel_auth_token");
    var msisdn = localStorage.getItem("ootel_msisdn");
    var postData = {
      item: this.item,
      rate: this.rate,
      msisdn: msisdn,
      auth_token: ootel_auth_token,
      id: this.id,
    };
    const rawResponse = fetch(url.server_url + "/add_rate_card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          if (data.error.length != 0) {
            alert(data.error);
            return;
          }
        } catch (e) {}
        alert(data.data);
        document.location.reload();
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }
}


// *************** Payment Filter Code ************ //
class Payment_Filter extends React.Component {
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
    
    $("body").on("click", "#getreport", function () {
      var from_date = $("#from_date").val();
      var to_date = $("#to_date").val();
      var columndate = reportcolumndate
      // alert(from_date);
      // alert(to_date);
      // alert(columndate);
      if (from_date == ""
        || to_date == ""
        || columndate == ""
        || columndate == "select") {
        alert("All filter fields are mandatory")
        
      }
      else {
        //alert(from_date+"<>"+to_date)
        var data = new get_payment_report(
          0,
          10,
          "",
          "",
          "",
          columndate,
          from_date,
          to_date,
          "N"
        ).get_data();
      }
    });

     document
      .querySelector("#export_report")
      .addEventListener("click", function (e) {
        e.preventDefault();

        var from_date = $("#from_date").val();
        var to_date = $("#to_date").val();
        var columndate = reportcolumndate;
        // alert(from_date);
        // alert(to_date);
        // alert(columndate);
        if (
          from_date == "" ||
          to_date == "" ||
          columndate == "" ||
          columndate == "select"
        ) {
          alert("All filter fields are mandatory");
        } else {
          var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
          var msisdn = localStorage.getItem("ootel_admin_msisdn");

          var csvData = [];
          var fileName =
            columndate == "created" ? "RegisteredDate" : "ExpiryDate";

          var postData = {
            auth_token: ootel_auth_token,
            column: "",
            direction: "",
            per_page: 10,
            role: "supplier",
            msisdn: msisdn,
            page: 10,
            columndate: columndate,
            from_date: from_date,
            to_date: to_date,
            isexport: "Y",
          };
          console.log(postData);

          const rawResponse1 = fetch(url.server_url + "/get_payment_listdata", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }).then((res) => res.json())
            .then((data) => {
              var result = data.data;
                console.log(result);
                for (var i = 0; i < result.length; i++) {
                  csvData.push({
                    sino: i + 1,
                    created_on: result[i].created_on,
                    name: result[i].name,
                    business_name: result[i].business_name,
                    msisdn: result[i].msisdn,
                    address: result[i].address,
                    payment_validity: result[i].validityofpayment,
                  });
                  console.log(csvData);
                }
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
        }
      });

  }
  render() {
    return (
      <div style={{ width: "1000px", overflow: "auto" }}>
        From: &nbsp;
        <input type="date" id="from_date" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; To: &nbsp;
        <input type="date" id="to_date" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
        <select
          className="form-control mb-3"
          onChange={(e) => {  reportcolumndate = e.target.value; }}
          style={{ width: "250px", display: "inline" }}
        >
          <option value="select">Select</option>
          <option value="created">Registration Date</option>
          <option value="expering">Expiry Date</option>
        </select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="btn btn-primary" id="getreport">
          Submit
        </button>
        <br />
        <br />
        {/* <button className="btn btn-primary" id="created">
          Created Wise
        </button>
         <button className="btn btn-primary" id="expering" style={{ float: "right"}}>
          Expering Wise
        </button>
        <br />
        <br /> */}
        <table className="table table-striped table-bordered" id="tablefilter">
          <thead style={{ background: "lightsteelblue" }}>
            <tr>
              <th>Si No</th>
              <th>Created On</th>
              <th>Name</th>
              <th>Business Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Expiry Date</th>
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
      </div>
    );
  }
}

class get_payment_report extends React.Component {
  constructor(page, per_page, column, direction, search,columndate,from_date,to_date,isexport) {
    super(page, per_page, column, direction, search,columndate,from_date,to_date,isexport);
    this.search = search;
    this.column = column;
    this.direction = direction;
    this.per_page = per_page;
    this.page = page;
    this.columndate = columndate;
    this.from_date = from_date;
    this.to_date = to_date;
    this.isexport = isexport;
    that = this;
  }
  componentDidMount() {}
  get_data() {
    var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");

    
    var tab = $("#tablefilter").DataTable();
    try {
      tab.destroy();
    } catch (e) {}

    tab = $("#tablefilter").DataTable({
      processing: true,
      serverSide: true,
      bPaginate: true, // Pagination True
      sPaginationType: "full_numbers", // And its type.
      iDisplayLength: 10,
      searching: false,
      //Initial no order.
      search: {
        search: "",
      },
      ajax: {
        //  "url": "get_completed_tests_for_print_backup.php",
        url: url.server_url + "/get_payment_listdata",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          role: "supplier",
          msisdn: msisdn,
          page: this.page,
          columndate : this.columndate,
          from_date: this.from_date,
          to_date: this.to_date,
          isexport: this.isexport
        },

        dataSrc: function (json1) {
          var return_data = new Array();
          var data = json1.data;
 
          var k = 1;
          for (var i = 0; i < data.length; i++) {
            reportdata.push(data[i]);
            return_data.push({
              sino: i + 1,
              created_on: data[i].created_on,
              name: data[i].name,
              business_name: data[i].business_name,
              msisdn: data[i].msisdn,
              address: data[i].address,
              payment_validity: data[i].validityofpayment,

              recordsTotal: 11,

              recordsFiltered: 11,
            });
          }
          $("#table_filter")
            .find("input")
            .css({ width: "700px", "margin-left": "-80%" });
          $("#table_filter")
            .find("input")
            .attr("placeholder", "Search  Name or mobile");

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
        { data: "sino" },
        { data: "created_on" },
        { data: "name" },
        { data: "business_name" },
        { data: "msisdn" },
        { data: "address" },
        { data: "payment_validity" },
      ],
    });
  }
}


class get_search_data extends React.Component {
  constructor(page, per_page, column, direction, search) {
    super(page, per_page, column, direction, search);

    this.search = search;
    this.column = column;
    this.direction = direction;
    this.per_page = per_page;
    this.page = page;

    that = this;
  }
  componentDidMount() {}
  get_data() {
    var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    var role = localStorage.getItem("ootel_admin_role");

    var search_value;

    var postData = {
      auth_token: ootel_auth_token,
      search: this.search,
      column: this.column,
      direction: this.direction,
      per_page: this.per_page,
      role: "vendor",
      msisdn: msisdn,
      page: this.page,
    };
    var tab = $("#table_supplier").DataTable();
    try {
      tab.destroy();
    } catch (e) {}

    tab = $("#table_supplier").DataTable({
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
        url: url.server_url + "/get_employee_details",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          role: "supplier",
          msisdn: msisdn,
          page: this.page,
        },

        dataSrc: function (json1) {
          var return_data = new Array();
          var data = json1.data;
          var data1 = json1.data1;
          var k = 1;
          for (var i = 0; i < data.length; i++) {
            return_data.push({
              created_on: data[i].created_on,
              name: data[i].name,
              business_name: data[i].business_name,
              msisdn: data[i].msisdn,

              action:
                "<button class='btn btn-primary view_profile' value='" +
                data[i].id +
                "'><i class='nav-icon icon-eye'></i></button>  " +
                "     <button class='btn btn-primary edit_profile_supplier' value='" +
                data[i].id +
                "'><i class='nav-icon icon-pencil'></i></button>",
              
              payment_status:
                data[i].payment_status +
                "<button class='btn btn-primary accept_payment' value='" +
                data[i].msisdn +
                "'>Payment</button>",

              payment_validity:
                // data[i].paymentcreated +  "&nbsp;&nbsp; to  &nbsp;&nbsp;" +
                data[i].validityofpayment +
                "     &nbsp;&nbsp;&nbsp;   <button class='btn btn-primary payment_histroy'  msisdn='" +
                data[i].msisdn +
                "' action = 'viewhistory'><i class='nav-icon icon-credit-card'></i> History</button>", 
              
              status: data[i].status,
              action1:
                "<select   ids='" +
                data[i].id +
                "' class='make_active_inactive form-control'><option value=''>--select--</option><option value='active'>Active</option><option value='inactive'>Inactive</option></select>",

              recordsTotal: 11,

              recordsFiltered: 11,
            });
          }
          $("#table_filter")
            .find("input")
            .css({ width: "700px", "margin-left": "-80%" });
          $("#table_filter")
            .find("input")
            .attr("placeholder", "Search  Name or mobile");

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
        { data: "name" },

        { data: "business_name" },
        { data: "msisdn" },
        { data: "action" },
        { data: "payment_status" },
        { data: "payment_validity" },
        { data: "status" },
        { data: "action1" },
      ],
    });
  }
}
var that1;
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
    that1 = this;
  }

  componentDidMount() {
    var c = new get_search_data("1", "10", "id", "desc");
    c.get_data();
    $("#table_supplier").on("click", ".view_profile", function () {
      var postData = { id: $(this).val() };
      const rawResponse = fetch(url.server_url + "/get_hotel_owners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((data) => {
          try {
            if (data.error.length != 0) {
              alert(data.error);
              return;
            }
          } catch (e) {}

          try {
            var data1 = data.data;

            name = data1[0].name;
            business_name = data1[0].business_name;
            capacity = data1[0].capacity;

            var pan_number = data1[0].pan_no;
            var adhaar_number = data1[0].aadhar_no;
            specialization_area = data1[0].specialization_area;

            var nominee = data1[0].nominee;
            email_id = data1[0].email_id;
            website = data1[0].website;

            var blood_group = data1[0].blood_group;

            msisdn = data1[0].msisdn;
            var gender = data1[0].gender;
            var nominee_relation = data1[0].nominee_relation;
            var emergency_msisdn = data1[0].emergency_msisdn;

            address = data1[0].address;
            state = data1[0].state;
            city = data1[0].city;

            pin = data1[0].pin;
            locality = data1[0].locality;

            var address_permanent = data1[0].address_permanent;
            var state_permanent = data1[0].state_permanent;
            var city_permanent = data1[0].city_permanent;

            var pin_permanent = data1[0].pin_permanent;
            var locality_permanent = data1[0].locality_permanent;
            var alt_msisdn = data1[0].alt_msisdn;
            var landline = data1[0].landline;
            var landmark = data1[0].landmark;
            var year_of_establishment = data1[0].year_of_establishment;
            var gst_no = data1[0].gst_no;
            var dob = data1[0].dob;
            document.querySelector("#name").value = name;
            document.querySelector("#msisdn").value = msisdn;
            document.querySelector("#alt_msisdn").value = alt_msisdn;

            document.querySelector("#landline").value = landline;

            document.querySelector("#business_name").value = business_name;

            document.querySelector("#landmark").value = landmark;

            document.querySelector("#state").value = state;

            document.querySelector("#locality").value = locality;
            document.querySelector("#pin").value = pin;
            document.querySelector("#city").value = city;

            document.querySelector(
              "#year_of_establishment"
            ).value = year_of_establishment;
            document.querySelector("#gst_no").value = gst_no;

            try {
              var images1 = data1[0].photo.split("<>");
              var photos = [];
              for (var i = 0; i < images1.length; i++) {
                if (images1[i] != "") {
                  photos.push({
                    src: url.image_url + "/" + images1[i],
                    width: 1,
                    height: 1,
                  });
                }
              }
            } catch (e) {}

            //For view profile
            document.querySelector("#name").innerHTML = name;
            document.querySelector("#msisdn").innerHTML = msisdn;
            document.querySelector("#alt_msisdn").innerHTML = alt_msisdn;
            document.querySelector("#landline").innerHTML = landline;
            document.querySelector("#business_name").innerHTML = business_name;
            document.querySelector("#landmark").innerHTML = landmark;

            document.querySelector("#state").innerHTML = state;

            document.querySelector("#locality").innerHTML = locality;
            document.querySelector("#pin").innerHTML = pin;
            document.querySelector("#city").innerHTML = city;

            document.querySelector(
              "#year_of_establishment"
            ).innerHTML = year_of_establishment;
            document.querySelector("#gst_no").innerHTML = gst_no;

            var html = "";
            var x = data1[0].area_of_experience_profile;

            x = JSON.parse(x);
            for (var i = 0; i < x.length; i++) {
              html = html + x[i].name + "<br/>";
            }
            that1.setState({
              photos: photos,
            });

            document.querySelector("#area_of_experience").innerHTML = html;
            MicroModal.init({
              onShow: (modal) => console.info("${modal.id} is shown"),
              onClose: (modal) => console.info("${modal.id} is hidden"),
              openTrigger: "data-custom-open", // [3]
              closeTrigger: "data-custom-close", // [4]
              disableScroll: true, // [5]
              disableFocus: false, // [6]
              awaitOpenAnimation: false, // [7]
              awaitCloseAnimation: false, // [8]
              debugMode: true, // [9]
            });
            MicroModal.show("modal-1");
          } catch (e) {
            console.log(e.message);
          }
        })
        .catch((err) => {
          console.error("Error: ", err);
        });

      try {
        document
          .querySelector("#edit_profile")
          .addEventListener("click", function (e) {
            window.location.href = window.location.pathname + "?type=update";
            document.querySelector("#title").innerHTML =
              "<h5>Update Your Profile</h5>";
          });
      } catch (e) {}

      var url1 = new URL(window.location.href);
      var c = url1.searchParams.get("type");
      var view;
      if (c == "view") {
        view = true;
      } else {
        view = false;
      }

      try {
        document
          .querySelector("#profile")
          .addEventListener("click", function (e) {
            window.location.href = window.location.pathname + "?type=view";
          });
      } catch (e) {}
    });
    $("body").on("click", "#refresh", function () {
      document.location.reload();
    });

    $("#table_supplier").on("click", ".edit_profile_supplier", function () {
      try {
        var ht = new Vendor_edit().render();
        document.getElementById("edit_data").innerHTML = ht;
      } catch (e) {}

      new Vendor_edit().componentDidMount1($(this).val());

      MicroModal.init({
        onShow: (modal) => console.info("${modal.id} is shown"),
        onClose: (modal) => console.info("${modal.id} is hidden"),
        openTrigger: "data-custom-open", // [3]
        closeTrigger: "data-custom-close", // [4]
        disableScroll: true, // [5]
        disableFocus: false, // [6]
        awaitOpenAnimation: false, // [7]
        awaitCloseAnimation: false, // [8]
        debugMode: true, // [9]
      });
      MicroModal.show("modal-12");
    });
    document.querySelector("#table_supplier").addEventListener(
      "change",
      function (e) {
        if (new clk().hasClass(e.target, "make_active_inactive")) {
          var elem = e.target;
          var z = elem.className.split(" ");

          var id = e.target.getAttribute("ids");

          //	var rate=e.target.parentNode.parentNode.querySelector("input").value;
          //var max_rate=e.target.getAttribute("max_rate");

          var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");

          var postData = {
            status: e.target.value,
            auth_token: ootel_auth_token,
            id: id,
          };
          const rawResponse = fetch(url.server_url + "/make_active_inactive", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          })
            .then((res) => res.json())
            .then((data) => {
              try {
                if (data.error.length != 0) {
                  alert(data.error);
                  return;
                }
              } catch (e) {}
              alert(data.data);

              var c = new get_search_data("1", "10", "id", "desc");
              c.get_data();
            })
            .catch((err) => {
              console.error("Error: ", err);
            });
        }
      },
      false
    );

    document.querySelector("#table_supplier").addEventListener(
      "change",
      function (e) {
        if (new clk().hasClass(e.target, "make_active_inactive_bk")) {
          var elem = e.target;
          var z = elem.className.split(" ");

          var status = e.target.value;
          var id = e.target.getAttribute("ids");

          var ootel_auth_token = localStorage.getItem("ootel_auth_token");

          var postData = {
            auth_token: ootel_auth_token,
            id: id,
            status: status,
          };
          const rawResponse = fetch(
            url.server_url + "/active_inactive_rate_card",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              try {
                if (data.error.length != 0) {
                  alert(data.error);
                  return;
                }
              } catch (e) {}
              alert(data.data);

              var c = new get_search_data("1", "10", "id", "desc");
              c.get_data();
            })
            .catch((err) => {
              console.error("Error: ", err);
            });
        }
      },
      false
    );

      
    $("body").on("click", ".accept_payment", function (e)  {
      var msisdn = $(this).attr("value");

      $.ajax({
        url: url.server_url + "/get_package_serviceproviders",
        type: "POST",
        data: { auth_token: localStorage.getItem("ootel_admin_auth_token") },
        dataType: "JSON",
        success: function (data1) {
          ReactDOM.render(
            <Accept_payment data={data1.data} msisdn={msisdn} />,
            document.getElementById("accept_payment_data")
          );
          MicroModal.init({
            onShow: (modal) => console.info("${modal.id} is shown"),
            onClose: (modal) => console.info("${modal.id} is hidden"),
            openTrigger: "data-custom-open", // [3]
            closeTrigger: "data-custom-close", // [4]
            disableScroll: true, // [5]
            disableFocus: false, // [6]
            awaitOpenAnimation: false, // [7]
            awaitCloseAnimation: false, // [8]
            debugMode: true, // [9]
          });
          MicroModal.show("modal-11");
        },
      });
    });

    MicroModal.init({
      onShow: (modal) => console.info("${modal.id} is shown"),
      onClose: (modal) => console.info("${modal.id} is hidden"),
      openTrigger: "data-custom-open", // [3]
      closeTrigger: "data-custom-close", // [4]
      disableScroll: true, // [5]
      disableFocus: false, // [6]
      awaitOpenAnimation: false, // [7]
      awaitCloseAnimation: false, // [8]
      debugMode: true, // [9]
    });
    document.querySelector("#table_supplier").addEventListener("click", function (e) {
      var action = e.target.getAttribute("action");

      if (action == "viewhistory") {
        var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
        var msisdn = localStorage.getItem("ootel_admin_msisdn");
        var memberid = e.target.getAttribute("msisdn");

        var tab = $("#tblpaymenthistory").DataTable();
        try {
          tab.destroy();
        } catch (e) {}

        tab = $("#tblpaymenthistory").DataTable({
          processing: true,
          serverSide: true,
          searching: false,
          paging: true,
          info: false,
          ajax: {
            url: url.server_url + "/get_payment_history",
            type: "POST",
            dataType: "JSON",
            data: {
              auth_token: ootel_auth_token,
              msisdn: msisdn,
              memberid: memberid,
              length: 10,
              start: 0,
            },

            dataSrc: function (result) {
              var return_data = new Array();
              var data = result.data;
              for (var i = 0; i < data.length; i++) {
                return_data.push({
                  sino: i + 1,
                  date: data[i].created_on,
                  type: data[i].type,
                  packagename: data[i].package,
                  validity:
                    data[i].created_on + "  to  " + data[i].validityofpayment,
                  invoice:
                    data[i].type == "paid"
                      ? '<a href="#" docpath="' +
                        data[i].invoice +
                        '" >View</a>'
                      : "NA",
                });
              }
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
            { data: "sino" },
            { data: "date" },
            { data: "type" },
            { data: "packagename" },
            { data: "validity" },
            { data: "invoice" },
          ],
        });

        MicroModal.show("modal-15");
      }
      e.preventDefault();
    });

  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" id="refresh">
          Refresh
        </button>
        <br /> <br />
        <div className="cl" style={{ overflow: "auto", width: "1250px" }}>
          <table
            className="table table-striped table-bordered"
            id="table_supplier"
          >
            <thead style={{ background: "lightsteelblue" }}>
              <tr>
                <th>Created On</th>
                <th style={{ width: "130px" }}>Name</th>
                <th>Business name</th>
                <th>Mobile</th>
                <th style={{ width: "95px" }}>Profile</th>
                <th>Payment Status</th>
                <th style={{ width: "200px" }}>Payment Validity</th>
                <th>Status</th>
                <th style={{ width: "105px" }}>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>

           <div
            className="modal micromodal-slide"
            id="modal-15"
            aria-hidden="true"
            // style ={{ width:"1000px" }}
          >
            <div className="modal__overlay" tabindex="-1" data-micromodal-close>
              <div
                style={{ minWidth: "min-content" }}
                className="modal__container"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-15-title"
              >
                <header className="modal__header">
                  <h4 v="modal__title" id="modal-15-title">
                    Payment History
                  </h4>
                  <button
                    className="modal__close"
                    aria-label="Close modal"
                    data-micromodal-close
                  ></button>
                </header>
                <main className="modal__content" id="modal-15-content">
                  <table
                    className="table table-striped table-bordered"
                    id="tblpaymenthistory"
                    style={{ width: "900px" }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#8fcbcd" }}>
                        <th>Si No</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Package Name</th>
                        <th>Validity</th>
                        <th>Invoice</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </main>
              </div>
            </div>
          </div>

        </div>
        <div id="accept_payment_data"></div>
        <div
          style={{ width: "100%" }}
          className="modal micromodal-slide"
          id="modal-1"
          aria-hidden="true"
        >
          <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
            <div
              style={{ maxWidth: "1000px", width: "1000px" }}
              className="modal__container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-1-title"
            >
              <main className="modal__content" id="modal-1-content">
                <Counter_edit />
              </main>
              <footer className="modal__footer">
                <button
                  className="modal__btn"
                  data-micromodal-close
                  aria-label="Close this dialog window"
                >
                  Close
                </button>
              </footer>
            </div>
          </div>
        </div>
        <div
          style={{ width: "100%" }}
          className="modal micromodal-slide"
          id="modal-12"
          aria-hidden="true"
        >
          <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
            <div
              style={{ maxWidth: "1000px", width: "1000px" }}
              className="modal__container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-1-title"
            >
              <main className="modal__content" id="modal-12-content">
                <div id="edit_data"></div>
              </main>
              <footer className="modal__footer">
                <button
                  className="modal__btn"
                  data-micromodal-close
                  aria-label="Close this dialog window"
                >
                  Close
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class clk {
  hasClass(elem, className) {
    try {
      return elem.className.split(" ").indexOf(className) > -1;
    } catch (e) {
      return -1;
    }
  }
}

class Counter_edit extends React.Component {
  render() {
    return (
      <div>
        <h6
          style={{
            backgroundColor: "#c2c2d5",
            padding: "6px",
            fontWeight: "600",
            borderRadius: "4px",
          }}
        >
          Basic Details
        </h6>

        <div className="row">
          <div className="col-md-6">
            <b> Name :</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
            <span id="name"></span>
            <br />
            <b> Mobile :</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span id="msisdn"></span>
            <br />
            <b> Alternative Mobile :</b>
            &nbsp;&nbsp;
            <span id="alt_msisdn"></span>
            <br />
            <b> Land Line Number :</b>
            &nbsp;&nbsp;
            <span id="landline"></span>
            <br />
            <b> Business Name :</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span id="business_name"></span>
            <br />
          </div>
          <div className="col-md-6">
            <b> Locality :</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span id="locality"></span>
            <br />
            <b> Landmark :</b>
            &nbsp;&nbsp;&nbsp;
            <span id="landmark"></span>
            <br />
            <b> State :</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span id="state"></span>
            <br />
            <b>City :</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span id="city"></span>
            <br />
            <b> PIN :</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span id="pin"></span>
            <br />
          </div>
        </div>
        <hr />
        <h6
          style={{
            backgroundColor: "#c2c2d5",
            padding: "6px",
            fontWeight: "600",
            borderRadius: "4px",
          }}
        >
          Business Details
        </h6>
        <div className="row">
          <div className="col-md-6">
            <b> Year of Establishment :</b>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span id="year_of_establishment"></span>
            <br />
            <b> GST Number :</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <span id="gst_no"></span>
            <br />
            <b> Major Supply Line :</b>
            <div
              id="area_of_experience"
              style={{
                marginLeft: "200px",
                marginTop: "-23px",
                marginBottom: "5px",
              }}
            ></div>
          </div>
        </div>

        <hr />

        <h6
          style={{
            backgroundColor: "#c2c2d5",
            padding: "6px",
            fontWeight: "600",
            borderRadius: "4px",
          }}
        >
          Photo Details
        </h6>

        <div className="row">
          <div className="col-md-12">
            <b>Photos :</b>

            <div id="photo_details">
              <Photo_details data={that1.state.photos} />,
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

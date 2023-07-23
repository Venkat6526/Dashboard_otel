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
import Employee_edit from "../views/employee_edit.js";
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

  componentDidMount() {}

  render() {
    return (
      <div>
        <div id="card">
          <Table />
        </div>
      </div>
    );
  }
}

var d;

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
      role: "product_requests",
      msisdn: msisdn,
      page: this.page,
    };
    var tab = $("#table").DataTable();
    try {
      tab.destroy();
    } catch (e) {}

    tab = $("#table").DataTable({
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
        url: url.server_url + "/get_post_product_requests",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          role: "product_requests",
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
              sino: i + 1,
              created_on: data[i].created_on,
              item_name: data[i].items,
              description: data[i].description,
              admin_rate: data[i].admin_rate,
              status: data[i].status,

              action:
                "<select class='make_accept_reject' ids='" +
                data[i].id +
                "'><option value=''>--select--</option><option value='delivered'>Accept</option><option value='rejected'>Reject</option></select>",

              request_from:
                data[i].name +
                "<br/>" +
                data[i].business_name +
                "<br/>" +
                data[i].locality +
                "<br/>" +
                data[i].msisdn,

              recordsTotal: 11,
              recordsFiltered: 11,
            });
          }
          $("#table_filter")
            .find("input")
            .css({ width: "700px", "margin-left": "-80%" });
          $("#table_filter")
            .find("input")
            .attr("placeholder", "Search  Item name");

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
        { data: "item_name" },
        { data: "description" },
        { data: "admin_rate" },
        { data: "status" },
        { data: "action" },
        { data: "request_from" },
      ],
    });
  }
}
class Table extends React.Component {
  componentDidMount() {
    var c = new get_search_data("1", "10", "id", "desc");
    c.get_data();

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

    document
      .querySelector("#btnrefresh")
      .addEventListener("click", function (e) {
        var c = new get_search_data("1", "10", "id", "desc");
        c.get_data();
      });

    document.querySelector("#table").addEventListener("click", function (e) {
      var productrequestid = e.target.getAttribute("productrequestid");
      var action = e.target.getAttribute("action");
      if (productrequestid != null) {
        document.querySelector("#name1").value = e.target.getAttribute("name");
        document.querySelector("#business_name1").value = e.target.getAttribute(
          "business_name"
        );
        document.querySelector("#mobile_no1").value = e.target.getAttribute(
          "mobile_no"
        );
        document.querySelector("#address1").value = e.target.getAttribute(
          "address"
        );
        MicroModal.show("modal-1");
        document
          .querySelector("#modal1Fields")
          .setAttribute("disabled", "disabled");
        document.querySelector("#btnclose").style.display = "block";
      }
      e.preventDefault();
    });
    document.querySelector("#btnclose").addEventListener("click", function (e) {
      e.preventDefault();
      MicroModal.close("modal-1");
    });


     document
      .querySelector("#export_report")
      .addEventListener("click", function (e) {
        e.preventDefault();

        var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
        var msisdn = localStorage.getItem("ootel_admin_msisdn");

        var csvData = [];
        var fileName = "Product Requestlist";

        var postData = {
          auth_token: ootel_auth_token,
          column: "id",
          start: 0,
          length: 1,
          direction: "desc",
          per_page: 1,
          role: "product_requests",
          msisdn: msisdn,
          page: 1,
          search: "",
          isExport: "Y",
        };

        const rawResponse1 = fetch(url.server_url + "/get_post_product_requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        })
          .then((res) => res.json())
          .then((result) => {
            var data = result.data;
            // var data1 = data.data1;
            // alert(data.length);
            for (var i = 0; i < data.length; i++) {
              csvData.push({
                SiNo: i + 1,
                CreatedOn: data[i].created_on,
                ItemName: data[i].items,
                Description: data[i].description,
                AdminRate: data[i].admin_rate,
                Status: data[i].status,
                RequestFrom: data[i].name +"-"+ data[i].business_name +"-"+ data[i].locality +"-"+ data[i].msisdn,
              });
            }

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
          })
          .catch((err) => {
            console.error("Error: ", err);
          });
      });



    document.querySelector("#table").addEventListener(
      "change",
      function (e) {
        if (new clk().hasClass(e.target, "make_accept_reject")) {
          var elem = e.target;
          var z = elem.className.split(" ");

          var status = e.target.value;
          var id = e.target.getAttribute("ids");

           var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");

          var postData = {
            auth_token: ootel_auth_token,
            id: id,
            status: status,
          };
          const rawResponse = fetch(
            url.server_url + "/accept_reject_post_product_requests",
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
  }

  render() {
    return (
      <div>
        <button className="btn btn-primary" id="btnrefresh">
          Refresh
        </button>
        <br /> <br />
        <div className="cl" style={{ overflow: "auto", width: "1200px" }}>
          <table className="table table-striped table-bordered" id="table">
            <thead style={{ background: "lightsteelblue" }}>
              <tr>
                <th>Si No</th>
                <th>Post Date</th>
                <th>Item</th>
                <th>Description</th>
                <th>Admin Rate</th>
                <th>Status</th>
                <th>Action</th>
                <th>Requested From</th>
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


          <div
            className="modal micromodal-slide"
            id="modal-1"
            aria-hidden="true"
          >
            <div className="modal__overlay" tabindex="-1" data-micromodal-close>
              <div
                style={{ width: "100%" }}
                className="modal__container"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-1-title"
              >
                <header className="modal__header">
                  <h4 v="modal__title" id="modal-1-title">
                    Requested Details
                  </h4>
                  <button
                    className="modal__close"
                    aria-label="Close modal"
                    data-micromodal-close
                  ></button>
                </header>
                <main className="modal__content" id="modal-1-content">
                  <form id="ViewEdit_form" method="post">
                    <fieldset id="modal1Fields">
                      Name :
                      <br />
                      <input type="text" id="name1" className="form-control" />
                      <br />
                      Business Name :
                      <br />
                      <input
                        type="text"
                        id="business_name1"
                        className="form-control"
                      />
                      <br />
                      Mobile No :
                      <br />
                      <input
                        type="text"
                        id="mobile_no1"
                        className="form-control"
                      />
                      <br />
                      Address :
                      <br />
                      <textarea id="address1" className="form-control" />
                      <br />
                    </fieldset>
                    <button class="btn btn-primary" id="btnclose">
                      Close
                    </button>
                  </form>
                </main>
              </div>
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

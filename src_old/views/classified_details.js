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

// class add extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   get_data(cb) {
//     var ootel_auth_token = localStorage.getItem("ootel_auth_token");
//     var msisdn = localStorage.getItem("ootel_msisdn");
//     var postData = {
//       job_id: this.job_id,
//       auth_token: ootel_auth_token,
//       msisdn: msisdn,
//     };
//     // alert(postData);
//     const rawResponse = fetch(url.server_url + "/add_apply_data", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(postData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         try {
//           if (data.error.length != 0) {
//             alert(data.error);
//             return;
//           }
//         } catch (e) {}
//         alert(data.data);
//         document.location.reload();
//       })
//       .catch((err) => {
//         console.error("Error: ", err);
//       });
//   }
// }

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
      role: "hotel_owner",
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
        url: url.server_url + "/get_post_classified_alldetails",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          role: "hotel_owner",
          msisdn: msisdn,
          page: this.page,
        },

        dataSrc: function(json1) {
          var return_data = new Array();
          var data = json1.data;
          var data1 = json1.data1;
          var k = 1;
          for (var i = 0; i < data.length; i++) {
            if (data[i].status == "Open") {
              var act =
                " <input type='radio' checked value='" +
                data[i].name +
                "'>" +
                "Closed <input type='radio' value='" +
                data[i].name +
                "'>";
            } else {
              var act =
                "Open <input type='radio' value='" +
                data[i].name +
                "'>" +
                "Closed <input type='radio' checked value='" +
                data[i].name +
                "'>";
            }

            return_data.push({
              sino: i + 1,
              date: data[i].post_date,
              company: data1[i][0].business_name,
              msisdn: data1[i][0].msisdn,
              classified_title:
                '<a href="#" style="color: blue;font-size: 14px;padding: 8px;" classifiedid="' +
                data[i].id +
                '" classifiedtitle="' +
                data[i].classified_title +
                '" location="' +
                data[i].location +
                '" city="' +
                data[i].city +
                '" cost="' +
                data[i].cost +
                '" description="' +
                data[i].description +
                '" id="btnViewClassified" action="view">' +
                data[i].classified_title +
                "</a>",
              cost: data[i].cost,
              status: data[i].status,
              //  action:
              //   "<select class='make_open_closed' ids='" +
              //   data[i].id +
              //   "'><option value=''>--select--</option><option value='open'>Open</option><option value='closed'>Closed</option></select>" ,
              recordsTotal: 11,

              recordsFiltered: 11,
            });
          }
           $("#table11_filter")
            .find("input")
            .css({ width: "700px", "margin-left": "-80%" });
          $("#table11_filter")
            .find("input")
            .attr("placeholder", "Search  Item");

          return return_data;
        },
      },
      createdRow: function(row, data, index) {},
      columnDefs: [
        {
          targets: [0, 1], //first column / numbering column
          orderable: false, //set not orderable
        },
      ],
      columns: [
        { data: "sino" },
        { data: "date" },
        { data: "company" },
        { data: "msisdn" },
        { data: "classified_title" },
        { data: "cost" },
        { data: "status" },
        // { data: "action" },
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
      .addEventListener("click", function(e) {
        var c = new get_search_data("1", "10", "id", "desc");
        c.get_data();
      });

    document.querySelector("#table").addEventListener("click", function(e) {
      var action = e.target.getAttribute("action");
      if (action == "view") {
        document.querySelector(
          "#classified_title1"
        ).value = e.target.getAttribute("classifiedtitle");
        document.querySelector("#location1").value = e.target.getAttribute(
          "location"
        );
        document.querySelector("#city1").value = e.target.getAttribute("city");
        document.querySelector("#cost1").value = e.target.getAttribute("cost");
        document.querySelector("#description1").value = e.target.getAttribute(
          "description"
        );
        MicroModal.show("modal-1");
        document
          .querySelector("#modal1Fields")
          .setAttribute("disabled", "disabled");
        document.querySelector("#btnclose").style.display = "block";
      }
      e.preventDefault();
    });
    document.querySelector("#btnclose").addEventListener("click", function(e) {
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
        var fileName = "Classified Details";

        var postData = {
          auth_token: ootel_auth_token,
          column: "id",
          start: 0,
          length: 1,
          direction: "desc",
          per_page: 1,
          role: "hotel_owner",
          msisdn: msisdn,
          page: 1,
          search: "",
          isExport: "Y",
        };

        const rawResponse1 = fetch(url.server_url + "/get_post_classified_alldetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        })
          .then((res) => res.json())
          .then((result) => {
            
            var data = result.data;
            var data1 = result.data1;
            // alert(data.length);
            // alert(data1.length);
            for (var i = 0; i < data.length; i++) {
                csvData.push({
                SiNo: i + 1,
                Date: data[i].post_date,
                Company: data1[i][0].business_name,
                MobileNo: data1[i][0].msisdn,
                ClassifiedTitle: data[i].classified_title,
                Cost: data[i].cost,
                Status: data[i].status,
              
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
      function(e) {
        if (new clk().hasClass(e.target, "make_open_closed")) {
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
            url.server_url + "/open_closed_post_classified",
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
        <div className="cl" style={{ overflow: "auto", width: "1180px" }}>
          <table className="table table-striped table-bordered" id="table">
            <thead style={{ background: "lightsteelblue" }}>
              <tr>
                <th>Si No</th>
                <th>Date Posted</th>
                <th>Posted By</th>
                <th>Mobile No</th>
                <th>Classified Title</th>
                <th>Cost</th>
                <th>Status</th>
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
                    Classified Details
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
                      Classified Title:
                      <br />
                      <input
                        type="text"
                        id="classified_title1"
                        className="form-control"
                      />
                      <br />
                      Location:
                      <br />
                      <input
                        type="text"
                        id="location1"
                        className="form-control"
                      />
                      <br />
                      City:
                      <br />
                      <input type="text" id="city1" className="form-control" />
                      <br />
                      Cost:
                      <br />
                      <input type="text" id="cost1" className="form-control" />
                      <br />
                      Description:
                      <br />
                      <textarea id="description1" className="form-control" />
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

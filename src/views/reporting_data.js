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

    var postData = {
      auth_token: ootel_auth_token,
      search: this.search,
      column: this.column,
      direction: this.direction,
      per_page: this.per_page,
      role: "reporting",
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
        url: url.server_url + "/get_post_issuereport_alldetails",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          msisdn: msisdn,
          page: this.page,
          start: (this.page - 1) * this.per_page,
        },

        dataSrc: function (json1) {
          var return_data = new Array();
          var data = json1.data;
          for (var i = 0; i < data.length; i++) {
            return_data.push({
              sino: i + 1,
              date: data[i].PostedDate,
              request_from:
                '<a href="#" style="color: blue;font-size: 14px;padding: 8px;" memberid="' +
                data[i].RequestFromId +
                '" id="btnRequestFrom" action="showmember">' +
                data[i].RequestFromName +
                "</a>",
              complainee:
                '<a href="#" style="color: blue;font-size: 14px;padding: 8px;" memberid="' +
                data[i].ComplaineeId +
                '" id="btnRequestFrom" action="showmember">' +
                data[i].Complainee +
                "</a>",
              type: data[i].IssueTypeName,
              complaint:
                '<a href="#" style="color: blue;font-size: 14px;padding: 8px;" complaintid="' +
                data[i].id +
                '" description="' +
                data[i].Complaint +
                '" id="btnViewComplaint" action="view">View</a>',
              status: data[i].status,
              remarks:
                '<a href="#" style="color: blue;font-size: 14px;padding: 8px;" actionremarksid="' +
                data[i].id +
                '" action_remarks="' +
                data[i].action_remarks +
                '" id="btnViewRemarks" action="viewremarks">View</a>',
              action: data[i].action ==null ?
                '<button class="btn btn-primary" action="addremarks" actionremarks="Accept" reportid=' +
                data[i].id +
                '>Accept</button>  ' +
                '        <button class="btn btn-primary" action="addremarks" actionremarks="Reject" reportid=' +
                data[i].id +
                '>Reject</button>': data[i].action + "ed",
              action_date: data[i].action_date,

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
        { data: "request_from" },
        { data: "complainee" },
        { data: "type" },
        { data: "complaint" },
        { data: "status" },
        { data: "remarks" },
        { data: "action" },
        { data: "action_date" },
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
      var action = e.target.getAttribute("action");
      if (action == "view") {
        document.querySelector("#description1").value = e.target.getAttribute(
          "description"
        );
        MicroModal.show("modal-1");
        document
          .querySelector("#modal1Fields")
          .setAttribute("disabled", "disabled");
        document.querySelector("#btnclose").style.display = "block";
      }
      else if (action == "viewremarks")
      {
        document.querySelector("#actionremarks").value = "";
        MicroModal.show("modal-13");
        document
          .querySelector("#modal13Fields")
          .setAttribute("disabled", "disabled");
        document.querySelector("#btncloseaction").style.display = "block";
        document.querySelector("#btnsubmitaction").style.display = "none";
        var remarks = e.target.getAttribute("action_remarks");
        document.querySelector("#actionremarks").value = remarks == "null"?"":remarks;
      }
        
        else if (action == "addremarks")
      {
        document.querySelector("#actionremarks").value = "";
        var reportid = e.target.getAttribute("reportid");
        var actionremarks = e.target.getAttribute("actionremarks");        
        document.querySelector("#modal13Fields").setAttribute("reportid", reportid);
        document.querySelector("#modal13Fields").setAttribute("actionremarks", actionremarks);
        MicroModal.show("modal-13");
        document.querySelector("#modal13Fields").removeAttribute("disabled");
        document.querySelector("#btncloseaction").style.display = "block";
        document.querySelector("#btnsubmitaction").style.display = "block";
        
        }
      
      else if (action == "showmember") {
        var memberid = e.target.getAttribute("memberid");

        var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
        var msisdn = localStorage.getItem("ootel_admin_msisdn");

        var postData = {
          auth_token: ootel_auth_token,
          msisdn: msisdn,
          memberid: memberid,
        };
        const rawResponse = fetch(url.server_url + "/get_report_member", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        })
          .then((res) => res.json())
          .then((data) => {
            try {
              if (data != null && data.data.length == 0) {
                alert("No details found!");
                return;
              }
            } catch (e) {}

            var member = data.data[0];
            var role = member.role;
            if (role == "employee") {
              document.querySelector("#divBusinessName").style.display = "none";
            } else {
              document.querySelector("#divBusinessName").style.display =
                "block";
              document.querySelector("#business_name").value =
                member.business_name;
            }
            document.querySelector("#role").value = member.role;
            document.querySelector("#mobile").value = member.msisdn;
            document.querySelector("#locality").value = member.locality;
            document.querySelector("#city").value = member.city;
            MicroModal.show("modal-12");
            document
              .querySelector("#modal12Fields")
              .setAttribute("disabled", "disabled");
          })
          .catch((err) => {
            console.error("Error: ", err);
          });
      }
      e.preventDefault();
    });
    document.querySelector("#btnclose").addEventListener("click", function (e) {
      e.preventDefault();
      MicroModal.close("modal-1");
    });
    document
      .querySelector("#btnclosemember")
      .addEventListener("click", function (e) {
        e.preventDefault();
        MicroModal.close("modal-12");
      });
    document
      .querySelector("#btncloseaction")
      .addEventListener("click", function (e) {
        e.preventDefault();
        MicroModal.close("modal-13");
      });
    document
      .querySelector("#btnsubmitaction")
      .addEventListener("click", function (e) {
        e.preventDefault();
        var report_id = document
        .querySelector("#modal13Fields")
          .getAttribute("reportid");
        var actionremarks = document
        .querySelector("#modal13Fields")
        .getAttribute("actionremarks");
      var actionremarks_description = document.querySelector("#actionremarks").value;
      
      try {
        if (
          actionremarks_description == ""          
        ) {
          alert("Action Remarks is Mandatory");
          return;
        }
      } catch (e) {
        alert("Action Remarks is Mandatory");
        return;

        }
        
         var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    var postData = {
      msisdn: msisdn,
      auth_token: ootel_auth_token,
      action_remarks: actionremarks_description,
      action: actionremarks,
      reportid: report_id,
    };
        const rawResponse = fetch(url.server_url + "/update_report_actionremarks", {
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
      })

        document.location.reload();
      })

    document.querySelector("#table").addEventListener(
      "change",
      function (e) {
        if (new clk().hasClass(e.target, "make_open_closed")) {
          var elem = e.target;
          var z = elem.className.split(" ");

          var status = e.target.value;
          var id = e.target.getAttribute("ids");

          var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
          var msisdn = localStorage.getItem("ootel_admin_msisdn");

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

      document
      .querySelector("#export_report")
      .addEventListener("click", function (e) {
        e.preventDefault();

        
          var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
          var msisdn = localStorage.getItem("ootel_admin_msisdn");

          var csvData = [];
          var fileName = "Reporting Details"

          var postData = {
              auth_token: ootel_auth_token,
              column: "id",
              search: "",
              direction: "desc",
              length: 1,
              role: "reporting",
              msisdn: msisdn,
              start: 0,
              page: 1,  
              per_page: 1,
              isExport: "Y",
          };
       
          const rawResponse1 = fetch(url.server_url + "/get_post_issuereport_alldetails", {
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
                      SiNo: i + 1,
                      Date: data[i].PostedDate,
                      RequestFrom: data[i].RequestFromName,
                      Complainee: data[i].Complainee,
                      Type: data[i].IssueTypeName,
                      Complaint: data[i].Complaint,
                      Status: data[i].status,
                      Remarks: data[i].action_remarks,
                      // action: data[i].action,
                      ActionDate: data[i].action_date,
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
      <div>
        <button className="btn btn-primary" id="btnrefresh">
          Refresh
        </button>
        <br /> <br />
        <div className="cl" style={{ width: "1200px", margin: "0px" }}>
          <table
            className="table table-striped table-bordered"
            id="table"
            style={{ width: "0px !important" }}
          >
            <thead style={{ background: "lightsteelblue", width: "0px" }}>
              <tr>
                <th>Si No</th>
                <th>Date Posted</th>
                <th>Request From</th>
                <th>Complainee</th>
                <th>Type</th>
                <th>Complaint</th>
                <th>Status</th>
                <th>Remarks</th>
                <th style={{ width: "155px " }}>Action</th>
                <th>Action Date</th>
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
        <div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
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
                  Complaint
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
        <div
          className="modal micromodal-slide"
          id="modal-12"
          aria-hidden="true"
        >
          <div className="modal__overlay" tabindex="-1" data-micromodal-close>
            <div
              style={{ width: "100%" }}
              className="modal__container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-12-title"
            >
              <header className="modal__header">
                <h4 v="modal__title" id="modal-12-title">
                  Request From Details
                </h4>
                <button
                  className="modal__close"
                  aria-label="Close modal"
                  data-micromodal-close
                ></button>
              </header>
              <main className="modal__content" id="modal-12-content">
                <form id="ViewEdit_form" method="post">
                  <fieldset id="modal12Fields">
                    Role :
                    <br />
                    <input type="text" id="role" className="form-control" />
                    <br />
                    <div id="divBusinessName">
                      Business Name :
                      <br />
                      <input
                        type="text"
                        id="business_name"
                        className="form-control"
                      />
                      <br />
                    </div>
                    Mobile :
                    <br />
                    <input type="text" id="mobile" className="form-control" />
                    <br />
                    Locality :
                    <br />
                    <input type="text" id="locality" className="form-control" />
                    <br />
                    City :
                    <br />
                    <input type="text" id="city" className="form-control" />
                    <br />
                  </fieldset>
                  <button class="btn btn-primary" id="btnclosemember">
                    Close
                  </button>
                </form>
              </main>
            </div>
          </div>
        </div>
        <div
          className="modal micromodal-slide"
          id="modal-13"
          aria-hidden="true"
        >
          <div className="modal__overlay" tabindex="-1" data-micromodal-close>
            <div
              style={{ width: "100%" }}
              className="modal__container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-13-title"
            >
              <header className="modal__header">
                <h4 v="modal__title" id="modal-13-title">
                  Action Remarks Summary
                </h4>
                <button
                  className="modal__close"
                  aria-label="Close modal"
                  data-micromodal-close
                ></button>
              </header>
              <main className="modal__content" id="modal-13-content">
                <form id="ViewEdit_form" method="post">
                  <fieldset id="modal13Fields">
                    Action Remarks:
                    <br />
                    <textarea id="actionremarks" className="form-control" />
                    <br />
                  </fieldset>
                  <button class="btn btn-primary" id="btnsubmitaction">
                    Submit
                  </button>
                  <button class="btn btn-primary" id="btncloseaction">
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

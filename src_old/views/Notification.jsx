import React, { Component, lazy, Suspense } from "react";
import ReactDOM from "react";
import { Bar, Line } from "react-chartjs-2";
import url from "./config.js";
import $ from "jquery";
import DataTable from "datatables.net";
import MicroModal from "micromodal";
import { string } from "prop-types";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css


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

  componentDidMount() {
    document
      .querySelector("#btnaddnew")
      .addEventListener("click", function (e) {
        document.querySelector("#tblGetContent").style.display = "none";
        document.querySelector("#tblAddContent").style.display = "block";
        document.querySelector("#btnBack").style.display = "block";
      });

    document.querySelector("#btnBack").addEventListener("click", function (e) {
      document.querySelector("#tblGetContent").style.display = "block";
      document.querySelector("#tblAddContent").style.display = "none";
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
          id="btnaddnew"
          style={{ float: "right", fontSize: "18px", marginBottom: "20px" }}
        >
          Add New
        </button>
        <br />
        <br />
        <div id="tblGetContent" style={{ display: "block" }}>
          <Table />
        </div>
        <div id="tblAddContent" style={{ display: "none" }}>
          <Notification />
        </div>
      </div>
    );
  }
}

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  toggleCheck = () => {
    this.setState({ show: !this.state.show });
  };

  checkAll = function (e) {
    if (
      document.querySelector("#hotel_owners").checked &&
      document.querySelector("#employees").checked &&
      document.querySelector("#vendors").checked &&
      document.querySelector("#service_providers").checked
    ) {
      document.querySelector("#all_role").checked = true;
    } else {
      document.querySelector("#all_role").checked = false;
    }
  };

  componentDidMount() {
    try {
      document
        .querySelector("#all_role")
        .addEventListener("change", function (e) {
          if (document.querySelector("#all_role").checked) {
            document.querySelector("#hotel_owners").checked = true;
            document.querySelector("#employees").checked = true;
            document.querySelector("#vendors").checked = true;
            document.querySelector("#service_providers").checked = true;
          } else {
            document.querySelector("#hotel_owners").checked = false;
            document.querySelector("#employees").checked = false;
            document.querySelector("#vendors").checked = false;
            document.querySelector("#service_providers").checked = false;
          }
        });
      document
        .querySelector("#add_content")
        .addEventListener("click", function (e) {
          e.preventDefault();

          var content = document.querySelector("#content").value;
          var hotel_owners = document.querySelector("#hotel_owners").checked;
          var employees = document.querySelector("#employees").checked;
          var vendors = document.querySelector("#vendors").checked;
          var service_providers =
            document.querySelector("#service_providers").checked;
          try {
            if (
              content == "" ||
              (hotel_owners == "" &&
                employees == "" &&
                vendors == "" &&
                service_providers == "")
            ) {
              alert("All fields are Required");
              return;
            }
          } catch (e) {
            alert("All fields are Required");
            return;
          }
          var roles = [];
          if (hotel_owners == true) roles.push("hotel_owner");
          if (employees == true) roles.push("employee");
          if (vendors == true) roles.push("vendor");
          if (service_providers == true) roles.push("supplier");

          var d = {
            content: content,
            roles: roles,
            id: 0,
          };
          var x = new add(d);
          x.get_data();
        });
    } catch (e) {}
  }
  render() {
    return (
      <div>
        <h5>Notification Details</h5>
        <br />
        <table
          id="experience_table"
          style={{
            width: "45%",
            fontSize: "13px",
            border: "outset",
            borderRadius: "10px",
          }}
        >
          <thead>
            <tr>
              {" "}
              <th style={{ paddingLeft: "60px", paddingTop: "35px" }}>
                <h8 style={{ fontSize: "17px", float: "left" }}>Content :</h8>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <textarea
                  id="content"
                  placeholder="Ex: Details.."
                  style={{ width: "260px", height: "80px" }}
                />
              </th>
            </tr>
            <br />
            <tr>
              <th>
                <h8
                  style={{
                    fontSize: "17px",
                    float: "left",
                    paddingLeft: "60px",
                    paddingTop: "10px",
                  }}
                >
                  Appeared To :
                </h8>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="checkbox"
                  id="all_role"
                  style={{ width: "35px", height: "20px" }}
                />
                <h8 style={{ fontSize: "15px" }}>All</h8>
              </th>
            </tr>
            <br />
            <tr>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="checkbox"
                  id="hotel_owners"
                  onClick={this.checkAll}
                  style={{ width: "35px", height: "20px" }}
                />
                <h8 style={{ fontSize: "15px" }}>Hotel Owners</h8>
              </th>
            </tr>
            <br />
            <tr>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="checkbox"
                  id="employees"
                  onClick={this.checkAll}
                  style={{ width: "35px", height: "20px" }}
                />
                <h8 style={{ fontSize: "15px" }}>Employees</h8>
              </th>
            </tr>
            <br />
            <tr>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="checkbox"
                  id="vendors"
                  onClick={this.checkAll}
                  style={{ width: "35px", height: "20px" }}
                />
                <h8 style={{ fontSize: "15px" }}>Vendors</h8>
              </th>
            </tr>
            <br />
            <tr>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="checkbox"
                  id="service_providers"
                  onClick={this.checkAll}
                  style={{ width: "35px", height: "20px" }}
                />
                <h8 style={{ fontSize: "15px" }}>Service Providers</h8>
              </th>
            </tr>

            <br />
            <tr>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="checkbox"
                  id="Individual"
                  //   onClick={this.checkAll}
                  style={{ width: "35px", height: "20px" }}
                  onChange={this.toggleCheck}
                />
                <h8 style={{ fontSize: "15px" }}>Individual</h8>
              </th>
            </tr>
            <br />
            {this.state.show && (
              <div>
                <tr>
                  <th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h8 style={{ fontSize: "15px" }}>ID :</h8>{" "}
                    &nbsp;&nbsp;&nbsp;
                    <input type="text" id="ID" onClick={this.handleShow} />
                  </th>
                </tr>
              </div>
            )}
            <br />

            <br />
            <tr>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-primary" id="add_content">
                  Submit
                </button>
              </th>
            </tr>
            <br />
            <br />
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}

var d;

class add extends React.Component {
  constructor(props) {
    super(props);
    this.content = props.content;
    this.roles = props.roles;
    this.id = props.id;
  }

  get_data(cb) {
    var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    var postData = {
      content: this.content,
      roles: this.roles,
      msisdn: msisdn,
      auth_token: ootel_auth_token,
      id: this.id,
    };
    const rawResponse = fetch(url.server_url + "/add_announcementsdetails", {
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
      role: "admin",
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
        url: url.server_url + "/get_announcementdetails",

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
        },

        dataSrc: function (json1) {
          var return_data = new Array();
          var data = json1.data;
          var k = 1;
          for (var i = 0; i < data.length; i++) {
            return_data.push({
              sino: i + 1,
              date: data[i].post_date,
              content: data[i].content,
              appeared_to: data[i].appeared_to,
              status: data[i].status,
              action:
                // "<select class='make_active_inactive' ids='" +
                // data[i].id +
                // "'><option value=''>--select--</option><option value='active'>Active</option><option value='inactive'>Inactive</option></select>" +
                '<a href="#" style="color: white;background-color: #007bff;font-size: 12px;padding: 6px;border-radius: 6px;margin-left: 34px;" announcementid="' +
                data[i].id +
                '" content="' +
                data[i].content +
                '" roles="' +
                data[i].appeared_to +
                '" id="btnactionedit" action="edit">Edit</a>' +
                '<a href="#" style="color: white;background-color: #007bff;font-size: 12px;padding: 6px;border-radius: 6px;margin-left: 34px;" announcementid="' +
                data[i].id +
                '" id="btndelete" action="delete">Delete</a>',
              recordsTotal: 11,
              recordsFiltered: 11,
            });
          }
          $("#table_filter")
            .find("input")
            .css({ width: "700px", "margin-left": "-80%" });
          $("#table_filter").find("input").attr("placeholder", "Search  Item");

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
        { data: "content" },
        { data: "appeared_to" },
        { data: "status" },
        { data: "action" },
      ],
    });
  }
}

class Table extends React.Component {
  checkAll1 = function (e) {
    if (
      document.querySelector("#hotel_owners1").checked &&
      document.querySelector("#employees1").checked &&
      document.querySelector("#vendors1").checked &&
      document.querySelector("#service_providers1").checked
    ) {
      document.querySelector("#all_role1").checked = true;
    } else {
      document.querySelector("#all_role1").checked = false;
    }
  };
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
      .querySelector("#all_role1")
      .addEventListener("change", function (e) {
        if (document.querySelector("#all_role1").checked) {
          document.querySelector("#hotel_owners1").checked = true;
          document.querySelector("#employees1").checked = true;
          document.querySelector("#vendors1").checked = true;
          document.querySelector("#service_providers1").checked = true;
        } else {
          document.querySelector("#hotel_owners1").checked = false;
          document.querySelector("#employees1").checked = false;
          document.querySelector("#vendors1").checked = false;
          document.querySelector("#service_providers1").checked = false;
        }
      });

    document.querySelector("#table").addEventListener("click", function (e) {
      var id = e.target.getAttribute("announcementid");

      var action = e.target.getAttribute("action");
      if (id != null && action == "edit") {
        // document.querySelector("#btnedit").attributes.add("rateid", id);
        document.querySelector("#content1").value =
          e.target.getAttribute("content");

        var roles = e.target.getAttribute("roles");

        var roleArray = roles.split(",");
        for (var i = 0; i < roleArray.length; i++) {
          switch (roleArray[i]) {
            case "employee":
              document.querySelector("#employees1").checked = true;
              break;
            case "hotel_owner":
              document.querySelector("#hotel_owners1").checked = true;
              break;
            case "supplier":
              document.querySelector("#service_providers1").checked = true;
              break;
            case "vendor":
              document.querySelector("#vendors1").checked = true;
              break;
          }
        }
        if (
          document.querySelector("#hotel_owners1").checked &&
          document.querySelector("#employees1").checked &&
          document.querySelector("#vendors1").checked &&
          document.querySelector("#service_providers1").checked
        ) {
          document.querySelector("#all_role1").checked = true;
        }
        MicroModal.show("modal-1");

        document.querySelector("#btnedit").style.display = "block";

        document
          .querySelector("#modal1Fields")
          .setAttribute("announcementid", id);
      } else if (id != null && action == "delete") {
        confirmAlert({
          title: "Confirm to submit",
          message: "Are you sure want delete this?",
          buttons: [
            {
              label: "Yes",
              onClick: () => {
                var ootel_auth_token = localStorage.getItem(
                  "ootel_admin_auth_token"
                );
                var msisdn = localStorage.getItem("ootel_admin_msisdn");
                var postData = {
                  msisdn: msisdn,
                  auth_token: ootel_auth_token,
                  announcement_id: id,
                };
                const rawResponse = fetch(
                  url.server_url + "/delete_announcementdetails",
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
                    document.location.reload();
                  })
                  .catch((err) => {
                    console.error("Error: ", err);
                  });
              },
            },
            {
              label: "No",
              onClick: () => alert("Click No"),
            },
          ],
        });
      }
      e.preventDefault();
    });

    document.querySelector("#btnedit").addEventListener("click", function (e) {
      e.preventDefault();

      var id = document
        .querySelector("#modal1Fields")
        .getAttribute("announcementid");
      var content = document.querySelector("#content1").value;
      var hotel_owners = document.querySelector("#hotel_owners1").checked;
      var employees = document.querySelector("#employees1").checked;
      var vendors = document.querySelector("#vendors1").checked;
      var service_providers = document.querySelector(
        "#service_providers1"
      ).checked;
      try {
        if (
          content == "" ||
          (hotel_owners == "" &&
            employees == "" &&
            vendors == "" &&
            service_providers == "")
        ) {
          alert("All fields are Required");
          return;
        }
      } catch (e) {
        alert("All fields are Required");
        return;
      }
      var roles = [];
      if (hotel_owners == true) roles.push("hotel_owner");
      if (employees == true) roles.push("employee");
      if (vendors == true) roles.push("vendor");
      if (service_providers == true) roles.push("supplier");

      var d = {
        content: content,
        roles: roles,
        id: id,
      };
      var x = new add(d);
      x.get_data();
      MicroModal.close("modal-1");
    });

    document
      .querySelector("#export_report")
      .addEventListener("click", function (e) {
        e.preventDefault();

        var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
        var msisdn = localStorage.getItem("ootel_admin_msisdn");

        var csvData = [];
        var fileName = "AnnouncementsDetails";

        var postData = {
          auth_token: ootel_auth_token,
          column: "id",
          start: 0,
          length: 1,
          direction: "desc",
          per_page: 1,
          role: "admin",
          msisdn: msisdn,
          page: 1,
          search: "",
          isExport: "Y",
        };

        const rawResponse1 = fetch(
          url.server_url + "/get_announcementdetails",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        )
          .then((res) => res.json())
          .then((result) => {
            var data = result.data;
            // var data1 = data.data1;

            for (var i = 0; i < data.length; i++) {
              csvData.push({
                SiNo: i + 1,
                CreatedDate: data[i].post_date,
                Content: data[i].content,
                AppearedTo: data[i].appeared_to,
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
      function (e) {
        if (new clk().hasClass(e.target, "make_active_inactive")) {
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
            url.server_url + "/active_inactive_announcementdetails",
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
      <div className="cl">
        <table className="table table-striped table-bordered" id="table">
          <thead style={{ background: "lightsteelblue" }}>
            <tr>
              <th>SiNo</th>
              <th>Posted Date</th>
              <th>Content</th>
              <th>Appeared To</th>
              <th>Status</th>
              <th>Action</th>
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
                  Announcements Details
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
                    Content :
                    <textarea id="content1" className="form-control" />
                    <br />
                    <h6 style={{ fontWeight: "800px" }}>Appeared To :</h6>
                    All :
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="checkbox"
                      id="all_role1"
                      style={{ width: "35px", height: "20px" }}
                    />
                    <br />
                    Hotel Owners :
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="checkbox"
                      id="hotel_owners1"
                      onClick={this.checkAll1}
                      style={{ width: "35px", height: "20px" }}
                    />
                    <br />
                    Employee :
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="checkbox"
                      id="employees1"
                      onClick={this.checkAll1}
                      style={{ width: "35px", height: "20px" }}
                    />
                    <br />
                    Vendors :
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="checkbox"
                      id="vendors1"
                      onClick={this.checkAll1}
                      style={{ width: "35px", height: "20px" }}
                    />
                    <br />
                    Service Providers : &nbsp;&nbsp;&nbsp;
                    <input
                      type="checkbox"
                      id="service_providers1"
                      onClick={this.checkAll1}
                      style={{ width: "35px", height: "20px" }}
                    />
                    <br />
                    <br />
                  </fieldset>
                  <button class="btn btn-primary" id="btnedit">
                    Save
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

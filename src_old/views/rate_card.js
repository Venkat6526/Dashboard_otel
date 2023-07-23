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
      .querySelector("#btnadditem")
      .addEventListener("click", function (e) {
        document.querySelector("#tblGetItem").style.display = "none";
        document.querySelector("#tblAddItem").style.display = "block";
        document.querySelector("#btnBack").style.display = "block";
      });

    document.querySelector("#btnBack").addEventListener("click", function (e) {
      document.querySelector("#tblGetItem").style.display = "block";
      document.querySelector("#tblAddItem").style.display = "none";
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
          id="btnadditem"
          style={{ float: "right", fontSize: "18px", marginBottom: "20px" }}
        >
          Add Item
        </button>
        <br />
        <br />
        <div id="tblGetItem" style={{ display: "block" }}>
          <Table />
        </div>
        <div id="tblAddItem" style={{ display: "none" }}>
          <Rate_card />
        </div>
      </div>
    );
  }
}

class Rate_card extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    try {
      document
        .querySelector("#add_item")
        .addEventListener("click", function (e) {
          e.preventDefault();

          var item_name = document.querySelector("#item_name").value;
          var description = document.querySelector("#description").value;
          var unit = document.querySelector("#unit").value;
          var admin_rate = document.querySelector("#admin_rate").value;
          var admin_only = document.querySelector("#adminonly").checked;
          try {
            if (
              item_name == "" ||
              description == "" ||
              unit == "" ||
              admin_rate == ""
            ) {
              alert("All fields are Required");
              return;
            }
          } catch (e) {
            alert("All fields are Required");
            return;
          }

          var d = {
            item_name: item_name,
            description: description,
            unit: unit,
            admin_rate: admin_rate,
            admin_only: admin_only ? 1 : 0,
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
        <h5>Item Details</h5>
        <br />
        <table
          id="experience_table"
          border="0"
          style={{ width: "100%", fontSize: "13px" }}
        >
          <thead>
            <tr>
              <th>
                <h8 style={{ fontSize: "17px" }}>Item Name :</h8>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  id="item_name"
                  placeholder="Ex: Milk"
                  style={{ width: "200px", height: "35px", fontSize: "16px" }}
                />
              </th>
            </tr>
            <br />
            <tr>
              {" "}
              <th>
                <h8 style={{ fontSize: "17px", float: "left" }}>
                  Description :
                </h8>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;
                <textarea
                  id="description"
                  placeholder="Ex: Details.."
                  style={{ width: "200px" }}
                />
              </th>
            </tr>
            <br />
            <tr>
              {" "}
              <th>
                <h8 style={{ fontSize: "17px" }}>UOM :</h8>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  id="unit"
                  placeholder="Ex: Ltr, Kg"
                  style={{ width: "200px", height: "35px", fontSize: "16px" }}
                />
              </th>{" "}
            </tr>
            <br />
            <tr>
              {" "}
              <th>
                <h8 style={{ fontSize: "17px" }}>Admin Rate(Rs) :</h8>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  id="admin_rate"
                  placeholder="Ex: 50,20.."
                  style={{ width: "200px", height: "35px", fontSize: "16px" }}
                />
              </th>{" "}
            </tr>
            <br />
            <tr>
              <th>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="checkbox"
                  id="adminonly"
                  style={{ width: "35px", height: "20px" }}
                />
                <h8 style={{ fontSize: "15px" }}>Admin Only</h8>
              </th>
            </tr>
            <br />

            <tr>
              <th>
                <button className="btn btn-primary" id="add_item">
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
    const rawResponse1 = fetch(url.server_url + "/get_vendor_supplier_data", {
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
    this.item = props.item_name;
    this.rate = props.admin_rate;
    this.unit = props.unit;
    this.description = props.description;
    this.admin_only = props.admin_only;
    this.id = props.id;
  }
  get_data(cb) {
    var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    var postData = {
      item: this.item,
      rate: this.rate,
      unit: this.unit,
      description: this.description,
      admin_only: this.admin_only,
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
        url: url.server_url + "/get_rate_card",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          role: "vendor",
          msisdn: msisdn,
          page: this.page,
        },

        dataSrc: function (json1) {
          var return_data = new Array();
          var data = json1.data;
          var k = 1;
          for (var i = 0; i < data.length; i++) {
            return_data.push({
              name: data[i].name,
              description: data[i].description,
              unit: data[i].unit,
              admin_rate:
                data[i].admin_rate +
                '<a href="#" style="color: white;background-color: #007bff;font-size: 12px;padding: 6px;border-radius: 6px;margin-left: 34px;float: right;" id="' +
                data[i].id +
                '" itemname="' +
                data[i].name +
                '" description="' +
                data[i].description +
                '" unit="' +
                data[i].unit +
                '" adminrate="' +
                data[i].admin_rate +
                '" adminonly="' +
                data[i].is_adminonly +
                '" id="btnViewItem" action="edit">Edit</a>',

              my_rate:
                data[i].is_adminonly == 0
                  ? '<a href="#" style="color: blue;font-size: 14px;padding: 8px;" itemname="' +
                    data[i].name +
                    '" id="btnViewItem" action="viewvendors">View</a>'
                  : "Is Admin Only",
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
        { data: "name" },
        { data: "description" },
        { data: "unit" },
        { data: "admin_rate" },
        { data: "my_rate" },
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
    document.querySelector("#table").addEventListener("click", function (e) {
      var id = e.target.getAttribute("id");
      var itemname = e.target.getAttribute("itemname");

      var action = e.target.getAttribute("action");
      if (itemname != null && action == "viewvendors") {
        var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
        var msisdn = localStorage.getItem("ootel_admin_msisdn");

        var tab = $("#tblvendorsrate").DataTable();
        try {
          tab.destroy();
        } catch (e) {}

        tab = $("#tblvendorsrate").DataTable({
          processing: true,
          serverSide: true,
          searching: false,
          paging: true,
          info: false,
          ajax: {
            url: url.server_url + "/get_vendor_ratecard_details",
            type: "POST",
            dataType: "JSON",
            data: {
              auth_token: ootel_auth_token,
              msisdn: msisdn,
              itemname: itemname,
              length: 10,
              start: 0,
            },

            dataSrc: function (result) {
              var return_data = new Array();
              var data = result.data;
              for (var i = 0; i < data.length; i++) {
                return_data.push({
                  sino: i + 1,
                  vendorname: data[i].name,
                  mobileno: data[i].msisdn,
                  vendorrate: data[i].my_rate,
                  locality: data[i].locality,
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
            { data: "vendorname" },
            { data: "mobileno" },
            { data: "vendorrate" },
            { data: "locality" },
          ],
        });

        MicroModal.show("modal-12");
      } else if (id != null) {
        // document.querySelector("#btnedit").attributes.add("rateid", id);
        document.querySelector("#item_name1").value = e.target.getAttribute(
          "itemname"
        );
        document.querySelector("#description1").value = e.target.getAttribute(
          "description"
        );
        document.querySelector("#unit1").value = e.target.getAttribute("unit");
        document.querySelector("#admin_rate1").value = e.target.getAttribute(
          "adminrate"
        );

        document.querySelector("#adminonly1").checked =
          Number(e.target.getAttribute("adminonly")) == 1 ? true : false;

        MicroModal.show("modal-1");
        if (action == "view") {
          document
            .querySelector("#modal1Fields")
            .setAttribute("disabled", "disabled");
          document.querySelector("#btnedit").style.display = "none";
          document.querySelector("#btnclose").style.display = "block";
        } else {
          document.querySelector("#btnedit").style.display = "block";
          document.querySelector("#btnclose").style.display = "none";
          // document.querySelector("#modal1Fields").removeAttribute("disabled");
          document.querySelector("#modal1Fields").setAttribute("rateid", id);
        }
      }
      e.preventDefault();
    });

    document.querySelector("#btnclose").addEventListener("click", function (e) {
      e.preventDefault();
      MicroModal.close("modal-1");
    });

    document.querySelector("#btnedit").addEventListener("click", function (e) {
      e.preventDefault();

      var id = document.querySelector("#modal1Fields").getAttribute("rateid");
      var item_name = document.querySelector("#item_name1").value;
      var description = document.querySelector("#description1").value;
      var unit = document.querySelector("#unit1").value;
      var admin_rate = document.querySelector("#admin_rate1").value;
      var admin_only = document.querySelector("#adminonly1").checked;

      try {
        if (
          item_name == "" ||
          description == "" ||
          unit == "" ||
          admin_rate == ""
        ) {
          alert("All fields are Required");
          return;
        }
      } catch (e) {
        alert("All fields are Required");
        return;
      }

      var d = {
        item_name: item_name,
        description: description,
        unit: unit,
        admin_rate: admin_rate,
        admin_only: admin_only ? 1 : 0,
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
        var fileName = "Rate Card";

        var postData = {
          auth_token: ootel_auth_token,
          column: "id",
          start: 0,
          length: 1,
          direction: "desc",
          per_page: 1,
          role: "vendor",
          msisdn: msisdn,
          page: 1,
          search: "",
          isExport: "Y",
        };

        const rawResponse1 = fetch(url.server_url + "/get_rate_card", {
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
         
            for (var i = 0; i < data.length; i++) {
              csvData.push({
                Name: data[i].name,
                Description: data[i].description,
                Unit: data[i].unit,
                AdminRate: data[i].admin_rate,
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
      "click",
      function (e) {
        if (new clk().hasClass(e.target, "update")) {
          var elem = e.target;
          var z = elem.className.split(" ");

          var id = e.target.getAttribute("value");

          var rate = e.target.parentNode.parentNode.querySelector("input")
            .value;
          var max_rate = e.target.getAttribute("max_rate");

          var ootel_auth_token = localStorage.getItem("ootel_auth_token");

          var postData = {
            max_rate: max_rate,
            auth_token: ootel_auth_token,
            id: id,
            rate: rate,
          };
          const rawResponse = fetch(url.server_url + "/update_rate_card", {
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
  }

  render() {
    return (
      <div className="cl">
        <table className="table table-striped table-bordered" id="table">
          <thead style={{ background: "lightsteelblue" }}>
            <tr>
              <th>Item Name</th>
              <th>Description</th>
              <th>UOM</th>
              <th>Admin Rate(Rs)</th>
              <th>Vendor Rate(Rs)</th>
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
                  Item Details
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
                    Item Name:
                    <input
                      type="text"
                      id="item_name1"
                      className="form-control"
                    />
                    <br />
                    Description:
                    <input
                      type="text"
                      id="description1"
                      className="form-control"
                    />
                    <br />
                    UOM:
                    <input type="text" id="unit1" className="form-control" />
                    <br />
                    Admin Rate(Rs):
                    <input
                      type="text"
                      id="admin_rate1"
                      className="form-control"
                    />
                    <br />
                    Admin Only :
                    <input
                      type="checkbox"
                      id="adminonly1"
                      style={{ width: "35px", height: "20px" }}
                    />
                    <br />
                    <br />
                  </fieldset>
                  <button class="btn btn-primary" id="btnedit">
                    Save
                  </button>
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
                  Vendor Details
                </h4>
                <button
                  className="modal__close"
                  aria-label="Close modal"
                  data-micromodal-close
                ></button>
              </header>
              <main className="modal__content" id="modal-12-content">
                <table
                  className="table table-striped table-bordered"
                  id="tblvendorsrate"
                >
                  <thead>
                    <tr style={{ backgroundColor: "#8fcbcd" }}>
                      <th>Si No</th>
                      <th>Vendor Name</th>
                      <th>Mobile No</th>
                      <th>Vendor Rate</th>
                      <th>Locality</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
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

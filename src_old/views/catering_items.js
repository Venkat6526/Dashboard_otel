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
import Select from "react-select";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

var job_title;
var skill_set;
var experience;
var locality;
var city;

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
      .querySelector("#btnAddItem")
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
          id="btnAddItem"
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
          <Add_item />
        </div>
      </div>
    );
  }
}

class Add_item extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // new get_multi().get_data(function(data) {
    //   grand_data = data;
    // });

    try {
      document
        .querySelector("#add_item")
        .addEventListener("click", function (e) {
          e.preventDefault();

          var catering_item = document.querySelector("#catering_item").value;
          
          try {
            if (
              catering_item == "" 
            ) {
              alert("All fields are Required");
              return;
            }
          } catch (e) {
            alert("All fields are Required");
            return;
          }

          var d = {
            catering_item: catering_item,
            cateringitemid: 0,
          };
          var x = new add(d);
          x.get_data();
        });
    } catch (e) {}
  }
  render() {
    return (
      <div>
        <h5>Catering Details</h5>
        <br />
        <form id="form" style = {{ borderStyle: "ridge", width: "39%", padding: "30px" }}>
          Item Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            id="catering_item"
            placeholder="Enter Item name.."
            style={{ width: "300px" }}
          />
          <br />
          <br />
          
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="btn btn-primary" id="add_item">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

var d;
class App extends React.Component {
  constructor(props) {
    super(props);
    try {
      for (var i = 0; i < props.data.length; i++) {
        props.data[i].label = props.data[i].catering_item;
      }
    } catch (e) {}

    this.options = props.data;
    this.catering_item = "";
    that = this;
  }
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    d = selectedOption;
    console.log(`Option selected:`, selectedOption);
    try {
      document.querySelector("#catering_item").value = selectedOption.catering_item;
    
    } catch (e) {}
  };
  get_data() {
    return d;
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.options}
      />
    );
  }
}
class add extends React.Component {
  constructor(props) {
    super(props);
    this.catering_item = props.catering_item;
    this.cateringitemid = props.cateringitemid;
  }
  get_data(cb) {
    var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    var postData = {
      catering_item: this.catering_item,
      msisdn: msisdn,
      auth_token: ootel_auth_token,
      cateringitem_id: this.cateringitemid,
    };
    // alert(postData);
    const rawResponse = fetch(url.server_url + "/add_catering_items", {
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
      role: "catering_item",
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
        url: url.server_url + "/get_catering_items",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          role: "catering_item",
          msisdn: msisdn,
          page: this.page,
        },

        dataSrc: function (json1) {
          var return_data = new Array();
          var data = json1.data;
          var data1 = json1.data1;
          var k = 1;
          for (var i = 0; i < data.length; i++) {
            var x = "<input type='text' value='" + data[i].city + "'>";
          
            return_data.push({
              sino: i + 1,
              date: data[i].post_date,
              catering_item: data[i].catering_item,
              uom: data[i].uom,
              action:
                '<a href="#" style="color: white;background-color: #007bff;font-size: 12px;padding: 6px;border-radius: 6px;margin-left: 34px;" cateringitemid="' +
                data[i].id +
                '" catering_item="' +
                data[i].catering_item +
                '" id="btnViewItem" action="edit">Edit</a>' +
                '<a href="#" style="color: white;background-color: #007bff;font-size: 12px;padding: 6px;border-radius: 6px;margin-left: 34px;" cateringitemid="' +
                data[i].id +
                '" id="btndelete" action="delete">Delete</a>',

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
        { data: "catering_item" },
        { data: "action" },
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
      var cateringitemid = e.target.getAttribute("cateringitemid");
      var action = e.target.getAttribute("action");
      if (cateringitemid != null && action == "edit") {
        document.querySelector("#catering_item1").value = e.target.getAttribute(
          "catering_item"
        );
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
          document.querySelector("#modal1Fields").removeAttribute("disabled");
          document.querySelector("#modal1Fields").setAttribute("cateringitemid", cateringitemid);
        }
      }
      else if (cateringitemid != null && action == "delete") {
            confirmAlert({
                  title: 'Confirm to submit',
                  message: 'Are you sure want delete this?',
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: () => {
                        var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
                        var msisdn = localStorage.getItem("ootel_admin_msisdn");
                        var postData = {
                          msisdn: msisdn,
                          auth_token: ootel_auth_token,
                          cateringitem_id: cateringitemid,
                        };
                        const rawResponse = fetch(url.server_url + "/delete_catering_items", {
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
                    },
                    {
                      label: 'No',
                      onClick: () => alert('Click No')
                    }
                  ]
                });
      }
      e.preventDefault();
    });
    document.querySelector("#btnclose").addEventListener("click", function (e) {
      e.preventDefault();
      MicroModal.close("modal-1");
    });

    document.querySelector("#btnedit").addEventListener("click", function (e) {
      e.preventDefault();
      var cateringitem_id = document
        .querySelector("#modal1Fields")
        .getAttribute("cateringitemid");
      var catering_item = document.querySelector("#catering_item1").value;
      try {
        if (
          catering_item == "" 
        ) {
          alert("All fields are Required");
          return;
        }
      } catch (e) {
        alert("All fields are Required");
        return;
      }

      var d = {
        catering_item: catering_item,
        cateringitemid: cateringitem_id,
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
          var fileName = "Catering Itemlist"

          var postData = {
              auth_token: ootel_auth_token,
              column: "id",
              search: "",
              direction: "desc",
              length: 1,
              role: "catering_item",
              msisdn: msisdn,
              start: 0,
              page: 1,  
              per_page: 1,
              isExport: "Y",
          };
       
          const rawResponse1 = fetch(url.server_url + "/get_catering_items", {
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
                    Date: data[i].post_date,
                    CateringItems: data[i].catering_item,
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
      <div className="cl">
        <table
          className="table table-striped table-bordered"
          id="table"
          width="100%"
        >
          <thead>
            <tr style={{ backgroundColor: "#8fcbcd" }}>
              <th>Sl No</th>
              <th>Date Added</th>
              <th>Catering Item</th>
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
                    Item Name :
                    <input
                      type="text"
                      id="catering_item1"
                      className="form-control"
                    />
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

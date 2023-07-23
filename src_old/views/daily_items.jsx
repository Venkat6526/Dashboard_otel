import React from "react";

import url from "./config.js";
import $ from "jquery";

import MicroModal from "micromodal";

import Select from "react-select";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

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

          var item_name = document.querySelector("#item_name").value;
          var uom = document.querySelector("#uom").value;

          try {
            if (item_name == "" || uom == "") {
              alert("All fields are Required");
              return;
            }
          } catch (e) {
            alert("All fields are Required");
            return;
          }

          var d = {
            item_name: item_name,
            uom: uom,
            itemid: 0,
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
        <form
          id="form"
          style={{ borderStyle: "ridge", width: "39%", padding: "30px" }}
        >
          Item Name : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            id="item_name"
            placeholder="Ex: Milk.."
            style={{ width: "300px" }}
          />
          <br />
          <br />
          UOM :
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;
          <input
            type="text"
            id="uom"
            placeholder="Ex: ltr/kg.."
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
        props.data[i].label = props.data[i].name;
      }
    } catch (e) {}

    this.options = props.data;
    this.item = "";
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
      document.querySelector("#item_name").value = selectedOption.item_name;
      document.querySelector("#uom").value = selectedOption.uom;
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
    this.item_name = props.item_name;
    this.uom = props.uom;
    this.itemid = props.itemid;
  }
  get_data(cb) {
    var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    var postData = {
      item_name: this.item_name,
      uom: this.uom,
      msisdn: msisdn,
      auth_token: ootel_auth_token,
      item_id: this.itemid,
    };
    // alert(postData);
    const rawResponse = fetch(url.server_url + "/add_daily_items", {
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
      role: "daily_items",
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
        url: url.server_url + "/get_add_daily_items",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          role: "daily_items",
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
              item_name: data[i].item_name,
              uom: data[i].uom,
              action:
                '<a href="#" style="color: white;background-color: #007bff;font-size: 12px;padding: 6px;border-radius: 6px;margin-left: 34px;" itemid="' +
                data[i].id +
                '" item_name="' +
                data[i].item_name +
                '" uom="' +
                data[i].uom +
                '" id="btnViewItem" action="edit">Edit</a>',

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
        { data: "item_name" },
        { data: "uom" },
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
      var itemid = e.target.getAttribute("itemid");
      var action = e.target.getAttribute("action");
      if (itemid != null) {
        document.querySelector("#item_name1").value =
          e.target.getAttribute("item_name");
        document.querySelector("#uom1").value = e.target.getAttribute("uom");
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
          document
            .querySelector("#modal1Fields")
            .setAttribute("itemid", itemid);
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
      var item_id = document
        .querySelector("#modal1Fields")
        .getAttribute("itemid");
      var item_name = document.querySelector("#item_name1").value;
      var uom = document.querySelector("#uom1").value;
      try {
        if (item_name == "" || uom == "") {
          alert("All fields are Required");
          return;
        }
      } catch (e) {
        alert("All fields are Required");
        return;
      }

      var d = {
        item_name: item_name,
        uom: uom,
        itemid: item_id,
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
        var fileName = "Dailyitems";

        var postData = {
          auth_token: ootel_auth_token,
          column: "id",
          search: "",
          direction: "desc",
          length: 1,
          role: "daily_items",
          msisdn: msisdn,
          start: 0,
          page: 1,
          per_page: 1,
          isExport: "Y",
        };

        const rawResponse1 = fetch(url.server_url + "/get_add_daily_items", {
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
            for (var i = 0; i < data.length; i++) {
              csvData.push({
                SiNo: i + 1,
                Date: data[i].post_date,
                ItemName: data[i].item_name,
                UOM: data[i].uom,
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
              <th>Item Name</th>
              <th>UOM</th>
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
                      id="item_name1"
                      className="form-control"
                    />
                    <br />
                    UOM :
                    <input type="text" id="uom1" className="form-control" />
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

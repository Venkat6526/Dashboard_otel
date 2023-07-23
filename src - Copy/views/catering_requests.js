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

import { Multiselect } from "multiselect-react-dropdown";

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
var cateringItemsByAdmin;
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
      .querySelector("#btnAddRequest")
      .addEventListener("click", function (e) {
        document.querySelector("#tblGetRequest").style.display = "none";
        document.querySelector("#tblAddRequest").style.display = "block";
        document.querySelector("#btnBack").style.display = "block";
      });

    document.querySelector("#btnBack").addEventListener("click", function (e) {
      document.querySelector("#tblGetRequest").style.display = "block";
      document.querySelector("#tblAddRequest").style.display = "none";
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
          id="btnAddRequest"
          style={{ float: "right", fontSize: "18px", marginBottom: "20px" }}
        >
          Post Request
        </button>
        <br />
        <br />
        <div id="tblGetRequest" style={{ display: "block" }}>
          <Table />
        </div>
        <div id="tblAddRequest" style={{ display: "none" }}>
          <Post_catering_request />
        </div>
      </div>
    );
  }
}

class Post_catering_request extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
new multi_select().get_multi();   

    try {
      document
        .querySelector("#add_request")
        .addEventListener("click", function (e) {
          e.preventDefault();

          var name = document.querySelector("#name").value;
          var contact_no = document.querySelector("#contact_no").value;
          var email_id = document.querySelector("#email_id").value;
          var locality = document.querySelector("#locality").value;
          var city = document.querySelector("#city").value;
          var address = document.querySelector("#address").value;
          var pincode = document.querySelector("#pincode").value;
          var occasion_date = document.querySelector("#occasion_date").value;
          var specialization = document.querySelector("#specialization").value;
          var food_type = document.querySelector("#food_type").value;
          var no_of_people = document.querySelector("#no_of_people").value;
          var occasion = document.querySelector("#occasion").value;
          var description = document.querySelector("#description").value;
          var catering_items = document.querySelector("#catering_items").value;
          try {
            if (
              name == "" ||
              contact_no == "" ||
              email_id == "" ||
              locality == "" ||
              city == "" ||
              address == "" ||
              pincode == "" ||
              occasion_date == "" ||
              specialization == "" ||
              food_type == "" ||
              no_of_people == "" ||
              occasion == "" ||
              description == "" ||
              catering_items == ""
            ) {
              alert("All fields are Required");
              return;
            }
          } catch (e) {
            alert("All fields are Required");
            return;
          }

          var d = {
            name: name,
            contact_no: contact_no,
            email_id: email_id,
            locality: locality,
            city: city,
            address: address,
            pincode: pincode,
            occasion_date: occasion_date,
            specialization: specialization,
            food_type: food_type,
            no_of_people: no_of_people,
            occasion: occasion,
            description: description,
            catering_items: catering_items,
            cateringrequestid: 0,
          };
          var x = new add(d);
          x.get_data();
        });
    } catch (e) {}
  }
  render() {
    return (
      <div>
        <h5>Catering Request Details</h5>
        <br />
        <form
          id="form"
          style={{
            border: "groove",
            padding: "33px",
            width: "fit-content",
            borderRadius: "7px",
          }}
        >
          <div id="fields" style={{ display: "inline-flex" }}>
            <div id="fields1">
              Name :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                id="name"
                placeholder="Enter name..."
                style={{ width: "260px" }}
              />
              <br />
              <br />
              Contact No :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                id="contact_no"
                placeholder="Enter number..."
                style={{ width: "260px" }}
              />
              <br />
              <br />
              Email Id :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="email"
                id="email_id"
                placeholder="Enter email id..."
                style={{ width: "260px" }}
              />
              <br />
              <br />
              Locality :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                id="locality"
                placeholder="Enter locality..."
                style={{ width: "260px" }}
              />
              <br />
              <br />
              City :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                id="city"
                placeholder="Enter city..."
                style={{ width: "260px" }}
              />
              <br />
              <br />
              <span style={{ float: "left" }}>Address :</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <textarea
                id="address"
                placeholder="Enter address.."
                style={{ width: "260px" }}
              />
              <br />
              <br />
              Pincode :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                id="pincode"
                placeholder="Enter pincode"
                style={{ width: "260px" }}
              />
              <br />
            </div>
            <div
              id="fields2"
              style={{
                float: "right",
                marginLeft: "170px",
                marginTop: "-28px",
              }}
            >
              <br />
              Occasion Date :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="date"
                id="occasion_date"
                style={{ width: "200px" }}
              />
              <br />
              <br />
              Specialization :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <input
            type="text"
            id="specialization"
            placeholder="North indian meals / South indian meals"
            style={{ width: "260px" }}
          /> */}
              <select id="specialization" style={{ width: "260px" }}>
                <option value="">--Select--</option>
                <option value="North indian meals">North indian meals</option>
                <option value="South indian meals">South indian meals</option>
                <option value="Chinese">Chinese</option>
                <option value="Italian">Italian</option>
              </select>
              <br />
              <br />
              Food Type :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <input
            type="text"
            id="food_type"
            placeholder="Veg / Non-Veg"
            style={{ width: "260px" }}
          /> */}
              <select id="food_type" style={{ width: "260px" }}>
                <option value="">--Select--</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              <br />
              <br />
              No of People :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                id="no_of_people"
                placeholder="Enter no of people..."
                style={{ width: "260px" }}
              />
              <br />
              <br />
              Occasion :
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                id="occasion"
                placeholder="Ex: Marriage, Resception, Birthday"
                style={{ width: "260px" }}
              />
              <br />
              <br />
              <span style={{ float: "left" }}>Description :</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <textarea
                id="description"
                placeholder="Ex: Details.."
                style={{ width: "260px" }}
              />
              <br />
              <br />
              <span style={{ float: "left" }}>Items :</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               <div
                id="catering_items"
                style={{ width: "260px", display: "inline-block" }}
              ></div>
              <br />
              <br />
              
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-primary" id="add_request">
                Submit
              </button>
            </div>
          </div>
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
      document.querySelector("#name").value = selectedOption.name;
      document.querySelector("#contact_no").value = selectedOption.contact_no;
      document.querySelector("#email_id").value = selectedOption.email_id;
      document.querySelector("#locality").value = selectedOption.locality;
      document.querySelector("#city").value = selectedOption.city;
      document.querySelector("#address").value = selectedOption.address;
      document.querySelector("#pincode").value = selectedOption.pincode;
      document.querySelector("#occasion_date").value =
        selectedOption.occasion_date;
      document.querySelector("#specialization").value =
        selectedOption.specialization;
      document.querySelector("#food_type").value = selectedOption.food_type;
      document.querySelector("#no_of_people").value =
        selectedOption.no_of_people;
      document.querySelector("#occasion").value = selectedOption.occasion;
      document.querySelector("#description").value = selectedOption.description;
      document.querySelector("#catering_items").value = selectedOption.catering_items;
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
    this.name = props.name;
    this.contact_no = props.contact_no;
    this.email_id = props.email_id;
    this.locality = props.locality;
    this.city = props.city;
    this.address = props.address;
    this.pincode = props.pincode;
    this.occasion_date = props.occasion_date;
    this.specialization = props.specialization;
    this.food_type = props.food_type;
    this.no_of_people = props.no_of_people;
    this.occasion = props.occasion;
    this.description = props.description;
    this.catering_items = props.catering_items;
    this.cateringrequestid = props.cateringrequestid;
  }
  get_data(cb) {
    var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    var postData = {
      name: this.name,
      contact_no: this.contact_no,
      msisdn: msisdn,
      auth_token: ootel_auth_token,
      email_id: this.email_id,
      date: this.date,
      locality: this.locality,
      city: this.city,
      address: this.address,
      pincode: this.pincode,
      occasion_date: this.occasion_date,
      specialization: this.specialization,
      food_type: this.food_type,
      no_of_people: this.no_of_people,
      occasion: this.occasion,
      description: this.description,
      catering_items: this.catering_items,
      cateringrequest_id: this.cateringrequestid,
    };
    // alert(postData);
    const rawResponse = fetch(url.server_url + "/add_post_cateringrequests", {
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

class multi_select extends React.Component {
  get_multi() {
    var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
    
    var postData = { auth_token: ootel_auth_token };

    const rawResponse1 = fetch(url.server_url + "/get_cateringitems_selectdata", {
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
          cateringItemsByAdmin = data.data;
          ReactDOM.render(
            <Multiselect
              options={data.data} // Options to display in the dropdown
              //selectedValues={} // Preselected value to persist in dropdown
              onSelect={this.onSelect_cateringitems} // Function will trigger on select event
              onRemove={this.onRemove_cateringitems} // Function will trigger on remove event
              displayValue="catering_item"
              selectionLimit="100"
              // Property name to display in the dropdown options
            />,
            document.getElementById("catering_items")
          );
          
          document
            .querySelector("#multiselectContainerReact")
            .querySelector("div").style.border = "none";

          document
            .querySelector("#multiselectContainerReact")
            .querySelector("div")
            .querySelector("input").style.width = "100%";
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }

  onSelect_cateringitems(selectedList, selectedItem) {
    var cateringItems = selectedList.map(function ({ catering_item }) { return catering_item; }).join(",");    
    document.querySelector("#catering_items").value = cateringItems;
     document.querySelector("#catering_items1").value = cateringItems;
    //  alert(cateringItems);
  }

  onRemove_cateringitems(selectedList, removedItem) {
    var cateringItems = selectedList.map(function ({ catering_item }) { return catering_item; }).join(",");
    document.querySelector("#catering_items").value = cateringItems;
    document.querySelector("#catering_items1").value = cateringItems;

    // alert(cateringItems);
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
      role: "catering_requests",
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
        url: url.server_url + "/get_post_cateringrequests",

        type: "POST",
        dataType: "JSON",
        data: {
          auth_token: ootel_auth_token,
          column: this.column,
          direction: this.direction,
          per_page: this.per_page,
          role: "catering_requests",
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
              name:
                '<a href="#" style="color: blue;font-size: 14px;padding: 8px;" cateringrequestid="' +
                data[i].id +
                '" name="' +
                data[i].name +
                '" contact_no="' +
                data[i].contact_no +
                '" email_id="' +
                data[i].email_id +
                '" locality="' +
                data[i].locality +
                '" city="' +
                data[i].city +
                '" address="' +
                data[i].address +
                '" pincode="' +
                data[i].pincode +
                '" occasion_date="' +
                data[i].occasion_date +
                '" specialization="' +
                data[i].specialization +
                '" food_type="' +
                data[i].food_type +
                '" no_of_people="' +
                data[i].no_of_people +
                '" occasion="' +
                data[i].occasion +
                '" description="' +
                data[i].description +
                '" id="btnViewCateringrequests" action="view">' +
                data[i].name +
                "</a>",
              contact_no: data[i].contact_no,
              address: data[i].address,
              occasion_date: data[i].occasion_date,
              no_of_people: data[i].no_of_people,
              occasion: data[i].occasion,
              catering_details: '<a href="#" style="color: white;background-color: #007bff;font-size: 12px;padding: 6px;border-radius: 6px;margin-left: 34px;" cateringrequestid="' +
                data[i].id +
                '" specialization="' +
                data[i].specialization +
                '" food_type="' +
                data[i].food_type +
                '" description="' +
                data[i].description +
                '" catering_items="' +
                data[i].catering_items +
                '" id="btnViewCateringdetails" action="catering_details">View</a>',
              applicants:
                data1[i][0].ApplicantCount > 0
                  ? '<a href="#" style="color: blue;font-size: 14px;padding: 8px;" action="viewapplicant" cateringrequestid="' +
                    data[i].id +
                    '" id="btnApply">' +
                    data1[i][0].ApplicantCount +
                    "</a>"
                  : 0,
              status: data[i].status,
              action:
                "<select class='make_open_closed' ids='" +
                data[i].id +
                "'><option value=''>--select--</option><option value='open'>Open</option><option value='closed'>Closed</option></select>" +
                '<a href="#" style="color: white;background-color: #007bff;font-size: 12px;padding: 6px;border-radius: 6px;margin-left: 34px;" cateringrequestid="' +
                data[i].id +
                '" name="' +
                data[i].name +
                '" contact_no="' +
                data[i].contact_no +
                '" email_id="' +
                data[i].email_id +
                '" locality="' +
                data[i].locality +
                '" city="' +
                data[i].city +
                '" address="' +
                data[i].address +
                '" pincode="' +
                data[i].pincode +
                '" occasion_date="' +
                data[i].occasion_date +
                '" specialization="' +
                data[i].specialization +
                '" food_type="' +
                data[i].food_type +
                '" no_of_people="' +
                data[i].no_of_people +
                '" occasion="' +
                data[i].occasion +
                '" description="' +
                data[i].description +
                '" catering_items="' +
                data[i].catering_items +
                '" id="btnViewCateringrequests" action="edit">Edit</a>',

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
        { data: "name" },
        { data: "contact_no" },
        { data: "address" },
        { data: "occasion_date" },
        { data: "no_of_people" },
        { data: "occasion" },
        { data: "catering_details" },
        { data: "applicants" },
        { data: "status" },
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
      var cateringrequestid = e.target.getAttribute("cateringrequestid");
      var action = e.target.getAttribute("action");
      if (cateringrequestid != null && action == "catering_details") {
        document.querySelector(
          "#specialization3"
        ).value = e.target.getAttribute("specialization");
        document.querySelector("#food_type3").value = e.target.getAttribute(
          "food_type"
        );
        document.querySelector("#description3").value = e.target.getAttribute(
          "description"
        );
        document.querySelector("#catering_items3").value = e.target.getAttribute(
          "catering_items"
        );
        MicroModal.show("modal-5");
        if (action == "catering_details") {
          document
            .querySelector("#modal5Fields")
            .setAttribute("disabled", "disabled");
          document.querySelector("#btnclose1").style.display = "block";
        }
      }
      else if (cateringrequestid != null && action == "viewapplicant") {
        var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
        var msisdn = localStorage.getItem("ootel_admin_msisdn");

        var tab = $("#tblApplicants").DataTable();
        try {
          tab.destroy();
        } catch (e) {}

        tab = $("#tblApplicants").DataTable({
          processing: true,
          serverSide: true,
          searching: false,
          paging: false,
          info: false,
          ajax: {
            url: url.server_url + "/get_cateringrequest_applicants",
            type: "POST",
            dataType: "JSON",
            data: {
              auth_token: ootel_auth_token,
              msisdn: msisdn,
              cateringrequest_id: cateringrequestid,
            },

            dataSrc: function (result) {
              var return_data = new Array();
              var data = result.data;
              for (var i = 0; i < data.length; i++) {
                return_data.push({
                  sino: i + 1,
                  hotel_ownername: data[i].name,
                  business_name: data[i].business_name,
                  mobileno: data[i].msisdn,
                  applieddate: data[i].applicant_date,
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
            { data: "hotel_ownername" },
            { data: "business_name" },
            { data: "mobileno" },
            { data: "applieddate" },
          ],
        });

        MicroModal.show("modal-12");
      } else if (cateringrequestid != null) {
        document.querySelector("#name1").value = e.target.getAttribute("name");
        document.querySelector("#contact_no1").value = e.target.getAttribute(
          "contact_no"
        );
        document.querySelector("#email_id1").value = e.target.getAttribute(
          "email_id"
        );
        document.querySelector("#locality1").value = e.target.getAttribute(
          "locality"
        );
        document.querySelector("#city1").value = e.target.getAttribute("city");
        document.querySelector("#address1").value = e.target.getAttribute(
          "address"
        );
        document.querySelector("#pincode1").value = e.target.getAttribute(
          "pincode"
        );
        document.querySelector("#occasion_date1").value = e.target.getAttribute(
          "occasion_date"
        );
        document.querySelector(
          "#specialization1"
        ).value = e.target.getAttribute("specialization");
        document.querySelector("#food_type1").value = e.target.getAttribute(
          "food_type"
        );
        document.querySelector("#no_of_people1").value = e.target.getAttribute(
          "no_of_people"
        );
        document.querySelector("#occasion1").value = e.target.getAttribute(
          "occasion"
        );
        document.querySelector("#description1").value = e.target.getAttribute(
          "description"
        );
        document.querySelector("#catering_items1").value = e.target.getAttribute(
          "catering_items"
        );

        var cateringitems = e.target.getAttribute(
          "catering_items"
        );
        
        var selectedValues = [];
        
        if (cateringitems != "") {
          cateringItemsByAdmin.map(item => {
            
            if (cateringitems.indexOf(item.catering_item) != -1) selectedValues.push(item);
          });
        }

        ReactDOM.render(
            <Multiselect
              options={cateringItemsByAdmin} // Options to display in the dropdown
              selectedValues={selectedValues} // Preselected value to persist in dropdown
              onSelect={new multi_select().onSelect_cateringitems} // Function will trigger on select event
              onRemove={new multi_select().onRemove_cateringitems} // Function will trigger on remove event
              displayValue="catering_item"
              selectionLimit="100"
              // Property name to display in the dropdown options
            />,
            document.getElementById("catering_items1")
          );

        
        MicroModal.show("modal-1");
        if (action == "view") {
          document
            .querySelector("#modal1Fields")
            .setAttribute("disabled", "disabled");
          document.querySelector("#btnedit").style.display = "none";
          document.querySelector("#btnclose").style.display = "block";
          document.querySelector("#divdescription").style.display = "none";
          document.querySelector("#divitems").style.display = "none";
          document.querySelector("#divfoodtype").style.display = "none";
          document.querySelector("#divspecialization").style.display = "none";
        } else {
          document.querySelector("#btnedit").style.display = "block";
          document.querySelector("#btnclose").style.display = "none";
          document.querySelector("#divdescription").style.display = "block";
          document.querySelector("#divitems").style.display = "block";
          document.querySelector("#divfoodtype").style.display = "block";
          document.querySelector("#divspecialization").style.display = "block";
          document.querySelector("#modal1Fields").removeAttribute("disabled");
          document
            .querySelector("#modal1Fields")
            .setAttribute("cateringrequestid", cateringrequestid);
        }
      }      
      e.preventDefault();
    });
    document.querySelector("#btnclose").addEventListener("click", function (e) {
      e.preventDefault();
      MicroModal.close("modal-1");
    });
     document.querySelector("#btnclose1").addEventListener("click", function (e) {
      e.preventDefault();
      MicroModal.close("modal-5");
    });

    document.querySelector("#btnedit").addEventListener("click", function (e) {
      e.preventDefault();
      var cateringrequest_id = document
        .querySelector("#modal1Fields")
        .getAttribute("cateringrequestid");
      var name = document.querySelector("#name1").value;
      var contact_no = document.querySelector("#contact_no1").value;
      var email_id = document.querySelector("#email_id1").value;
      var locality = document.querySelector("#locality1").value;
      var city = document.querySelector("#city1").value;
      var address = document.querySelector("#address1").value;
      var pincode = document.querySelector("#pincode1").value;
      var occasion_date = document.querySelector("#occasion_date1").value;
      var specialization = document.querySelector("#specialization1").value;
      var food_type = document.querySelector("#food_type1").value;
      var no_of_people = document.querySelector("#no_of_people1").value;
      var occasion = document.querySelector("#occasion1").value;
      var description = document.querySelector("#description1").value;
      var catering_items = document.querySelector("#catering_items1").value;
      try {
        if (
          name == "" ||
          contact_no == "" ||
          email_id == "" ||
          locality == "" ||
          city == "" ||
          address == "" ||
          pincode == "" ||
          occasion_date == "" ||
          specialization == "" ||
          food_type == "" ||
          no_of_people == "" ||
          occasion == "" ||
          description == "" ||
          catering_items == ""
        ) {
          alert("All fields are Required");
          return;
        }
      } catch (e) {
        alert("All fields are Required");
        return;
      }

      var d = {
        name: name,
        contact_no: contact_no,
        email_id: email_id,
        locality: locality,
        city: city,
        address: address,
        pincode: pincode,
        occasion_date: occasion_date,
        specialization: specialization,
        food_type: food_type,
        no_of_people: no_of_people,
        occasion: occasion,
        description: description,
        catering_items: catering_items,
        cateringrequestid: cateringrequest_id,
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
          var fileName = "CateringData"

          var postData = {
              auth_token: ootel_auth_token,
              column: "id",
              search: "",
              direction: "desc",
              length: 1,
              role: "catering_requests",
              msisdn: msisdn,
              start: 0,
              page: 1,  
              per_page: 1,
              isExport: "Y",
          };
       
          const rawResponse1 = fetch(url.server_url + "/get_post_cateringrequests", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }).then((res) => res.json())
            .then((result) => {
              
              var data = result.data;
              var data1 = result.data1;
             
                for (var i = 0; i < data.length; i++) {
                  csvData.push({
                      SlNo: i + 1,
                      DatePosted: data[i].post_date,
                      Name: data[i].name, 
                      Contact : data[i].contact_no,
                      Address : data[i].address,
                      OccasionDate: data[i].occasion_date,
                      Specialization: data[i].specialization,
                      FoodType: data[i].food_type,
                      NoOfPeople: data[i].no_of_people,
                      Occasion: data[i].occasion,
                      Description: data[i].description,
                      CateringItems: data[i].catering_items,
                      Applicants: data1[i][0].ApplicantCount,
                      Status: data[i].status,
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


    document.querySelector("#table").addEventListener(
      "change",
      function (e) {
        if (new clk().hasClass(e.target, "make_open_closed")) {
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
            url.server_url + "/open_closed_post_cateringrequest",
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
        <table
          className="table table-striped table-bordered"
          id="table"
          width="0px"
          style={{ fontSize: "13px" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#8fcbcd" }}>
              <th>Sl No</th>
              <th>Date Posted</th>
              <th style={{ width: "180px" }}>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Occasion Date</th>
              <th>No Of People</th>
              <th>Occasion</th>
              <th>Catering Details</th>
              <th>Applicants</th>
              <th>Status</th>
              <th style={{ width: "147px" }}>Action</th>
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
                  Catering Request Details
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
                    <input type="text" id="name1" className="form-control" />
                    <br />
                    Contact:
                    <input
                      type="text"
                      id="contact_no1"
                      className="form-control"
                    />
                    <br />
                    Email Id :
                    <input
                      type="email"
                      id="email_id1"
                      className="form-control"
                    />
                    <br />
                    Locality :
                    <input
                      type="text"
                      id="locality1"
                      className="form-control"
                    />
                    <br />
                    City :
                    <input type="text" id="city1" className="form-control" />
                    <br />
                    Address :
                    <textarea id="address1" className="form-control" />
                    <br />
                    Pincode :
                    <input type="text" id="pincode1" className="form-control" />
                    <br />
                    Occasion Date:
                    <input
                      type="text"
                      id="occasion_date1"
                      className="form-control"
                    />
                    <br />
                    <div id= "divspecialization">
                    Specialization :
                    <input
                      type="text"
                      id="specialization1"
                      className="form-control"
                    />
                      <br />
                    </div>
                    <div id= "divfoodtype">
                    Food Type :
                    <input
                      type="text"
                      id="food_type1"
                      className="form-control"
                    />
                      <br />
                    </div>
                    No Of People :
                    <input
                      type="text"
                      id="no_of_people1"
                      className="form-control"
                    />
                    <br />
                    Occasion :
                    <input
                      type="text"
                      id="occasion1"
                      className="form-control"
                    />
                    <br />
                    <div id="divdescription">
                      Description:
                    <textarea id="description1" className="form-control" />
                    </div>
                    <br />
                    <div id="divitems">
                    Items :
                    <div
                          id="catering_items1"
                          style={{ display: "inline-block" }}
                    ></div>
                    </div>
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

        <div className="modal micromodal-slide" id="modal-5" aria-hidden="true">
          <div className="modal__overlay" tabindex="-1" data-micromodal-close>
            <div
              style={{ width: "100%" }}
              className="modal__container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-5-title"
            >
              <header className="modal__header">
                <h4 v="modal__title" id="modal-5-title">
                  Catering Details
                </h4>
                <button
                  className="modal__close"
                  aria-label="Close modal"
                  data-micromodal-close
                ></button>
              </header>
              <main className="modal__content" id="modal-5-content">
                <form id="View_form" method="post">
                  <fieldset id="modal5Fields">
                    Specialization :
                    <input
                      type="text"
                      id="specialization3"
                      className="form-control"
                    />
                    <br />
                    Food Type :
                    <input
                      type="text"
                      id="food_type3"
                      className="form-control"
                    />
                    <br />
                    Description:
                    <textarea id="description3" className="form-control" />
                    <br />
                    Items :
                    <textarea
                      type="text"
                      id="catering_items3"
                      className="form-control"
                    />
                    <br />
                  </fieldset>
                  
                  <button class="btn btn-primary" id="btnclose1">
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
                  Applicant Details
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
                  id="tblApplicants"
                >
                  <thead>
                    <tr style={{ backgroundColor: "#8fcbcd" }}>
                      <th>Si No</th>
                      <th>Hotel Owner Name</th>
                      <th>Business Name</th>
                      <th>Mobile No</th>
                      <th>Applied Date</th>
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

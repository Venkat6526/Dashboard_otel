import * as FileSaver from "file-saver";
import $ from "jquery";
import MicroModal from "micromodal";
import React from "react";
import ReactDOM from "react-dom";
import * as XLSX from "xlsx";
import { Accept_payment } from "../views/accept_payment.js";
import { Photo_details } from "../views/photo_gallery.js";
import CustomAlert from "./alert/CustomAlert.js";
import url from "./config.js";

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
  // filter button
  componentDidMount() {
    document
      .querySelector("#btnfilter")
      .addEventListener("click", function (e) {
        document.querySelector("#tblGetPayment").style.display = "none";
        document.querySelector("#tblFilterPayment").style.display = "block";
        document.querySelector("#btnBack").style.display = "block";
      });
    // back button
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
        <div></div>
      </div>
    );
  }
}
// end of filter and back button with logic

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
    this.alertcustom = this.alertcustom.bind(this);
    this.checkValid = this.checkValid.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      showAlert: false,
      alertMessage: "",
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  alertcustom() {
    this.setState({
      showAlert: true,
      alertMessage: "All fields are mandatory",
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

  checkValid () {
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
      // alert("All filter fields are mandatory" );
      this.alertcustom()
    } else {
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
  };
  componentDidMount() {
    // $ is jquery

    $("body").on("click", "#getreport1", function () {
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
        // alert("All filter fields are mandatory" );
        // let newFunction = new Payment_Filter().alertcustom();
      } else {
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
            role: "hotel_owner",
            msisdn: msisdn,
            page: 10,
            columndate: columndate,
            from_date: from_date,
            to_date: to_date,
            isexport: "Y",
          };
          console.log(postData);
          // fetching data from backend

          const rawResponse1 = fetch(url.server_url + "/get_payment_listdata", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          })
            .then((res) => res.json())
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
            })
            .catch((err) => {
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
          onChange={(e) => {
            reportcolumndate = e.target.value;
          }}
          style={{ width: "250px", display: "inline" }}
        >
          <option value="select">Select</option>
          <option value="created">Registration Date</option>
          <option value="expering">Expiry Date</option>
        </select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="btn btn-primary"
          id="getreport"
          onClick={()=>this.checkValid()}
        >
          Submit
        </button>
        <br />
        <br />
      
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
        <div>
          {this.state.showAlert && <CustomAlert text={this.state.alertMessage} />}</div>
      </div>
    );
  }
}








class get_payment_report extends React.Component {
  constructor(
    page,
    per_page,
    column,
    direction,
    search,
    columndate,
    from_date,
    to_date,
    isexport
  ) {
    super(
      page,
      per_page,
      column,
      direction,
      search,
      columndate,
      from_date,
      to_date,
      isexport
    );
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
          role: "hotel_owner",
          msisdn: msisdn,
          page: this.page,
          columndate: this.columndate,
          from_date: this.from_date,
          to_date: this.to_date,
          isexport: this.isexport,
        },

        dataSrc: function (json1) {
          var return_data = new Array();
          var data = json1.data;

          var k = 1;
          for (var i = 0; i < data.length; i++) {
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
    console.log('klklk',ootel_auth_token)

    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    console.log('klklkmsisdn',msisdn)

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
        url: url.server_url + "/get_employee_details",
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
                "         <button class='btn btn-primary edit_profile' value='" +
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
          orderable: true, //set not orderable
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
    $("body").on("click", ".view_profile", function () {
      new get_data_for_edit().get_data($(this).val());
    });
    $("body").on("click", "#refresh", function () {
      document.location.reload();
    });
    $("body").on("click", ".edit_profile", function () {
      new get_data_for_edit1().get_data($(this).val());
    });

    document.querySelector("#table").addEventListener(
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

    document.querySelector("#table").addEventListener("change",
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

    $("body").on("click", "#update", function (e) {
      e.preventDefault();
      new update().get_data($(this).val());
    });

    $("body").on("click", ".accept_payment", function (e) {
      var msisdn = $(this).attr("value");

      $.ajax({
        url: url.server_url + "/get_package",
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
    document.querySelector("#table").addEventListener("click", function (e) {
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
          <table className="table table-striped table-bordered" id="table">
            <thead style={{ background: "lightsteelblue" }}>
              <tr>
                <th>Created On</th>
                <th>Name</th>
                <th>Business name</th>
                <th>Mobile</th>
                <th style={{ width: "80px" }}>Profile</th>
                <th>Payment Status</th>
                <th style={{ width: "200px" }}>Payment Validity</th>
                <th>Status</th>
                <th style={{ width: "105px" }}>Action</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
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
        <div>{new edit_data().get_data()}</div>
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
                    <b> Business Name :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="business_name"></span>
                    <br />
                    <b> State :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="state"></span>
                    <br />
                  </div>
                  <div className="col-md-6">
                    <b> Address Line 1 :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="address"></span>
                    <br />
                    <b> Address Line 2 :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="address1"></span>
                    <br />
                    <b>City :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="city"></span>
                    <br />
                    <b> Locality :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="locality"></span>
                    <br />
                    <b> PIN :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;
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
                    <b>No Of Employees :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="no_of_employees"></span>
                    <div id="no_of_employee"></div>
                    <b> Business Description :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="business_description"></span>
                    <div id="business_description"> </div> <br />
                  </div>
                  <div className="col-md-6">
                    <b> Catering Capacity :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="is_catering"></span>
                    <br />
                    <b> Catering Type :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="catering_type"></span>
                    <br />
                    <b> Capacity :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="capacity"></span>
                    <br />
                    <b>Specialization Area :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="specialization_area"></span>
                    <br />
                    <b> Establishment Type : </b>
                    &nbsp;&nbsp;
                    <span id="establishment_type"></span>
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
                  Conatct Details
                </h6>
                <div className="row">
                  <div className="col-md-12">
                    <b> Contact Person :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="name"></span>
                    <br />
                    <b>Mobile No :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="msisdn"></span>
                    <br />
                    <b>Alternative Mobile No :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="alt_msisdn"></span>
                    <br />
                    <b> Email Id :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="email_id"></span>
                    <br />
                    <b> Website :</b>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="website"></span>
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
                  Photo Details
                </h6>
                <div className="row">
                  <div className="col-md-12">
                    <div id="photo_details">
                      <Photo_details data={that1.state.photos} />,
                    </div>
                  </div>
                </div>
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

var form_value = 0;

const Basic_details_edit = () => (
  <div className="row">
    <div className="col-md-6">
      <b> Business Name:</b>
      <span className="required"></span>
      <input
        type="text"
        name="business_name"
        id="business_name_edit"
        style={mystyle}
        className="form-control u-full-width"
      />

      <div>
        {" "}
        <img src="" width="300" id="photo_details_edit" />
      </div>

      <b>Select Multiple Photos:</b>
      <br />
      <input type="file" id="file_edit" name="file" multiple />

      <br />

      <b> State:</b>
      <span className="required"></span>
      <input
        type="text"
        id="state_edit"
        name="state"
        style={mystyle}
        className="form-control"
      />
    </div>
    <div className="col-md-6">
      <b> Address Line 1:</b>
      <span className="required"></span>
      <input
        type="text"
        name="address"
        id="address_edit"
        style={mystyle}
        className="form-control"
      />

      <b> Address Line 2:</b>
      <span className="required"></span>

      <input
        type="text"
        id="address1_edit"
        name="address1"
        className="form-control"
        style={mystyle}
      />

      <b>City:</b>
      <span className="required"></span>
      <input
        type="text"
        id="city_edit"
        name="city"
        style={mystyle}
        className="form-control"
      />

      <b> Locality:</b>
      <span className="required"></span>
      <input
        type="text"
        id="locality_edit"
        name="locality"
        style={mystyle}
        className="form-control"
      />
      <b> PIN:</b>
      <span className="required"></span>
      <input
        type="text"
        id="pin_edit"
        name="pin"
        style={mystyle}
        className="form-control"
      />
      <br />
    </div>
  </div>
);

const Business_details_edit = () => (
  <div className="row">
    <div className="col-md-6">
      <b> Year of Establishment:</b>
      <span className="required"></span>
      <input
        type="date"
        name="year_of_establishment"
        id="year_of_establishment_edit"
        style={mystyle}
        className="form-control"
      />

      <b>No Of Employees:</b>
      <span className="required"></span>
      <input
        type="text"
        id="no_of_employees_edit"
        name="no_of_employees"
        style={mystyle}
        className="form-control"
      />

      <b> Business Description:</b>
      <span className="required"></span>

      <textarea
        id="business_description_edit"
        name="business_description"
        style={mystyle}
        className="form-control"
      ></textarea>
      <br />
    </div>
    <div className="col-md-6">
      <b> Catering Capacity:</b>
      <span className="required"></span>
      <br />
      <table>
        <tr>
          <td>NO:</td>

          <td>
            <input
              style={{ width: "30px" }}
              value="no"
              type="radio"
              defaultChecked
              className="catering_capacity1"
              name="catering_capacity"
            />
          </td>

          <td>YES:</td>

          <td>
            <input
              style={{ width: "30px" }}
              type="radio"
              value="yes"
              className="catering_capacity2"
              name="catering_capacity"
            />
          </td>
        </tr>
      </table>
      <div id="catering_data1_edit">
        <table>
          <tbody>
            <tr>
              <td>VEG:</td>

              <td>
                <input
                  style={{ width: "30px" }}
                  type="radio"
                  checked
                  className="catering_type"
                  value="veg"
                  name="catering_type"
                />
              </td>

              <td>NON VEG:</td>

              <td>
                <input
                  style={{ width: "30px" }}
                  type="radio"
                  className="catering_type"
                  value="non_veg"
                  name="catering_type"
                />
              </td>

              <td>BOTH:</td>

              <td>
                <input
                  style={{ width: "30px" }}
                  type="radio"
                  className="catering_type"
                  value="both"
                  name="catering_type"
                />
              </td>
            </tr>
            <tr>
              <td colspan="3">
                Capacity:<span className="required"></span>
                <br />
                <input type="text" name="capacity" id="capacity_edit" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <b> Specialization Area:</b>
      <span className="required"></span> <br />
      <textarea
        id="specialization_area_edit"
        name="specialization_area"
      ></textarea>
      <br />
      <b> Establishment Type:</b>
      <span className="required"></span> <br />
      <textarea
        id="establishment_type_edit"
        name="establishment_type"
      ></textarea>
    </div>
  </div>
);
const Contact_details_edit = () => (
  <div className="row">
    <div className="col-md-6">
      <b> Contact Person:</b>
      <span className="required"></span>
      <input
        type="text"
        name="fname"
        id="fname_edit"
        style={mystyle}
        className="form-control"
      />

      <b>Mobile No:</b>

      <input
        disabled
        type="text"
        id="msisdn_edit"
        name="msisdn"
        className="form-control"
        style={mystyle}
      />

      <b>Alternative Mobile No:</b>
      <input
        type="text"
        id="alt_msisdn_edit"
        name="alt_msisdn"
        style={mystyle}
        className="form-control"
      />

      <b> Email Id:</b>
      <input
        type="text"
        id="email_id_edit"
        name="email_id"
        style={mystyle}
        className="form-control"
      />
      <b> Website:</b>
      <input
        type="text"
        id="website_edit"
        name="website"
        style={mystyle}
        className="form-control"
      />
      <br />

      <br />
      <br />
      <br />
    </div>
  </div>
);

class edit_data {
  get_data(id) {
    return (
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
              <h5 id="title">Update Profile</h5>
              <form
                id="myform"
                name="myform"
                style={mystyle1}
                encType="multipart/form-data"
              >
                <div id="data">
                  <h6>Basic Details</h6>
                  <Basic_details_edit />
                  <hr />
                  <h6>Business Details</h6>
                  <Business_details_edit />
                  <hr />
                  <h6>Contact Details</h6>
                  <Contact_details_edit />
                  <hr />
                </div>

                <button id="update" type="submit" className="btn btn-primary">
                  Save All
                </button>
              </form>
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
    );
  }
}

class get_data_for_edit {
  get_data(id) {
    var ootel_auth_token = localStorage.getItem("ootel_auth_token");
    var postData = { id: id };
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
          var data2 = data.data1;
          business_name = data1[0].business_name;
          document.getElementById("business_name").innerHTML = business_name;

          try {
            state = data1[0].state;
          } catch (e) {
            console.log(e.message);
          }
          try {
            document.getElementById("locality").innerHTML = data1[0].locality;
          } catch (e) {
            console.log(e.message);
          }
          try {
            address = data1[0].address;
          } catch (e) {
            console.log(e.message);
          }

          try {
            address1 = data1[0].address1;
          } catch (e) {
            console.log(e.message);
          }
          try {
            city = data1[0].city;
          } catch (e) {
            console.log(e.message);
          }
          try {
            pin = data1[0].pin;
          } catch (e) {
            console.log(e.message);
          }

          capacity = data1[0].capacity;

          business_description = data1[0].business_description;
          establishment_type = data1[0].establishment_type;
          specialization_area = data1[0].specialization_area;

          alt_msisdn = data1[0].alt_msisdn;
          email_id = data1[0].email_id;
          website = data1[0].website;

          no_of_employees = data1[0].no_of_employees;
          name = data1[0].name;
          msisdn = data1[0].msisdn;
          state = data1[0].state;
          year_of_establishment = data1[0].year_of_establishment;
          is_catering = data1[0].is_catering;
          catering_type = data1[0].catering_type;
          document.querySelector("#business_name").innerHTML = business_name;
          document.querySelector("#business_description").innerHTML =
            business_description;
          document.querySelector("#establishment_type").innerHTML =
            establishment_type;
          document.querySelector("#specialization_area").innerHTML =
            specialization_area;
          document.querySelector("#alt_msisdn").innerHTML = alt_msisdn;
          document.querySelector("#email_id").innerHTML = email_id;
          document.querySelector("#website").innerHTML = website;
          document.querySelector("#msisdn").innerHTML = msisdn;
          document.querySelector("#year_of_establishment").innerHTML =
            year_of_establishment;
          document.querySelector("#catering_type").innerHTML = catering_type;
          document.querySelector("#is_catering").innerHTML = is_catering;
          document.querySelector("#no_of_employees").innerHTML =
            no_of_employees;
          document.querySelector("#capacity").innerHTML = capacity;
          document.querySelector("#state").innerHTML = state;
          document.querySelector("#address").innerHTML = address;
          document.querySelector("#address1").innerHTML = address1;
          document.querySelector("#pin").innerHTML = pin;
          document.querySelector("#city").innerHTML = city;
          document.querySelector("#name").innerHTML = name;

          try {
            var photos = [];
            images1 = data1[0].photo.split("<>");
            photos.length = 0;
            for (var i = 0; i < images1.length; i++) {
              //alert(url.image_url+"/"+images1[i]);
              if (images1[i] != "") {
                photos.push({
                  src: url.image_url + "/" + images1[i],
                  width: 1,
                  height: 1,
                });
              }
            }

            //alert(photos);

            that1.setState({
              photos: photos,
            });
          } catch (e) {
            alert(e.message);
          }
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
  }
}

class get_data_for_edit1 {
  get_data(id) {
    var ootel_auth_token = localStorage.getItem("ootel_auth_token");
    var postData = { id: id };
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

          business_description = data1[0].business_description;
          establishment_type = data1[0].establishment_type;
          specialization_area = data1[0].specialization_area;

          alt_msisdn = data1[0].alt_msisdn;
          email_id = data1[0].email_id;
          website = data1[0].website;

          no_of_employees = data1[0].no_of_employees;
          name = data1[0].name;
          msisdn = data1[0].msisdn;
          state = data1[0].state;
          year_of_establishment = data1[0].year_of_establishment;
          is_catering = data1[0].is_catering;
          catering_type = data1[0].catering_type;
          address = data1[0].address;
          address1 = data1[0].address1;
          city = data1[0].city;

          pin = data1[0].pin;
          locality = data1[0].locality;
          try {
            document.querySelector("#business_name_edit").value = business_name;
            document.querySelector("#business_description_edit").value =
              business_description;
            document.querySelector("#establishment_type_edit").value =
              establishment_type;
            document.querySelector("#specialization_area_edit").value =
              specialization_area;
            document.querySelector("#alt_msisdn_edit").value = alt_msisdn;
            document.querySelector("#email_id_edit").value = email_id;
            document.querySelector("#website_edit").value = website;
            document.querySelector("#msisdn_edit").value = msisdn;
            document.querySelector("#year_of_establishment_edit").value =
              year_of_establishment;
            document.querySelector("#locality_edit").value = locality;
            document.querySelector("#update").value = data1[0].id;
          } catch (e) {}
          try {
            document.querySelector("#catering_type_edit").value = catering_type;
          } catch (e) {}

          try {
            document.querySelector("#is_catering_edit").value = is_catering;
          } catch (e) {}
          try {
            document.querySelector("#no_of_employees_edit").value =
              no_of_employees;
          } catch (e) {}

          try {
            document.querySelector("#capacity_edit").value = capacity;
            document.querySelector("#state_edit").value = state;
            document.querySelector("#address_edit").value = address;
            document.querySelector("#address1_edit").value = address1;
            document.querySelector("#pin_edit").value = pin;
            document.querySelector("#city_edit").value = city;
            document.querySelector("#fname_edit").value = name;
          } catch (e) {}

          if (is_catering == "yes") {
            document.querySelector("#catering_data1_edit").style.display =
              "block";
            var c = document.querySelectorAll(".catering_capacity1");
            c[0].removeAttribute("checked");
            var c = document.querySelectorAll(".catering_capacity2");
            c[0].checked = true;
          } else {
            document.querySelector("#catering_data1_edit").style.display =
              "none";
            var c = document.querySelectorAll(".catering_capacity2");
            c[0].removeAttribute("checked");
            var c = document.querySelectorAll(".catering_capacity1");
            c[0].checked = true;
          }
          var cat_type = document.querySelectorAll(".catering_type");

          for (var i = 0; i < cat_type.length; i++) {
            if (cat_type[i].value == catering_type) {
              cat_type[i].checked = true;
            }
          }

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
        } catch (e) {
          console.log(e.message);
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }
}

class update {
  get_data(id) {
    try {
      const formData = new FormData(document.querySelector("#myform"));
      var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
      formData.append("auth_token", ootel_auth_token);
      formData.append("id", id);
      const rawResponse = fetch(url.server_url + "/add_hotel_owners", {
        method: "POST",
        //    headers: {
        //      //"Content-Type": "multipart/form-data",
        //   'Content-Type': 'application/json' ,
        //      // 'Accept': 'application/json'
        //    // 'Access-Control-Allow-Origin':'*'
        //    },
        //
        body: formData,
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
            alert(data.data);
            document.location.reload();
          }
        })
        .catch((err) => {
          console.error("Error: ", err);
        });
    } catch (e) {}
  }
}

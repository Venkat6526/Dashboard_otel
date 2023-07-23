import React, { Component, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Bar, Line } from "react-chartjs-2";
import url from "./config.js";
import $ from "jquery";
import DataTable from "datatables.net";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MicroModal from "micromodal";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

var that;
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
var experience_area = [];
var city;
var locality;
var pin;
var is_catering = "no";
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

var that;
var columns;
export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    this.state = {
      data: props.value,
      loading: false,
      pages: 0,
      pagesize: 10,
      fetch_flag: 1,
      showModal_data: false,
    };
  }


  componentDidMount() {}

  render() {
    const mystyle = {
      width: "300px",
      fontSize: "14px",
    };

    const { data } = this.state;

    const overlayClassName = this.state.showModal_data
      ? "modal fade show"
      : "modal fade";

    return (
      <div>
        {" "}
        <Table />
      </div>
    );
  }
}

var that1;

var that_search;

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
    var ootel_admin_auth_token = localStorage.getItem("ootel_admin_auth_token");
    var msisdn = localStorage.getItem("ootel_admin_msisdn");
    var role = localStorage.getItem("ootel_admin_role");

    var search_value;

    var postData = {
      auth_token: ootel_admin_auth_token,
      search: this.search,
      column: this.column,
      direction: this.direction,
      per_page: this.per_page,
      role: role,
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
        url: url.server_url + "/get_complaint_box",

        type: "POST",
        dataType: "JSON",
        data: postData,

        dataSrc: function (json1) {
          var return_data = new Array();
          var data = json1.data;
          var data1 = json1.data1;
          var k = 1;
          for (var i = 0; i < data.length; i++) {
            var act =
              "<button   ticket_id='" +
              data[i].ticket_id +
              "'  reply='" +
              data[i].reply +
              "' complaint='" +
              data[i].complaint +
              "' class='btn btn-primary view_complaint' value='" +
              data[i].id +
              "'>View</button>";

            var disable = "";
            if (data[i].status == "Closed") {
              disable = "disabled";
            }

            return_data.push({
              sl_no: k++,
              ticket_id: data[i].ticket_id,
              role: data1[i][0].role,
              created_on: data[i].created_on,
              business_name: data1[i][0].business_name,
              name: data1[i][0].name,
              msisdn: data[i].msisdn,
              complaint: act,
              status: data[i].status,
              action:
                "<select " +
                disable +
                "  ids='" +
                data[i].id +
                "' class='make_active_inactive form-control'><option value=''>--select--</option><option value='closed'>Closed</option></select>",

              recordsTotal: 11,

              recordsFiltered: 11,
            });
          }
          $("#table_filter").find("input").css({ width: "700px" });
          $("#table_filter")
            .find("input")
            .attr("placeholder", "Search  Mobile");

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
        { data: "sl_no" },
        { data: "ticket_id" },

        { data: "role" },
        { data: "created_on" },
        { data: "business_name" },
        { data: "name" },
        { data: "msisdn" },
        { data: "complaint" },
        { data: "status" },
        { data: "action" },
      ],
    });
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

var update_id = "";
var that_Table;
class Table extends React.Component {
  constructor(props) {
    super(props);
    that_Table = this;
    that_Table.state = {
      editor: "",
    };
    this.state = {
      ismodal: false,
    };
  }
  demo = () => {
    this.setState({
      ismodal: !this.state.ismodal,
    });
  };
  // componentDidMount() {
  //   var c = new get_search_data("1", "10", "id", "desc");
  //   c.get_data();
  //   $("#table").on("click", ".view_complaint", function () {
  //     $(this).attr("disabled", true);
  //     var this_var = $(this);
  //     var auth_token = localStorage.getItem("ootel_admin_auth_token");

  //     var ticket_id = $(this).attr("ticket_id");
  //     update_id = $(this).attr("value");

  //     $.ajax({
  //       url: url.server_url + "/get_ticket_history",
  //       data: { ticket_id: ticket_id, auth_token: auth_token },
  //       type: "POST",
  //       dataType: "JSON",
  //       success: function (data1) {
  //         try {
  //           var data = data1.data;
  //           var html = "";
  //           for (var i = 0; i < data.length; i++) {
  //             if (data[i].modified_on == null) {
  //               data[i].modified_on = "";
  //             }
  //             if (data[i].sent_by == "admin") {
  //               data[i].sent_by = "me";
  //             }
  //             if (data[i].sent_by == "you") {
  //               data[i].sent_by = "customer";
  //             }
  //             if (i == 0) {
  //               html =
  //                 html +
  //                 data[i].sent_by +
  //                 "<br/>" +
  //                 html +
  //                 data[i].created_on +
  //                 "<br/>" +
  //                 data[i].complaint;
  //             } else {
  //               html =
  //                 html +
  //                 data[i].sent_by +
  //                 "<br/>" +
  //                 data[i].created_on +
  //                 "" +
  //                 "<br/>" +
  //                 data[i].reply;
  //             }
  //           }
  //           $("#complaint").html(html);
  //           MicroModal.init({
  //             onShow: (modal) => console.info("${modal.id} is shown"),
  //             onClose: (modal) => console.info("${modal.id} is hidden"),
  //             openTrigger: "data-custom-open", // [3]
  //             closeTrigger: "data-custom-close", // [4]
  //             disableScroll: true, // [5]
  //             disableFocus: false, // [6]
  //             awaitOpenAnimation: false, // [7]
  //             awaitCloseAnimation: false, // [8]
  //             debugMode: true, // [9]
  //           });

  //           MicroModal.show("modal-1");
  //           this_var.attr("disabled", false);
  //         } catch (e) {
  //           console.log(e.message);
  //           this_var.attr("disabled", false);
  //         }
  //       },
  //       error: function (xhr) {
  //         alert(xhr.rresponseText);
  //         $(this).attr("disabled", false);
  //       },
  //     });
  //   });

  //   $("body").on("click", "#send_reply", function () {
  //     var auth_token = localStorage.getItem("ootel_admin_auth_token");
  //     $.ajax({
  //       url: url.server_url + "/send_response_complaint",
  //       data: { reply: ckeditor_data, id: update_id, auth_token: auth_token },
  //       type: "POST",
  //       dataType: "JSON",
  //       success: function (data) {
  //         try {
  //           if (typeof data.error !== "undefined") {
  //             alert(data.error);
  //             return false;
  //           }
  //         } catch (e) {}
  //         alert(data.data);
  //         document.location.reload();
  //       },
  //       error: function (xhr) {
  //         alert(xhr.responseText);
  //       },
  //     });
  //   });

  //   document
  //     .querySelector("#export_report")
  //     .addEventListener("click", function (e) {
  //       e.preventDefault();

  //       var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");
  //       var msisdn = localStorage.getItem("ootel_admin_msisdn");

  //       var csvData = [];
  //       var fileName = "Complaints";

  //       var postData = {
  //         auth_token: ootel_auth_token,
  //         column: "id",
  //         search: "",
  //         direction: "desc",
  //         length: 1,
  //         role: "role",
  //         msisdn: msisdn,
  //         start: 0,
  //         page: 1,
  //         per_page: 1,
  //         isExport: "Y",
  //       };

  //       const rawResponse1 = fetch(url.server_url + "/get_complaint_box", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(postData),
  //       })
  //         .then((res) => res.json())
  //         .then((result) => {
  //           var data = result.data;
  //           var data1 = result.data1;
  //           // alert(data.length);
  //           // alert(data1.length);
  //           for (var i = 0; i < data.length; i++) {
  //             csvData.push({
  //               SiNo: i + 1,
  //               TicketId: data[i].ticket_id,
  //               Role: data1[i][0].role,
  //               CreatedOn: data[i].created_on,
  //               BusinessName: data1[i][0].business_name,
  //               Name: data1[i][0].name,
  //               MobileNo: data[i].msisdn,
  //               Complaint: data[i].complaint,
  //               Status: data[i].status,
  //             });
  //           }

  //           console.log(csvData);
  //           const fileType =
  //             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //           const fileExtension = ".xlsx";

  //           const ws = XLSX.utils.json_to_sheet(csvData);
  //           const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //           const excelBuffer = XLSX.write(wb, {
  //             bookType: "xlsx",
  //             type: "array",
  //           });
  //           const exceldata = new Blob([excelBuffer], { type: fileType });
  //           FileSaver.saveAs(exceldata, fileName + fileExtension);
  //         })
  //         .catch((err) => {
  //           console.error("Error: ", err);
  //         });
  //     });

  //   document.querySelector("#table").addEventListener(
  //     "change",
  //     function (e) {
  //       if (new clk().hasClass(e.target, "make_active_inactive")) {
  //         var elem = e.target;
  //         var z = elem.className.split(" ");

  //         var id = e.target.getAttribute("ids");

  //         //	var rate=e.target.parentNode.parentNode.querySelector("input").value;
  //         //var max_rate=e.target.getAttribute("max_rate");

  //         var ootel_auth_token = localStorage.getItem("ootel_admin_auth_token");

  //         var postData = {
  //           status: e.target.value,
  //           auth_token: ootel_auth_token,
  //           id: id,
  //         };
  //         const rawResponse = fetch(
  //           url.server_url + "/make_active_inactive_complaint",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(postData),
  //           }
  //         )
  //           .then((res) => res.json())
  //           .then((data) => {
  //             try {
  //               if (data.error.length != 0) {
  //                 alert(data.error);
  //                 return;
  //               }
  //             } catch (e) {}
  //             alert(data.data);

  //             var c = new get_search_data("1", "10", "id", "desc");
  //             c.get_data();
  //           })
  //           .catch((err) => {
  //             console.error("Error: ", err);
  //           });
  //       }
  //     },
  //     false
  //   );
  // }

  // const [add, setAdd] = useState(RichTextEditor.createEmptyValue());
  render() {
    return (
      <div className="cl" style={{ overflow: "auto", width: "1160px" }}>
        {this.state.ismodal ? (
          <>
            <div>
              <div>
                <form>
                  <table style={{ border: "1px solid blue" }}>
                    <tr>
                      <td>Date:</td>
                      <td>
                        <input type="date" name="date" />
                      </td>
                    </tr>
                    <tr>
                      <td>Customer ID/Mobile:</td>
                      <td>
                        <input type="number" name="number" />
                      </td>
                    </tr>
                    <tr>
                      <td>Select Role:</td>
                      <td>
                        <select>
                          <option>Select the option</option>
                          <option value="owner">Hotel Owner</option>
                          <option value="employee">Employee</option>
                          <option value="vender">Vender</option>
                          <option value="services">Services Provider</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Bussiness:</td>
                      <td>
                        <input type="text" name="text" disabled />
                      </td>
                    </tr>
                    <tr>
                      <td>Name:</td>
                      <td>
                        <input type="text" name="text" disabled />
                      </td>
                    </tr>
                    <tr>
                      <td>Complaint:</td>
                      <td>
                        <textarea rows={3}></textarea>
                      </td>
                    </tr>
                    <tr style={{ marginRight: "180px" }}>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={() => this.demo()}
                      >
                        Submit
                      </button>
                    </tr>
                  </table>
                </form>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <button
                type="button"
                class="btn btn-primary"
                style={{ float: "right" }}
                onClick={() => this.demo()}
              >
                Create Ticket
              </button>
            </div>

            <table className="table table-striped table-bordered" id="table">
              <thead style={{ background: "lightsteelblue" }}>
                <tr>
                  <th>Sl No</th>
                  <th>Ticket Id</th>
                  <th>Role</th>
                  <th>Date</th>
                  <th>Business Name</th>
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>Complaints</th>
                  <th>Status</th>
                  <th style={{ width: "105px" }}>Action</th>
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
          </>
        )}

        <div className="App">
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
                  <div id="complaint"></div>

                  <CKEditor
                    editor={ClassicEditor}
                    onInit={(editor) => {
                      // editor.setData({"data":""});
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      ckeditor_data = editor.getData();
                      that_Table.setState({ editor: "" });
                      // alert(ckeditor_data);
                      //that_app.ckeditor_data=ckeditor_data;
                      //console.log( { event, editor, data } );
                    }}
                    onBlur={(event, editor) => {
                      ckeditor_data = editor.getData();

                      //that_app.ckeditor_data=ckeditor_data;
                    }}
                    onFocus={(event, editor) => {
                      ckeditor_data = editor.getData();
                      //that_app.ckeditor_data=ckeditor_data;
                    }}
                  />
                </main>
                <footer className="modal__footer">
                  <button
                    className="btn btn-primary"
                    id="send_reply"
                    // onClick={() => {
                    //   setIsModal(false);
                    // }}
                  >
                    Send
                  </button>
                  &nbsp; &nbsp;
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
      </div>
    );
  }
}

var that_resp;
var ckeditor_data;

var that_app;

import React from "react";
import url from "./config.js";
import $ from "jquery";
import MicroModal from "micromodal";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

//import {Basic_details_edit,Business_details_edit,Contact_details_edit} from "views/UserProfile/profile_template_edit.js";



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
        url: url.server_url + "/get_rewards_scratchcard_details",

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
              employee_name: data1[i][0].employee_name,
              employee_id: data1[i][0].msisdn,
              card_status: data[i].card_status,
              redeemed_date: data[i].redeemed_date,
              amount: data[i].amount,
              
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
        { data: "employee_name" },
        { data: "employee_id" },
        { data: "card_satus" },
        { data: "redeemed_date" },
        { data: "amount" },
  
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
          "#employee_name1"
        ).value = e.target.getAttribute("employee_name");
        document.querySelector("#location1").value = e.target.getAttribute(
          "location"
        );
        document.querySelector("#city1").value = e.target.getAttribute("city");
        
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
        var fileName = "ScratchCard Details";

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

        const rawResponse1 = fetch(url.server_url + "/get_rewards_scratchcard_details", {
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
                EmployeeName: data1[i][0].employee_name,
                EmployeeId: data1[i][0].msisdn,
                CardStatus: data[i].card_status,
                RedeemedDate: data[i].redeemed_date,
                Amount: data[i].amount,
              
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
                <th>Date </th>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Scratch Card Status</th>
                <th>Redeemed Date</th>
                <th>Amount</th>
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
                    Employee Details
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
                     Employee Name :
                      <br />
                      <input
                        type="text"
                        id="employee_name1"
                        className="form-control"
                      />
                      <br />
                      Location :
                      <br />
                      <input
                        type="text"
                        id="location1"
                        className="form-control"
                      />
                      <br />
                      City :
                      <br />
                      <input type="text" id="city1" className="form-control" />
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

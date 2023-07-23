import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import url from "./config.js";
import $ from "jquery";
import DataTable from "datatables.net";
import Select from "react-select";

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

var city;
var locality;
var pin;

console.log("jag");
var photos = [];
var d;
export const Accept_payment = class Basic_details extends React.Component {
  constructor(props) {
    super(props);
    that = this;
    that.msisdn = props.msisdn;
    that.options = props.data;
  }
  componentDidMount() {}

  handleChange = (selectedOption) => {
    d = selectedOption.id;

    console.log(`Option selected:`, selectedOption);
    try {
      document.querySelector("#cost").value = selectedOption.cost;
    } catch (e) {}
  };

  handleSaveClick = () => {
    var remarks = document.querySelector("#remarks").value;

    // $.ajax({
    //   url: url.server_url + "/update_package",
    //   type: "POST",
    //   data: {
    //     auth_token: localStorage.getItem("ootel_admin_auth_token"),
    //     msisdn: localStorage.getItem("ootel_admin_msisdn"),
    //     paidmsisdn: that.msisdn,
    //     packageid: d,
    //     paymentremarks: remarks,
    //   },
    //   dataType: "JSON",
    //   success: function (data) {
    //     try {
    //       if (typeof data.error != "undefined") {
    //         alert(data.error);
    //         return;
    //       } else {
    //         alert(data.data);
    //         document.location.reload();
    //       }
    //     } catch (e) {}
    //   },
    //   error: function (xhr) {},
    // });

    var postData = {
      auth_token: localStorage.getItem("ootel_admin_auth_token"),
      msisdn: localStorage.getItem("ootel_admin_msisdn"),
      paidmsisdn: that.msisdn,
      packageid: d,
      paymentremarks: remarks,
    };
    console.log(postData);

    const rawResponse1 = fetch(url.server_url + "/update_package", {
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
          alert(data.data);
          document.location.reload();
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
  render() {
    const mystyle = {
      width: "250px",
      fontSize: "14px",
    };
    const mystyle1 = {
      fontSize: "14px",
    };

    return (
      <div>
        <div
          style={{ width: "100%" }}
          className="modal micromodal-slide"
          id="modal-11"
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
              <main className="modal__content" id="modal-11-content">
                Package:
                <br />
                <Select
                  value={d}
                  onChange={that.handleChange}
                  options={that.options}
                />
                <br />
                Cost:
                <br />
                <input type="text" disabled id="cost" />
                <br />
                Remarks:
                <br />
                <input type="text" id="remarks" className="form-control" />
                <br />
                <br />
              </main>
              <footer className="modal__footer">
                <button
                  className="btn btn-primary"
                  id="save_payment"
                  onClick={that.handleSaveClick}
                >
                  Save
                </button>

                <button
                  className="modal__btn"
                  data-micromodal-close
                  aria-label="Close this dialog window"
                  style={{ float: "right" }}
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
};

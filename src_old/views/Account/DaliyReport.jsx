import React from "react";
import { useState, useEffect } from "react";
import { getAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";

export default function DaliyReport() {
  const [get, setGet] = useState({});

  const [from, setFrom] = useState(new Date().toISOString().substring(0, 10));
  const [to, setTo] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    console.log(new Date().toISOString().substring(0, 10), "asass");
    console.log(to, "to");
    getAPI(`${apinames.GET_DAILY_REPORT}?fromDate=${from}&toDate=${to}`)
      .then((response) => {
        console.log(response.data, "data");
        setGet(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      });
  }, []);

  let HandleSubmit = () => {
    getAPI(`${apinames.GET_DAILY_REPORT}?fromDate=${from}&toDate=${to}`)
      .then((response) => {
        console.log(response.data, "data");
        setGet(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      });
  };

  return (
    <div>
      <div>
        <label>From Date:</label>&nbsp; &nbsp;
        <input
          type="date"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
        />{" "}
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <label>To Date:</label>&nbsp; &nbsp;
        <input
          type="date"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
          }}
        />
        <button
          className="btn btn-primary"
          style={{ marginLeft: "20px" }}
          onClick={() => {
            HandleSubmit();
          }}
        >
          Submit
        </button>
      </div>
      <br />
      <br />
      <div style={{ borderBottom: "2px dashed #63c2de" }}>
        <h6>
          Customer Payment Received{" "}
          <h6 style={{ float: "right" }}>
            {" "}
            Grand Total:{get.total_customer_payment}
          </h6>
        </h6>

        <table className="table table-borded">
          <thead style={{ backgroundColor: "aliceblue" }}>
            <tr>
              <th>Sl No</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Mode</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {get.payment != null &&
              get.payment.map((item, index) => (
                <tr>
                  <>
                    <td>{index + 1}</td>
                    <td>{new Date(item.created_on).toLocaleDateString()}</td>
                    <td>{item.name}</td>
                    <td>{item.payment_mode}</td>
                    <td>{item.amount}</td>
                  </>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />

      <div style={{ borderBottom: "2px  dashed #63c2de" }}>
        <h6>
          Supplier Payment{" "}
          <h6 style={{ float: "right" }}>
            {" "}
            Grand Total:{get.total_supplier_payment}
          </h6>
        </h6>
        <table className="table table-borded">
          <thead style={{ backgroundColor: "aliceblue" }}>
            <tr>
              <th>Sl No</th>
              <th>Date</th>
              <th>Supplier Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {get.supplierPayment != null &&
              get.supplierPayment.map((item, index) => (
                <tr>
                  <>
                    <td>{index + 1}</td>
                    <td>{new Date(item.created_on).toLocaleDateString()}</td>
                    <td>{item.name}</td>
                    <td>{item.amount}</td>
                  </>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <hr />

      <div className="table table-border">
        <tbody>
          <tr>
            <td>
              <h6>Total Sales:</h6>
            </td>
            <td>
              {" "}
              <p>{get.total_sales}</p>
            </td>
          </tr>

          <tr>
            <td>
              <h6>Total Purchase:</h6>
            </td>
            <td>
              {" "}
              <p>{get.total_purchase}</p>
            </td>
          </tr>

          <tr>
            <td>
              <h6>Total Supplier Payment:</h6>
            </td>
            <td>
              {" "}
              <p>{get.total_supplier_payment}</p>
            </td>
          </tr>

          <tr>
            <td>
              <h6>Payment Received:</h6>
            </td>
            <td>
              {" "}
              <p>{get.total_customer_payment}</p>
            </td>
          </tr>

          <tr>
            <td>
              <h6>Voucher :</h6>
            </td>
            <td>
              {" "}
              <p>{get.voucher}</p>
            </td>
          </tr>
        </tbody>
      </div>
      <br />
      <br />

      <div>
        <button className="btn btn-danger" style={{ MarginLeft: "231px" }}>
          {" "}
          Print
        </button>
      </div>
    </div>
  );
}

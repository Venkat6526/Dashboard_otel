import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import url from "../../config";
import Form from "react-bootstrap/Form";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import "../../../index.css";
import DynamicSearch from "../../../components/AutoComplete/DynamicSearch";
import ProductSearch from "../../../components/AutoComplete/ProductSearch";
export default function PreviewPurchaseLedger() {
  const location = useLocation();
  const history = useHistory();

  // const data = location.state;

  const [plData, setPlData] = useState(location.state.data);
  console.log(location.state, "Link DaTA");

  const handleGoBack = () => {
    history.goBack();
  };

  // const onsubmit = (data) => {
  //     console.log(data, "newqwertyuio ");

  //     const newArr = arrayObject.map((v) => ({ ...v, supplier_idd: select.id }));
  //     const newFormData = new FormData();

  //     newFormData.append(
  //       "invoice_date",
  //       moment(data.invoice_date).toISOString().slice(0, 10)
  //     );
  //     newFormData.append(
  //       "received_date",
  //       moment(data.received_date).toISOString().slice(0, 10)
  //     );
  //     newFormData.append("supplier", data.supplier);
  //     newFormData.append("vehical_no", data.vehical_no);
  //     newFormData.append("invoice_no", data.invoice_no);
  //     newFormData.append("type", data.type);
  //     newFormData.append("attached_invoice", data.attached_invoice[0]);
  //     newFormData.append("debit", select.debit);
  //     newFormData.append("balance", select.balance);
  //     newFormData.append("supplier_id", select.id);
  //     newFormData.append("grand_total", grandTotal);
  //     newFormData.append("new_grand_total", oldGrandTotal);
  //     newArr.forEach((item, index) => {
  //       newFormData.append(`productArray[${index}]`, JSON.stringify(item));
  //     });

  //     console.log(newArr, "dataa");
  //     postFormDataAPI(apinames.POST_PURCHASE_LEDGER, newFormData)
  //       .then((response) => {
  //         var status_code = response.status_code;
  //         console.log(status_code, "response.status_code");
  //         if (status_code == 200) {
  //           // alert("Post is Successful");
  //           // window.location.reload();
  //         } else if (status_code == 400) {
  //           alert(JSON.stringify(response.data));
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  return (
    <div>
      <form
      //   onSubmit={handleSubmit(onsubmit)}
      >
        <div className="row">
          <div className="col-md-4">
            <label>Supplier Name:</label>
            <br />
            <p>{plData.supplierName}</p>

            <label>Invoice Date:</label>
            <br />
            <p>{plData.invoice_date}</p>

            <br />
            <label>Received Date:</label>
            <br />
            <p>{plData.received_date}</p>
            <br />
            <label>Supplier:</label>
            <br />
            <p>{plData.supplier}</p>
            <br />
            <label>Vehicle No:</label>
            <br />
            <p>{plData.vehical_no}</p>
            <br />
            <label>Invoice No:</label>
            <br />
            <p>{plData.invoice_no}</p>
            <br />
          </div>
          <div className="col-md-8" style={{ width: "100px ! important" }}>
            <label>Type: </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p>{plData.type}</p>
            <br />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Attached Invoice:</Form.Label>
              <p>{plData.attached_invoice}</p>
            </Form.Group>
            <label>Freight:</label>
            <br />
            <p>{plData.freight}</p>
            <br />
          </div>
        </div>
        <br />
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="bg-success text-white">
                <th style={{ width: "70px" }}>Sl No</th>
                <th>Product</th>
                <th>Size</th>
                <th>UOM</th>
                <th>QTY</th>
                <th>Sub UOM</th>
                <th>Sub QTY</th>
                <th>Unit Price(₹)</th>
                <th>Amount (₹)</th>
                <th>Unit Cost with GST</th>
                <th>Unit Cost without GST</th>
              </tr>
            </thead>

            {plData.prodcutArray.map((item, index) => (
              <tr>
                <td style={{ width: "70px" }}>{index + 1}</td>
                <td>
                  <p>{item.material_type}</p>
                </td>
                <td>
                  <p>{item.size}</p>
                </td>
                <td>
                  <p>{item.uom}</p>
                </td>
                <td>
                  <p>{item.qty}</p>
                </td>
                <td>
                  <p>{item.sub_uom}</p>
                </td>
                <td>
                  <p>{item.sub_qty}</p>
                </td>
                <td>
                  <p>{item.rate}</p>
                </td>
                <td>
                  <p>{item.grand_total}</p>
                </td>
                <td>
                  <p>{item.u_cost_with_gst}</p>
                </td>
                <td> 
                <p>{item.u_cost_without_gst}</p> 
                </td>
              </tr>
            ))}
          </table>
        </div>

        <button
          type="Submit"
          className="btn btn-primary"
          style={{ position: "relative", bottom: "-100px" }}
        >
          SAVE
        </button>
        <button
          type="button"
          className="btn btn-primary"
          style={{ position: "relative", bottom: "-100px" }}
          onClick={handleGoBack}
        >
          Go Back
        </button>
        <div style={{ float: "right", marginLeft: "5px" }}>
          <h6>
            {/* Grand Total (₹):
            <span>{grandTotal}</span> */}
          </h6>
        </div>
      </form>
    </div>
  );
}

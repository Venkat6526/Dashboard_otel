import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import apinames from "../../apiServices/ApiConstant";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  deleteAPI,
  getAPI,
  postAPI,
  postFormDataAPI,
} from "../../apiServices/AxiousFetch";
import { useParams } from "react-router";

const SignupSchema = yup.object({
  amount: yup
    .string()
    .matches(/^[0-9]+(\.[0-9]{1,2})?$/, "Amount must be a valid number")
    .required(" Amount is required"),

  
});

export default function InvoiveTransportTruck() {
  const location = useLocation();
  const [lgShow1, setLgShow1] = useState(false);
  const [tGet, setTGet] = useState([]);

  const showAddTransport = () => {
    setLgShow1(true);
  };
  const [gstType, setGSTType] = useState("inclusive");
  const [gstValue, setGSTValue] = useState(0);

  function handleGSTTypeChange(event) {
    setGSTType(event.target.value);
    if (event.target.value === "inclusive") {
      setGSTValue(0);
    }
  }

  function handleGSTValueChange(event) {
    setGSTValue(event.target.value);
  }

  // set the path

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  useEffect(() => {
    handleGet(location.state.invoice_no);
    console.log(location, "location");
  }, []);
  const handleGet = (invoice_no) => {
    console.log(invoice_no, "qwerkyui");
    postAPI(apinames.GET_TRANSPORT,{invoice_no:invoice_no}).then((response) => {
      console.log(response.data, "transport get");
      setTGet(response.data);
    });
  };

  //--------------------------post
  const onsubmitdata = async (data) => {
const index = location.state.invoice_no.lastIndexOf("/");
const invoice_id = location.state.invoice_no.substring(index + 1);

    try {
      const newFormData = new FormData();

      newFormData.append("invoice_no", location.state.invoice_no);
      newFormData.append("invoice_id", invoice_id);
      newFormData.append("mode", data.dispatch_through);
      newFormData.append("amount", data.amount);
      const gstValueToSave = gstType === "no_gst" ? 0 : gstValue;
      newFormData.append("gst", gstValueToSave);

      newFormData.append("challan", data.challan[0]);
      newFormData.append(
        "delivery_date",
        moment(location.state.delivery_date).toISOString().slice(0, 10)
      );
      console.log(newFormData, "data");
      const response = await postFormDataAPI(
        apinames.POST_TRANSPORT,
        newFormData
      );
      const status_code = response.status_code;
      if (status_code === 200) {
        alert("Successful");
        //window.location.reload()
        setLgShow1(false);
        handleGet(location.state.id);
      } else if (status_code === 400) {
        alert(JSON.stringify(response.status_code));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandle = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_TRANSPORT + id).then((response) => {
          console.log(response, "response");
          const status_code = response.status_code;
          if (status_code === 200) {
            handleGet(location.state.id);
          }
        });
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };

  return (
    <div>
      <div>
        <div className="table table-borderless">
          <tbody>
            <tr>
              <td>
                {" "}
                <p> Invoice No:</p>
              </td>
              <td>
                <h6>{location.state.invoice_no}</h6>
              </td>
            </tr>
          </tbody>
        </div>

        <div>
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "aliceblue" }}>
              <tr>
                <th>Sl No</th>
                <th>Date</th>
                <th>Mode</th>
                <th>Amount(₹)</th>
                <th>GST(%)</th>
                <th>Challan</th>
                <th>Action</th>
              </tr>
            </thead>
            {tGet.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td> {moment(item.delivery_date).format("DD/MM/YYYY")}</td>
                <td>{item.mode}</td>
                <td>{item.amount}</td>
                <td>{item.gst}</td>
                <td>
                  <a href={item.challan} target="_blank">
                    Click here
                  </a>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ backgroundColor: "#dc3545" }}
                    onClick={() => {
                      deleteHandle(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <button className="btn btn-primary" onClick={showAddTransport}>
            {" "}
            Add New
          </button>
          <br />
          <br />
        </div>
        {lgShow1 && (
          <div className="table table-border">
            <form onSubmit={handleSubmit(onsubmitdata)}>
              <thead style={{ backgroundColor: "aliceblue" }}>
                <tr>
                  <th>Transport</th>
                  <th>Amount(₹)</th>
                  <th>GST(%)</th>
                  <th>Challan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    <select {...register("dispatch_through")}>
                      <option value="select">Select</option>
                      <option value="vrl">VRL</option>
                      <option value="ideal">Ideal</option>
                      <option value="office">Office</option>
                    </select>
                    <span className="text-danger">
                      {errors.dispatch_through &&
                        errors.dispatch_through.message}
                    </span>
                  </td>
                  <td>
                    <input type="number" {...register("amount")} min={0} />{" "}
                    <span className="text-danger">
                      {errors.amount && errors.amount.message}
                    </span>{" "}
                  </td>                 
                  <td>
                    <input
                      type="radio"
                      name="gstType"
                      value="No_GST"
                      checked={gstType === "No_GST"}
                      {...register("gst")}
                      onChange={handleGSTTypeChange}
                    />
                    <span className="text-danger">
                      {errors.gst && errors.gst.message}
                    </span>
                    No GST &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="radio"
                      name="gstType"
                      value="with_gst"
                      checked={gstType === "with_gst"}
                      {...register("gst")}
                      onChange={handleGSTTypeChange}
                    />{" "}
                    <span className="text-danger">
                      {errors.gst && errors.gst.message}
                    </span>
                    With GST
                    {gstType === "with_gst" && (
                      <select value={gstValue} onChange={handleGSTValueChange}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <option value="select">Select</option>
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    )}
                  </td>
                  <td>
                    {" "}
                    <input
                      type="file"
                      className="form-Control "
                      {...register("challan")}
                    />
                    <span className="text-danger">
                      {errors.challan && errors.challan.message}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </td>
                </tr>
              </tbody>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

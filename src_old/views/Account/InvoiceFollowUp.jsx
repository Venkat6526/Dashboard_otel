import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import apinames from "../../apiServices/ApiConstant";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAPI, postAPI } from "../../apiServices/AxiousFetch";

// const SignupSchema = yup.object({
//   amount: yup
//     .string()
//     .matches(/^[0-9]+(\.[0-9]{1,2})?$/, "Amount must be a valid number")
//     .required(" Amount is required"),

//   mode: yup.string().required("Select the transport"),
// });

export default function InvoiceFollowUp() {
  const location = useLocation();
  const [lgShow1, setLgShow1] = useState(false);
  const [tGet, setTGet] = useState([]);

  const showAddTransport = () => {
    setLgShow1(true);
  };

  // set the path

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    //mode: "onChange",
    // resolver: yupResolver(SignupSchema),
  });

  useEffect(() => {
    handleGet(location.state.invoice_no);
    console.log(location, "location");
    setValue("invoice_no", location.state.in_no);
  }, []);

  const handleGet = (invoice_no) => {
    postAPI(apinames.GET_FOLLOW_UP,{invoice_no:invoice_no})
      .then((response) => {
        console.log(response.data, "data");
        setTGet(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      });
  };

  //--------------------------post
  const onsubmitdata = async (data) => {
    const index = data.invoice_no.lastIndexOf("/");
    const invoice_id = data.invoice_no.substring(index + 1);
    console.log(data.invoice_no, "remarks");
    console.log(index, "assas");
    console.log(invoice_id, "aaaaaaabbbbbb");


    try {
      let postData = {
        invoice_no: data.invoice_no,
        invoice_id: invoice_id,
        customer_name: location.state.customer_name,
        mobile_no: location.state.mobile_no,
        customer_id: location.state.customer_id,
        date: moment(location.state.created_on).toISOString().slice(0, 10),
        follow_up_date: moment(data.follow_up_date).toISOString().slice(0, 10),
        description: data.description,
        status: data.status,
      };
      console.log(postData, "postData");
      const response = await postAPI(apinames.POST_FOLLOW_UP, postData);
      const status_code = response.status_code;
      if (status_code === 200) {
        setLgShow1(false);
        handleGet(location.state.customer_id);
      } else if (status_code === 400) {
        alert(JSON.stringify(response.status_code));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div style={{ justifyContent: "space-between", display: "flex" }}>
        
          <label>
            Customer Name:
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {location.state.customer_name}
            </span>
          </label>

          <label>
            Mobile No:{" "}
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {location.state.mobile_no}
            </span>
          </label>
        </div>
        <br />
        <br />
        <div>
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "aliceblue" }}>
              <tr>
                <th>Sl No</th>
                <th>Created On</th>
                <th>Invoice No</th>
                <th>Follow Up Date</th>
                <th>Description</th>
                <th>Status</th>
                {/* <th>Challan</th>
                <th>Action</th> */}
              </tr>
            </thead>

            {tGet.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td> {moment(item.date).format("DD/MM/YYYY")}</td>
                <td>{item.invoice_no}</td>
                <td> {moment(item.follow_up_date).format("DD/MM/YYYY")}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
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
                  <th>Follow Up Date</th>
                  <th>Invoice No</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="date" {...register("follow_up_date")} />
                    <span className="text-danger">
                      {errors.follow_up_date && errors.follow_up_date.message}
                    </span>
                  </td>

                  <td>
                    <input type="text" {...register("invoice_no")} />
                  </td>

                  <td>
                    <textarea
                      name=""
                      id=""
                      cols="25"
                      rows="2"
                      {...register("description")}
                    ></textarea>{" "}
                    <span className="text-danger">
                      {errors.description && errors.description.message}
                    </span>{" "}
                  </td>
                  <td>
                    <input
                      type="radio"
                      name="follow_up"
                      value="Follow Up"
                      defaultChecked={true}
                      {...register("status")}
                    />
                    <span className="text-danger">
                      {errors.status && errors.status.message}
                    </span>
                    Follow Up &nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                      type="radio"
                      name="follow_up"
                      value="Settled"
                      {...register("status")}
                    />{" "}
                    <span className="text-danger">
                      {errors.status && errors.status.message}
                    </span>
                    Settled
                  </td>

                  <td>
                    {" "}
                    <button className="btn btn-primary" type="submit"   >
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

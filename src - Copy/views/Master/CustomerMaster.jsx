import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import url from "../../views/config";
import "../../index.css";
import Filter from "../../components/Filter";
import {
  deleteAPI,
  getAPI,
  postAPI,
  PutAPI,
} from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import FunctionAlert from "../alert/CustomerMasterAlert";
import { Refresh } from "@mui/icons-material";

const phoneRegExp = /^[6-9]\d{9}$/;

const SignupSchema = yup.object({
  customer_name: yup
    .string()
    .required("Customer name is required")
    .matches(/^(\S+\s?)+$/, "Customer name can accept one space")
    .max(100, "Customer name should not exceed 100 characters"),

  contact_person: yup
    .string()
    .required("Contact Person name is required")
    .matches(  /^[a-zA-Z\s]+$/, "Contact Person should contain only characters")
    .max(100, "Contact  Person should not exceed 100 characters"),

  mobile_no: yup
    .string()
    .matches(phoneRegExp, "Entire phone number only")
    .required("Enter phone number only"),
  email: yup.string().required("Email is required"),
  gst: yup
    .string()
    .min(15, "GST number must be at least 15 characters long")
    .max(15, "GST number can be maximum 15 characters long")
    .matches(
      /^[a-zA-Z0-9]*$/,
      "GST number should not contain special characters"
    )
    .required("GST number is required"),

  address: yup.string()
  // .max(250, "Addres can not be more than 250 characters long")
  .required("Address is required"),
  city: yup
    .string()
    .required("City is required")
    .matches(/^[A-Za-z\s]+$/, "City should only contain alphabet"),

  state: yup
    .string()
    .matches(/^[A-Za-z]+$/, "State should only contain alphabet")
    .oneOf(
      ["Karnataka", "Pune", "Goa", "Kerala", "Chennai"],
      "Please select a valid state"
    )
    .required("State is required"),
  pin_code: yup
    .string()
    .required("Pin code is required")
    .matches(/^\d{6}$/, "Pin code should only contain 6 digits"),
});

export default function CustomerMaster() {
  const [eedit, setEedit] = useState(""); //to store put id value
  const [showAlert, setShowAlert] = useState(false);
  const [reload, setReload] = useState(false);
  const [alertData, setAlertData] = useState({
    code: 200,
    data: "",
  });

  const [add, setAdd] = useState([]);
  const [api, setApi] = useState([]); // filter
  const [show, setShow] = useState(false); // add product
  const productClose = () => setShow(false); //product model close
  const productOpen = () => {
    setShow(true); // product model open
  };
  const [open, setOpen] = useState(false); // edit product
  const editClose = () => setOpen(false);
  const editOpen = () => {
    setOpen(true);
  };
  //---view---//
  const [view, setView] = useState(false); // edit product
  const viewClose = () => setView(false);
  const viewOpen = () => {
    setView(true);
  };
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [total, setTotal] = useState(0);
  const [records, setRecords] = useState([]);

  //--------Calculation------------------//

  useEffect(() => {
    setRecords([
      {
        credit: 0,
        debit: 0,
        total: 0,
      },
    ]);
  }, []);
  useEffect(() => {
    setTotal(records[records.length - 1]?.total ?? 0);
  }, [records]);
  // Submit Button to save data in >>>records<<<
  const getInfo = (e) => {
    e.preventDefault();

    //to Get Total Value after Submit
    setRecords((records) => [
      ...records,
      {
        credit,
        debit,
        total: credit - debit + total,
      },
    ]);

    // Again Providing Initial Values
    setCredit(0);
    setDebit(0);
  };

  const editDisplay = (data) => {
    setEedit(data.id);
    setValue("customer_name", data.customer_name);
    setValue("contact_person", data.contact_person);
    setValue("mobile_no", data.mobile_no);
    setValue("mobile_no2", data.mobile_no2);

    setValue("email", data.email);
    setValue("gst", data.gst);
    setValue("address", data.address);
    setValue("state", data.state);
    setValue("city", data.city);
    setValue("pin_code", data.pin_code);
    setValue("payment", data.payment);
    setValue("dealer", data.dealer == "Yes" ? true : false);
  };

  const {
    register,
    handleSubmit,

    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });
  const value = watch();

  const {
    register: register2,
    setValue,
    reset: reset2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "aliceblue",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  const columns = [
    {
      name: "Sl no",
      selector: (row, index) => index + 1,
      width: "70px",
    },

    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
    },
    {
      name: " Contact Person",
      selector: (row) => row.contact_person,
    },
    {
      name: "Mobile No",
      selector: (row) => row.mobile_no,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },

    {
      name: "GST No ",
      selector: (row) => row.gst,
      color: "#fff",
    },
    {
      name: "Dealer",
      selector: (row) => row.dealer,
    },
    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <>
          {" "}
          <button
            className="btn btn-secondary"
            onClick={() => {
              viewOpen();
              editDisplay(row);
            }}
          >
            <i className="fa fa-eye"></i>
          </button>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              editOpen();
              editDisplay(row);
              // EditHandle(row);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            type="button"
            class="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              handleDelete(row.id);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  // get
  useEffect(() => {
    getAPI(apinames.GET_CUSTOMER_MASTER).then((response) => {
      const reversedData = response.data.slice().reverse();
      setAdd(reversedData);
      setApi(response.data);
    });
  }, [reload]);
  // filter
  const handleFilter = (filteredData) => {
    setAdd(filteredData);
  };
  //post
  const onSubmit = (data) => {
    // posting
    const postData = {
      customer_name: data.customer_name,
      contact_person: data.contact_person,
      mobile_no: data.mobile_no,
      mobile_no2: data.mobile_no2,
      email: data.email,
      gst: data.gst,
      address: data.address,
      city: data.city,
      pin_code: data.pin_code,
      payment: data.payment,
      dealer: data.dealer ? "Yes" : "No", // to convert boolean true or false to yes or no
      state: data.state,
    };
    console.log(postData, "dataaaa");

    postAPI(apinames.POST_CUSTOMER_MASTER, postData)
      .then((response) => {
        console.log(response, "sssssss");
        var status_code = response.status_code;
        let alert_data;
        if (status_code == 200) {
          productClose();

          alert_data = {
            code: status_code,
            data: "Application Submitted Successfully",
          };
          setAlertData(alert_data);
          setShowAlert(true);
          reset();
          setTimeout(() => {
            setShowAlert(false);
            setReload(true);
            window.location.reload(3000)
          }, 5000);
        } else if (status_code == 400) {
          productClose();
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            setReload(true);
            window.location.reload(5000)
          }, 5000);
          alert_data = {
            code: status_code,
            data: response.data,
          };
          setAlertData(alert_data);
        }
      })
      .catch((error) => {
        console.log(error, "api error");
      });
  };

  const onSubmitEmail = (data1) => {
    const EditData = {
      customer_name: data1.customer_name,
      contact_person: data1.contact_person,
      mobile_no: data1.mobile_no,
      mobile_no2: data1.mobile_no2,
      email: data1.email,
      gst: data1.gst,
      address: data1.address,
      city: data1.city,
      pin_code: data1.pin_code,
      payment: data1.payment,
      dealer: data1.dealer ? "Yes" : "No",
      state: data1.state,
    };
    console.log(EditData, "EDIT DATA");
    PutAPI(apinames.PUT_CUSTOMER_MASTER + eedit, EditData)
    .then((response) => {
      console.log(response, "sssssss");
      var status_code = response.status_code;
      let alert_data;
      if (status_code == 200) {
        editClose();

        alert_data = {
          code: status_code,
          data: "Application Submitted Successfully",
        };
        setAlertData(alert_data);
        setShowAlert(true);
        reset2();
        setTimeout(() => {
          setShowAlert(false);
          setReload(true);
        }, 3000);
      } else if (status_code == 400) {
        editClose();
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setReload(true);
        }, 5000);
        alert_data = {
          code: status_code,
          data: response.data,
        };
        setAlertData(alert_data);
      }
    })
    .catch((error) => {
      console.log(error, "api error");
    });
};
 

  // delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure u want to delete this details??"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_CUSTOMER_MASTER + id).then((response) => {
          console.log(response, "response");
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
     // refresh page
     const Refresh =()=>window.location.reload(true);

  return (
    <div className="Main-Cointainer">
      <div className="button-cointainer" style={{ floatLeft: "30px" }}>
        <button
          type="button"
          class="btn btn-success"
          onClick={Refresh}
        >
          Refresh
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => productOpen()}
          outlines
          style={{ marginLeft: "20px" }}
        >
          Add Customer
        </button>
      </div>
      <br />

      <div>
        <DataTable
          columns={columns}
          data={add}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          // selectableRows
          // selectRowsHighlight
          highlightOnHover
          actions={<button className="btn btn-primary">Export</button>}
          subHeader
          subHeaderComponent={
            <Filter
              api={api}
              onUpdateData={handleFilter}
              placeholder="Search Customer Name"
              name="customer_name"
              name2="customer_name"
            />
          }
          customStyles={customStyles}
        />
      </div>
      <div>
        <Modal show={show} onHide={productClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Customer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form key={1} onSubmit={handleSubmit(onSubmit)}>
                <table className="table table-border">
                  <thead>
                    <tr>
                      <th>
                        Customer Name: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input
                          maxLength={100}
                          type="text"
                          {...register("customer_name")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.customer_name && errors.customer_name.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Contact Person: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="text"     maxLength={100} {...register("contact_person")} />
                        <br />
                        <span className="text-danger">
                          {errors.contact_person &&
                            errors.contact_person.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        Mobile No: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="number"     maxLength={10} {...register("mobile_no")} />
                        <br />
                        <span className="text-danger">
                          {errors.mobile_no && errors.mobile_no.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>Alternative No: </th>
                      <td>
                        <input
                          type="number"
                          maxLength={10}
                          {...register("mobile_no2")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.mobile_no2 && errors.mobile_no2.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        Email: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="email" {...register("email")} />
                        <br />
                        <span className="text-danger">
                          {errors.email && errors.email.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        GST No: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input
                          min={15}
                          max={15}
                          {...register("gst")}
                          type="text"
                        />
                        <br />
                        <span className="text-danger">
                          {errors.gst && errors.gst.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Address: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <textarea
                        maxLength={200}
                          rows={3}
                          cols={15}
                          {...register("address")}
                          type="text"
                        />
                        <br />
                        <span className="text-danger">
                          {errors.address && errors.address.message}
                        </span>
                      </td>{" "}
                    </tr>

                    <tr>
                      <th>
                        City: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="text" {...register("city")} /> <br />
                        <span className="text-danger">
                          {errors.city && errors.city.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Pin Code: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="text"     maxLength={6} {...register("pin_code")} /> <br />
                        <span className="text-danger">
                          {errors.pin_code && errors.pin_code.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        State: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        {" "}
                        <select className="btn btn-outline-dark" {...register("state")} name="state">
                          <option value="select">Select</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Pune">Pune</option>
                          <option value="Goa">Goa</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Chennai">Chennai</option>
                        </select>
                        <br />
                        <span className="text-danger">
                          {errors.state && errors.state.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>Payment:</th>
                      <td>
                        <input
                          type="radio"
                          name="After Delivery"
                          value="after_delivery"
                          {...register("payment")}
                        />{" "}
                        After Delivery
                        <input
                        className="ms-3"
                          type="radio"
                          name="after_delivery"
                          value="before_delivery"
                          {...register("payment")}
                          defaultChecked // add defaultChecked prop
                        />{" "}
                        Before Delivery{" "}
                      </td>
                      <span className="text-danger">
                        {errors.payment && errors.payment.message}
                      </span>
                    </tr>

                    <tr>
                      <th>Is Dealer?:</th>
                      <td>
                        <input type="checkbox" {...register("dealer")} />

                        <span className="text-danger">
                          {errors.dealer && errors.dealer.message}
                        </span>
                      </td>
                    </tr>
                  </thead>
                </table>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  {" "}
                  Add Customer
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal show={open} onHide={editClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Customer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form key={2} onSubmit={handleSubmit2(onSubmitEmail)}>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>
                        Customer Name: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="text"     maxLength={100} {...register2("customer_name")} />{" "}
                        <br />
                        <span className="text-danger">
                          {errors2.customer_name &&
                            errors2.customer_name.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Contact Person: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="text"     maxLength={100} {...register2("contact_person")} />
                        <br />
                        <span className="text-danger">
                          {errors2.contact_person &&
                            errors2.contact_person.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Mobile No: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="number"     maxLength={10} {...register2("mobile_no")} />
                        <br />
                        <span className="text-danger">
                          {errors2.mobile_no && errors2.mobile_no.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>Alternative No: </th>
                      <td>
                        <input
                          type="number"
                          maxLength={10}
                          {...register2("mobile_no2")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.mobile_no2 && errors2.mobile_no2.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        Email:<span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="email" {...register2("email")} />
                        <br />
                        <span className="text-danger">
                          {errors2.email && errors2.email.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        GST No: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input
                          min={15}
                          max={15}
                          type="text"
                          {...register2("gst")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors2.gst && errors2.gst.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Address: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <textarea
                
                          rows={3}
                          cols={15}
                          maxLength={200}
                          {...register2("address")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.address && errors2.address.message}
                        </span>
                      </td>{" "}
                    </tr>
                    <tr>
                      <th>
                        City: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="text" {...register2("city")} />{" "}
                        <span className="text-danger">
                          {errors2.city && errors2.city.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Pin Code: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="text" {...register2("pin_code")} />{" "}
                        <span className="text-danger">
                          {errors2.pin_code && errors2.pin_code.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        State: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        {" "}
                        <select {...register2("state")}>
                          <option value="select">Select</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Pune">Pune</option>
                          <option value="Goa">Goa</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Chennai">Chennai</option>
                        </select>
                        <br />
                        <span className="text-danger">
                          {errors2.state && errors2.state.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Payment :</th>
                      <td>
                        <input
                          type="radio"
                          name="after_delivery"
                          value="after_delivery"
                          {...register2("payment")}
                        />{" "}
                        After Delivery
                        <br />
                        <input
                          type="radio"
                          name="after_delivery"
                          value="before_delivery"
                          {...register2("payment")}
                        />{" "}
                        Before Delivery
                      </td>
                      <span className="text-danger">
                        {errors2.payment && errors2.payment.message}
                      </span>
                    </tr>
                    <tr>
                      <th>Is Dealer?:</th>
                      <td>
                        <input type="checkbox" {...register2("dealer")} />
                        <span className="text-danger">
                          {errors2.dealer && errors2.dealer.message}
                        </span>
                      </td>
                    </tr>
                  </thead>
                </table>
                <br />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                  onClick={() => reset()}
                >
                  {" "}
                  Save
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal show={view} onHide={viewClose}>
          <Modal.Header closeButton>
            <Modal.Title>View Customer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Customer Name:</th>
                  <td>
                    <input
                      disabled
                      type="text"
                      {...register2("customer_name")}
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors2.customer_name && errors2.customer_name.message}
                    </span>{" "}
                  </td>
                </tr>
                <tr>
                  <th>Contact Person:</th>
                  <td>
                    <input
                      disabled
                      type="text"
                      
                      {...register2("contact_person")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.contact_person && errors2.contact_person.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Mobile No: </th>
                  <td>
                    <input disabled type="number" {...register2("mobile_no")} />
                    <br />
                    <span className="text-danger">
                      {errors2.mobile_no && errors2.mobile_no.message}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>Alternative No: </th>
                  <td>
                    <input
                      disabled
                      type="number"
                      {...register2("mobile_no2")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.mobile_no2 && errors2.mobile_no2.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Email </th>
                  <td>
                    <input type="email" {...register2("email")} disabled />
                    <br />
                    <span className="text-danger">
                      {errors2.email && errors2.email.message}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>GST (%):</th>
                  <td>
                    <input {...register2("gst")} disabled /> <br />
                    <span className="text-danger">
                      {errors2.gst && errors2.gst.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Address:</th>
                  <td>
                    <textarea
                      rows={3}
                      cols={15}
                      {...register2("address")}
                      disabled
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.address && errors2.address.message}
                    </span>
                  </td>{" "}
                </tr>
                <tr>
                  <th>City:</th>
                  <td>
                    <input type="text" {...register2("city")} disabled />{" "}
                    <span className="text-danger">
                      {errors2.city && errors2.city.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Pin Code:</th>
                  <td>
                    <input type="text" {...register2("pin_code")} disabled />{" "}
                    <span className="text-danger">
                      {errors2.pin_code && errors2.pin_code.message}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>State:</th>
                  <td>
                    {" "}
                    <select {...register2("state")} disabled>
                      <option value="select">Select</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Pune">Pune</option>
                      <option value="Goa">Goa</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                    <br />
                    <span className="text-danger">
                      {errors2.state && errors2.state.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Payment :</th>
                  <td>
                    <input
                      type="radio"
                      name="after_delivery"
                      value="after_delivery"
                      {...register2("payment")}
                      disabled
                    />{" "}
                    After Delivery
                    <span className="text-danger">
                      {errors2.payment && errors2.payment.message}
                    </span>
                    <br />
                    <input
                      type="radio"
                      name="after_delivery"
                      value="before_delivery"
                      disabled
                      {...register2("payment")}
                    />{" "}
                    Before Delivery
                    <span className="text-danger">
                      {errors2.payment && errors2.payment.message}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>Is Dealer?:</th>
                  <td>
                    <input
                      type="checkbox"
                      {...register2("dealer")}
                      value="Yes"
                      disabled
                    />
                    <span className="text-danger">
                      {errors2.dealer && errors2.dealer.message}
                    </span>
                  </td>
                </tr>
              </thead>
            </table>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <FunctionAlert
          isVisible={showAlert}
          onClose={() => {
            setShowAlert(false);
          }}
          data={alertData}
        />
      </div>
    </div>
  );
}



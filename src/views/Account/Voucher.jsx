import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DataTable from "react-data-table-component";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import url from "../../views/config";
import moment from "moment";
import Filter from "../../components/Filter";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  PutAPI,
  deleteAPI,
  getAPI,
  postAPI,
  postFormDataAPI,
  putFormDataAPI,
} from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import './design.css'

const schema = yup.object().shape({
  type: yup
    .string()
    .oneOf(["fixed cost", "variable cost", "office expenses"])
    .required("Expense type is required"),
  // amount: yup.number().positive('Next amount must be a positive number').required('Next amount is required'),
  paid: yup
    .string()
    .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, "Paid to must be in alphabet")
    .required("Paid is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile must be a 10 digit number")
    .required("Mobile is required"),
  project: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Project  must be in alphabet")
    .required("Project is required"),
  cash: yup.string().required("Cash is required"),
  dated: yup
    .date()
    .nullable()
    .transform((value, originalValue) => {
      const date = new Date(originalValue);
      return isNaN(date) ? null : date;
    })
    .typeError("Dated must be a valid date"),
  drawnOn: yup
    .date()
    .nullable()
    .transform((value, originalValue) => {
      const date = new Date(originalValue);
      return isNaN(date) ? null : date;
    })
    .typeError("Drawn on must be a valid date"),
  authorized_by: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Authorized must be in alphabet")
    .required("Authorized by is required"),
});
var check_fixed = "";
export default function Voucher() {
  const [showFixed, setShowFixed] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [showVariable, setShowVariable] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState(false);
  const [transportMode, setTransportMode] = useState(false);
  const [paidTo, setPaidTo] = useState(true);

  const [gstType, setGSTType] = useState("without_gst");
  const [selectedOption, setSelectedOption] = useState(false);
  const [gstValue, setGSTValue] = useState(0);

  const [api, setApi] = useState([]); // filter
  const [eedit, setEedit] = useState("");
  const [key, setKey] = useState(1); //tabs
  const [show, setShow] = useState(false);
  const reportingClose = () => setShow(false);
  const reportingOpen = () => {
    setShow(true);
  };

  const [add, setAdd] = useState([]); // get data
  // to show current date
  const [date, setDate] = useState(new Date());
  const onSetDate = (event) => {
    setDate(new Date(event.target.value));
    setValue("date", event.target.value);
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue: setValue2,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
  });
  // const values = watch();

  const {
    register: register2,
    setValue,
    getValues,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onchange",
  });

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
        //   minWidth: "1800px", // override the row height
        // override the row height
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

  const columns1 = [
    {
      name: "Sl no",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "100px",
    },
    {
      name: " Date",
      selector: (row) => row.date,
      width: "200px",
    },
    {
      name: " Amount",
      selector: (row) => row.amount,
      width: "100px",
    },

    {
      name: "Paid To",
      selector: (row) => row.paid,
      width: "200px",
    },
    {
      name: " Mobile No",
      selector: (row) => row.mobile_no,
      width: "100px",
    },
    {
      name: "Payment mode",
      selector: (row) => row.payment_mode,
      width: "250px",
    },
    {
      name: "Cash/Transaction No",
      selector: (row) => row.remarks,
      width: "100px",
    },
    {
      name: " Attachement",
      selector: (row) => row.image,
      cell: (row) => (
        <>
          <a href={row.image} target="_blank">
            Click here
          </a>
        </>
      ),
      width: "200px",
    },
    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <div style={{ width: "300px" }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              reportingOpen(row.id);
              getEditData(row);
              handleRadioClick(row.type);
              handleOptionChange(row.sub_type);
              if (row.gst >= "1") {
                setSelectedOption(true);
                setGSTValue(row.gst);
              }
            }}
            style={{ padding: "5px" }}
          >
            EDIT
          </button>
          <button
            type="button"
            class="btn btn-danger"
            style={{ marginLeft: "20px" }}
            onClick={() => {
              deleteHandle(row.id);
            }}
          >
            DELETE
          </button>
          <button className="btn btn-primary" style={{ marginLeft: "20px" }}>
            Generate
          </button>
        </div>
      ),
    },
  ];

  const submitPost = (data) => {
    const newFormData = new FormData();

    newFormData.append("type", data.type);
    newFormData.append("sub_type", data.sub_type);
    newFormData.append("description", data.description);
    newFormData.append("date", data.date);
    newFormData.append("paid", data.paid);
    newFormData.append("amount", data.amount);
    newFormData.append("payment_mode", data.payment_mode);
    newFormData.append("remarks", data.remarks);
    const gstValueToSave = gstType === "no_gst" ? 0 : gstValue;
    newFormData.append("gst", gstValueToSave);
    if (data.invoice_no != undefined) {
      const index = data.invoice_no.lastIndexOf("/");
      const invoice_id = data.invoice_no.substring(index + 1);
      newFormData.append("invoice_no", data.invoice_no);
      newFormData.append("invoice_id", invoice_id);
    } else {
      newFormData.append("invoice_no", "");
      newFormData.append("invoice_id", "0");
    }

    newFormData.append("transport_mode", data.transport_mode);
    newFormData.append("mobile_no", data.mobile_no);
    if (data.image[0] != undefined) {
      newFormData.append("image", data.image[0]);
    }

    console.log(data, "data");
    postFormDataAPI(apinames.POST_VOUCHER, newFormData)
      .then((response) => {
        var status_code = response.status_code;
        console.log(status_code, "response.status_code");
        if (status_code == 200) {
          alert("successful");
          window.location.reload()
        } else if (status_code == 400) {
          alert(JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEditData = (data) => {
    console.log(data, "datatatatatatata");
    setEedit(data.id);
    setValue("type", data.type);
    setValue("sub_type", data.sub_type);
    setValue("date", moment(data.date).format('YYYY-MM-DD'));
    setValue("amount", data.amount);
    setValue("paid", data.paid);
    setValue("mobile", data.mobile_no);
    setValue("sub_type", data.sub_type);
    setValue("description", data.description);
    setValue("payment_mode", data.payment_mode);
    setValue("remarks", data.remarks);
    setValue("mobile_no", data.mobile_no);
    setValue("invoice_no", data.invoice_no);
    setValue("transport_mode", data.transport_mode);
    setValue("gst", data.gst);
    setValue("image", data.image);
    // left react right node
  };

  //posting to database

  const onSubmitEdit = (edit) => {
    const newFormData = new FormData();
    newFormData.append("type", edit.type);
    newFormData.append("sub_type", edit.sub_type);
    newFormData.append("description", edit.description);
    newFormData.append("date", edit.date);
    newFormData.append("paid", edit.paid);
    newFormData.append("amount", edit.amount);
    newFormData.append("payment_mode", edit.payment_mode);
    newFormData.append("remarks", edit.remarks);
    const gstValueToSave = gstType === "no_gst" ? 0 : gstValue;
    newFormData.append("gst", gstValueToSave);
    if (edit.invoice_no != undefined) {
      const index = edit.invoice_no.lastIndexOf("/");
      const invoice_id = edit.invoice_no.substring(index + 1);
      newFormData.append("invoice_no", edit.invoice_no);
      newFormData.append("invoice_id", invoice_id);
    } else {
      newFormData.append("invoice_no", "");
      newFormData.append("invoice_id", "0");
    }

    newFormData.append("transport_mode", edit.transport_mode);
    newFormData.append("mobile_no", edit.mobile_no);
    if (edit.image[0] != undefined) {
      newFormData.append("image", edit.image[0]);
    }

    putFormDataAPI(apinames.PUT_VOUCHER + eedit, newFormData)
      .then((response) => {
        var status_code = response.status_code;
        console.log(status_code, "response.status_code");
        if (status_code == 200) {
          alert("Successful")
          window.location.reload()
        } else if (status_code == 400) {
          alert(JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // deleting data
  const deleteHandle = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_VOUCHER + id).then((response) => {
          console.log(response, "response");
          const status_code = response.status_code;
          if (status_code === 200) {
            window.location.reload();
          }
        });
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };
  // GETING BACK END DATA
  useEffect(() => {
    getAPI(apinames.GET_VOUCHER).then((response) => {
      console.log(response, "no data");
      let reversedData = response.data.slice().reverse();
      setAdd(reversedData); // to reeverse data we go like this
      setApi(response.data);
    });
  }, []);
  // filter
  const handleDataUpdate = (filteredData) => {
    setAdd(filteredData);
  };

  // radio inside a select option multiple

  const handleRadioClick = (event) => {
    setShowFixed(event == "1");
    setShowVariable(event == "2");
    setShowAssets(event == "3");
    setInvoiceNo(false);
    setPaidTo(true);
    setTransportMode(false);
  };
  //============gst val

  const handleGst = (event) => {
    setGSTType(event.target.value);
    if (event.target.value === "without_gst") {
      setGSTValue(0);
    }
  };
  function handleGSTValueChange(event) {
    setGSTValue(event.target.value);
  }

  const handleOptionChange = (event) => {
    if (event === "2" || event === "3") {
      setInvoiceNo(true);
      setPaidTo(false);
      setTransportMode(true);
    } else {
      setInvoiceNo(false);
      setPaidTo(true);
      setTransportMode(false);
    }
  };

  return (
    <div className="main-container">
      <div>
        <Tabs
          defaultActiveKey={1}
          id="uncontrolled-tab-example"
          activeKey={key}
          onSelect={(k) => {
            console.log(k, "dsdsdsd");
            setKey(k);
          }}
        >
          <Tab eventKey={1} title="Voucher">
            <div className="table-cointainer">
              <form
                onSubmit={handleSubmit(submitPost)}
                style={{
                  padding: "10px",
                  margin: "20px",
                }}
              >
                <table>
                  <tr>
                    <td>Type:</td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="radio-option"
                          className="me-1"
                          value="1"
                          onClick={(event) =>
                            handleRadioClick(event.target.value)
                          }
                          {...register("type")}
                        />
                        Fixed cost
                      </label>{" "}
                      &nbsp;&nbsp;&nbsp;
                      <label>
                        <input
                          type="radio"
                          className="me-1"
                          name="radio-option"
                          value="2"
                          onClick={(event) =>
                            handleRadioClick(event.target.value)
                          }
                          {...register("type")}
                        />
                        Variable cost
                      </label>{" "}
                      &nbsp;&nbsp;&nbsp;
                      <label>
                        <input
                          type="radio"
                          className="me-1"
                          name="radio-option"
                          value="3"
                          onClick={(event) =>
                            handleRadioClick(event.target.value)
                          }
                          {...register("type")}
                        />
                        Assets cost
                      </label>
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Category:</td>
                    <td>
                      {showFixed && (
                        <select className="uom" {...register("sub_type")}>
                          <option value="select">Select</option>
                          <option value="1 ">Office Rent </option>
                          <option value="2">Internet</option>
                          <option value="3">Employee Transport</option>
                          <option value="4">Salary</option>
                          <option value="5">Telephone Bill</option>
                        </select>
                      )}
                      {showAssets && (
                        <select className="uom" {...register("sub_type")}>
                          <option value="select">Select</option>
                          <option value="1">Hardware </option>
                          <option value="2">Software</option>
                          <option value="3">Furniture</option>
                          <option value="4">Others</option>
                        </select>
                      )}

                      {showVariable && (
                        <select className="uom"
                          {...register("sub_type")}
                          onChange={(event) =>
                            handleOptionChange(event.target.value)
                          }
                        >
                          <option value="select">Select</option>
                          <option value="1">Office Expenses</option>
                          <option value="2">Transport For Customer</option>
                          <option value="3">Transport For Purchasing</option>
                          <option value="4">Stationary Expenses</option>
                          <option value="5">Food Expenses</option>
                          <option value="6">Electricity Bill</option>
                          <option value="7">Water Bill</option>
                          <option value="8">Others</option>
                        </select>
                      )}
                    </td>
                  </tr>

                  <br />

                  <tr>
                    <td>Description:</td>
                    <td>
                      <textarea
                        col="28"
                        row="4"
                        type="text"
                        {...register("description")}
                      />
                      <span className="text-danger">
                        {/* {errors.date && errors.date.message} */}
                      </span>
                    </td>
                  </tr>
                  <br />

                  <tr>
                    <td>Date:</td>
                    <td>
                      <input
                        type="date"
                     
                        {...register("date")}
                        // value={date.toLocaleDateString("en-CA")}
                      />
                      <span className="text-danger">
                        {/* {errors.date && errors.date.message} */}
                      </span>
                    </td>
                  </tr>
                  <br />
                  {paidTo && (
                    <tr>
                      <td>Paid To: </td>
                      
                      <td>
                        <input type="text" {...register("paid")} />{" "}
                        <span className="text-danger">
                          {/* {errors.paid && errors.paid.message} */}
                        </span>
                      </td>
                    </tr>
                  )}

                  <br />

                  {transportMode && (
                    <tr>
                      <td>Transport Mode:</td>
                      <td>
                        <select {...register("transport_mode")}>
                          <option value="select">Select</option>
                          <option value="vrl">VRL</option>
                          <option value="ideal">Ideal</option>
                          <option value="office">Office</option>
                        </select>
                      </td>
                    </tr>
                  )}

                  <span className="text-danger">
                    {/* {errors.project && errors.project.message} */}
                  </span>

                  <br />

                  <tr>
                    <td>Amount (₹ ) :</td>
                    <td>
                      <input type="number" min={0} {...register("amount")} />
                      <span className="text-danger">
                        {/* {errors.amount && errors.amount.message} */}
                      </span>
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>GST(%)</td>
                    <td>
                      {" "}
                      <label>
                        <input
                          type="radio"
                          name="gstType"
                          value="without_gst"
                          checked={gstType === "without_gst"}
                          {...register("gst")}
                          onChange={handleGst}
                        />{"  "}
                        Without GST
                      </label>
                      &nbsp;&nbsp;&nbsp;
                      <label>
                        <input
                          type="radio"
                          name="gstType"
                          value="with_gst"
                          checked={gstType === "with_gst"}
                          {...register("gst")}
                          onChange={handleGst}
                        />{"  "}
                        GST
                        {gstType == "with_gst" && (
                          <select className="Bank ms-3"
                            value={gstValue}
                            {...register("gst")}
                            onChange={handleGSTValueChange}
                          >
                            <option value="">Select GST Value</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                          </select>
                        )}
                      </label>
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Payment Mode:</td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          name="radio-option"
                          value="cash"
                          {...register("payment_mode")}
                        />  {" "}
                        Cash
                      </label>{" "}
                      &nbsp;&nbsp;&nbsp;
                      <label>
                        <input
                          type="radio"
                          name="radio-option"
                          value="cheque"
                          {...register("payment_mode")}
                        />  {" "}
                        Cheque
                      </label>{" "}
                      &nbsp;&nbsp;&nbsp;
                      <label>
                        <input
                          type="radio"
                          name="radio-option"
                          value="online"
                          {...register("payment_mode")}
                        />  {" "}
                        Online
                      </label>
                    </td>
                  </tr>

                  <br />

                  <tr>
                    <td>Check/Transaction No:</td>
                    <td>
                      <input type="text" {...register("remarks")} />
                    </td>
                  </tr>
                  <br />

                  <tr>
                    <td>Mobile No:</td>
                    <td>
                      <input type="number" {...register("mobile_no")} />
                      <span className="text-danger">
                        {/* {errors.mobile && errors.mobile.message} */}
                      </span>
                    </td>
                  </tr>
                  <br />

                  {invoiceNo && (
                    <tr>
                      <td>Invoice No:</td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          placeholder="Invoice no"
                          {...register("invoice_no")}
                        />
                      </td>
                    </tr>
                  )}

                  <span className="text-danger">
                    {/* {errors.project && errors.project.message} */}
                  </span>

                  <br />

                  <tr>
                    <td>Attachement:</td>
                    <td>
                      <input
                        type="file"
                        className="file"
                        placeholder="Only png,pdf,jpg"
                        {...register("image")}
                      />
                    </td>
                  </tr>

                  <br />
                  <br />
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </table>
              </form>
            </div>
          </Tab>
          <Tab eventKey={2} title="Voucher History">
            <div>
              <div>
                <DataTable
                  columns={columns1}
                  data={add}
                  pagination
                  fixedHeader
                  fixedHeaderScrollHeight="450px"
                  // selectableRows
                  // selectRowsHighlight
                  highlightOnHover
                  actions={
                    <button to="" className="btn btn-primary">
                      Export
                    </button>
                  }
                  subHeader
                  // subHeaderComponent={s
                  //   <Filter
                  //     api={api}
                  //     onUpdateData={handleDataUpdate}
                  //     placeholder="Search Project Name"
                  //     name={"project_name"}
                  //     name2={"mobile_no"}
                  //   />
                  // }
                  customStyles={customStyles}
                />
              </div>
            </div>
          </Tab>
        </Tabs>

        <div>
          <Modal show={show} onHide={reportingClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Voucher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="table-cointainer">
                <form
                  onSubmit={handleSubmit2(onSubmitEdit)}
                  style={{
                    padding: "10px",
                    margin: "20px",
                  }}
                >
                  <table>
                    <tr>
                      <td>Type:</td>
                      <td>
                        <label>
                          <input
                            type="radio"
                            name="radio-option"
                            value="1"
                            onClick={(event) =>
                              handleRadioClick(event.target.value)
                            }
                            {...register2("type")}
                          />
                          Fixed cost
                        </label>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <label>
                          <input
                            type="radio"
                            name="radio-option"
                            value="2"
                            onClick={(event) =>
                              handleRadioClick(event.target.value)
                            }
                            {...register2("type")}
                          />
                          Variable cost
                        </label>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <label>
                          <input
                            type="radio"
                            name="radio-option"
                            value="3"
                            onClick={(event) =>
                              handleRadioClick(event.target.value)
                            }
                            {...register2("type")}
                          />
                          Assets cost
                        </label>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td>Catagory:</td>
                      <td>
                        {showFixed && (
                          <select {...register2("sub_type")}>
                            <option value="select">Select</option>
                            <option value="1 ">Office Rent </option>
                            <option value="2">Internet</option>
                            <option value="3">Employee Transport</option>
                            <option value="4">Salary</option>
                            <option value="5">Telephone Bill</option>
                          </select>
                        )}
                        {showAssets && (
                          <select {...register2("sub_type")}>
                            <option value="select">Select</option>
                            <option value="1">Hardware </option>
                            <option value="2">Software</option>
                            <option value="3">Furniture</option>
                            <option value="4">Others</option>
                          </select>
                        )}

                        {showVariable && (
                          <select
                            {...register2("sub_type")}
                            onChange={(event) =>
                              handleOptionChange(event.target.value)
                            }
                          >
                            <option value="select">Select</option>
                            <option value="1">Office Expenses</option>
                            <option value="2">Transport For Customer</option>
                            <option value="3">Transport For Purchasing</option>
                            <option value="4">Stationary Expenses</option>
                            <option value="5">Food Expenses</option>
                            <option value="6">Electricity Bill</option>
                            <option value="7">Water Bill</option>
                            <option value="8">Others</option>
                          </select>
                        )}
                      </td>
                    </tr>

                    <br />

                    <tr>
                      <td>Description:</td>
                      <td>
                        <textarea
                          col="28"
                          row="4"
                          type="text"
                          {...register2("description")}
                        />
                        <span className="text-danger">
                          {/* {errors.date && errors.date.message} */}
                        </span>
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td>Date:</td>
                      <td>
                        <input
                          type="date"
                          {...register2("date")}
                          // value={date.toLocaleDateString("en-CA")}
                        />
                        <span className="text-danger">
                          {/* {errors.date && errors.date.message} */}
                        </span>
                      </td>
                    </tr>
                    <br />
                    {paidTo && (
                      <tr>
                        <td>Paid To:</td>

                        <td>
                          <input type="text" {...register2("paid")} />{" "}
                          <span className="text-danger">
                            {/* {errors.paid && errors.paid.message} */}
                          </span>
                        </td>
                      </tr>
                    )}

                    <br />

                    {transportMode && (
                      <tr>
                        <td>Transport Mode:</td>
                        <td>
                          <select {...register2("transport_mode")}>
                            <option value="select">Select</option>
                            <option value="vrl">VRL</option>
                            <option value="ideal">Ideal</option>
                            <option value="office">Office</option>
                          </select>
                        </td>
                      </tr>
                    )}

                    <span className="text-danger">
                      {/* {errors.project && errors.project.message} */}
                    </span>

                    <br />

                    <tr>
                      <td>Amount (₹ ) :</td>
                      <td>
                        <input type="number" min={0} {...register2("amount")} />
                        <span className="text-danger">
                          {/* {errors.amount && errors.amount.message} */}
                        </span>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td>GST(%)</td>
                      <td>
                        {" "}
                        <label>
                          <input
                            type="radio"
                            name="gstType"
                            value="without_gst"
                            checked={gstType === "without_gst"}
                            {...register2("gst")}
                            onChange={handleGst}
                          />
                          Without GST
                        </label>
                        &nbsp;&nbsp;&nbsp;
                        <label>
                          <input
                            type="radio"
                            name="gstType"
                            value="with_gst"
                            checked={gstType === "with_gst"}
                            {...register2("gst")}
                            onChange={handleGst}
                          />
                          GST
                          {gstType == "with_gst" && (
                            <select
                              value={gstValue}
                              {...register2("gst")}
                              onChange={handleGSTValueChange}
                            >
                              <option value="">Select GST Value</option>
                              <option value="5">5%</option>
                              <option value="12">12%</option>
                              <option value="18">18%</option>
                              <option value="28">28%</option>
                            </select>
                          )}
                        </label>
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <td>Payment Mode:</td>
                      <td>
                        <label>
                          <input
                            type="radio"
                            name="radio-option"
                            value="cash"
                            {...register2("payment_mode")}
                          />
                          Cash
                        </label>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <label>
                          <input
                            type="radio"
                            name="radio-option"
                            value="cheque"
                            {...register2("payment_mode")}
                          />
                          Cheque
                        </label>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <label>
                          <input
                            type="radio"
                            name="radio-option"
                            value="online"
                            {...register2("payment_mode")}
                          />
                          Online
                        </label>
                      </td>
                    </tr>

                    <br />

                    <tr>
                      <td>Check/Transaction No:</td>
                      <td>
                        <input type="text" {...register2("remarks")} />
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <td>Mobile No:</td>
                      <td>
                        <input type="number" {...register2("mobile_no")} />
                        <span className="text-danger">
                          {/* {errors.mobile && errors.mobile.message} */}
                        </span>
                      </td>
                    </tr>
                    <br />

                    {invoiceNo && (
                      <tr>
                        <td>Invoice No:</td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            placeholder="Invoice no"
                            {...register2("invoice_no")}
                          />
                        </td>
                      </tr>
                    )}

                    <span className="text-danger">
                      {/* {errors.project && errors.project.message} */}
                    </span>

                    <br />

                    <tr>
                      <td>Attachement:</td>
                      <td>
                        <input
                          type="file"
                          placeholder="Only png,pdf,jpg"
                          {...register2("image")}
                        />
                      </td>
                    </tr>

                    <br />
                    <br />
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </table>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

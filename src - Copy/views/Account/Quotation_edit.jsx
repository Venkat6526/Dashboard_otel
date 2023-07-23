import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import DynamicSearch from "../../components/AutoComplete/DynamicSearch";
import ProductSearch from "../../components/AutoComplete/ProductSearch";
import url from "../../views/config";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RichTextEditor from "react-rte";
import moment from "moment";
import {
  deleteAPI,
  getAPI,
  postAPI,
  postFormDataAPI,
  postMailAPI,
  PutAPI,
} from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import FunctionAlert from "../alert/FunctionAlert";

const SignupSchema = yup.object({
  customer_name_a: yup
    .string()
    .required("Customer name is required")
    .matches(/^(\S+\s?)+$/, "Customer name should contain at least one space")
    .max(100, "Customer name should not exceed 100 characters"),

  mobile_no_a: yup
    .string()
    .required("Mobile is required")
    .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
  email_a: yup.string().required("Email is required"),
  gst_a: yup
    .string()
    .min(15, "GST number must be at least 15 characters long")
    .max(15, "GST number can be maximum 15 characters long")
    .required("GST number is required"),

  address1_a: yup.string().required("Address is required"),
  enquiry_no: yup
    .string()
    .required("Enqiry Number is required")
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Enqiry Number  should only contain alphabets"
    ),

  state_a: yup
    .string()
    .matches(/^[A-Za-z]+$/, "State should only contain alphabet")
    .oneOf(
      ["Karnataka", "Pune", "Goa", "Kerala", "Chennai"],
      "Please select a valid state"
    )
    .required("State is required"),
  pin_code_a: yup
    .string()
    .required("Pin code is required")
    .matches(/^\d{6}$/, "Pin code should only contain 6 digits"),
  date: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date is required")
    .nullable(),
});

const initialState = {
  product: "",
  hsn: "",
  qty: 0,
  uom: "",
  rate: "",
  gst: "",
  grandtotal: 0,
  product_id: 0,
};

export default function Quotation_edit() {
  const [reload, setReload] = useState(false);
  const [alertData, setAlertData] = useState({
    code: 200,
    data: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isError, setIsError] = useState(false); //prodarry validation
  const [productSelect, setProductSelect] = useState({}); // to set product serach
  const [refNo, setRefNo] = useState("");
  const productRef = useRef();
  const [cGet, setCGet] = useState([]);
  const [productGet, setProductGet] = useState([]); // product master name and uom gst
  const [select, setSelect] = useState({}); //autocomplete
  const [thearray, setThearray] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [key, setKey] = useState(1); //tabs
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log(id, "fycutxryeetra");
    setShow(true);
    setEedit(id);
  };
  const [lgShow, setLgShow] = useState(false);
  const [radd, setRadd] = useState('');
  const [get, setGet] = useState([]);
  const [api, setApi] = useState([]);
  const [eedit, setEedit] = useState(""); /// to store in id in setvalue
  const [isEdit, setIsEdit] = useState(false);

  const [add, setadd] = useState(initialState);
  const editCheckbox = () => {
    setValue("customer_name_a", select.customer_name);
    setValue("address1_a", select.address);
    setValue("mobile_no2_a", select.mobile_no2);
    setValue("mobile_no_a", select.mobile_no);
    setValue("email_a", select.email);
    setValue("pin_code_a", select.pin_code);
    setValue("gst_a", select.gst);
    setValue("state_a", select.state);

    // setValue("customer_name_a", getValues("customer_name"));
    // setValue("address1_a", getValues("address1"));
    // setValue("address2_a", getValues("address2"));
    // setValue("mobile_a", getValues("mobile"));
    // setValue("email_a", getValues("email"));
    // setValue("pan_a", getValues("pan"));
    // setValue("gst_a", getValues("gst"));
    // setValue("state_a", getValues("state"));
    // console.log(getValues("state"), "state");
  };
  const revisedGTotal = (add) => {
    if (add.length === 0) {
      setSubTotal(0);
      setTaxTotal(0);
      setGrandTotal(0);
    }
    let gstValue =0;
      let gsttotal =0;
      let subtotal =0;
      let grtotal =0
    // since its in array we should use for deleted one grand total from 1 or more we go with for and if condition
    for (let i of add) {
       gstValue = parseFloat(i.gst) / 100;
       gsttotal =parseFloat(gsttotal)+ (parseFloat(i.rate) * parseFloat(i.qty) * gstValue);
       subtotal =parseFloat(subtotal)+ (parseFloat(i.rate) * parseFloat(i.qty));
       grtotal =parseFloat(gsttotal) + parseFloat(subtotal);
      setSubTotal(subtotal);
      setTaxTotal(gsttotal);
      setGrandTotal(grtotal);
    }
  };
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
      name: "sl_no",
      selector: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "QO NO",
      selector: (row) => row.main.qo_no,
      width: "150px",
    },
    {
      name: "QO Date",
      selector: (row) => row.main.date,
      width: "200px",
    },
    {
      name: "Customer Name",
      selector: (row) => row.main.customer_name,
      width: "150px",
    },
    {
      name: "Mobile",
      selector: (row) => row.main.mobile_no,
    },
    {
      name: "Email Status",
      selector: (row) => row.main.email,
    },
    {
      name: "Created By",
      selector: (row) => row.main.created_by,
      width: "100px",
    },
    {
      name: "Action",
      width: "220px",
      selector: (row) => row.main.Action,

      cell: (row) => (
        <>
          <button
            className="btn btn-success"
            onClick={() => {
              handleShow(row.main.id);
            }}
          >
            <i className="fa fa-envelope"></i>
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              window.location.href='#/your-href';

              // setKey("1");
              // setLgShow(true);
              // isDisplay(row.main, row.sub_main);
            }}
            style={{ marginLeft: "5px" }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              deleteHandle(row.main.id);
              setIsEdit(true);
            }}
            style={{ marginLeft: "5px" }}
          >
            <i className="fa fa-trash"></i>
          </button>
          <a
            style={{ marginLeft: "5px" }}
            href={`https://mindroit.net/otel_pdf/quotation.php?id=${row.main.id}`}
          >
            <button type="button" className="btn btn-danger">
              PDF
            </button>
          </a>
        </>
      ),
    },
  ];
  const isDisplay = (data, prodArray) => {
   
    setEedit(data.id);
    setValue2("customer_name", data.customer_name);
    setValue2("address1", data.address1);
    setValue2("address2", data.address2);
    setValue2("mobile_no", data.mobile_no);
    setValue2("email", data.email);
    setValue2("pin_code", data.pin_code);
    setValue2("gst", data.gst_no);
    setValue2("state", data.state);
    setValue2("customer_name_a", data.customer_name_a);
    setValue2("address1_a", data.address1_a);
    setValue2("address2_a", data.address2_a);
    setValue2("mobile_no_a", data.mobile_no_a);
    setValue2("email_a", data.email_a);
    setValue2("pin_code_a", data.pin_code_a);
    setValue2("gst_a", data.gst_no);
    setValue2("state_a", data.state_a);
    setValue2("date", moment(data.date).toISOString().slice(0, 10));
    setValue2("enquiry_no", data.enquiry_no);
    setSubTotal(0);
    setTaxTotal(0);
    setGrandTotal(0);
    console.log(prodArray);
    setThearray(prodArray);
  };
  const editInput = (dis, i, data) => {
    // let editData = [];
    // editData = [...thearray];
    // editData[i][data] = dis;
    // setThearray(editData);
    // getGrandTotal(dis);
  };

  const productChange = (e, key) => {
    setadd((prevState) => ({
      ...prevState,
      [key]: e,
    }));
  };

  const getGrandTotal = (e) => {
    let gstValue = parseFloat(e.target.value) / 100;
    let gsttotal = parseFloat(add.rate) * parseFloat(add.qty) * gstValue;
    let subtotal = gsttotal + parseFloat(add.rate) * parseFloat(add.qty);
    productChange(subtotal, "grandtotal");
    productChange(e.target.value, "gst");
  };

  const getGTotal = (item) => {
    //mapping sub total display
    let gstValue = parseFloat(item.gst) / 100;
    let gsttotal = parseFloat(item.rate) * parseFloat(item.qty) * gstValue;
    let subtotal = parseFloat(item.rate) * item.qty;
    let grtotal = gsttotal + subtotal;
    return grtotal;
  };
  const addUpdate = () => {
    //add buttont

    if (
      add.product == "" ||
      add.hsn == "" ||
      add.qty == "" ||
      add.uom == "" ||
      add.rate == "" ||
      add.gst == ""
    ) {
      setIsError(true);
    } else {
      setThearray([...thearray, add]);
      getTotalInfo(add);
      setadd({ ...initialState });
      productRef.current.clearProdValue();
      setIsError(false);
      var remove = [...thearray, add];

        setThearray(remove);
        revisedGTotal(remove);
    }
  };
  const getTotalInfo = (add) => {
    let gstValue = parseFloat(add.gst) / 100;
    let gsttotal = parseFloat(add.rate) * parseFloat(add.qty) * gstValue;
    let subtotal = parseFloat(add.rate) * parseFloat(add.qty);
    let grtotal = gsttotal + subtotal;

    setSubTotal(subTotal + subtotal);
    setTaxTotal(taxTotal + gsttotal);
    setGrandTotal(grandTotal + grtotal);
  };
  const {
    register,
    setValue,
    reset,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(SignupSchema),
  });

  const {
    register: register2,
    setValue: setValue2,
    reset: reset2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(SignupSchema),
  });

  const {
    register: register3,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
  } = useForm({
    mode: "onchange",
  });

  const onMail = (mail) => {
    // alert("1");
    const newFormData = new FormData();
    newFormData.append("id", eedit);
    newFormData.append("to", mail.to);
    newFormData.append("subject", mail.subject);
    newFormData.append("cc", mail.cc);
    newFormData.append("message", mail.message);
    console.log(newFormData, "newFormData");

    postMailAPI(apinames.QUOTATION_MAIL, newFormData)
      .then((response) => {
        console.log(response.data, "response");
        let status_code = response.status_code;
        if (status_code == 200) {
          alert("Mail Sent Successfully");
        }
      })
      .catch((error) => {
        console.log(error + "error");
      });
  };

  const onsubmit = (data) => {
    var created_by = localStorage.getItem("ootel_admin_created_by");
    console.log(thearray.length, "asdderdsafbhaterwfds");
    if (thearray.length > 0) {
      let postData = {
        // id: eedit,
        number: refNo,
        customer_id: select.id,
        customer_name: select.customer_name,
        address1: select.address,
        mobile_no: select.mobile_no,
        gst_no: select.gst,
        email: select.email,
        pin_code: select.pin_code,
        state: select.state,

        customer_name_a: data.customer_name_a,
        address1_a: data.address1_a,
        address2_a: data.address2_a,
        mobile_no_a: data.mobile_no_a,
        gst_no_a: data.gst_a,
        email_a: data.email_a,
        pin_code_a: data.pin_code_a,
        state_a: data.state_a,
        date: moment(data.date).toISOString().slice(0, 10),
        enquiry_no: data.enquiry_no,
        grand_total: grandTotal,
        productArray: thearray,
        created_by: created_by,
      };

      postAPI(apinames.POST_QUOTATION, postData)
        .then((response) => {
          console.log(response, "sssssss");
          var status_code = response.status_code;
          let alert_data;
          if (status_code == 200) {
            // setShowPreview(false);

            alert_data = {
              code: status_code,
              data: ["Application Submitted Successfully"],
            };
            setAlertData(alert_data);
            setShowAlert(true);
            reset();
            setTimeout(() => {
              setShowAlert(false);
              setReload(true);
              window.location.reload();
            }, 5000);
          } else if (status_code == 400) {
            // setShowPreview(false);
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
              setReload(true);
              window.location.reload();
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
    } else {
      alert("product field  is mandatory");
    }
  };

  //=================================EDIT OPERATION

  const onEdit = (edit) => {
    console.log(thearray.length, "asdderdsafbhaterwfds");
    if (thearray.length > 0) {
      let EditData = {
        id: eedit,
        number: refNo,
        customer_id: edit.id,
        customer_name: edit.customer_name,
        address1: edit.address1,
        mobile_no: edit.mobile_no,
        gst_no: edit.gst,
        email: edit.email,
        pin_code: edit.pin_code,
        state: edit.state,
        customer_name_a: edit.customer_name_a,
        address1_a: edit.address1_a,
        address2_a: edit.address2_a,
        mobile_no_a: edit.mobile_no_a,
        gst_no_a: edit.gst_a,
        email_a: edit.email_a,
        pin_code_a: edit.pin_code_a,
        state_a: edit.state_a,
        date: edit.date,
        enquiry_no: edit.enquiry_no,
        grand_total: grandTotal,
        productArray: thearray,
      };

      postAPI(apinames.PUT_QUOTATION, EditData)
        .then((response) => {
          var status_code = response.status_code;
          let alert_data;
          if (response.status_code === 200) {
            setLgShow(false);
            // setShowPreview(false)
            alert_data = {
              code: response.status_code,
              data: "Application Submitted Successfully",
            };
            setAlertData(alert_data);
            setShowAlert(true);
            reset2();
            setTimeout(() => {
              setShowAlert(false);
              setReload(true);
               window.location.reload()
            }, 3000);
          } else if (response.status_code == 400) {
            setLgShow(false);
            // setShowPreview(false)
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
              setReload(true);
            }, 5000);
            alert_data = {
              code: response.status_code,
              data: response.data,
            };
            setAlertData(alert_data);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred while editing the issue");
        });
    } else {
      alert("product field  is mandatory");
    }
  };

  // filter for delete without database delete

  const deleteItem = (e1) => {
    var remove = [...thearray];
    
    var index = remove.indexOf(e1);
    //alert(JSON.stringify(remove))
   
      remove.splice(e1, 1);
      setThearray(remove);
      revisedGTotal(remove);
    
  };
  
  useEffect(() => {
    
    getAPI(apinames.GET_QUOTATION).then((data) => {
      console.log(data.data, "data");
      setRefNo(data.number);
      let reversedData = data.data.slice().reverse();
      setGet(reversedData); // to reverse data
      setApi(data.datass);
      isDisplay(get,productGet)
    });

    getAPI(apinames.GET_CUSTOMER_MASTER)
      .then((response) => {
        setCGet(response.data);
      })

      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get customer_master
    getAPI(apinames.GET_PRODUCT_MASTER)
      .then((response) => {
        console.log(response.data, "product_get_value");
        setProductGet(response.data);
        isDisplay(get,productGet)
      })
      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get product_master
     
  }, [reload]);

  const deleteHandle = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_QUOTATION + id).then((response) => {
          console.log(response, "respone is working good");
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };
  // filter
  const searchItems = (searchValue) => {
    //  setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = get.filter((item) => {
        return (
          item.main.customer_name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.main.mobile_no.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setGet(filteredData);
    } else {
      setGet(api);
    }
  };

  return (
    <Tabs
      defaultActiveKey={1}
      id="uncontrolled-tab-example"
      activeKey={key}
      onSelect={(e) => {
        console.log(e, "dsdsdsd");
        setKey(e);
      }}
    >
      {" "}
      <Tab eventKey={1} title="Quotation">
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="main-cointainer">
            <div
              className="row"
              style={{
                padding: "20px",
                border: "1px solid black",
                backgroundColor: "aliceblue",
              }}
            >
              <div className="col-md-4">
                <div className="buyer">
                  <p>Buyer Address</p>
                  <label>Customer Name:</label>
                  <br />
                  <DynamicSearch
                    data={cGet}
                    type={1}
                    // isDisabled={isDisabled}
                    getOptionDisabled={(select) => select.customer_name}
                    onChangeData={(data) => {
                      setSelect(data);
                    }}
                    {...register("customer_name")}
                  />
                  <span className="text-danger">
                    {errors.customer_name && errors.customer_name.message}
                  </span>{" "}
                  <br />
                  <label>Address 1: </label>
                  <br />
                  <input value={select.address} {...register("address1")} />
                  <span className="text-danger">
                    {errors.address1 && errors.address1.message}
                  </span>{" "}
                  <br />
                  <label>Mobile No:</label>
                  <br />
                  <input value={select.mobile_no} {...register("mobile_no")} />
                  <span className="text-danger">
                    {errors.mobile_no && errors.mobile_no.message}
                  </span>{" "}
                  <br />
                  <label>GST No:</label>
                  <br />
                  <input value={select.gst} {...register("gst")} />
                  <span className="text-danger">
                    {errors.gst && errors.gst.message}
                  </span>{" "}
                  <br />
                  <label>Email No:</label>
                  <br />
                  <input value={select.email} {...register("email")} />
                  <span className="text-danger">
                    {errors.email && errors.email.message}
                  </span>{" "}
                  <br />
                  <label>Pin Code:</label>
                  <br />
                  <input value={select.pin_code} {...register("pin_code")} />
                  <span className="text-danger">
                    {errors.pin_code && errors.pin_code.message}
                  </span>{" "}
                  <br />
                  <label>State:</label>
                  <br />
                  <select value={select.state} {...register("state")}>
                    <option value="select">Select</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Pune">Pune</option>
                    <option value="Goa">Goa</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Chennai">Chennai</option>
                  </select>{" "}
                  <span className="text-danger">
                    {errors.state && errors.state.message}
                  </span>
                  <br />
                </div>
              </div>
              <div className="col-md-4">
                <div className="delivery">
                  <p>
                    Delivery Address{" "}
                    <input
                      type="checkbox"
                      onClick={() => {
                        editCheckbox();
                      }}
                    ></input>
                    <span>(same as buyer address)</span>
                  </p>
                  <label>
                    Customer Name: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <input {...register("customer_name_a")} />{" "}
                  <span className="text-danger">
                    {errors.customer_name_a && errors.customer_name_a.message}
                  </span>
                  <br />
                  <br />
                  <label>
                    Address 1: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <input {...register("address1_a")} />{" "}
                  <span className="text-danger">
                    {errors.address1_a && errors.address1_a.message}
                  </span>
                  <br />
                  <label>
                    Mobile No: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <input type="number" {...register("mobile_no_a")} />{" "}
                  <span className="text-danger">
                    {errors.mobile_no_a && errors.mobile_no_a.message}
                  </span>
                  <br />
                  <label>
                    GST No:<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input {...register("gst_a")} />{" "}
                  <span className="text-danger">
                    {errors.gst_a && errors.gst_a.message}
                  </span>
                  <br />
                  <label>
                    Email No:<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input {...register("email_a")} />{" "}
                  <span className="text-danger">
                    {errors.email_a && errors.email_a.message}
                  </span>
                  <br />
                  <label>
                    Pin Code:<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input {...register("pin_code_a")} />{" "}
                  <span className="text-danger">
                    {errors.pin_code_a && errors.pin_code_a.message}
                  </span>
                  <br />
                  <label>
                    State:<span className="text-danger">*</span>
                  </label>
                  <br />
                  <select {...register("state_a")}>
                    <option value="select">Select</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Pune">Pune</option>
                    <option value="Goa">Goa</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Chennai">Chennai</option>
                  </select>{" "}
                  <span className="text-danger">
                    {errors.state_a && errors.state_a.message}
                  </span>
                  <br />
                </div>
              </div>
              <div className="col-md-4">
                <div className="ref-3">
                  <p>Ref No:{refNo}</p>
                  <label>
                    Date:<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    {...register("date")}
                  />
                  <span className="text-danger">
                    {errors.date && errors.date.message}
                  </span>
                  <br />
                  <label>
                    {" "}
                    Enquiry RefNo:<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input type="text" {...register("enquiry_no")} />
                  <span className="text-danger">
                    {errors.enquiry_no && errors.enquiry_no.message}
                  </span>
                  <br />

                  <br />
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="table-responsive">
              <table className="table  table-bordered">
                <thead>
                  <tr className="bg-success text-white">
                    <th>Sl no</th>
                    <th>product</th>
                    <th>HSN</th>
                    <th>Qty</th>
                    <th>UOM</th>
                    <th>Unit Price (₹)</th>
                    <th>GST</th>
                    <th>Grand Total (₹)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {thearray.map((item, index) => {
                  return (
                    <tr>
                      <td style={{ width: "20px" }}>{index + 1}</td>
                      <td>
                        {" "}
                        <ProductSearch
                          data={productGet}
                          ref={productRef}
                          defValue={item.product}
                          onChangeData={(data) => {
                            setProductSelect(data);
                            editInput(data.uom, "uom");
                            editInput(data.hsn, "hsn");
                          }}
                        />
                      </td>

                      <td>
                        <input
                          type="text "
                          disabled
                          value={item.hsn || ""}
                          onChange={(e) =>
                            editInput(e.target.value, index, "hsn")
                          }
                          style={{ width: "150px" }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="number "
                          value={item.qty || ""}
                          min={0}
                          onChange={(e) =>
                            editInput(e.target.value, index, "qty")
                          }
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>
                        {" "}
                        <select
                          type="text "
                          disabled
                          value={item.uom || ""}
                          onChange={(e) =>
                            editInput(e.target.value, index, "uom")
                          }
                          style={{ width: "100px" }}
                        >
                          <option value="select">Select</option>
                          <option value="kg">KG</option>
                          <option value="gram">Gram</option>
                          <option value="rolls">Rolls</option>
                          <option value="number">Number</option>
                          <option value="pieces">Pieces</option>
                          <option value="box">Box</option>
                        </select>
                      </td>
                      <td>
                        <input
                          min={0}
                          type="number "
                          value={item.rate || ""}
                          onChange={(e) =>
                            editInput(e.target.value, index, "rate")
                          }
                          style={{ width: "150px" }}
                        />
                      </td>
                      <td>
                        <select
                          type="text "
                          value={item.gst || ""}
                          onChange={(e) =>
                            editInput(e.target.value, index, "gst")
                          }
                          style={{ width: "70px" }}
                        >
                          <option value="select">Select</option>
                          <option value="0">0</option>
                          <option value="5">5</option>
                          <option value="12">12</option>
                          <option value="18">18</option>
                          <option value="28">28</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number "
                          value={getGTotal(item)}
                          onChange={(e) =>
                            editInput(e.target.value, index, "grandtotal")
                          }
                          disabled
                          style={{ width: "200px" }}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ backgroundColor: "#dc3545" }}
                          onClick={(e) => {
                            deleteItem(index);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>HSN/SAC</th>
                    <th>Qty</th>
                    <th>UOM</th>
                    <th>Rate/unit(₹)</th>
                    <th>GST</th>
                    <th>Grand Total (₹)</th>
                  </tr>
                  <tr>
                    <td></td>

                    <td>
                      <ProductSearch
                        data={productGet}
                        ref={productRef}
                        defValue={add.product}
                        onChangeData={(data) => {
                          setProductSelect(data);
                          productChange(data.uom, "uom");
                          productChange(data.hsn, "hsn");
                          productChange(data.product_name, "product"); // to store product_name
                          productChange(data.id, "product_id"); //to sore product_id in databse
                        }}
                      />
                    </td>

                    <td>
                      <input
                        type="type"
                        disabled
                        value={add.hsn}
                        onChange={(e) => productChange(e.target.value, "hsn")}
                        // {...register("hsn")}
                      />
                      <span className="text-danger">
                        {isError && add.hsn == "" && "HSN cannot be empty"}
                      </span>
                    </td>

                    <td>
                      <input
                        type="number"
                        value={add.qty}
                        min={0}
                        onChange={(e) => productChange(e.target.value, "qty")}
                        // {...register("qty")}
                      />
                      <span className="text-danger">
                        {isError && add.qty == "" && "QTY cannot be empty"}
                      </span>
                    </td>

                    <td>
                      <select
                        value={add.uom}
                        disabled
                        onChange={(e) => productChange(e.target.value, "uom")}
                        // {...register("uom")}
                      >
                        <option value="select">Select</option>
                        <option value="kg">KG</option>
                        <option value="gram">Gram</option>
                        <option value="rolls">Rolls</option>
                        <option value="number">Number</option>
                        <option value="pieces">Pieces</option>
                        <option value="box">Box</option>
                      </select>
                      <span className="text-danger">
                        {isError && add.uom == "" && "UOM cannot be empty"}
                      </span>
                    </td>

                    <td>
                      <input
                        min={0}
                        type="number"
                        value={add.rate}
                        onChange={(e) => productChange(e.target.value, "rate")}
                        // {...register("rate")}
                      />
                      <span className="text-danger">
                        {isError && add.rate == "" && "RATE cannot be empty"}
                      </span>
                    </td>

                    <td>
                      <select
                        value={add.gst}
                        onChange={(e) => {
                          getGrandTotal(e);
                        }}
                        // {...register("gst")}
                      >
                        <option value="select">select</option>
                        <option value="0">0</option>
                        <option value="5">5</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                        <option value="28">28</option>
                      </select>
                      <span className="text-danger">
                        {isError && add.gst == "" && "GST cannot be empty"}
                      </span>
                    </td>

                    <td>
                      <input
                        type="number"
                        value={add.grandtotal}
                        onChange={(e) =>
                          productChange(e.target.value, "grandtotal")
                        }
                      />
                    </td>
                    <button type="button" onClick={addUpdate}>
                      Add
                    </button>
                  </tr>
                </tbody>
              </table>
            </div>

            <br />
            <button type="submit" class="btn btn-primary">
              Save
            </button>

            <div
              style={{
                textAlign: "end",
              }}
            >
              <h6>
                Sub Total (₹):
                <span>{subTotal}</span>
              </h6>
              <br />
              <h6>
                GST (₹):
                <span>{taxTotal}</span>
              </h6>
              <br />
              <h6>
                Grand Total (₹):
                <span>{grandTotal}</span>
              </h6>
            </div>
          </div>
        </form>
      </Tab>
      <Tab eventKey={2} title="Quotation History">
        <div
          className="main-container"
          style={{ backgroundColor: "aliceblue" }}
        >
          <div
            className="date-container"
            style={{
              marginLeft: "120px",
              paddingTop: "30px",
            }}
          >
            <td>
              <p>From:</p>
            </td>
            <td>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </td>
            <td>
              <p>End:</p>
            </td>
            <td>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </td>
            <td>
              <button type="button" class="btn btn-primary">
                Refresh
              </button>
            </td>
          </div>
          <br />

          <div>
            <DataTable
              columns={columns}
              data={get}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="450px"
              // selectableRows
              // selectRowsHighlight
              highlightOnHover
              actions={<button className="btn btn-primary">Export</button>}
              subHeader
              subHeaderComponent={
                <input
                  type="search"
                  className="w-25 form-content"
                  placeholder="SEARCH CUSTOMER NAME/MOBILE NO"
                  onChange={(e) => searchItems(e.target.value)}
                />
              }
              customStyles={customStyles}
            />
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Send Mail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit3(onMail)}>
                <div>
                  <table>
                    <tr>
                      <td>
                        <p>TO:(put comma in between for multiple email ids)</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="email" name="email" {...register3("to")} />
                        <span className="text-danger">
                          {errors3.to && errors3.to.message}
                        </span>{" "}
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>CC:(put comma in between for multiple email ids)</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="email" name="email" {...register3("cc")} />
                        <span className="text-danger">
                          {errors3.cc && errors3.cc.message}
                        </span>{" "}
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Subject:</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="text"
                          {...register3("subject")}
                        />
                        <span className="text-danger">
                          {errors3.subject && errors3.subject.message}
                        </span>{" "}
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Message:</p>
                      </td>
                    </tr>
                    <tr>
                      {/* <RichTextEditor
                        value={radd}
                        style={{ flex: "1px" }}
                        // {...register3("message")}
                        onChange={(value) => {
                          console.log(value.toString, "check");
                          setRadd(value);
                        }}
                      /> */}
                      <textarea
                        cols="25"
                        rows="3"
                        {...register3("message")}
                      ></textarea>
                      <span className="text-danger">
                        {errors3.message && errors3.message.message}
                      </span>{" "}
                      <br />
                    </tr>
                    <br />
                  </table>
                  <button type="submit" class="btn btn-primary">Send</button>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>

        <div className="invoice-edit">
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Quotation Edit
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit2(onEdit)}>
                <div className="main-cointainer">
                  <div
                    className="row"
                    style={{
                      padding: "20px",
                      border: "1px solid black",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <div className="col-md-4">
                      <div className="buyer">
                        <p>Buyer Address</p>
                        <label>Customer Name:</label>
                        <br />
                        <input
                          type="text"
                          disabled
                          {...register2("customer_name")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.customer_name &&
                            errors2.customer_name.message}
                        </span>{" "}
                        <br />
                        <label>Address 1:</label>
                        <br />
                        <input
                          value={select.address}
                          {...register2("address1")}
                        />
                        <span className="text-danger">
                          {errors2.address1 && errors2.address1.message}
                        </span>{" "}
                        <br />
                        <label>Mobile No:</label>
                        <br />
                        <input
                          value={select.mobile_no}
                          {...register2("mobile_no")}
                        />
                        <span className="text-danger">
                          {errors2.mobile_no && errors2.mobile_no.message}
                        </span>{" "}
                        <br />
                        <label>GST No:</label>
                        <br />
                        <input value={select.gst} {...register2("gst")} />
                        <span className="text-danger">
                          {errors2.gst && errors2.gst.message}
                        </span>{" "}
                        <br />
                        <label>Email No:</label>
                        <br />
                        <input value={select.email} {...register2("email")} />
                        <span className="text-danger">
                          {errors2.email && errors2.email.message}
                        </span>{" "}
                        <br />
                        <label>Pin Code:</label>
                        <br />
                        <input
                          value={select.pin_code}
                          {...register2("pin_code")}
                        />
                        <span className="text-danger">
                          {errors2.pin_code && errors2.pin_code.message}
                        </span>{" "}
                        <br />
                        <label>State:</label>
                        <br />
                        <select value={select.state} {...register2("state")}>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Pune">Pune</option>
                          <option value="Goa">Goa</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Chennai">Chennai</option>
                        </select>{" "}
                        <span className="text-danger">
                          {errors2.state && errors2.state.message}
                        </span>
                        <br />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="delivery">
                        <p>
                          Delivery Address{" "}
                          <input
                            type="checkbox"
                            onClick={() => {
                              editCheckbox();
                            }}
                          ></input>
                          <span>(same as buyer address)</span>
                        </p>
                        <label>
                          Customer Name: <span className="text-danger">*</span>
                        </label>
                        <br />
                        <input {...register2("customer_name_a")} />{" "}
                        <span className="text-danger">
                          {errors2.customer_name_a &&
                            errors2.customer_name_a.message}
                        </span>
                        <br />
                        <label>
                          Address 1: <span className="text-danger">*</span>
                        </label>
                        <br />
                        <input {...register2("address1_a")} />{" "}
                        <span className="text-danger">
                          {errors2.address1_a && errors2.address1_a.message}
                        </span>
                        <br />
                        <label>
                          Mobile No: <span className="text-danger">*</span>
                        </label>
                        <br />
                        <input
                          type="number"
                          {...register2("mobile_no_a")}
                        />{" "}
                        <span className="text-danger">
                          {errors2.mobile_no_a && errors2.mobile_no_a.message}
                        </span>
                        <br />
                        <label>
                          GST No: <span className="text-danger">*</span>
                        </label>
                        <br />
                        <input {...register2("gst_a")} />{" "}
                        <span className="text-danger">
                          {errors2.gst_a && errors2.gst_a.message}
                        </span>
                        <br />
                        <label>
                          Email No: <span className="text-danger">*</span>
                        </label>
                        <br />
                        <input {...register2("email_a")} />{" "}
                        <span className="text-danger">
                          {errors2.email_a && errors2.email_a.message}
                        </span>
                        <br />
                        <label>
                          Pin Code: <span className="text-danger">*</span>
                        </label>
                        <br />
                        <input {...register2("pin_code_a")} />{" "}
                        <span className="text-danger">
                          {errors2.pin_code_a && errors2.pin_code_a.message}
                        </span>
                        <br />
                        <label>
                          State:<span className="text-danger">*</span>
                        </label>
                        <br />
                        <select {...register2("state_a")}>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Pune">Pune</option>
                          <option value="Goa">Goa</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Chennai">Chennai</option>
                        </select>{" "}
                        <span className="text-danger">
                          {errors2.state_a && errors2.state_a.message}
                        </span>
                        <br />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="ref-3">
                        <p>Ref No:{refNo}</p>
                        <label>
                          Date: <span className="text-danger">*</span>
                        </label>
                        <br />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          {...register2("date")}
                        />
                        <span className="text-danger">
                          {errors.date && errors.date.message}
                        </span>
                        <br />
                        <label>
                          {" "}
                          Enquiry RefNo: <span className="text-danger">*</span>
                        </label>
                        <br />
                        <input type="text" {...register2("enquiry_no")} />
                        <span className="text-danger">
                          {errors2.enquiry_no && errors2.enquiry_no.message}
                        </span>
                        <br />

                        <br />
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="table-responsive">
                    <table className="table  table-bordered">
                      <thead>
                        <tr className="bg-success text-white">
                          <th>Sl no</th>
                          <th>product</th>
                          <th>HSN</th>
                          <th>Qty</th>
                          <th>UOM</th>
                          <th>Unit Price (₹)</th>
                          <th>GST</th>
                          <th>Grand Total (₹)</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {thearray.map((item, index) => {
                        return (
                          <tr>
                            <td style={{ width: "20px" }}>{index + 1}</td>
                            <td>
                              {" "}
                              <ProductSearch
                                data={productGet}
                                ref={productRef}
                                defValue={item.product}
                                onChangeData={(data) => {
                                  setProductSelect(data);
                                  editInput(data.uom, "uom");
                                  editInput(data.hsn, "hsn");
                                }}
                              />
                            </td>

                            <td>
                              <input
                                type="text "
                                disabled
                                value={item.hsn || ""}
                                onChange={(e) =>
                                  editInput(e.target.value, index, "hsn")
                                }
                                style={{ width: "150px" }}
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="number "
                                value={item.qty || ""}
                                min={0}
                                onChange={(e) =>
                                  editInput(e.target.value, index, "qty")
                                }
                                style={{ width: "50px" }}
                              />
                            </td>
                            <td>
                              {" "}
                              <select
                                type="text "
                                disabled
                                value={item.uom || ""}
                                onChange={(e) =>
                                  editInput(e.target.value, index, "uom")
                                }
                                style={{ width: "100px" }}
                              >
                                <option value="select">Select</option>
                                <option value="kg">KG</option>
                                <option value="gram">Gram</option>
                                <option value="rolls">Rolls</option>
                                <option value="number">Number</option>
                                <option value="pieces">Pieces</option>
                                <option value="box">Box</option>
                              </select>
                            </td>
                            <td>
                              <input
                                min={0}
                                type="number "
                                value={item.rate || ""}
                                onChange={(e) =>
                                  editInput(e.target.value, index, "rate")
                                }
                                style={{ width: "150px" }}
                              />
                            </td>
                            <td>
                              <select
                                type="text "
                                value={item.gst || ""}
                                onChange={(e) =>
                                  editInput(e.target.value, index, "gst")
                                }
                                style={{ width: "70px" }}
                              >
                                <option value="select">Select</option>
                                <option value="0">0</option>
                                <option value="5">5</option>
                                <option value="12">12</option>
                                <option value="18">18</option>
                                <option value="28">28</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="number "
                                value={getGTotal(item)}
                                onChange={(e) =>
                                  editInput(e.target.value, index, "grandtotal")
                                }
                                disabled
                                style={{ width: "200px" }}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                style={{ backgroundColor: "#dc3545" }}
                                onClick={(e) => {
                                  deleteItem(index);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th></th>
                          <th>Product</th>
                          <th>HSN/SAC</th>
                          <th>Qty</th>
                          <th>UOM</th>
                          <th>Rate/unit(₹)</th>
                          <th>GST</th>
                          <th>Grand Total (₹)</th>
                        </tr>
                        <tr>
                          <td></td>

                          <td>
                            <ProductSearch
                              data={productGet}
                              ref={productRef}
                              defValue={add.product}
                              onChangeData={(data) => {
                                setProductSelect(data);
                                productChange(data.uom, "uom");
                                productChange(data.hsn, "hsn");
                                productChange(data.product_name, "product"); // to store product_name
                                productChange(data.id, "product_id"); //to sore product_id in databse
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="type"
                              disabled
                              value={add.hsn}
                              onChange={(e) =>
                                productChange(e.target.value, "hsn")
                              }
                              // {...register("hsn")}
                            />
                            <span className="text-danger">
                              {isError &&
                                add.hsn == "" &&
                                "HSN cannot be empty"}
                            </span>
                          </td>

                          <td>
                            <input
                              type="number"
                              value={add.qty}
                              min={0}
                              onChange={(e) =>
                                productChange(e.target.value, "qty")
                              }
                              // {...register("qty")}
                            />
                            <span className="text-danger">
                              {isError &&
                                add.qty == "" &&
                                "QTY cannot be empty"}
                            </span>
                          </td>

                          <td>
                            <select
                              value={add.uom}
                              disabled
                              onChange={(e) =>
                                productChange(e.target.value, "uom")
                              }
                              // {...register("uom")}
                            >
                              <option value="select">Select</option>
                              <option value="kg">KG</option>
                              <option value="gram">Gram</option>
                              <option value="rolls">Rolls</option>
                              <option value="number">Number</option>
                              <option value="pieces">Pieces</option>
                              <option value="box">Box</option>
                            </select>
                            <span className="text-danger">
                              {isError &&
                                add.uom == "" &&
                                "UOM cannot be empty"}
                            </span>
                          </td>

                          <td>
                            <input
                              min={0}
                              type="number"
                              value={add.rate}
                              onChange={(e) =>
                                productChange(e.target.value, "rate")
                              }
                              // {...register("rate")}
                            />
                            <span className="text-danger">
                              {isError &&
                                add.rate == "" &&
                                "RATE cannot be empty"}
                            </span>
                          </td>

                          <td>
                            <select
                              value={add.gst}
                              onChange={(e) => {
                                getGrandTotal(e);
                              }}
                              // {...register("gst")}
                            >
                              <option value="select">select</option>
                              <option value="0">0</option>
                              <option value="5">5</option>
                              <option value="12">12</option>
                              <option value="18">18</option>
                              <option value="28">28</option>
                            </select>
                            <span className="text-danger">
                              {isError &&
                                add.gst == "" &&
                                "GST cannot be empty"}
                            </span>
                          </td>

                          <td>
                            <input
                              type="number"
                              value={add.grandtotal}
                              onChange={(e) =>
                                productChange(e.target.value, "grandtotal")
                              }
                            />
                          </td>
                          <button type="button" onClick={addUpdate}>
                            Add
                          </button>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <br />
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>

                  <div
                    style={{
                      textAlign: "end",
                    }}
                  >
                    <h6>
                      Sub Total (₹):
                      <span>{subTotal}</span>
                    </h6>
                    <br />
                    <h6>
                      GST (₹):
                      <span>{taxTotal}</span>
                    </h6>
                    <br />
                    <h6>
                      Grand Total (₹):
                      <span>{grandTotal}</span>
                    </h6>
                  </div>
                </div>
              </form>
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
      </Tab>
    </Tabs>
  );
  // useEffect(() => {
  //   isDisplay(true, true);
  // }, []);
  isDisplay(true, true);
   // setKey("1");
              // setLgShow(true);
              // isDisplay(row.main, row.sub_main);
}

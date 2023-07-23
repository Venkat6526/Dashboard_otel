import { yupResolver } from "@hookform/resolvers/yup";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import RichTextEditor from "react-rte";
import Select from "react-select";
import * as yup from "yup";
import "../../index.css";
import $ from 'jquery'; 
import url from "../../views/config";
import moment from "moment";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import DynamicSearch from "../../components/AutoComplete/DynamicSearch";
import ProductSearch from "../../components/AutoComplete/ProductSearch";

// import InvoiceTransport from "../../components/AutoComplete/reactselect/InvoiceTransport";

import { Toast } from "bootstrap";
import { Alert, Snackbar } from "@mui/material";
import { deleteAPI, getAPI, postAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import FunctionAlert from "../alert/FunctionAlertpr";

import './design.css'

const initialState = {
  // this shoulds be changed in productChange
  product: "",
  hsn: "",
  qty: "",
  uom: "",
  // uom_desc: "",
  rate: "",
  gst: "",
  discount: 0,
  grandtotal: 0,
  product_id: 0, // to store in database
};

const schema = yup.object().shape({
  customer_name_a: yup
    .string()
    .required("Customer Name is required")
    .matches(/^[a-zA-Z\s]*$/, "Please enter a valid name"),
  address1_a: yup.string().required("Address is required"),
  mobile_no_a: yup
    .string()
    .required("Mobile is required")
    .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
  gst_a: yup
    .string()
    .required(" GST No is required")
    .matches(/^[a-zA-Z0-9]{10}$/, "Please enter a valid GST number"),
  email_a: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  pin_code_a: yup
    .string()
    .required("Pin Code is required")
    .matches(/^\d{6}$/, "Please enter a valid 6-digit PIN code"),
  state_a: yup
    .mixed()
    .required("State is required")
    .oneOf(
      ["Karnataka", "Pune", "Goa", "Kerla", "Chennai"],
      "Please select a state"
    )
  // date: yup
  //   .date()
  //   .typeError("Please enter a valid date")
  //   .required("Date is required")
  //   .nullable(),

  // delivery_date: yup
  //   .date()
  //   .typeError("Please enter a valid delivery date")
  //   .required("Delivery Date is required")
  //   .nullable(),
  // dispatch_through: yup
  //   .string()
  //   .required(" Dispatch is required")
  //   .oneOf(["vrl", "ideal", "by hand"], "Please select a dispatch through"),
  // dispatch_from_a: yup
  //   .string()
  //   .required(" Dispatch From is required")
  //   .oneOf(
  //     ["office", "manufacturing unit", "ware house"],
  //     "Please select a  dispatch from"
  //   ),
});

export default function PerformanceInvoice() {
  const [alertData, setAlertData] = useState({
    code: 200,
    data: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const DeliveryClose = () => setDeliveryOpen(false);
  const DeliveryOpen = () => setDeliveryOpen(true);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [descCheck, setDescCheck] = useState(true);
  const [onlinePaymentType, setOnlinePaymentType] = useState("");
  const [toast, setToast] = useState(false);
  const [reload, setReload] = useState(false);
  const productRef = useRef();
  const supplierRef = useRef();
  const [isError, setIsError] = useState(false); //prodarry validation
  const [customerId, setCustomerId] = useState({});
  const [customerInvoiceId, setCustomerInvoiceId] = useState([]);
  const [masterArrayObject, setMasterArrayObject] = useState([]); // to store all the old qty for stocks
  const [productSelect, setProductSelect] = useState({}); // to set product serach
  const [supplierSelect, setSupplierSelect] = useState({}); //to set supplier search
  const [productGet, setProductGet] = useState([]); // product master name and uom gst
  const [lgShow, setLgShow] = useState(false);
  const [newAmount, setNewAmount] = useState(0);
  const [refNo, setRefNo] = useState("");
  const [invData, setInvData] = useState({}); // customer payment edit
  const [isDisabled, setIsDisabled] = useState(false);
  const [thearray, setThearray] = useState([]);
  const [thearray_edit, setThearray_edit] = useState([]);
  const [payments, setPayments] = useState([]);
  const [role, setRole] = useState([]);

  const [subTotal, setSubTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  
  const [subTotal2, setSubTotal2] = useState(0);
  const [taxTotal2, setTaxTotal2] = useState(0);
  const [grandTotal2, setGrandTotal2] = useState(0);


  const [deliveryState, setDeliveryState] = useState("");
  const [oldGrandTotal, setOldGrandTotal] = useState(0);
  const [key, setKey] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);
  const [select, setSelect] = useState({}); //autocomplete
  const [eedit, setEedit] = useState(""); /// to store in id in setvalue product
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [open, setOpen] = useState(false); // transport view
  const editClose = () => setOpen(false);
  const editOpen = () => {
    setOpen(true);
  };
  const [radd, setRadd] = useState(RichTextEditor.createEmptyValue());
  const [get, setGet] = useState([]);
  const [supplierGet, setSupplierGet] = useState([]);
  const [cget, setCGet] = useState([]);
  const [api, setApi] = useState([]); // filter
  const [add, setadd] = useState(initialState);
  const [stocksQty, setStocksQty] = useState("");
  const inputRef = useRef(null);

  //--------------------------product change and update inside input------------//
  const productChange = (e, key) => {
    setadd((prevState) => ({
      ...prevState,
      [key]: e,
    }));
  };

  //------------calculation----------------//
  //  1) to calculate discount bfr mapping
  function applyDiscount(discountPercentage) {
    if (discountPercentage === 0) {
      // If discount percentage is zero, return grandtotal as is
      // return parseFloat(grandtotal);
      // productChange(grandtotal, "grandtotal");
    } else {
      // Convert discount percentage to a decimal
      const discountFactor = parseFloat(1 - discountPercentage / 100);
      // Calculate the discount value
      const discountValue =
        parseFloat(add.rate) * parseFloat(add.qty) * discountFactor;
      // Calculate the discounted total
      // const discountedTotal = parseFloat(add.grandtotal) - discountValue;

      console.log(discountValue, "discountValue");
      console.log(add.grandtotal, "add.grandtotal");
      // console.log(discountedTotal,"logic");
      productChange(discountValue, "grandtotal");
      productChange(discountPercentage, "discount");
      // return discountedTotal;
    }
  }

  // before ADD button calculation
  const getGrandTotal = (e) => {
    let subtotal = parseFloat(add.qty) * parseFloat(e.target.value);
    productChange(subtotal, "grandtotal");

    productChange(e.target.value, "rate");
    // setTimeout(checkWarning, 3000,e.target.value);
  };

  const checkWarning = (e) => {
    console.log(e, "qwertyui");
    if (e < productSelect.price) {
      console.log("qwertyui123456789o");
      // alert("clicked");
      setToast(true);
    }
  };

  // to show sepreate gst,total,grandtotal
  // for add button
  const getTotalInfo = (add) => {
    let gstValue = parseFloat(add.gst) / 100;

    let subtotal = parseFloat(add.grandtotal);
    //alert(subtotal)
    let gsttotal = parseFloat(subtotal * gstValue) / 2;
    let gsttotal1 = parseFloat(subtotal * gstValue) ;
    let grtotal = parseFloat(gsttotal1) + parseFloat(subtotal);
  //alert(grtotal)
    setSubTotal(subTotal + subtotal);
    setTaxTotal(taxTotal + gsttotal);
    setGrandTotal(grandTotal + grtotal);
  };

  const getTotalInfo2 = (add) => {
    let gstValue = parseFloat(add.gst) / 100;

    let subtotal = parseFloat(add.grandtotal);
    //alert(subtotal)
    let gsttotal = parseFloat(subtotal * gstValue) / 2;
    let gsttotal1 = parseFloat(subtotal * gstValue) ;
    let grtotal = parseFloat(gsttotal1) + parseFloat(subtotal);
  //alert(grtotal)
    setSubTotal(subTotal + subtotal);
    setTaxTotal(taxTotal + gsttotal);
    setGrandTotal(grandTotal + grtotal);
  };

  // to delete button for item
  // const revisedGTotal = (add) => {
  //   if (add.length === 0) {
  //     setSubTotal(0);
  //     setTaxTotal(0);
  //     setGrandTotal(0);
  //   }
  //   // since its in array we should use for deleted one grand total from 1 or more we go with for and if condition
  //   for (let i of add) {
  //     let gstValue = parseFloat(i.gst) / 100;
  //     let gsttotal = parseFloat(i.rate) * parseFloat(i.qty) * gstValue;
  //     let subtotal = parseFloat(i.rate) * parseFloat(i.qty);
  //     let grtotal = gsttotal + subtotal;
  //     setSubTotal(subtotal);
  //     setTaxTotal(gsttotal);
  //     setGrandTotal(grtotal);
  //   }
  // };
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
      const discountFactor = parseFloat(1 - parseFloat(i.discount) / 100);
      const discountValue =
      parseFloat(i.rate) * parseFloat(i.qty) -
      parseFloat(i.rate) * parseFloat(i.qty) * discountFactor;
      //subtotal = parseFloat(i.rate) * parseFloat(i.qty) - discountValue;

       gstValue = parseFloat(i.gst) / 100;
       let t=(parseFloat(i.rate) * parseFloat(i.qty))-discountValue;
       gsttotal =parseFloat(gsttotal)+ (parseFloat(t) * parseFloat(i.qty) * gstValue);
       
       subtotal =parseFloat(subtotal)+ (parseFloat(i.rate) * parseFloat(i.qty))-discountValue;
       grtotal =parseFloat(gsttotal) + parseFloat(subtotal);
       
      setSubTotal(subtotal);
      setTaxTotal(gsttotal/2);
      //grtotal=grtotal-(grtotal*discountFactor)
      setGrandTotal(grtotal);
    }
  };

  const revisedGTotal2 = (add) => {
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
      const discountFactor = parseFloat(1 - parseFloat(i.discount) / 100);
      const discountValue =
      parseFloat(i.rate) * parseFloat(i.qty) -
      parseFloat(i.rate) * parseFloat(i.qty) * discountFactor;
      //subtotal = parseFloat(i.rate) * parseFloat(i.qty) - discountValue;

       gstValue = parseFloat(i.gst) / 100;
       let t=(parseFloat(i.rate) * parseFloat(i.qty))-discountValue;
       gsttotal =parseFloat(gsttotal)+ (parseFloat(t) * parseFloat(i.qty) * gstValue);
       
       subtotal =parseFloat(subtotal)+ (parseFloat(i.rate) * parseFloat(i.qty))-discountValue;
       grtotal =parseFloat(gsttotal) + parseFloat(subtotal);
       
      setSubTotal2(subtotal);
      setTaxTotal2(gsttotal/2);
      //grtotal=grtotal-(grtotal*discountFactor)
      setGrandTotal2(Math.trunc(grtotal));
    }
  };


  const revisedDisGTotal = (add) => {
    if (add.length === 0) {
      setSubTotal(0);
      setTaxTotal(0);
      setGrandTotal(0);
    }
    // since its in array we should use for deleted one grand total from 1 or more we go with for and if condition
    for (let i of add) {
      console.log(i, "ewqrthjm");
      let gstValue = parseFloat(i.gst) / 100;
      const discountFactor = parseFloat(1 - parseFloat(i.discount) / 100);
      // Calculate the discount value
      const discountValue =
        parseFloat(i.rate) * parseFloat(i.qty) -
        parseFloat(i.rate) * parseFloat(i.qty) * discountFactor;

      // Calculate the discounted total
      // const discountedTotal = parseFloat(add.grandtotal) - discountValue;
      let subtotal = parseFloat(i.rate) * parseFloat(i.qty) - discountValue;
      let gsttotal = subtotal * gstValue;

      let grtotal = gsttotal + subtotal;
      console.log(discountValue, "===discountValue===");
      console.log(gsttotal, "===", subtotal, "===", grtotal);
      setSubTotal(subtotal);
      setTaxTotal(gsttotal);
      setGrandTotal(grtotal);
    }
  };
  const editInput = (dis, i, data) => {
    // let editData = [];
    // editData = [...thearray];
    // editData[i][data] = dis;

    // setThearray(editData);
    // // amountInfo(dis);
    // console.log("gftdyrteastdf", editData[0]);
    // revisedDisGTotal(editData);
  };

  const getGtotal = (item) => {
    let disFac = parseFloat(1 - parseFloat(item.discount) / 100);
    let amountDisplay =
      parseFloat(item.rate) * parseFloat(item.qty) * parseFloat(disFac);
    return amountDisplay;
  };

  //------------------------ADD button update------------------//
  const addUpdate = () => {
    if (
      add.product == "" ||
      add.hsn == "" ||
      add.qty == "" ||
      add.rate == "" ||
      add.gst == "" ||
      add.uom == ""
    ) {
      console.log(add, "adadddada");
      setIsError(true);
    } else {
      setThearray([...thearray, add]);
      getTotalInfo(add);
      setadd({ ...initialState });
      setIsError(false);
      productRef.current.clearProdValue();
    }
  };


  const addUpdate_edit = () => {
    if (
      add.product == "" ||
      add.hsn == "" ||
      add.qty == "" ||
      add.rate == "" ||
      add.gst == "" ||
      add.uom == ""
    ) {
      console.log(add, "adadddada");
      setIsError(true);
    } else {
      setThearray_edit([...thearray_edit, add]);
      getTotalInfo2(add);
      setadd({ ...initialState });
      setIsError(false);
      productRef.current.clearProdValue();
      var remove = [...thearray_edit, add];
  
        setThearray_edit(remove);
        revisedGTotal2(remove);
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
      name: "sl no",
      selector: (row, index) => row.main.id,
      width: "70px",
    },
    // {
    //   name: "Invoice No",
    //   selector: (row) => row.main.in_no,
    //   width: "150px",
    // },
    {
      name: "In Date",
      selector: (row) => row.main.date,
      width: "180px",
    },
    {
      name: "customer_name",
      selector: (row) => row.main.customer_name,
      width: "160px",
      color: "#fff",
    },
    {
      name: "Mobile",
      selector: (row) => row.main.mobile_no,
      width: "110px",
    },
    {
      name: "Email Status",
      selector: (row) => row.main.email,
      width: "150px",
    },
    {
      name: "Created_by",
      selector: (row) => row.main.created_by,
      color: "#fff",
      width: "120px",
    },
    {
      name: "Action",
      selector: (row) => row.main.Action,
      cell: (row) => (
        <>
          <MailOutlineOutlinedIcon
            style={{ color: "F44336", marginLeft: "5px", fontSize: "47px" }}
            onClick={() => handleShow()}
          />

          <button
            className="btn btn-dark"
            style={{ marginLeft: "4px" }}
            onClick={() => {
              isDisplay(row.main, row.product);
              setLgShow(true);
              setIsEdit(true);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            type="button"
            class="btn btn-danger"
            style={{ marginLeft: "4px" }}
            onClick={() => {
              deleteHandle(row.main.id);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>

          <a
            
            href={url.pdf_url+`/proforma_invoice.php?id=${row.main.id}`}
          >
            <button
              type="button"
              className="btn btn-outline-dark"
              style={{ marginLeft: "4px" }}
            >
              PDF
            </button>
          </a>

          <Link
            to={{
              pathname: "/Invoice",
              state: {
                main: row.main,
                product: row.product,
              },
            }}
          >
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginLeft: "4px" }}
            >
              Copy
            </button>
          </Link>
          <button
            className="btn btn-outline-warning ms-2 send_whatsapp"
           value={row.main.id}
          >
          <i className="fa fa-whatsapp" style={{color:"#075e54",fontSize:"25px"}}></i>
          </button>
        </>
      ),
    },
  ];

  //--------------------hook form -----------------//

  //post
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
  });
  // payments edit and post  we need to go with one more form name
  //------transport Edit-------------//
  //   const {
  //     register: register2,
  //     reset: reset2,
  //     setValue: setValue2,
  //     formState: { errors: errors2 },
  //     handleSubmit: handleSubmit2,
  //   } = useForm({
  //     mode: "onchange",
  //   });

  //----------invoice Edit---------------//
  const {
    register: register3,
    setValue: setValue3,
    watch,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
  } = useForm({
   
  });
  const values = watch();
  //---------------checkbox click--------------------------//

  const editCheckbox = () => {
    setValue("customer_name_a", select.customer_name);
    setValue("address1_a", select.address);
    setValue("mobile_no2_a", select.mobile_no2);
    setValue("mobile_no_a", select.mobile_no);
    setValue("email_a", select.email);
    setValue("pin_code_a", select.pin_code);
    setValue("gst_a", select.gst);
    setValue("state_a", select.state);
  };
  const editCheckbox2 = () => {
    setValue("customer_name_a", select.customer_name);
    setValue("address1_a", select.address);
    setValue("mobile_no2_a", select.mobile_no2);
    setValue("mobile_no_a", select.mobile_no);
    setValue("email_a", select.email);
    setValue("pin_code_a", select.pin_code);
    setValue("gst_a", select.gst);
    setValue("state_a", select.state);
  };

  const isDisplay = (data, prodArray) => {
  
    setEedit(data.id);
    setValue3("id", data.customer_id);
    setValue3("refNo", data.in_no);
    setValue3("customer_name", data.customer_name);
    setValue3("address1", data.address1);
    setValue3("mobile_no2", data.mobile_no2);
    setValue3("mobile_no", data.mobile_no);
    setValue3("email", data.email);
    setValue3("pin_code", data.pin_code);
    setValue3("gst", data.gst_no);
    setValue3("state", data.state);
    setValue3("customer_name_a", data.customer_name_a);
    setValue3("address1_a", data.address1_a);
    setValue3("mobile_no2_a", data.mobile_no2_a);
    setValue3("mobile_a", data.mobile_no_a);
    setValue3("email_a", data.email_a);
    setValue3("pin_code_a", data.pin_code_a);
    setValue3("gst_a", data.gst_no);
    setValue3("state_a", data.state_a);
    setValue3("date", moment(data.date).format('YYYY-MM-DD'));

    setValue3(
      "delivery_date",
      moment(data.delivery_date).format('YYYY-MM-DD')
    );

    setValue3("buyer_order_no", data.buyer_order_no);
    setValue3(
      "buyer_order_date",
      moment(data.buyer_order_date).format('YYYY-MM-DD')
    );

    setValue3("terms_of_delivery", data.terms_of_delivery);
    setValue3("payment", data.payment);
    setGrandTotal(parseFloat(data.grand_total));
    setOldGrandTotal(data.grand_total);
    setThearray_edit(prodArray);

    //--------------------olq qty we are storing for stocks
    setMasterArrayObject(
      prodArray.map((item) => ({ ...item, oldQty: item.qty }))
    );
    revisedGTotal2(prodArray);
    setThearray_edit(prodArray.map((item) => ({ ...item, oldQty: item.qty })));
    // setSubTotal(0);
    // setTaxTotal(0);
    // setGrandTotal(0);
  };
  //----------------crud operation------------------------//

  useEffect(() => {

    const handleMouseDown = () => {
      document.body.focus();
    };
    document.addEventListener("mouseup", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    $("body").on("click",".send_whatsapp",function(e){
       
      e.preventDefault()
      if(window.confirm("Are you sure?")){
          $(".send_whatsapp").attr("disabled",true)
      var id=$(this).val()
      $.ajax({
          "url":url.whatsapp_url+"/send_whatsapp_pr.php",
          data:{id:id},
          type:"POST",
          dataType:"json",
          success:function(data){
              alert("WhatsApp sent")
               $(".send_whatsapp").removeAttr("disabled")
          },
          error:function(data){
              alert(data.responseText)
                $(".send_whatsapp").removeAttr("disabled")
          }
          
          
      })
      return true
      }
       return false
  }) 
    getAPI(apinames.GET_PERFORMANCE_INVOICE)
      .then((response) => {
        let reversedData = response.data.slice().reverse();
        setRefNo(response.number);
        setGet(reversedData);
        setApi(reversedData);
      })
      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get invoice

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
      })
      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get product_master

    getAPI(apinames.GET_CUSTOMER_PAYMENTS)
      .then((response) => {
        console.log(response.data, "customer payments");
        setPayments(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get Payments
  }, []);

  const onsubmit = (data) => {
    var created_by = localStorage.getItem("ootel_admin_created_by");
    let postData = {
      in_no: refNo,
      customer_name: select.customer_name,
      address1: select.address,
      mobile_no2: select.mobile_no2,
      mobile_no: select.mobile_no,
      gst_no: select.gst,
      email: select.email,
      pin_code: select.pin_code,
      state: select.state,
      customer_name_a: data.customer_name_a,
      address1_a: data.address1_a,
      mobile_no2_a: data.mobile_no2_a,
      mobile_no_a: data.mobile_a,
      gst_no_a: data.gst_a,
      email_a: data.email_a,
      pin_code_a: data.pin_code_a,
      pan_a: data.pan_a,
      state_a: data.state_a,
      date:moment(data.date).format('YYYY-MM-DD'),

      delivery_date: moment(data.delivery_date).format('YYYY-MM-DD'),

      buyer_order_no: data.buyer_order_no,
      buyer_order_date: moment(data.buyer_order_date).format('YYYY-MM-DD'),

      terms_of_delivery: data.terms_of_delivery,
      grand_total: grandTotal,
      new_grand_total: oldGrandTotal,
      productArray: thearray,

      created_by: created_by,
      customer_id: select.id,
      created_by:localStorage.getItem("ootel_admin_created_by")
    };
    console.log(thearray, "data");

    postAPI(apinames.POST_PERFORMANCE_INVOICE, postData).then((response) => {
      var status_code = response.status_code;
      let alert_data;
      if (status_code == 200) {
        alert_data = {
          code: response.status_code,
          data: "Proforma Invoice Submitted Successfully",
        };
        setAlertData(alert_data);
        setShowAlert(true);
        reset();
        setTimeout(() => {
          
          window.location.reload();
        }, 1000);
      } else if (status_code == 400) {
        alert(JSON.stringify(response.status_code));
      }
    });
  };

  //   const onSubmit2 = (data1) => {
  //     console.log(data1, "aaaaaa");
  //     const PostData = {
  //       // id: customerEdit,

  //       type: 1,
  //       entity_id: invData.customer_id, //invoice customer id
  //       name: invData.customer_name,
  //       payment_date: data1.payment_date, //present date
  //       payment_description: data1.payment_description,
  //       payment_mode: paymentMethod, //should come from invoice_no
  //       amount: data1.amount, // add and stoe in customer payments
  //       remarks: invData.in_no, // auto populate
  //       sales_executive: invData.marketing_type, // auto populate
  //       invoice_id: invData.id,

  //       //balance,credit,debit will come from customer_master
  //       balance: customerId.balance,
  //       credit: customerId.credit,
  //       debit: customerId.debit,
  //       newAmount: newAmount,
  //       executive_type: data1.name != undefined ? data1.name.value.type : "",
  //       executive_name: data1.name != undefined ? data1.name.value.role : "",
  //       payment_bank: data1.payment_bank,
  //     };

  //     postAPI(apinames.POST_PAYMENTS, PostData)
  //       .then((response) => {
  //         console.log(response, "post");
  //         var status_code = response.status_code;
  //         if (status_code == 200) {
  //           // alert("sucessful");
  //           // window.location.reload();
  //         } else if (status_code == 400) {
  //           alert(JSON.stringify(response.data));
  //           console.log(response.message, "response.message");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error, "api error");
  //       });
  //   };
  //-------------------Invoice Edit--------------------------------//
  const onsubmit3 = (data2) => {
    let editData1 = {
      id: eedit,
      number: data2.refNo,
      customer_id: data2.id,
      customer_name: data2.customer_name,
      address1: data2.address1,
      mobile_no2: data2.mobile_no2,
      mobile_no: data2.mobile_no,
      gst_no: data2.gst,
      email: data2.email,
      pin_code: data2.pin_code,
      state: data2.state,

      customer_name_a: data2.customer_name_a,
      address1_a: data2.address1_a,
      mobile_no2_a: data2.mobile_no2_a,
      mobile_no_a: data2.mobile_a,
      gst_no_a: data2.gst_a,
      email_a: data2.email_a,
      pin_code_a: data2.pin_code_a,
      state_a: data2.state_a,
      date: data2.date,
      // transportation_charges: data2.transportation_charges,

      delivery_date: data2.delivery_date,

      buyer_order_no: data2.buyer_order_no,
      buyer_order_date: data2.buyer_order_date,

      terms_of_delivery: data2.terms_of_delivery,
      grand_total: grandTotal2,
      new_grand_total: oldGrandTotal,
      productArray: thearray_edit,

      //im using data1 not select bwcause i have use get method inside this only and edit doesnt have autocomplete
    };
    postAPI(apinames.PUT_PERFORMNACE_INVOICE, editData1).then((response) => {
      var status_code = response.status_code;
      let alert_data;
      if (status_code == 200) {
        // alert(" Edit successful");
        alert_data = {
          code: response.status_code,
          data: "Proforma Invoice Submitted Successfully",
        };
        setAlertData(alert_data);
        setShowAlert(true);
        reset();
        setTimeout(() => {
         
          window.location.reload();
        }, 1000);
      } else if (status_code == 400) {
        alert(JSON.stringify(response.status_code));
      }
    });
  };

  //   const handleDelivery = () => {
  //     console.log(eedit, "eedit");
  //     console.log(isChecked, "isChecked");

  //     let delivery = {
  //       check_delivered: isChecked?1:0,
  //     };
  //     PutAPI(apinames.PUT_DELIVERY + eedit, delivery).then((response) => {
  //       var status_code = response.status_code;
  //       if (status_code == 200) {
  //         // window.location.reload();
  //       }
  //     });
  //   };

  //---------------------delete api-------------------//

  const deleteHandle = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_PERFORMANCE_INVOICE + id).then((response) => {
          console.log(response, "response");
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };
  //--------------------Inside mapping delete----------------------//
  const deleteItem = (e) => {
    var remove = [...thearray];
    var index = remove.indexOf(e);
    remove.splice(e, 1);
    setThearray(remove);
    revisedGTotal(remove);
  };

  const deleteItem2 = (e) => {
    var remove = [...thearray_edit];
    var index = remove.indexOf(e);
    remove.splice(e, 1);
    setThearray_edit(remove);
    revisedGTotal2(remove);
  };
  //--------------------fileter method-------------------------//

  // filter
  const searchItems = (searchValue) => {
    //  setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = get.filter((item) => {
        return (
          item.main.customer_name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.main.in_no.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setGet(filteredData);
    } else {
      setGet(api);
    }
  };
  //saving the old qty value seperately
  const saveOldQty = (data) => {
    console.log("AWEFSGRDF======", data);
    console.log("AWEFSGRDF=====arrayObject=", masterArrayObject);

    let oldqty = masterArrayObject.find((x) => x.product_id == data.id);
    console.log("AWEFSGRDF", oldqty);
    if (oldqty != null) {
      productChange(oldqty.oldQty, "oldQty"); //to sore product_id in databse
    }
  };

  //----------------------------------------pdf button

  // const HandlePdf = () => {
  //   let headers = {
  //     "Content-Type": "application/json",
  //   };

  //   axios
  //     .get("https://otel.co.in/otel_pdf/pdf_invoice.php ", headers)

  //     .then((res) => {
  //       console.log(res, "getResponse");
  //     })
  //     .catch((err) => {
  //       console.log(err, "there is a error");
  //     });
  // };

  //Auto foucus new key enter

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      var inputs = Array.from(event.target.form.elements).filter(function (el) {
        return (
          el.tagName === "INPUT" ||
          el.tagName === "SELECT" ||
          el.tagName === "TEXTAREA"
        );
      });
      const index = inputs.indexOf(event.target);
      inputs[index + 1].focus();
      event.preventDefault();
    }
  };

  // const DescChecked = (e) => {
  //   if (e.target.checked) {
  //     setDescCheck(true);
  //     // productChange("", "uom_desc");
  //     editInput("", "uom_desc");
  //   } else {
  //     setDescCheck(false);
  //   }
  // };
  //   const handleCheckboxChange = (e) => {
  //     setIsChecked(e.target.checked);
  //   };
  return (
    <div>
      <Tabs
        defaultActiveKey={1}
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
        }}
      >
        <Tab eventKey={1} title="Proforma Invoice">
          <form onSubmit={handleSubmit(onsubmit)} onKeyDown={handleKeyDown}>
            <div className="main-cointainer">
              <div
                className="row"
                style={{
                  padding: "20px",
                  border: "1px solid black",
                  backgroundColor: "aliceblue",
                }}
              >
                <div className="col-md-3">
                  <div className="buyer">
                    <p>Buyer Address</p>
                    <label>Customer Name:</label>
                    <br />
                    <DynamicSearch
                      data={cget}
                      type={1}
                      isDisabled={isDisabled}
                      getOptionDisabled={(select) => select.customer_name}
                      onChangeData={(data) => {
                        setSelect(data);
                        setDeliveryState(
                          data.payment == "before_delivery"
                            ? "Before Delivery"
                            : "After Delivery"
                        );
                      }}
                      {...register("customer_name")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors.customer_name && errors.customer_name.message}
                    </span>{" "}
                    <label>Address 1:</label>
                    <br />
                    <input value={select.address} {...register("address")} />
                    <br />
                    <span className="text-danger">
                      {errors.address && errors.address.message}
                    </span>{" "}
                    <br />
                    <label>Mobile No:</label>
                    <br />
                    <input
                      value={select.mobile_no}
                      {...register("mobile_no")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors.mobile_no && errors.mobile_no.message}
                    </span>{" "}
                    <br />
                    <label>Alternate No:</label>
                    <br />
                    <input
                      value={select.mobile_no2}
                      {...register("mobile_no2")}
                    />
                    <span className="text-danger">
                      {errors.mobile_no2 && errors.mobile_no2.message}
                    </span>{" "}
                    <br />
                    <br />
                    <label>GST No:</label>
                    <br />
                    <input value={select.gst} {...register("gst")} />
                    <br />
                    <span className="text-danger">
                      {errors.gst && errors.gst.message}
                    </span>{" "}
                    <br />
                    <label>Email No:</label>
                    <br />
                    <input value={select.email} {...register("email")} />
                    <br />
                    <span className="text-danger">
                      {errors.email && errors.email.message}
                    </span>{" "}
                    <br />
                    <label>Pin Code:</label>
                    <br />
                    <input value={select.pin_code} {...register("pin_code")} />
                    <br />
                    <span className="text-danger">
                      {errors.pin_code && errors.pin_code.message}
                    </span>{" "}
                    <br />
                    <label>State:</label>
                    <br />
                    <select value={select.state}className="state" {...register("state")}>
                      <option value="select">Select</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Pune">Pune</option>
                      <option value="Goa">Goa</option>
                      <option value="Kerla">Kerla</option>
                      <option value="Chennai">Chennai</option>
                    </select>{" "}
                    <span className="text-danger">
                      {errors.state && errors.state.message}
                    </span>{" "}
                    <br />
                    <br />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="delivery">
                    <p>
                      Delivery Address{" "}
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            editCheckbox();
                          } else {
                            reset();
                          }
                        }}
                      />
                      <span>(same as buyer address)</span>
                    </p>
                    <label>
                      Customer Name:<span className="text-danger">*</span>{" "}
                    </label>
                    <br />
                    <input {...register("customer_name_a")} tabIndex="1" />
                    <br />
                    <span className="text-danger">
                      {errors.customer_name_a && errors.customer_name_a.message}
                    </span>{" "}
                    <label>
                      Address 1: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input {...register("address1_a")} tabIndex="2" />
                    <br />
                    <span className="text-danger">
                      {errors.address1_a && errors.address1_a.message}
                    </span>{" "}
                    <br />
                    <label>
                      Mobile No: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      type="number"
                      {...register("mobile_no_a")}
                      tabIndex="3"
                    />
                    <br />{" "}
                    <span className="text-danger">
                      {errors.mobile_no_a && errors.mobile_no_a.message}
                    </span>{" "}
                    <br />
                    <label>Alternate No:</label> <br />
                    <input {...register("mobile_no2_a")} tabIndex="4" />
                    <br />
                    <br />
                    <label>
                      GST No: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input {...register("gst_a")} tabIndex="5" />
                    <br />
                    <span className="text-danger">
                      {errors.gst_a && errors.gst_a.message}
                    </span>{" "}
                    <br />
                    <label>
                      Email No: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input {...register("email_a")} tabIndex="6" />
                    <br />
                    <span className="text-danger">
                      {errors.email_a && errors.email_a.message}
                    </span>{" "}
                    <br />
                    <label>
                      Pin Code: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input {...register("pin_code_a")} tabIndex="7" />
                    <br />
                    <span className="text-danger">
                      {errors.pin_code_a && errors.pin_code_a.message}
                    </span>{" "}
                    <br />
                    <label>
                      State: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select className="state" {...register("state_a")} tabIndex="8">
                      <option value="select">Select</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Pune">Pune</option>
                      <option value="Goa">Goa</option>
                      <option value="Kerla">Kerla</option>
                      <option value="Chennai">Chennai</option>
                    </select>{" "}
                    <br />
                    <span className="text-danger">
                      {errors.state_a && errors.state_a.message}
                    </span>{" "}
                    <br />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="ref-3">
                    <p>Ref No:{refNo}</p>
                    <br />
                    <label>
                      Date: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={select.date}
                      {...register("date")}
                      tabIndex="9"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.date && errors.date.message}
                    </span>{" "}
                    <br />
                    <span className="text-danger">
                      {errors.marketing_type && errors.marketing_type.message}
                    </span>{" "}
                    <br />
                    <label>
                      Delivery Date: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      type="date"
                      value={select.delivery_date}
                      {...register("delivery_date")}
                      tabIndex="12"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.delivery_date && errors.delivery_date.message}
                    </span>{" "}
                    <br />
                    <label>Buyer Order No:</label>
                    <br />
                    <input
                      type="text"
                      value={select.buyer_order_no}
                      {...register("buyer_order_no")}
                      tabIndex="14"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.buyer_order_no && errors.buyer_order_no.message}
                    </span>{" "}
                    <br />
                    <label>Buyer Order Date:</label>
                    <br />
                    <input
                      type="date"
                      value={select.buyer_order_date}
                      {...register("buyer_order_date")}
                      tabIndex="15"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.buyer_order_date &&
                        errors.buyer_order_date.message}
                    </span>{" "}
                    <br />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="details">
                    <br />
                    <br />
                    <br />
                    <label>Terms Of Delivery:</label>
                    <br />
                    <textarea
                      cols="25"
                      rows="3"
                      value={select.terms_of_delivery}
                      {...register("terms_of_delivery")}
                      tabIndex="19"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.terms_of_delivery &&
                        errors.terms_of_delivery.message}
                    </span>{" "}
                    <br />
                    <label>Payment:</label>
                    <h6
                      style={{
                        color:
                          select.payment == "before_delivery" ? "red" : "green",
                      }}
                      {...register("payment")}
                    >
                      {deliveryState}
                    </h6>
                    <span className="text-danger">
                      {errors.payment && errors.payment.message}
                    </span>{" "}
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
                      {/* <th>UOM Des</th> */}
                      <th>Unit Price(₹)</th>
                      <th>GST(%)</th>
                      <th>Disc(%)</th>
                      <th>Grand Total (₹)</th>
                      <th>Action</th>
                    </tr>
                    {thearray.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {" "}
                          <ProductSearch
                            data={productGet}
                            ref={productRef}
                            defValue={item.product}
                            onChangeData={(data) => {
                              setProductSelect(data);
  
                              editInput(data.uom, index, "uom");
                              editInput(data.hsn, index, "hsn");
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text "
                            value={item.hsn || ""}
                            disabled
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            value={item.qty || ""}
                            min={0}
                            onChange={(e) => {
                              productChange(e.target.value, "qty");
                            }}
                            style={{ width: "70px" }}
                          />
                        </td>
                        <td>
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
                            <option value="kg">Kg</option>
                            <option value="meter">Meter</option>
                          </select>
                        </td>
                        {/* <td> */}{" "}
                        {/* <input
                            type="checkbox"
                            defaultChecked={descCheck}
                            value={item.uom_desc || ""}
                            onChange={(e) => {
                              editInput(e.target.value, index, "uom_desc");
                            }}
                            style={{ width: "100px" }}
                          /> */}
                        {/* </td> */}
                        <td>
                          <input
                            type="text"
                            
                            value={item.rate || ""}
                            min={0}
                            onChange={(e) =>
                              editInput(e.target.value, index, "rate")
                            }
                            style={{ width: "80px" }}
                          />
                        </td>
                        <td>
                          <select
                            type="text "
                            value={item.gst || ""}
                            onChange={(e) =>
                              editInput(e.target.value, index, "gst")
                            }
                            style={{ width: "50px" }}
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
                            type="number"
                            min={0}
                            style={{ width: "50px" }}
                            value={item.discount || ""}
                            onChange={(e) => {
                              if (e.target.value.length >= 1) {
                                editInput(e.target.value, index, "discount");
                              } else {
                                editInput(0, index, "discount");
                              }
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="number "
                            value={getGtotal(item)}
                            onChange={(e) =>
                              editInput(e.target.value, index, "grandtotal")
                            }
                            style={{ width: "100px" }}
                            disabled
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ backgroundColor: "#dc3545" }}
                            onClick={() => {
                              deleteItem(index);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    
      
                  </thead>
                </table>
                <table className="table  table-bordered">
                  <thead>
                  <tr>
                  <th></th>
                  <th>Product</th>

                  <th>HSN/SAC</th>
                  <th>Qty</th>
                  <th>UOM</th>
                  {/* <th>UOM Desc</th> */}
                  <th>Rate/unit(₹)</th>
                  <th>GST(%)</th>
                  <th>Disc(%)</th>
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
                        console.log(data, "new_data");

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
                      value={add.hsn}
                      disabled
                      style={{ width: "100px" }}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      style={{ width: "50px" }}
                      value={add.qty}
                      // max={parseFloat(stocksQty)}
                      min={0}
                      onChange={(e) => {
                        productChange(e.target.value, "qty");
                      }}
                    />
                    <span className="text-danger">
                      {isError && add.qty == "" && "QTY cannot be empty"}
                    </span>
                  </td>

                  <td>
                    <input
                      type="text"
                      value={add.uom}
                      disabled
                      style={{ width: "100px" }}
                    />
                  </td>

                  {/* <td> */}
                  {/* <input
                      min={0}
                      type="checkbox"
                      defaultChecked={descCheck}
                      value={add.uom_desc}
                      onChange={(e) => {
                        productChange("", "uom_desc");
                        DescChecked(e);
                      }}
                      style={{ width: "100px" }}
                    /> */}
                  {/* </td> */}

                  <td>
                    <input
                      type="number"
                      min={0}
                      style={{ width: "70px" }}
                      ref={inputRef}
                      value={add.rate}
                      onChange={(e) => {
                        getGrandTotal(e);
                      }}
                      onBlur={(e) => checkWarning(e.target.value)}
                    />
                    <span className="text-danger">
                      {isError && add.rate == "" && "Rate cannot be empty"}
                    </span>
                  </td>

                  <td>
                    <select
                      value={add.gst}
                      style={{ width: "70px" }}
                      onChange={(e) => productChange(e.target.value, "gst")}
                    >
                      <option value="select">Select</option>
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
                      min={0}
                      style={{ width: "50px" }}
                      value={add.discount}
                      onChange={(e) => {
                        applyDiscount(e.target.value);
                      }}
                      //  onChange={(e)=>{
                      //   applyDiscount(e.target.value)
                      // }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      style={{ width: "100px" }}
                      value={add.grandtotal}
                      onChange={(e) =>
                        productChange(e.target.value, "grandtotal")
                      }
                      disabled
                    />
                  </td>
                  <button type="button" className="btn btn-outline-warning ps-3 pe-3 mt-3 mb-3 ms-2 " onClick={addUpdate}>
                    Add
                  </button>
                </tr>
                  
                  </thead>
                </table>
              </div>
             
              <br />
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <br />
              <br />
              <div className="row">
                <div className="col-md-10">
                  {/* <textarea cols="30" rows="4">
                  * Invoice should be paid immediately ,Incase of late payment
                  there will be a penality
                </textarea> */}
                </div>
                <div className="col-md-2">
                  <h6>
                    Sub Total (₹):
                    <span>{Math.trunc(subTotal)}</span>
                  </h6>
                  <br />
                  <h6>
                    CGST (₹):
                    <span>{Math.trunc(taxTotal)}</span>
                  </h6>
                  <br />
                  <h6>
                    SGST (₹):
                    <span>{Math.trunc(taxTotal)}</span>
                  </h6>
                  <br />
                  <h6>
                    Grand Total (₹):
                    <span>{Math.trunc(grandTotal)}</span>
                  </h6>
                </div>
              </div>
            </div>
          </form>
        </Tab>
        <Tab eventKey={2} title="Proforma Invoice History">
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
                  className="date ms-1"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </td>
              <td>
                <p className="ms-3">End:</p>
              </td>
              <td>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="date ms-1"
                />
              </td>
              <td>
                <button type="button" className="btn btn-primary ms-3">
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
                actions={<button className="btn btn-primary mt-3 mb-3">Export</button>}
                subHeader
                subHeaderComponent={
                  <input
                    type="search"
                    className="w-25 form-control mb-3"
                    placeholder="SEARCH CUSTOMER NAME/Invoice No"
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
                <div>
                  <tr>
                    <td>
                      <p>TO:(put comma in between for multiple email ids)</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="email" name="email" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>CC:(put comma in between for multiple email ids)</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="email" name="email" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Subject:</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" name="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Message:</p>
                    </td>
                  </tr>
                  <tr style={{ width: "100%" }}>
                    <RichTextEditor value={radd} onChange={handleClose} />
                  </tr>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Tab>
        <div className=" invoice-edit">
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Performa Invoice Edit
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit3(onsubmit3)}>
                <div className="main-cointainer">
                  <div
                    className="row"
                    style={{
                      padding: "20px",
                      border: "1px solid black",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <div className="col-md-3">
                      <div className="buyer">
                        <p>Buyer Address</p>
                        <label>Customer Name:</label>
                        {/* <h5>{values.customer_name}</h5> */}
                        <input
                          type="text"
                          disabled
                          {...register3("customer_name")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors3.customer_name &&
                            errors3.customer_name.message}
                        </span>{" "}
                        <label>Address 1:</label>
                        <br />
                        <input
                          value={select.address}
                          {...register3("address1")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors3.address1 && errors3.address1.message}
                        </span>{" "}
                        <label>Alternate No:</label>
                        <br />
                        <input
                          value={select.mobile_no2}
                          {...register3("mobile_no2")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors3.mobile_no2 && errors3.mobile_no2.message}
                        </span>{" "}
                        <label>Mobile No:</label>
                        <br />
                        <input
                          value={select.mobile_no}
                          {...register3("mobile_no")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors3.mobile_no && errors3.mobile_no.message}
                        </span>{" "}
                        <label>GST No:</label>
                        <br />
                        <input value={select.gst} {...register3("gst")} />
                        <br />
                        <span className="text-danger">
                          {errors3.gst && errors3.gst.message}
                        </span>{" "}
                        <label>Email No:</label>
                        <br />
                        <input value={select.email} {...register3("email")} />
                        <br />
                        <span className="text-danger">
                          {errors3.email && errors3.email.message}
                        </span>{" "}
                        <label>Pin Code:</label>
                        <br />
                        <input
                          value={select.pin_code}
                          {...register3("pin_code")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors3.pin_code && errors3.pin_code.message}
                        </span>{" "}
                        <br />
                        <span className="text-danger">
                          {errors3.pan && errors3.pan.message}
                        </span>{" "}
                        <label>State:</label>
                        <br />
                        <select value={select.state} {...register3("state")}>
                          <option value="select">Select</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Pune">Pune</option>
                          <option value="Goa">Goa</option>
                          <option value="Kerla">Kerla</option>
                          <option value="Chennai">Chennai</option>
                        </select>{" "}
                        <span className="text-danger">
                          {errors3.state && errors3.state.message}
                        </span>{" "}
                        <br />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="delivery">
                        <p>
                          Delivery Address{" "}
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                editCheckbox();
                              } else {
                              }
                            }}
                          />
                          <span>(same as buyer address)</span>
                        </p>
                        <label>Customer Name:</label>
                        <br />
                        <input {...register3("customer_name")} />
                        <br />
                        <span className="text-danger">
                          {errors3.customer_name_a &&
                            errors3.customer_name_a.message}
                        </span>{" "}
                        <label>Address 1:</label>
                        <br />
                        <input {...register3("address1_a")} />
                        <br />
                        <span className="text-danger">
                          {errors3.address1_a && errors3.address1_a.message}
                        </span>{" "}
                        <label>Alternative:</label>
                        <br />
                        <input {...register3("mobile_no2_a")} />
                        <br />
                        <span className="text-danger">
                          {errors3.mobile_no2_a && errors3.mobile_no2_a.message}
                        </span>{" "}
                        <label>Mobile No:</label>
                        <br />
                        <input {...register3("mobile_a")} />
                        <br />
                        <span className="text-danger">
                          {errors3.mobile_a && errors3.mobile_a.message}
                        </span>{" "}
                        <label>GST No:</label>
                        <br />
                        <input {...register3("gst_a")} />
                        <br />
                        <span className="text-danger">
                          {errors3.gst_a && errors3.gst_a.message}
                        </span>{" "}
                        <label>Email No:</label>
                        <br />
                        <input {...register3("email_a")} />
                        <br />
                        <span className="text-danger">
                          {errors3.email_a && errors3.email_a.message}
                        </span>{" "}
                        <label>Pin Code:</label>
                        <br />
                        <input {...register3("pin_code_a")} />
                        <br />
                        <span className="text-danger">
                          {errors3.pin_code_a && errors3.pin_code_a.message}
                        </span>{" "}
                        <label>State:</label>
                        <br />
                        <select {...register3("state_a")}>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Pune">Pune</option>
                          <option value="Goa">Goa</option>
                          <option value="Kerla">Kerla</option>
                          <option value="Chennai">Chennai</option>
                        </select>{" "}
                        <span className="text-danger">
                          {errors3.state_a && errors3.state_a.message}
                        </span>{" "}
                        <br />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="ref-3">
                        <p>Ref No:{values.refNo}</p>
                        <label>Date:</label>
                        <br />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          {...register3("date")}
                        />
                        <span className="text-danger">
                          {errors3.date && errors3.date.message}
                        </span>{" "}
                        <br />
                        <br />
                        <label>Delivery Date:</label>
                        <br />
                        <input type="date" {...register3("delivery_date")} />
                        <span className="text-danger">
                          {errors3.delivery_date &&
                            errors3.delivery_date.message}
                        </span>{" "}
                        <br />
                        <label>Buyer Order No:</label>
                        <br />
                        <input type="text" {...register3("buyer_order_no")} />
                        <span className="text-danger">
                          {errors3.buyer_order_no &&
                            errors3.buyer_order_no.message}
                        </span>{" "}
                        <br />
                        <label>Buyer Order Date:</label>
                        <br />
                        <input type="date" {...register3("buyer_order_date")} />
                        <span className="text-danger">
                          {errors3.buyer_order_date &&
                            errors3.buyer_order_date.message}
                        </span>{" "}
                        <br />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="details">
                        <br />
                        <br />
                        <label>Terms Of Delivery:</label>
                        <br />
                        <textarea
                          cols="25"
                          rows="3"
                          {...register3("terms_of_delivery")}
                        />
                        <span className="text-danger">
                          {errors.terms_of_delivery &&
                            errors.terms_of_delivery.message}
                        </span>{" "}
                        <br />
                        <label>Payment:</label>
                        <h6
                          style={{
                            color:
                              select.payment == "before_delivery"
                                ? "red"
                                : "green",
                          }}
                          {...register3("terms_of_delivery")}
                        >
                          {deliveryState}
                        </h6>{" "}
                        <span className="text-danger">
                          {errors3.payment && errors3.payment.message}
                        </span>{" "}
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
                          {/* <th>UOM Desc</th> */}
                          <th>Unit Price(₹)</th>
                          <th>GST(%)</th>
                          <th>Disc(%)</th>
                          <th>Grand Total (₹)</th>
                          <th>Action</th>
                        </tr>
                        {thearray_edit.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              {" "}
                              <ProductSearch
                                data={productGet}
                                ref={productRef}
                                defValue={item.product}
                                onChangeData={(data) => {
                                  setProductSelect(data);
                                  // handleSupplierProduct(data.id);
                                  editInput(data.uom, "uom");
                                  // editInput(data.hsn, "hsn");
                                }}
                              />
                            </td>
  
                            <td>
                              <input
                                type="text "
                                value={item.hsn || ""}
                                disabled
                                onChange={(e) =>
                                  editInput(e.target.value, index, "hsn")
                                }
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td>
                              {" "}
                              <input
                                type="text "
                                value={item.qty || ""}
                                min={0}
                                onChange={(e) => {
                                  productChange(e.target.value, "qty");
                                }}
                                style={{ width: "70px" }}
                              />
                            </td>
                            <td>
                              <select
                                type="text "
                                value={item.uom || ""}
                                
                                onChange={(e) =>
                                  editInput(e.target.value, index, "uom")
                                }
                                style={{ width: "70px" }}
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
                            {/* <td>
                              {" "} */}
                            {/* <input
                                type="checkbox"
                                //  defaultChecked={descCheck}
                                value={item.uom_desc || ""}
                                onChange={(e) => {
                                  editInput(e.target.value, index, "uom_desc");
                                }}
                                style={{ width: "100px" }}
                              /> */}
                            {/* </td> */}
                            <td>
                              <input
                                type="text"
                                min={0}
                                value={item.rate || ""}
                                onChange={(e) =>
                                  editInput(e.target.value, index, "rate")
                                }
                                style={{ width: "70px" }}
                              />
                            </td>
                            <td>
                              <select
                                type="text "
                                className="GST"
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
                                type="number"
                                min={0}
                                value={item.discount || ""}
                                onChange={(e) =>
                                  editInput(e.target.value, index, "discount")
                                }
                              />
                            </td>
  
                            <td>
                              <input
                                type="number "
                                value={getGtotal(item)}
                                onChange={(e) =>
                                  editInput(e.target.value, index, "grandtotal")
                                }
                                style={{ width: "200px" }}
                                disabled
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                style={{ backgroundColor: "#dc3545" }}
                                onClick={() => {
                                  deleteItem2(index);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </thead>
                      
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
                          {/* <th>UOM Desc</th> */}
                          <th>Rate/unit(₹)</th>
                          <th>GST(%)</th>
                          <th>Disc(%)</th>
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
                                console.log(data, "qwreiul");
                                saveOldQty(data);
                              }}
                            />
                          </td>

                          <td>
                            <input type="text" value={add.hsn} disabled />
                          </td>

                          <td>
                            <input
                              type="text "
                              value={add.qty}
                              min={0}
                              onChange={(e) => {
                                productChange(e.target.value, "qty");
                              }}
                            />
                          </td>

                          <td>
                            <input value={add.uom}  />
                          </td>
                          {/* <td> */}
                          {/* <input
                              min={0}
                              type="checkbox"
                              // defaultChecked={descCheck}
                              value={add.uom_desc}
                              onChange={(e) => {
                                productChange("", "uom_desc");
                                DescChecked(e);
                              }}
                              style={{ width: "100px" }}
                            /> */}
                          {/* </td> */}

                          <td>
                            <input
                              type="number"
                              min={0}
                              value={add.rate}
                              onChange={(e) => {
                                getGrandTotal(e);
                              }}
                            ></input>
                          </td>

                          <td>
                            <select
                              value={add.gst}
                              className="GST"
                              onChange={(e) =>
                                productChange(e.target.value, "gst")
                              }
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
                            {" "}
                            <input
                              type="number"
                              min={0}
                              value={add.discount}
                              onChange={(e) => {
                                applyDiscount(e.target.value);
                              }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={add.grandtotal}
                              onChange={(e) =>
                                productChange(e.target.value, "grandtotal")
                              }
                              disabled
                            />
                          </td>
                          <button type="button" onClick={addUpdate_edit}>
                            Add
                          </button>
                        </tr>
                      </tbody>
                    </table>{" "}
                  </div>
                  <br />
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <br />

                  <div
                    style={{
                      textAlign: "end",
                    }}
                  >
                    <h6>
                      Sub Total (₹):
                      <span>{subTotal2}</span>
                    </h6>
                    <br />
                    <h6>
                      CGST (₹):
                      <span>{taxTotal2}</span>
                    </h6>
                    <br />
                    <h6>
                      SGST (₹):
                      <span>{taxTotal2}</span>
                    </h6>
                    <br />
                    <h6>
                      Grand Total (₹):
                      <span>{grandTotal2}</span>
                    </h6>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </Tabs>
      <div>
        <Snackbar
          open={toast}
          autoHideDuration={3000}
          onClose={() => setToast(false)}
          ClickAwayListenerProps={{
            mouseEvent: false,
            vertical: "bottom",
            horizontal: "center",
          }}
          direction="left"
        >
          <Alert
            onClose={() => setToast(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            The selling price is less than threshold
          </Alert>
        </Snackbar>
      </div>
      <div>
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
    </div>
  );
}

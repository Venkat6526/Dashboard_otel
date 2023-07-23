import { yupResolver } from "@hookform/resolvers/yup";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import { useLocation } from "react-router-dom";
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
import moment from "moment";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import url from "../../views/config";
import {
  
  PutAPI,
  deleteAPI,
  getAPI,
  postAPI,
} from "../../apiServices/AxiousFetch";
import DynamicSearch from "../../components/AutoComplete/DynamicSearch";
import ProductSearch from "../../components/AutoComplete/ProductSearch";
import SupplierSearch from "../../components/AutoComplete/SupplierSearch";
// import InvoiceTransport from "../../components/AutoComplete/reactselect/InvoiceTransport";
import apinames from "../../apiServices/ApiConstant";
import { Toast } from "bootstrap";
import { Alert, Snackbar } from "@mui/material";
import FunctionAlert from "../alert/FunctionAlertInvoice";
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
  supplier_name: "", // to store in database
  supplier_id: 0, // to store in database3
};
$("body").on("change",".make_approved",function(){
  if(window.confirm("Are you sure?")){
  var id=$(this).attr("ids")
  var v=$(this).val()
  $.ajax({
    url:url.server_url+apinames.make_approved,
    data:{id:id,v:v},
    type:"POST",
    dataType:"JSON",
    success:function(data){
  window.location.reload();
    },
    error:function(xhr){
  
    }
  
  })
  return true;
}
  });


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
    .matches(/^[a-zA-Z0-9]{15}$/, "Please enter a valid GST number"),
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
      ["Karnataka", "Pune", "Goa", "Kerala", "Chennai"],
      "Please select a state"
    ),
  date: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date is required")
    .nullable(),

  marketing_type: yup
    .string()
    .required("Market Type is required")
    .oneOf(["digital", "cash"], "Please select a marketing type"),

  delivery_date: yup
    .date()
    .typeError("Please enter a valid delivery date")
    .required("Delivery Date is required")
    .nullable(),
  dispatch_through: yup
    .string()
    .required(" Dispatch is required")
    .oneOf(["vrl", "ideal", "by hand"], "Please select a dispatch through"),
  dispatch_from: yup
    .string()
    .required(" Dispatch From is required")
    .oneOf(
      ["office", "manufacturing unit", "ware house"],
      "Please select a  dispatch from"
    ),
});

export default function Invoice() {
  const [reload, setReload] = useState(false);
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
  const [supplierProduct, setSupplierProduct] = useState([]);
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
  const [grandTotal, setGrandTotal] = useState(0.0);

  const [subTotal2, setSubTotal2] = useState(0);
  const [taxTotal2, setTaxTotal2] = useState(0);
  const [grandTotal2, setGrandTotal2] = useState(0.0);

  const [deliveryState, setDeliveryState] = useState("");
  const [oldGrandTotal, setOldGrandTotal] = useState(0);
  const [key, setKey] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);
  const [select, setSelect] = useState({}); //autocomplete
  const [eedit, setEedit] = useState(""); /// to store in id in setvalue product
  const [show, setShow] = useState(false);
  const handleClose = () => setShow1(false);
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
  const location = useLocation();
  const [getApprovalGet, setApprovalGet] = useState([]);
  const [apiApproval, setApprovalApi] = useState([]);
  

  

  const [person_num,set_num]=useState(0);
  const [unique_id,set_id]=useState(0);
  const [show1,setShow1]=useState(0);
  const [show2,setShow2]=useState(0);

    
$("body").on("input","#additional_mobile",function(e){
  var id=$(this).val()
  set_num(id)
});
$("body").on("click","#send_whatsapp4",function(e){
  
  
  setShow1(true)
});
console.log(unique_id);
$("body").on("click","#send_whatsapp3",function(e){

  if(window.confirm("Are you sure?")){
  $.ajax({
    "url":url.whatsapp_url+"/send_whatsapp_qtn.php",
    data:{id:unique_id}, 

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
    
    
})}
e.stopImmediatePropagation();
return false;

 });

$("body").on("click",".send_whatsapp1",function(e){
  var id=$(this).val()
  set_id(id);
  setShow2(true)
});
$("#send_whatsapp").off('click').on("click",function(e){

  
   
  if(window.confirm("Are you sure?")){
      $(".send_whatsapp").attr("disabled",true)
  var id=$(this).val()
  $.ajax({
      "url":url.whatsapp_url+"/send_whatsapp_qtn.php",
      data:{id:unique_id,additional_mobile:person_num}, 

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
//       $(".send_whatsapp").attr("disabled",true)
//   var id=$(this).val()
//   $.ajax({
//       "url":url.whatsapp_url+"/send_whatsapp_qtn.php",
//       data:{id:unique_id,additional_mobile:person_num}, 

//       type:"POST",
//       dataType:"json",
//       success:function(data){
//           alert("WhatsApp sent")
//            $(".send_whatsapp").removeAttr("disabled")
//       },
//       error:function(data){
//           alert(data.responseText)
//             $(".send_whatsapp").removeAttr("disabled")
//       }
      
      
//   })
//   return true
//   }
//    return false
// }) 

  // console.log(location.main, "check Location");
  // console.log(location.product, "check Location");


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
    // setTimeout(checkWarning, 1,e.target.value);
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
      setSubTotal2(0);
      setTaxTotal2(0);
      setGrandTotal2(0);
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

      //  gstValue = parseFloat(i.gst) / 100;
      //  gsttotal =parseFloat(gsttotal)+ (parseFloat(i.rate) * parseFloat(i.qty) * gstValue);
      //  subtotal =parseFloat(subtotal)+ (parseFloat(i.rate) * parseFloat(i.qty))-discountValue;
      //  grtotal =parseFloat(gsttotal) + parseFloat(subtotal);
       
      setSubTotal2(subtotal);
      setTaxTotal2(gsttotal/2);
      //grtotal=grtotal-(grtotal*discountFactor)
      setGrandTotal2(grtotal);
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

     // let editData = [];
    // editData = [...thearray];
    // editData[i][data] = dis;
    // setThearray(editData);
    // getGrandTotal(dis);
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
      add.supplier_name == "" ||
      add.supplier_id == "" ||
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
      supplierRef.current.clearSupplierValue();
      var remove = [...thearray, add];

      setThearray(remove);
      revisedGTotal(remove);
      //revisedDisGTotal(remove)
    }
  };
    //------------------------ADD button update------------------//
    const addUpdate_edit = () => {
      if (
        add.product == "" ||
        add.supplier_name == "" ||
        add.supplier_id == "" ||
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
        supplierRef.current.clearSupplierValue();
        var remove = [...thearray_edit, add];
  
        setThearray_edit(remove);
        revisedGTotal2(remove);
        //revisedDisGTotal(remove)
      }
    };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleOnlinePaymentTypeChange = (event) => {
    setOnlinePaymentType(event.target.value);
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
      width: "60px",
    },
    {
      name: "Invoice No",
      selector: (row) => row.main.invoice_no,
      width: "120px",
    },
    {
      name: "In Date",
      selector: (row) => row.main.date,
      width: "95px",
    },
    {
      name: "customer_name",
      selector: (row) => row.main.customer_name,
      width: "130px",
      color: "#fff",
    },
    {
      name: "Mobile",
      selector: (row) => row.main.mobile_no,
      width: "90px",
    },
    {
      name: "Email Status",
      selector: (row) => row.main.email,
      width: "130px",
    },
    {
      name: "Created_by",
      selector: (row) => row.main.created_by,
      color: "#fff",
      width: "90px",
    },
    {
      name: "Action",
      selector: (row) => row.main.Action,
      width: "480px",
      cell: (row) => (
        <>
          <PaymentsRoundedIcon
            style={{ color: "76FF03", fontSize: "47px" }}
            onClick={() => {
              editOpen();
              // setGet()
              setInvData(row.main);
              HandleCustomerId(row.main);
            }}
          />

          <MailOutlineOutlinedIcon
            style={{ color: "F44336", marginLeft: "5px", fontSize: "47px" }}
            onClick={() => handleShow()}
          />

          <button
            className="btn btn-secondary"
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
          <Link
            to={{ pathname: "/InvoiceTransportTruck", state: row.main }}
            className="btn btn-warning"
            style={{ marginLeft: "4px" }}
          >
            <i className="fa fa-truck" aria-hidden="true ">
              {" "}
            </i>
          </Link>
          <Link
            to={{ pathname: "/InvoiceFollowUp", state: row.main }}
            className="btn btn-info"
            style={{ marginLeft: "4px" }}
          >
            <i
              class="fa fa-phone fa-2xs text-white"
              style={{ color: "#15abd1" }}
            ></i>
          </Link>
          <a
            href={url.pdf_url+`/pdf_invoice.php?id=${row.main.id}`}
          >
            <button type="button" className="btn btn-outline-dark ms-1">
              PDF
            </button>
          </a>
          <button
            className="btn btn-outline-warning send_whatsapp1 ms-1"
           value={row.main.id}
          >
           <i className="fa fa-whatsapp" style={{color:"#075e54",fontSize:"25px"}}></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ms-1"
            title="Delivery"
            style={{cursor:"pointer"}}
            onClick={() => {
              DeliveryOpen();
              setIsChecked(row.main.check_delivered == 1 ? true : false);
              setEedit(row.main.id);
            }}
          >
           <i className="fa fa-truck"></i>
          </button>
        </>
      ),
    },
  ];
  const columns1 = [
    {
      name: "sl_no",
      selector: (row, index) => row.main.id,
      width: "40px",
    },
    {
      name: "Invoice No",
      selector: (row) => row.main.invoice_no,
      width: "150px",
    },
    {
      name: "In Date",
      selector: (row) => row.main.date,
      width: "170px",
    },
    {
      name: "customer_name",
      selector: (row) => row.main.customer_name,
      width: "150px",
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
      width: "100px",
    },
    {
      name: "Created_by",
      selector: (row) => row.main.created_by,
      color: "#fff",
      width: "100px",
    },
    {
      name: "Action",
      selector: (row) => row.main.Action,
      width: "500px",
      cell: (row) => (
        <>
         

          <button
            className="btn btn-primary"
            style={{ marginLeft: "4px" }}
            onClick={() => {
              isDisplay(row.main, row.product);
              setLgShow(true);
              setIsEdit(true);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          &nbsp;
         <select className="make_approved" ids={row.main.id}>
          <option value="">--Select for Approved--</option>
          <option value="1">Approved</option>
         </select>
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
  const {
    register: register2,

    setValue: setValue2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
   
  });

  //----------invoice Edit---------------//
  const {
    register: register3,
    setValue: setValue3,
    watch,
    reset: reset2,
    formState: { errors: errors3 },
    handleSubmit: handleSubmit3,
  } = useForm({});
  const values = watch();
  //---------------checkbox click--------------------------//

  const editCheckbox = () => {
    setValue("customer_name_a", select.customer_name);
    setValue("address1_a", getValues("address"));
    setValue("mobile_no2_a", getValues("mobile_no2"));
    setValue("mobile_no_a", getValues("mobile_no"));
    setValue("email_a", getValues("email"));
    setValue("pin_code_a", getValues("pin_code"));
    setValue("gst_a", getValues("gst"));
    setValue("state_a", getValues("state"));

    // setValue("address", data.address);
    // setValue("mobile_no", data.mobile_no);
    // setValue("mobile_no2", data.mobile_no2);
    // setValue("gst", data.gst);
    // setValue("email", data.email);
    // setValue("pin_code", data.pin_code);
    // setValue("state", data.state);
  };
  // const editCheckbox2 = () => {
  //   setValue("customer_name_a", select.customer_name);
  //   setValue("address1_a", select.address);
  //   setValue("mobile_no2_a", select.mobile_no2);
  //   setValue("mobile_no_a", select.mobile_no);
  //   setValue("email_a", select.email);
  //   setValue("pin_code_a", select.pin_code);
  //   setValue("gst_a", select.gst);
  //   setValue("state_a", select.state);
  // };

  const editCheckbox2 = () => {
    setValue("customer_name_a", select.customer_name);
    setValue("address1_a", getValues("address"));
    setValue("mobile_no2_a", getValues("mobile_no"));
    setValue("mobile_no_a", getValues("mobile_no2"));
    setValue("email_a", getValues("email_a"));
    setValue("pin_code_a", getValues("pin_code"));
    setValue("gst_a", getValues("gst"));
    setValue("state_a", getValues("state"));
  };

  const performaEdit = () => {
    console.log(location.state.main, "checkkkkkkk");
    setValue("customer_name", location.state.main.customer_name);
    setValue("address", location.state.main.address1);
    setValue("mobile_no", location.state.main.mobile_no);
    setValue("mobile_no2", location.state.main.mobile_no2);
    setValue("gst", location.state.main.gst_no);
    setValue("email", location.state.main.email);
    setValue("pin_code", location.state.main.pin_code);
    setValue("state", location.state.main.state);

    setValue("customer_name_a", location.state.main.customer_name_a);
    setValue("address1_a", location.state.main.address1_a);
    setValue("mobile_no_a", location.state.main.mobile_no_a);
    setValue("mobile_no2_a", location.state.main.mobile_no2_a);
    setValue("gst_a", location.state.main.gst_no);
    setValue("email_a", location.state.main.email_a);
    setValue("pin_code_a", location.state.main.pin_code_a);
    setValue("state_a", location.state.main.state_a);

    setValue(
      "date",
      moment(location.state.main.date).format('YYYY-MM-DD')
    );
    setValue(
      "delivery_date",
      moment(location.state.main.delivery_date).format('YYYY-MM-DD')
    );
    setValue("buyer_order_no", location.state.main.buyer_order_no);
    setValue(
      "buyer_order_date",
      moment(location.state.main.buyer_order_date).format('YYYY-MM-DD')
    );
    setValue("terms_of_delivery", location.state.main.terms_of_delivery);
    setValue("grand_total", location.state.main.grand_total);
    setValue("new_grand_total", location.state.main.new_grand_total);
    setOldGrandTotal(location.state.main.grand_total);
    setThearray(location.state.product);
  };

  const isDisplay = (data, prodArray) => {
    setSubTotal2(0);
    setTaxTotal2(0);
    setGrandTotal2(0);
    setEedit(data.id);
    setValue3("id", data.customer_id);
    setValue3("refNo", data.invoice_no);
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
    setValue3("marketing_type", data.marketing_type);
    setValue3(
      "delivery_date",
      moment(data.delivery_date).format('YYYY-MM-DD')
    );
    setValue3("delivery_note", data.delivery_note);
    setValue3("mode", data.mode);
    setValue3("buyer_order_no", data.buyer_order_no);
    setValue3(
      "buyer_order_date",
      moment(data.buyer_order_date).format('YYYY-MM-DD')
    );
    setValue3("dispatch_no", data.dispatch_no);
    setValue3("dispatch_through", data.dispatch_through);
    setValue3("dispatch_from", data.dispatch_from);
    setValue3("terms_of_delivery", data.terms_of_delivery);
    setValue3("payment", data.payment);
    setValue3("debit", data.debit);
    setValue3("credit", data.credit);
    setValue3("balance", data.balance);
    //setGrandTotal(data.grand_total);
    setOldGrandTotal(data.grand_total);
    setThearray_edit(prodArray);
    setValue3("payment", data.payment);
    //--------------------olq qty we are storing for stocks
    setMasterArrayObject(
      prodArray.map((item) => ({ ...item, oldQty: item.qty }))
    );
    revisedGTotal2(prodArray)
    //revisedDisGTotal(prodArray);
    //setThearray(prodArray.map((item) => ({ ...item, oldQty: item.qty })));
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
    if (location.state != undefined) {
      performaEdit();
    }
  }, []);

  useEffect(() => {
    getAPI(apinames.GET_INVOICE)
      .then((response) => {
        let reversedData = response.data.slice().reverse();
        setRefNo(response.number);
        setGet(reversedData);
        setApi(reversedData);
      
      })
      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get invoice

// var created_by=localStorage.getItem("ootel_admin_created_by")
      // postAPI(apinames.GET_INVOICE_PENDING,{created_by:created_by})
      postAPI(apinames.GET_INVOICE_PENDING)
      .then((response) => {
        let reversedData = response.data.slice().reverse();
        setRefNo(response.number);
        setApprovalGet(reversedData);
        setApi(reversedData);
      })
      .catch((error) => {
        console.log(error, "api error");
      }); 
    getAPI(apinames.GET_CUSTOMER_MASTER)
      .then((response) => {
        setCGet(response.data);
      })

      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get customer_master

    getAPI(apinames.GET_SUPPLIER_MASTER)
      .then((response) => {
        setSupplierGet(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get supplier master

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
  }, [reload]);

  const HandleCustomerId = (id) => {
    getAPI(apinames.GET_CUSTOMER_DETAILS + id.customer_id)
      .then((response) => {
        console.log(response.data, "customer payments id");
        setCustomerId(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get customer id

    getAPI(apinames.GET_CUSTOMER_INVOICE_ID + id.id)
      .then((response) => {
        console.log(response.data, "customer invoice id");
        setCustomerInvoiceId(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      });
    //-------------------------------------------------------------------------get customer invoice
    getAPI(apinames.GET_CUSTOMER_INVOICE_ID + id.id)
      .then((response) => {
        console.log(response.data, "customer invoice id");
        setCustomerInvoiceId(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      });

    //-------------------------------------------------------------------------get customer invoice

    getAPI(apinames.GET_DELIVERY_SALES_EXECUTIVE)
      .then((response) => {
        console.log(response.data, "delivery sales executive");
        let dataStored = response.data;
        setRole(
          dataStored.map((item) => ({
            value: item,
            label: item.name + ` (${item.type})`,
          }))
        );
        // setRole(response.data)
      })
      .catch((error) => {
        console.log(error, "api error");
      });
    //-------------------------------------------------------------------------get customer delivery sales executive
  };

  const handleSupplierProduct = (id) => {
    getAPI(apinames.GET_SUPPLIER_PRODUCT_PURCHASE_LEDGER + id)
      .then((response) => {
        console.log(response.data, "supplier product data");
        setSupplierProduct(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      });
  };
  //-------------------------------------------------------------------------get supplier product purchase ledger

  const HandleStocks = (pid, sid) => {
    console.log(pid, sid, "=====asdasdasdasd");
    getAPI(apinames.GET_SUPPLIER_PRODUCT + pid + "/" + sid)
      .then((response) => {
        if(response.data.length==0){
          setStocksQty(0);return;
        }
        let stock_balance = 0;
        let tempData = response.data[0];
        stock_balance = parseFloat(tempData.inward) - parseFloat(tempData.outward);
        setStocksQty(stock_balance);
        console.log(stock_balance, "stock_balance");
        // Post the invoice
      })
      .catch((error) => {
        console.error("There was an error fetching supplier stocks: " + error);
      });
  };

  const onsubmit = (data) => {
    var created_by=localStorage.getItem("ootel_admin_created_by");
    console.log(thearray.length,'asdderdsafbhaterwfds');
    if(thearray.length>0){

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

      date: moment(data.date).format('YYYY-MM-DD'),
      created_by: created_by,
      marketing_type: data.marketing_type,
      delivery_date: moment(data.delivery_date).format('YYYY-MM-DD'),
      delivery_note: data.delivery_note,
      mode: data.mode,
      buyer_order_no: data.buyer_order_no,
      buyer_order_date: moment(data.buyer_order_date)
      .format('YYYY-MM-DD'),
      dispatch_no: data.dispatch_no,
      dispatch_through: data.dispatch_through,
      dispatch_from: data.dispatch_from,
      terms_of_delivery: data.terms_of_delivery,
      grand_total: grandTotal,
      new_grand_total: oldGrandTotal,
      productArray: thearray,
      credit: select.credit,
      debit: select.debit,
      balance: select.balance,
      customer_id: select.id,
    };
    
    console.log(thearray, "data");


    postAPI(apinames.POST_INVOICE, postData)
      .then((response) => {
        console.log(response, "sssssss");
        var status_code = response.status_code;
        let alert_data;
       
        if (status_code == 200) {
          // setShowPreview(false);

          alert_data = {
            code: status_code,
            data: ["Invoice Submitted Successfully"],
          };
          setAlertData(alert_data);
          setShowAlert(true);
          reset();
          setTimeout(() => {
            setShowAlert(false);
            setReload(true);
            window.location.reload();
          }, 1000);
        } else if (status_code == 400) {
          // setShowPreview(false);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            setReload(true);
            window.location.reload();
          }, 1000);
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
    }
    else{
      alert("product field  is mandatory")
    }

  };

  const onSubmit2 = (data1) => {
    
    console.log(data1, "aaaaaa");
    const PostData = {
      // id: customerEdit,

      type: 1,
      entity_id: invData.customer_id, //invoice customer id
      name: invData.customer_name,
      payment_date: data1.payment_date, //present date
      payment_description: data1.payment_description,
      payment_mode: paymentMethod, //should come from invoice_no
      amount: data1.amount, // add and stoe in customer payments
      remarks: invData.in_no, // auto populate
      sales_executive: invData.marketing_type, // auto populate
      invoice_id: invData.id,

      //balance,credit,debit will come from customer_master
      balance: customerId.balance,
      credit: customerId.credit,
      debit: customerId.debit,
      newAmount: newAmount,
      executive_type: data1.name != undefined ? data1.name.value.type : "",
      executive_name: data1.name != undefined ? data1.name.value.role : "",
      payment_bank: data1.payment_bank,
    };

    postAPI(apinames.POST_PAYMENTS, PostData)
      .then((response) => {
        console.log(response, "post");
        var status_code = response.status_code;
        if (status_code == 200) {
          alert("sucessful");
           window.location.reload();
        } else if (status_code == 400) {
          alert(JSON.stringify(response.data));
          console.log(response.message, "response.message");
        }
      })
      .catch((error) => {
        console.log(error, "api error");
      });
  };
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
      marketing_type: data2.marketing_type,
      delivery_date: data2.delivery_date,
      delivery_note: data2.delivery_note,
      mode: data2.mode,
      buyer_order_no: data2.buyer_order_no,
      buyer_order_date: data2.buyer_order_date,
      dispatch_no: data2.dispatch_no,
      dispatch_through: data2.dispatch_through,
      dispatch_from: data2.dispatch_from,
      terms_of_delivery: data2.terms_of_delivery,
      grand_total: grandTotal,
      new_grand_total: oldGrandTotal,
      productArray: thearray_edit,
      credit: data2.credit,
      debit: data2.debit,
      balance: data2.balance,
  
 

      //im using data1 not select bwcause i have use get method inside this only and edit doesnt have autocomplete
    };
    postAPI(apinames.PUT_INVOICE, editData1)
      .then((response) => {
        var status_code = response.status_code;
        let alert_data;
        if (response.status_code === 200) {
          setLgShow(false);
          // setShowPreview(false)
          
          alert_data = {
            code: response.status_code,
            data: "Invoice Submitted Successfully",
          };
          setAlertData(alert_data);
          setShowAlert(true);
          reset2();
          setTimeout(() => {
            setShowAlert(false);
            setReload(true);
             window.location.reload()
          }, 1000);
        } else if (response.status_code == 400) {
          setLgShow(false);
          // setShowPreview(false)
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            setReload(true);
          }, 1);
          alert_data = {
            code: response.status_code,
            data: response.data,
          };
          setAlertData(alert_data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("product data cannot be empty");
      });
  };

  const handleDelivery = () => {
    console.log(eedit, "eedit");
    console.log(isChecked, "isChecked");

    let delivery = {
      check_delivered: isChecked ? 1 : 0,
    };
    let check_delivered= isChecked ? 1 : 0;
    getAPI(apinames.PUT_DELIVERY + eedit+"<>"+check_delivered+"<>invoice_main").then((response) => {
      var status_code = response.status_code;
      if (status_code == 200) {
         window.location.reload();
      }
    });
  };

  //---------------------delete api-------------------//

  const deleteHandle = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_INVOICE + id).then((response) => {
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
  const deleteItem_edit = (e) => {
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

  const handleProductChange = (selectedOption) => {
    console.log("aesyu", selectedOption);
    setValue2("name", selectedOption);
  };

  // const DescChecked = (e) => {
  //   if (e.target.checked) {
  //     setDescCheck(true);
  //     productChange("", "uom_desc");
  //     editInput("", "uom_desc");
  //   } else {
  //     setDescCheck(false);
  //   }
  // };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
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
        <Tab eventKey={1} title="Invoice">
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

                        setValue("address", data.address);
                        setValue("mobile_no", data.mobile_no);
                        setValue("mobile_no2", data.mobile_no2);
                        setValue("gst", data.gst);
                        setValue("email", data.email);
                        setValue("pin_code", data.pin_code);
                        setValue("state", data.state);

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
                    <label>Address :</label>
                    <br />
                    <input disabled {...register("address")} />
                    <br />
                    <span className="text-danger">
                      {errors.address && errors.address.message}
                    </span>{" "}
                    <br />
                    <label>Mobile No:</label>
                    <br />
                    <input disabled {...register("mobile_no")} />
                    <br />
                    <span className="text-danger">
                      {errors.mobile_no && errors.mobile_no.message}
                    </span>{" "}
                    <br />
                    <label>Alternate No:</label>
                    <br />
                    <input disabled {...register("mobile_no2")} />
                    <span className="text-danger">
                      {errors.mobile_no2 && errors.mobile_no2.message}
                    </span>{" "}
                    <br />
                    <br />
                    <label>GST No:</label>
                    <br />
                    <input disabled {...register("gst")} />
                    <br />
                    <span className="text-danger">
                      {errors.gst && errors.gst.message}
                    </span>{" "}
                    <br />
                    <label>Email No:</label>
                    <br />
                    <input disabled {...register("email")} />
                    <br />
                    <span className="text-danger">
                      {errors.email && errors.email.message}
                    </span>{" "}
                    <br />
                    <label>Pin Code:</label>
                    <br />
                    <input disabled {...register("pin_code")} />
                    <br />
                    <span className="text-danger">
                      {errors.pin_code && errors.pin_code.message}
                    </span>{" "}
                    <br />
                    <label>State:</label>
                    <br />
                    <select disabled className="state" {...register("state")}>
                      <option value="select">Select</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Pune">Pune</option>
                      <option value="Goa">Goa</option>
                      <option value="Kerala">Kerala</option>
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
                            setValue("customer_name_a", "");
                            setValue("address1_a", "");
                            setValue("mobile_no2_a", "");
                            setValue("mobile_no_a", "");
                            setValue("email_a", "");
                            setValue("pin_code_a", "");
                            setValue("gst_a", "");
                            setValue("state_a", "");
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
                    <br />
                    <label>
                      Address : <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input {...register("address1_a")} tabIndex="2" />
                    <br />
                    <span className="text-danger">
                      {errors.address1_a && errors.address1_a.message}
                    </span>{" "}
                    <br />
                    <label>Mobile No:</label>
                    <br />
                    <input disabled {...register("mobile_no_a")} />
                    <br />
                    <span className="text-danger">
                      {errors.mobile_no && errors.mobile_no.message}
                    </span>{" "}
                    <br />
                    <label>Alternate No:</label>
                    <br />
                    <input disabled {...register("mobile_no2")} />
                    <span className="text-danger">
                      {errors.mobile_no2 && errors.mobile_no2.message}
                    </span>{" "}
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
                    <select {...register("state_a")} className="state" tabIndex="8">
                      <option value="select">Select</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Pune">Pune</option>
                      <option value="Goa">Goa</option>
                      <option value="Kerala">Kerala</option>
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
                     className="date"
                      name="date"
                      {...register("date")}
                      tabIndex="9"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.date && errors.date.message}
                    </span>{" "}
                    <br />
                    <label>
                      Marketing type: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select className="Market" {...register("marketing_type")} tabIndex="10">
                      <option value="select">select</option>
                      <option value="digital">digital</option>
                      <option value="cash">cash</option>
                    </select>{" "}
                    <br />
                    <span className="text-danger">
                      {errors.marketing_type && errors.marketing_type.message}
                    </span>{" "}
                    <br />
                    <label>Delivery Note:</label>
                    <br />
                    <input
                      type="text"
                      {...register("delivery_note")}
                      tabIndex="11"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.delivery_note && errors.delivery_note.message}
                    </span>{" "}
                    <br />
                    <label>
                      Delivery Date: <span className="text-danger">*</span>
                    </label>
                    <br />
                    <input
                      type="date"
                      {...register("delivery_date")}
                      tabIndex="12"
                     className="date"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.delivery_date && errors.delivery_date.message}
                    </span>{" "}
                    <br />
                    <label>Mode:</label>
                    <br />
                    <input
                      type="text"
                      {...register("mode")}
                      tabIndex="13"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.mode && errors.mode.message}
                    </span>{" "}
                    <br />
                    <label>Buyer Order No:</label>
                    <br />
                    <input
                      type="text"
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
                      className="date"
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
                    <label>Dispatch No:</label>
                    <br />
                    <input
                      type="text"
                      {...register("dispatch_no")}
                      tabIndex="16"
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors.dispatch_no && errors.dispatch_no.message}
                    </span>{" "}
                    <br />
                    <label>
                      Dispatch Through : <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select className="Market" {...register("dispatch_through")} tabIndex="17">
                      <option value="select">Select</option>
                      <option value="vrl">VRL</option>
                      <option value="ideal">Ideal</option>
                      <option value="by hand">By Hand</option>
                    </select>{" "}
                    <br />
                    <span className="text-danger">
                      {errors.dispatch_through &&
                        errors.dispatch_through.message}
                    </span>{" "}
                    <br />
                    <label>
                      Dispatch From : <span className="text-danger">*</span>
                    </label>
                    <br />
                    <select className="Market" {...register("dispatch_from")} tabIndex="18">
                      <option value="select">Select</option>
                      <option value="office">Office</option>
                      <option value="manufacturing unit">
                        Manufacturing Unit
                      </option>
                      <option value="ware house">Ware House</option>
                    </select>{" "}
                    <br />
                    <span className="text-danger">
                      {errors.dispatch_from && errors.dispatch_from.message}
                    </span>{" "}
                    <br />
                    <label>Terms Of Delivery:</label>
                    <br />
                    <textarea
                      cols="25"
                      rows="3"
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
                      <th>Supplier</th>
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
                    <br />
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Supplier</th>
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
                            handleSupplierProduct(data.id);
                            setProductSelect(data);
                            productChange(data.uom, "uom");
                            productChange(data.hsn, "hsn");
                            productChange(data.product_name, "product"); // to store product_name
                            productChange(data.id, "product_id"); //to sore product_id in databse
                          }}
                        />
                      </td>
                      <td>
                        <SupplierSearch
                          data={supplierGet}
                          defValue={add.supplier_name}
                          ref={supplierRef}
                          onChangeData={(data) => {
                            setSupplierSelect(data);
                            productChange(data.supplier_name, "supplier_name"); // to store supplier_name
                            productChange(data.id, "supplier_id"); //to sore supplier_id in databse
                            HandleStocks(add.product_id, data.id);
                            if (descCheck) {
                              let contactdesc = data.unit_qty + data.sub_uom;
                              // productChange(contactdesc, "uom_desc");
                            }
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
                          onFocus={() => {
                            HandleStocks(add.product_id, add.supplier_id);
                          }}
                          onChange={(e) => {
                            if (add.supplier_id != "") {
                              //alert(stocksQty)
                              if (
                                parseFloat(e.target.value) <= parseFloat(stocksQty)
                              ) {
                                productChange(e.target.value, "qty");
                              } else {
                                alert(`Available quantity is ${stocksQty}`);
                                productChange("", "qty");
                              }
                            } else {
                              alert(`Please select the supplier`);
                            }
                            // productChange(e.target.value, "qty");
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

                      {/* <td>
                        <input
                          min={0}
                          type="checkbox"
                          defaultChecked={descCheck}
                          value={add.uom_desc}
                          onChange={(e) => {
                            productChange("", "uom_desc");
                            DescChecked(e);
                          }}
                          style={{ width: "100px" }}
                        />
                      </td> */}

                      <td>
                        <input
                        min={0}
                          type="number"
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
                          className="GST"
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
                        min={0}
                        max={100}
                          type="number"
                          value={add.discount}
                          style={{ width: "50px" }}
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
                      <button type="button" className="btn btn-outline-warning ps-3 pe-3 ms-3 me-3 mb-1 mt-2" onClick={addUpdate}>
                        Add
                      </button>
                    </tr>
                  </thead>
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
                            handleSupplierProduct(data.id);
                            editInput(data.uom, index, "uom");
                            editInput(data.hsn, index, "hsn");
                          }}
                        />
                      </td>
                      <td>
                        <SupplierSearch
                          data={supplierGet}
                          ref={supplierRef}
                          defValue={item.supplier_name}
                          onChangeData={(data) => {
                            
                            setSupplierSelect(data);
                            HandleStocks(item.product_id, data.id);
                            if (descCheck) {
                              let contactdesc = data.unit_qty + data.sub_uom;
                              // editInput(contactdesc, index, "uom_desc");
                            }
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
                            console.log(
                              item.supplier_id,
                              index,
                              "add.supplier_id "
                            );
                            if (item.supplier_id != "") {
                              if (
                                parseFloat(e.target.value) <= parseFloat(stocksQty)
                              ) {
                                editInput(e.target.value, index, "qty");
                              } else {
                                alert(`Available quantity is ${stocksQty}`);
                                editInput("", index, "qty");
                              }
                            } else {
                              alert(`Please select the supplier`);
                            }
                            // productChange(e.target.value, "qty");
                          }}
                          style={{ width: "70px" }}
                        />
                      </td>
                      <td>
                        <select
                        
                          type="text "
                          disabled
                          value={item.uom || ""}
                          // onChange={(e) =>
                          //   editInput(e.target.value, index, "uom")
                          // }
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
                      {/* <td>
                        {" "}
                        <input
                          type="checkbox"
                          defaultChecked={descCheck}
                          value={item.uom_desc || ""}
                          onChange={(e) => {
                            editInput(e.target.value, index, "uom_desc");
                          }}
                          style={{ width: "100px" }}
                        />
                      </td> */}
                      <td>
                        <input
                        min={0}
                          type="number "
                          value={item.rate || ""}
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
                        min={0}
                        max={100}
                          type="number"
                          style={{ width: "80px" }}
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
                </table>
              </div>
              {/* <div className="table-responsive">
                <table className="table">
                  <tbody>
                
                  </tbody>
                </table>{" "}
              </div> */}
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
                    <span>{subTotal}</span>
                  </h6>
                  <br />
                  <h6>
                    CGST (₹):
                    <span>{taxTotal}</span>
                  </h6>
                  <br />
                  <h6>
                    SGST (₹):
                    <span>{taxTotal}</span>
                  </h6>
                  <br />
                  <h6>
                    Grand Total (₹):
                    <span>{grandTotal}</span>
                  </h6>
                </div>
              </div>
            </div>
          </form>
        </Tab>
        <Tab eventKey={2} title="Invoice History">
        <Modal show={show1} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter your WhatsApp Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <input type="text" id="additional_mobile"/>
    <br/>
    <button class="btn btn-primary mt-3" id="send_whatsapp">Send</button>
      </Modal.Body>
      </Modal>
      <Modal show={show2} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter your WhatsApp Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <button class="btn btn-primary mt-3 me-3 " id="send_whatsapp3">Send to Customer</button>
    
    <button class="btn btn-danger mt-3" id="send_whatsapp4">Send to other</button>
      </Modal.Body>
      </Modal>
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
                  className=" date ms-1"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </td>
              <td>
                <p className="me-1 ms-4 ">End:</p>
              </td>
              <td>
                <DatePicker
                  className="date"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
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
                    className="w-25 form-control date mb-4"
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

          <div>
            <Modal size="xl" show={open} onHide={editClose}>
              <Modal.Header closeButton>
                <Modal.Title>Customer Payments</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit2(onSubmit2)}>
                  <div className="row">
                    <div className="col md-5">
                      <h5>Invoice No:</h5>
                      <p>{invData.in_no}</p>
                      <h5>Customer Name:</h5>
                      <p>{invData.customer_name}</p>
                      <h5>Payment Date:</h5>
                      <input type="date" {...register2("payment_date")} />
                      <span>
                        {errors2.payment_date && errors2.payment_date.message}
                      </span>
                      <br />

                      <h5>Payment Mode:</h5>

                      <input
                        type="radio"
                        name="payment_mode"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={handlePaymentMethodChange}
                        // {...register2("payment_mode")}
                      />
                      <label htmlFor="cash">Cash</label>
                      <input
                        type="radio"
                        name="payment_mode"
                        value="cheque"
                        checked={paymentMethod === "cheque"}
                        onChange={handlePaymentMethodChange}
                        // {...register2("payment_mode")}
                      />
                      <label htmlFor="cheque">Cheque</label>
                      <input
                        type="radio"
                        name="payment_mode"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={handlePaymentMethodChange}
                        // {...register2("payment_mode")}
                      />
                      <label htmlFor="online">Online</label>
                      <br />
                      {paymentMethod === "cash" && (
                        <Select
                          id="executive"
                          name="executive"
                          options={role}
                          placeholder="Select a Executive"
                          onChange={handleProductChange}
                        />
                      )}

                      {paymentMethod === "online" && (
                        <select
                          {...register2("payment_bank")}
                          // value={onlinePaymentType}
                          // onChange={handleOnlinePaymentTypeChange}
                        >
                          <option value="select">Select</option>
                          <option value="HDFC">HDFC Bank</option>
                          <option value="ICICI">ICICI Bank</option>
                        </select>
                      )}

                      <h5>Payment Description:</h5>
                      <input
                        type="text"
                        defaultValue={values.payment_description}
                        {...register2("payment_description")}
                      />
                      <span>
                        {errors2.payment_description &&
                          errors2.payment_description.message}
                      </span>
                      <h5>Amount:</h5>
                      <input
                        type="number"
                        defaultValue={values.amount}
                        {...register2("amount")}
                      />
                      <span>{errors2.amount && errors2.amount.message}</span>
                      <h5>Sales Executive:</h5>
                      <p>{invData.marketing_type}</p>
                      <span>
                        {errors2.sales_executive &&
                          errors2.sales_executive.message}
                      </span>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ float: "right" }}
                      >
                        {" "}
                        Save
                      </button>
                    </div>
                    <div
                      className="col-md-7"
                      style={{ borderLeft: "3px dashed aliceblue" }}
                    >
                      <table>
                        <tbody>
                          <tr>
                            <td>GrandTotal:</td>
                            <td>{invData.grand_total}</td>
                          </tr>
                          <tr>
                            <td>Balance:</td>
                            <td>{customerId.balance}</td>
                          </tr>

                          {customerInvoiceId.map((item, index) => (
                            <>
                              <tr>
                                {" "}
                                <td>Date: {item.payment_date.slice(0, 10)}</td>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp;
                                <td>Paid:{item.amount}</td>
                              </tr>
                              <tr></tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </Tab>
        <Tab eventKey={3} title="Invoice Pending Approval History">
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
                <p className="ms-3 me-1">End:</p>
              </td>
              <td>
                <DatePicker
                className="date date-fixed-top "
                  selected={endDate}
                  
                  onChange={(date) => setEndDate(date)}
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
                columns={columns1}
                data={getApprovalGet}
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
                    className="w-25 form-control date"
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

          <div>
            <Modal size="xl" show={open} onHide={editClose}>
              <Modal.Header closeButton>
                <Modal.Title>Customer Payments</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit2(onSubmit2)}>
                  <div className="row">
                    <div className="col md-5">
                      <h5>Invoice No:</h5>
                      <p>{invData.in_no}</p>
                      <h5>Customer Name:</h5>
                      <p>{invData.customer_name}</p>
                      <h5>Payment Date:</h5>
                      <input type="date" {...register2("payment_date")} />
                      <span>
                        {errors2.payment_date && errors2.payment_date.message}
                      </span>
                      <br />

                      <h5>Payment Mode:</h5>

                      <input
                        type="radio"
                        name="payment_mode"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={handlePaymentMethodChange}
                        // {...register2("payment_mode")}
                      />
                      <label htmlFor="cash">Cash</label>
                      <input
                        type="radio"
                        name="payment_mode"
                        value="cheque"
                        checked={paymentMethod === "cheque"}
                        onChange={handlePaymentMethodChange}
                        // {...register2("payment_mode")}
                      />
                      <label htmlFor="cheque">Cheque</label>
                      <input
                        type="radio"
                        name="payment_mode"
                        value="online"
                        checked={paymentMethod === "online"}
                        onChange={handlePaymentMethodChange}
                        // {...register2("payment_mode")}
                      />
                      <label htmlFor="online">Online</label>
                      <br />
                      {paymentMethod === "cash" && (
                        <Select
                          id="executive"
                          name="executive"
                          options={role}
                          placeholder="Select a Executive"
                          onChange={handleProductChange}
                        />
                      )}

                      {paymentMethod === "online" && (
                        <select
                          {...register2("payment_bank")}
                          // value={onlinePaymentType}
                          // onChange={handleOnlinePaymentTypeChange}
                        >
                          <option value="select">Select</option>
                          <option value="HDFC">HDFC Bank</option>
                          <option value="ICICI">ICICI Bank</option>
                        </select>
                      )}

                      <h5>Payment Description:</h5>
                      <input
                        type="text"
                        defaultValue={values.payment_description}
                        {...register2("payment_description")}
                      />
                      <span>
                        {errors2.payment_description &&
                          errors2.payment_description.message}
                      </span>
                      <h5>Amount:</h5>
                      <input
                        type="number"
                        defaultValue={values.amount}
                        {...register2("amount")}
                      />
                      <span>{errors2.amount && errors2.amount.message}</span>
                      <h5>Sales Executive:</h5>
                      <p>{invData.marketing_type}</p>
                      <span>
                        {errors2.sales_executive &&
                          errors2.sales_executive.message}
                      </span>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ float: "right" }}
                      >
                        {" "}
                        Save
                      </button>
                    </div>
                    <div
                      className="col-md-7"
                      style={{ borderLeft: "3px dashed aliceblue" }}
                    >
                      <table>
                        <tbody>
                          <tr>
                            <td>GrandTotal:</td>
                            <td>{invData.grand_total}</td>
                          </tr>
                          <tr>
                            <td>Balance:</td>
                            <td>{customerId.balance}</td>
                          </tr>

                          {customerInvoiceId.map((item, index) => (
                            <>
                              <tr>
                                {" "}
                                <td>Date: {item.payment_date.slice(0, 10)}</td>
                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp;
                                <td>Paid:{item.amount}</td>
                              </tr>
                              <tr></tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </Tab>
        <div className="invoice-edit">
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => {setLgShow(false);}}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Invoice Edit
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
                        <br />
                        <label>Address :</label>
                        <br />
                        <input
                          value={select.address}
                          {...register3("address1")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors3.address1 && errors3.address1.message}
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

                        <label>Alternate No:</label>
                        <br />
                        <input
                    
                        type="number"
                          value={select.mobile_no2}
                          {...register3("mobile_no2")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors3.mobile_no2 && errors3.mobile_no2.message}
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
                        <select value={select.state} className="state" {...register3("state")}>
                          <option value="select">Select</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Pune">Pune</option>
                          <option value="Goa">Goa</option>
                          <option value="Kerala">Kerala</option>
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
                                editCheckbox2();
                              } else {
                                reset2();
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
                        <label>Address :</label>
                        <br />
                        <input {...register3("address1_a")} />
                        <br />
                        
                        <label>Mobile No:</label>
                        <br />
                        <input {...register3("mobile_a")} />
                        <br />
                        <span className="text-danger">
                          {errors3.mobile_a && errors3.mobile_a.message}
                        </span>{" "}


                        <label>Alternate No:</label>
                        <br />
                        <input
                     
                        type="number"
                          value={select.mobile_no2}
                          {...register3("mobile_no2")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors3.mobile_no2 && errors3.mobile_no2.message}
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
                          <option value="Kerala">Kerala</option>
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
                        <label>Marketing type:</label>
                        <br />
                        <select {...register3("marketing_type")}>
                         
                          <option value="select">select</option>
                          <option value="digital">digital</option>
                          <option value="cash">cash</option>
                        </select>
                        <span className="text-danger">
                          {errors3.marketing_type &&
                            errors3.marketing_type.message}
                        </span>{" "}
                        <br />
                        <br />
                        <label>Delivery Note:</label>
                        <br />
                        <input type="text" {...register3("delivery_note")} />
                        <span className="text-danger">
                          {errors3.delivery_note &&
                            errors3.delivery_note.message}
                        </span>{" "}
                        <br />
                        <label>Delivery Date:</label>
                        <br />
                        <input type="date" {...register3("delivery_date")} />
                        <span className="text-danger">
                          {errors3.delivery_date &&
                            errors3.delivery_date.message}
                        </span>{" "}
                        <br />
                        <label>Mode:</label>
                        <br />
                        <input type="text" {...register3("mode")} />
                        <span className="text-danger">
                          {errors3.mode && errors3.mode.message}
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
                        <label>Dispatch No:</label>
                        <br />
                        <input type="text" {...register3("dispatch_no")} />
                        <span className="text-danger">
                          {errors3.dispatch_no && errors3.dispatch_no.message}
                        </span>{" "}
                        <br />
                        <br />
                        <label> Dispatch Through:</label>
                        <br />
                        <select {...register3("dispatch_through")}>
                          <option value="select">Select</option>
                          <option value="vrl">VRL</option>
                          <option value="ideal">Ideal</option>
                          <option value="by hand">By Hand</option>
                        </select>
                        <span className="text-danger">
                          {errors3.dispatch_through &&
                            errors3.dispatch_through.message}
                        </span>{" "}
                        <br />
                        <br />
                        <label>Dispatch From :</label>
                        <br />
                        <select {...register3("dispatch_from")}>
                          <option value="select">Select</option>
                          <option value="office">Office</option>
                          <option value="manufacturing unit">
                            Manufacturing Unit
                          </option>
                          <option value="ware house">Ware House</option>
                        </select>
                        <span className="text-danger">
                          {errors3.dispatch_from &&
                            errors3.dispatch_from.message}
                        </span>{" "}
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
                          {errors2.payment && errors2.payment.message}
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
                          <th>Supplier</th>
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
                      </thead>
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
                                handleSupplierProduct(data.id);
                                editInput(data.uom, "uom");
                                editInput(data.hsn, "hsn");
                              }}
                            />
                          </td>
                          <td>
                            <SupplierSearch
                              data={supplierGet}
                              ref={supplierRef}
                              defValue={item.supplier_name}
                              onChangeData={(data) => {
                                setSupplierSelect(data);
                                HandleStocks(
                                  item.product_id,
                                  data.id
                                );
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
                              onFocus={() => {
                                HandleStocks(item.product_id, item.supplier_id);
                              }}
                              onChange={(e) => {
                                if (item.supplier_id != "") {
                                  if (
                                    parseFloat(e.target.value) <=
                                    parseFloat(stocksQty) + parseFloat(item.oldQty)
                                  ) {
                                    editInput(e.target.value, index, "qty");
                                  } else {
                                    alert(
                                      `Available quantity is ${
                                        parseFloat(stocksQty) +
                                        parseFloat(item.oldQty)
                                      }`
                                    );
                                    editInput(0, index, "qty");
                                  }
                                } else {
                                  alert(`Please select the supplier`);
                                }
                                // productChange(e.target.value, "qty");
                              }}
                              style={{ width: "70px" }}
                            />
                          </td>
                          <td>
                            <select
                              type="text "
                              value={item.uom || ""}
                              disabled
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
                            {" "}
                            <input
                              type="checkbox"
                              //  defaultChecked={descCheck}
                              value={item.uom_desc || ""}
                              onChange={(e) => {
                                editInput(e.target.value, index, "uom_desc");
                              }}
                              style={{ width: "100px" }}
                            />
                          </td> */}
                          <td>
                            <input
                            min={0}
                              type="number "
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
                            min={0}
                            max={100}
                              type="number"
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
                                deleteItem_edit(index);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th></th>
                          <th>Product</th>
                          <th>Supplier</th>
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
                                handleSupplierProduct(data.id);
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
                            <td>
                              <SupplierSearch
                                data={supplierGet}
                                defValue={add.supplier_name}
                                ref={supplierRef}
                                onChangeData={(data) => {
                                  setSupplierSelect(data);
                                  productChange(
                                    data.supplier_name,
                                    "supplier_name"
                                  ); // to store supplier_name
                                  productChange(
                                    data.id,
                                    "supplier_id"
                                  ); //to sore supplier_id in databse
                                  HandleStocks(
                                    add.product_id,
                                    data.id
                                  );
                                }}
                              />
                            </td>
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
                                if (add.supplier_id != "") {
                                  if (
                                    parseFloat(e.target.value) <=
                                    parseFloat(stocksQty)
                                  ) {
                                    productChange(e.target.value, "qty");
                                  } else {
                                    alert(`Available quantity is ${stocksQty}`);
                                    productChange("", "qty");
                                  }
                                } else {
                                  alert(`Please select the supplier`);
                                }
                                // productChange(e.target.value, "qty");
                              }}
                            />
                          </td>

                          <td>
                            <input value={add.uom} disabled />
                          </td>
                          {/* <td>
                            <input
                              min={0}
                              type="checkbox"
                              // defaultChecked={descCheck}
                              value={add.uom_desc}
                              onChange={(e) => {
                                productChange("", "uom_desc");
                                DescChecked(e);
                              }}
                              style={{ width: "100px" }}
                            />
                          </td> */}

                          <td>
                            <input
                            min={0}
                              type="number"
                              value={add.rate}
                              onChange={(e) => {
                                getGrandTotal(e);
                              }}
                            ></input>
                          </td>

                          <td>
                            <select
                              value={add.gst}
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
                              min={0}
                              max={100}
                              value={add.discount}
                              type="number"
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
                    </table>
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
          autoHideDuration={1}
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
        <Modal show={deliveryOpen} onHide={DeliveryClose}>
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <form>
              <label>Delivery Complete</label>{" "}
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </label>
              <br />
              <br />
              <button
                type="submit"
                onClick={() => handleDelivery()}
                className="btn btn-primary"
              >
                Save
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
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

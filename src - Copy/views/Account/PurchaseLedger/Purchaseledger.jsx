import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import url from "../../config";
import Form from "react-bootstrap/Form";
import { Alert, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "../../../index.css";
import DynamicSearch from "../../../components/AutoComplete/DynamicSearch";
import ProductSearch from "../../../components/AutoComplete/ProductSearch";
import $ from 'jquery'; 
import '.././design.css';
import {
  deleteAPI,
  getAPI,
  postFormDataAPI,
} from "../../../apiServices/AxiousFetch";
import apinames from "../../../apiServices/ApiConstant";
import FunctionAlert from "../../alert/FunctionAlertpl";

const initialState = {
  material_type: "",
  size: "",
  rate: "",
  qty: 0,
  uom: "",
  sub_qty: 1,
  sub_uom: "",
  gst: "",
  amount: 0,
  product_id: 0,
  unit_qty: 0,
  oldQty: 0, // to store in database
  u_cost_with_gst: 0,
  u_cost_without_gst: 0,

};

const validationSchema = yup.object().shape({
  invoice_date: yup
    .date()
    .typeError("Invoice Date is required")
    .required("Invoice date is required"),
  received_date: yup
    .date()
    .typeError("Received Date is required")
    .required("Received date is required"),
  supplier: yup
    .string()
    .required("Supplier is required")
    .oneOf(["supplier", "owner"], "Invalid supplier select"),

  vehical_no: yup
    .string()
    .matches(/^[a-zA-Z0-9]{1,10}$/, "Vehical No must contain 10 character")
    .required("Vehical No is required"),
  freight: yup
    .string()
    .required("Freight is required")
    .matches(
      /^[0-9]+(\.[0-9]{1,2})?$/,
      "Freight must be a number or decimal with up to two decimal places"
    ),
});
var  file_data="";
const Purchaseledger = () => {
  
  const [subQtyDisabled, setSubQtyDisabled] = useState(true);
  const [reload, setReload] = useState(false);
  const [alertData, setAlertData] = useState({
    code: 200,
    data: "",
  });
  const [showAlert, setShowAlert] = useState(false);


  const childRef = useRef(); // forward ref transfering from child to parent
  const [select, setSelect] = useState({});
  const [isError, setIsError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [toast, setToast] = useState(false);
  const [productSelect, setProductSelect] = useState({});
  const [sget, setSGet] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [arrayObject, setArrayObject] = useState([]); // to store all the product data
  const [arrayObject_edit, setArrayObject_edit] = useState([]); 
  const [masterArrayObject, setMasterArrayObject] = useState([]); // to store all the old qty for stocks
  const [amount, setAmount] = useState(0); //to store ammount
  const [get, setGet] = useState([]); // get api
  const [warning, setWarning] = useState({}); // get warning
  const [productGet, setProductGet] = useState([]); // product master name and uom gst
  const [api, setApi] = useState([]); // filter
  const [tab, setTab] = useState(1);
  const [editId, setEditId] = useState();
  const [grandTotal, setGrandTotal] = useState(0);
  const [grandTotal2, setGrandTotal2] = useState(0);

  const [oldGrandTotal, setOldGrandTotal] = useState(0);
  const [lgShow, setLgShow] = useState(false);
  const [add, setAdd] = useState(initialState);
  const formRef = useRef();
  const [pl_data, setPlData] = useState({});
  const [unitFreight, setUnitFreight] = useState(0);
  const [invoicedate, setInvoicedate] = useState(moment().format('YYYY-MM-DD'));
var file_data="";
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "center",
    file_bs64:""
  });
  // const [ state, setState ] = React.useState(false);
  const { vertical, horizontal, open } = state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const location = useHistory();
  const {
    register: register2,
    setValue,
    reset:reset2,
    watch,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(validationSchema),
  });
  const values = watch();

  const productChange = (e, key) => {
    setAdd((prevState) => ({
      ...prevState,
      [key]: e,
    }));
  };

  const amountInfo = (e) => {
    let amountValue = parseFloat(add.qty) * parseFloat(e);

    productChange(amountValue, "amount");
    // productChange(e, "freight");
    setAmount(amount + amountValue);
  };
  // array of object calculation
  const editInput = (dis, i, data) => {
    // let editData = [];
    // editData = [...arrayObject];
    // editData[i][data] = dis;
    // setArrayObject(editData);
    // revisedGTotalwithGST(editData);
    // amountInfo(dis);
  };
  
  // set display
  const editDisplay = (data, prodArray) => {
    //setSubTotal(0);
    //setTaxTotal(0);
    setGrandTotal(0);
    setEditId(data.id);

    let tempdata = {};
    tempdata = {
      supplier_name: data.supplier_name,
      id: data.supplier_id,
      debit: data.debit,
      balance: data.balance,
    };
    setSelect(tempdata);
    setValue("supplier_name", data.supplier_name);
    setValue(
      "invoice_date",
      moment(data.invoice_date).format('YYYY-MM-DD')
    );
    setValue(
      "received_date",
      moment(data.received_date).format('YYYY-MM-DD')
    );
    setValue("supplier", data.supplier);
    setValue("supplier_id", data.supplier_id);
    setValue("vehical_no", data.vehical_no);
    setValue("invoice_no", data.invoice_no);
    setValue("type", data.type);
    setValue("freight", data.freight);
    setValue("dispatch_through", data.dispatch_through);
    setValue("attached_invoice", data.attached_invoice);
    setValue("amount", data.amount);
    setValue("debit", data.debit);
    setValue("credit", data.credit);
    setValue("balance", data.balance);
    const totalQuantity = prodArray.reduce((accumulator, currentItem) => {
      return accumulator + parseFloat(currentItem.qty);
    }, 0);
    setUnitFreight(parseFloat(data.freight) / totalQuantity);

    //--------------------olq qty we are storing for stocks
    setMasterArrayObject(
      prodArray.map((item) => ({ ...item, oldQty: item.qty }))
    );
    setArrayObject_edit(prodArray.map((item) => ({ ...item, oldQty: item.qty })));
    // setGrandTotal(data.grand_total);
    // setOldGrandTotal(data.grand_total);
    revisedGTotal2(prodArray);
  };

  // inside array of object delete button without api
  const FilterDelete = (e) => {
    var remove = [...arrayObject];
    var index = remove.indexOf(e);

    remove.splice(e, 1);
    setArrayObject(remove);
     revisedGTotal(remove);
    //revisedGTotalwithGST(remove);
  };
  const FilterDelete_edit = (e) => {
    var remove = [...arrayObject_edit];
    var index = remove.indexOf(e);

    remove.splice(e, 1);
    setArrayObject_edit(remove);
    revisedGTotal2(remove);
    //revisedGTotalwithGST(remove);
  };
  // to change value inside input value without error
  const upadteAdd = () => {
    const productExists = arrayObject.some(
      (item) => item.product_id == add.product_id
    );

    if (productExists) {
      alert(`Product is already been added`);
    } else {
      if (
        add.size == "" ||
        add.rate == "" ||
        add.qty == "" ||
        add.uom == "" ||
        add.gst == "" ||
        add.material_type == ""
      ) {
        // alert("There is a missing field product")

        setIsError(true);
      } else {
        setArrayObject([...arrayObject, add]);
        calculationTotalValue(add); // we store inside a button

        setAdd({ ...initialState });
        childRef.current.clearProdValue();
        // setProductSelect(productSelect.product_name)
        setIsError(false);
        var d=[...arrayObject, add]
        revisedGTotal(d);
      }
    }
  };

  const upadteAdd_edit = () => {
    const productExists = arrayObject_edit.some(
      (item) => item.product_id == add.product_id
    );

    if (productExists) {
      alert(`Product is already been added`);
    } else {
      if (
        add.size == "" ||
        add.rate == "" ||
        add.qty == "" ||
        add.uom == "" ||
        add.gst == "" ||
        add.material_type == ""
      ) {
        // alert("There is a missing field product")

        setIsError(true);
      } else {
        setArrayObject_edit([...arrayObject_edit, add]);
        calculationTotalValue2(add); // we store inside a button

        setAdd({ ...initialState });
        childRef.current.clearProdValue();
        // setProductSelect(productSelect.product_name)
        setIsError(false);
        var d=[...arrayObject_edit, add]
        revisedGTotal2(d);
      }
    }
  };
  //------------Grand Total----------------//
  const calculationTotalValue = (add) => {
    let amountTotalValue = 0;
    amountTotalValue = parseFloat(add.rate) * parseFloat(add.qty);
    let gstValue = 0;
    gstValue = (amountTotalValue * parseFloat(add.gst)) / 100;
    let cumlativeValue = gstValue + amountTotalValue;

    let newTotal = cumlativeValue + parseFloat(grandTotal);

    setGrandTotal(newTotal);
  };

  const calculationTotalValue2 = (add) => {
    let amountTotalValue = 0;
    amountTotalValue = parseFloat(add.rate) * parseFloat(add.qty);
    let gstValue = 0;
    gstValue = (amountTotalValue * parseFloat(add.gst)) / 100;
    let cumlativeValue = gstValue + amountTotalValue;

    let newTotal = cumlativeValue + parseFloat(grandTotal2);

    setGrandTotal2(newTotal);
  };
  // we need to calculate amount when edit button is clicked to show the value
  const getGtotal = (item) => {
    let amountDisplay = parseFloat(item.rate) * parseFloat(item.qty);
    return amountDisplay;
  };

  const getTotalWithGST = (item, freight) => {
    let unitrate = parseFloat(item.rate) * parseFloat(item.qty);
    let gstValue = (unitrate * parseFloat(item.gst)) / 100;
    let subtotal = (unitrate + gstValue) / parseFloat(item.qty);

    // let gstValue = ((unitrate + unitFreight) * parseFloat(item.gst)) / 100;

    let amountDisplay = subtotal + freight;
    // editNewInput(amountDisplay.toFixed(2), index, "u_cost_with_gst");

    return amountDisplay.toFixed(2);
  };

  const getTotalWithoutGST = (item) => {
    let unitrate = parseFloat(item.rate);
    //  / parseFloat(item.qty);
    // let freightunit = parseFloat(pl_data.freight) / parseFloat(item.qty)

    let amountDisplay = unitrate + unitFreight;
    // editNewInput(amountDisplay, index,"u_cost_without_gst")

    console.log("amountDisplay", amountDisplay);

    return amountDisplay.toFixed(2);
  };

  const revisedGTotalwithGST = (dataArray) => {
    console.log(dataArray.length, "karthik");
    if (dataArray.length === 0) {
      setGrandTotal(0);
    }
    // since its in array we should use for deleted one grand total from 1 or more we go with for and if condition
    let amountTotalValue = 0;
    let gstValue = 0;
    let cumalativeValue = 0;
    for (let i of dataArray) {
      // let revisedgrandtotal = parseFloat(i.rate) * parseFloat(i.qty);

      amountTotalValue += parseFloat(i.rate) * parseFloat(i.qty);
      gstValue += (amountTotalValue * parseFloat(i.gst)) / 100;

      cumalativeValue += gstValue + amountTotalValue;
      console.log(cumalativeValue, "karthik_cumalativeValue");
      setGrandTotal(cumalativeValue);
    }
  };
  // const revisedGTotal = (add) => {
  //   console.log(add.length, "karthik");
  //   if (add.length === 0) {
  //     setGrandTotal(0);
  //   }
  //   // since its in array we should use for deleted one grand total from 1 or more we go with for and if condition
  //   for (let i of add) {
  //     let revisedgrandtotal = parseFloat(i.rate) * parseFloat(i.qty);
  //     setGrandTotal(revisedgrandtotal);
  //   }
  // };

  const revisedGTotal = (add) => {
    if (add.length === 0) {
     // setSubTotal(0);
     // setTaxTotal(0);
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
      //setSubTotal(subtotal);
      //setTaxTotal(gsttotal);
      setGrandTotal(grtotal);
    }
  };

  const revisedGTotal2 = (add) => {
    if (add.length === 0) {
     // setSubTotal(0);
     // setTaxTotal(0);
      setGrandTotal2(0);
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
      //setSubTotal(subtotal);
      //setTaxTotal(gsttotal);
      setGrandTotal2(grtotal);
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
      name: "SL NO",
      selector: (row) => row.pl_main.id,
    },
    {
      name: "Invoice No",
      selector: (row) => row.pl_main.invoice_no,
    },
    {
      name: "Invoice Date",
      selector: (row) => row.pl_main.invoice_date,
    },
    {
      name: "Received On",
      selector: (row) => row.pl_main.received_date,
    },
    {
      name: "Supplier Role",
      selector: (row) => row.pl_main.supplier,
      color: "#fff",
    },
    {
      name: "Dispatch Through",
      selector: (row) => row.pl_main.dispatch_through,
      color: "#fff",
    },

    {
      name: "Attached Invoice",
      selector: (row) => row.pl_main.attached_invoice,
      cell: (row) => (
        <div>
          <a href={row.pl_main.attached_invoice} target="_blank">
            Click here
          </a>
        </div>
      ),
    },

    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              editDisplay(row.pl_main, row.pl_product);
              setLgShow(true);
              setEditShow(true);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <Link
            // to={`/InvoiceTransportTruck/${row.main.number}`}
            to={{ pathname: "/PurchaseLedgerTransport", state: row.pl_main }}
            className="btn btn-warning"
            style={{ marginLeft: "4px" }}
          >
            <i className="fa fa-truck" aria-hidden="true "></i>{" "}
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => {
              handleDelete(row.pl_main.id);
            }}
            style={{ marginLeft: "5px" }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getAPI(apinames.GET_PURCHASE_LEDGER).then((responce) => {
      console.log(responce.data, "purchase");
      let reversedData = responce.data.slice().reverse();
      setGet(reversedData); // to reverse data
      setApi(responce.data);
    });
    getAPI(apinames.GET_PRODUCT_MASTER).then((response) => {
      console.log(response.data, "product master getting");
      setProductGet(response.data);
    });
    getAPI(apinames.GET_SUPPLIER_MASTER).then((response) => {
      console.log(response.data, "supplier master getting");
      setSGet(response.data);
    });
  }, [reload]);

  // filter
  const searchItems = (searchValue) => {
    // setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = get.filter((item) => {
        return item.pl_main.supplier
          .toLowerCase()
          .includes(searchValue.toLowerCase());
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

    productChange(oldqty.oldQty, "oldQty"); //to sore product_id in databse
  };
 
  $("#file_name").change(function(){
    //alert(1)
    try{

   
    var file = document.querySelector('#file_name').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
   
    //file_data=reader.result;
    reader.onload = function () {
      console.log(reader.result);
      file_data=reader.result;
      $("#data").html(file_data)
      $("#data").hide();
     
    
    };
    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }catch(e){

  }
  })
  $("body").on("change","#file_name1",function(){
    //alert(1)
    try{

   
    var file = document.querySelector('#file_name1').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
   
    //file_data=reader.result;
    reader.onload = function () {
      console.log(reader.result);
      file_data=reader.result;
      $("#data").html(file_data)
      $("#data").hide();
     
    
    };
    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }catch(e){

  }
  })

  const OnPreview = (data) => {
    
    const totalQuantity = arrayObject.reduce((accumulator, currentItem) => {
      return accumulator + parseFloat(currentItem.qty);
    }, 0);
    let unitFreight = 0;

    unitFreight = data.freight / totalQuantity;
    console.log(totalQuantity, "totalQuantity");
    console.log(unitFreight, "unitFreight");
    setUnitFreight(unitFreight);
    const newArr = arrayObject.map((v) => ({
      ...v,
      supplier_idd: select.id,
      u_cost_with_gst: getTotalWithGST(v, unitFreight),
      u_cost_without_gst: getTotalWithoutGST(v, unitFreight),
      amount: parseFloat(v.qty) * parseFloat(v.rate),
    }));
   
   
    
  
      //alert(file_data)
    
   
   

  
   var d=$("#data").html()
 
    

    setPlData({
      supplierName: select.supplier_name,
      supplierId: select.id,
      prodcutArray: newArr,
      invoice_date: moment(data.invoice_date).format('YYYY-MM-DD'),
      received_date: moment(data.received_date).format('YYYY-MM-DD'),
      supplier: data.supplier,
      vehical_no: data.vehical_no,
      invoice_no: data.invoice_no,
      type: data.type,
      attached_invoice: d,
      debit: select.debit,
      balance: select.balance,
      //grand_total: grandTotal,
      //new_grand_total: oldGrandTotal,
      freight: data.freight,
      dispatch_through: data.dispatch_through,
      grand_total: data.grand_total,
    });

    setShowPreview(true);
  };



  const OnPreview_edit = (data) => {
    
    const totalQuantity = arrayObject_edit.reduce((accumulator, currentItem) => {
      return accumulator + parseFloat(currentItem.qty);
    }, 0);
    let unitFreight = 0;

    unitFreight = data.freight / totalQuantity;
    console.log(totalQuantity, "totalQuantity");
    console.log(unitFreight, "unitFreight");
    setUnitFreight(unitFreight);
    const newArr = arrayObject_edit.map((v) => ({
      ...v,
      supplier_idd: select.id,
      u_cost_with_gst: getTotalWithGST(v, unitFreight),
      u_cost_without_gst: getTotalWithoutGST(v, unitFreight),
      amount: parseFloat(v.qty) * parseFloat(v.rate),
    }));
   
   
    
  
      //alert(file_data)
    
   
   

  
   var d=$("#data").html()
 
    

    setPlData({
      supplierName: select.supplier_name,
      supplierId: select.id,
      prodcutArray: newArr,
      invoice_date: moment(data.invoice_date).format('YYYY-MM-DD'),
      received_date: moment(data.received_date).format('YYYY-MM-DD'),
      supplier: data.supplier,
      vehical_no: data.vehical_no,
      invoice_no: data.invoice_no,
      type: data.type,
      attached_invoice: d,
      debit: select.debit,
      balance: select.balance,
      //grand_total: grandTotal,
      //new_grand_total: oldGrandTotal,
      freight: data.freight,
      dispatch_through: data.dispatch_through,
      grand_total: data.grand_total,
    });

    setShowPreview(true);
  };
  const onsubmit = () => {
    var created_by=localStorage.getItem("ootel_admin_created_by");
    const newArr = arrayObject.map((v) => ({ ...v, supplier_idd: select.id }));
    const newFormData = new FormData();

    newFormData.append("invoice_date", pl_data.invoice_date);
    newFormData.append("received_date", pl_data.received_date);
    newFormData.append("supplier", pl_data.supplier);
    newFormData.append("vehical_no", pl_data.vehical_no);
    newFormData.append("invoice_no", pl_data.invoice_no);
    newFormData.append("type", pl_data.type);
    newFormData.append("attached_invoice", pl_data.attached_invoice);
    newFormData.append("debit", pl_data.debit);
    newFormData.append("balance", pl_data.balance);
    newFormData.append("supplier_id", pl_data.supplierId);
    newFormData.append("grand_total", grandTotal);
    newFormData.append("new_grand_total", oldGrandTotal);
    newFormData.append("freight", pl_data.freight);
    newFormData.append("dispatch_through", pl_data.dispatch_through);
   
    newFormData.append("created_by", created_by);
    pl_data.prodcutArray.forEach((item, index) => {
      newFormData.append(`productArray[${index}]`, JSON.stringify(item));
    });
    var object = {};
    newFormData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);
    $.ajax({
url:url.server_url+apinames.POST_PURCHASE_LEDGER,
data:object,
dataType:"JSON",type:"POST",
success:function(response){
  var status_code = response.status_code;
    let alert_data;
    if (status_code == 200) {
      setShowPreview(false);

      alert_data = {
        code: status_code,
        data: "Purchase Ledger Submitted Successfully",
      };
      setAlertData(alert_data);
      setShowAlert(true);
      reset();
      setTimeout(() => {
        setShowAlert(false);
        setReload(true);
         window.location.reload()
      }, 2000);
    }
},
error:function(xhr){

}


    })


    // console.log(newArr, "dataa");
    // postFormDataAPI(apinames.POST_PURCHASE_LEDGER, dt)
    // .then((response) => {
    //   console.log(response, "sssssss");
    //   var status_code = response.status_code;
    //   let alert_data;
    //   if (status_code == 200) {
    //     setShowPreview(false);

    //     alert_data = {
    //       code: status_code,
    //       data: "Purchase Ledger Submitted Successfully",
    //     };
    //     setAlertData(alert_data);
    //     setShowAlert(true);
    //     reset();
    //     setTimeout(() => {
    //       setShowAlert(false);
    //       setReload(true);
    //       window.location.reload(1);
    //     }, 1);
    //   } else if (response.status_code == 400) {
    //     setShowPreview(false);
    //     setShowAlert(true);
    //     setTimeout(() => {
    //       setShowAlert(false);
    //       setReload(true);
    //       window.location.reload(1);
    //     }, 1);
    //     alert_data = {
    //       code: status_code,
    //       data: response.data,
    //     };
    //     setAlertData(alert_data);
    //   }
    // })
    // .catch((error) => {
    //   console.log(error, "api error");
    // });
  }
  //-------------------Edit crud------------------//

  const onSubmit2 = (data1) => {
   
    const newArr = arrayObject_edit.map((v) => ({ ...v, supplier_idd: select.id }));
    const newFormData = new FormData();
    newFormData.append("id", editId);
    newFormData.append("invoice_date", pl_data.invoice_date);
    newFormData.append("received_date", pl_data.received_date);
    newFormData.append("supplier", pl_data.supplier);
    newFormData.append("vehical_no", pl_data.vehical_no);
    newFormData.append("invoice_no", pl_data.invoice_no);
    newFormData.append("type", pl_data.type);
    newFormData.append("attached_invoice",pl_data.attached_invoice);
    newFormData.append("debit", pl_data.debit);
    newFormData.append("balance", pl_data.balance);
    newFormData.append("supplier_id", pl_data.supplierId);
    newFormData.append("grand_total", grandTotal2);
    newFormData.append("new_grand_total", oldGrandTotal);
    newFormData.append("freight", pl_data.freight);
    newFormData.append("dispatch_through", pl_data.dispatch_through);
    pl_data.prodcutArray.forEach((item, index) => {
      newFormData.append(`productArray[${index}]`, JSON.stringify(item));
    });
    var object = {};
    newFormData.forEach(function(value, key){
        object[key] = value;
    });
    var json = JSON.stringify(object);
    $.ajax({
url:url.server_url+apinames.PUT_PURCHASE_LEDGER,
data:object,
dataType:"JSON",type:"POST",
success:function(response){
  var status_code = response.status_code;
    let alert_data;
    if (status_code == 200) {
      setShowPreview(false);

      alert_data = {
        code: status_code,
        data: "Purchase Ledger Submitted Successfully",
      };
      setAlertData(alert_data);
      setShowAlert(true);
      reset();
       setTimeout(() => {
        setShowAlert(false);
        setReload(true);
         window.location.reload()
      }, 2000);
    }
},
error:function(xhr){

}


    })

    // postFormDataAPI(apinames.PUT_PURCHASE_LEDGER, newFormData)
    //   .then((response) => {
    //     var status_code = response.status_code;
    //     let alert_data;
    //     if (response.status_code === 200) {
    //       setLgShow(false);
    //       setShowPreview(false)
    //       alert_data = {
    //         code: response.status_code,
    //         data: "Purchase Ledger Submitted Successfully",
    //       };
    //       setAlertData(alert_data);
    //       setShowAlert(true);
    //       reset2();
    //       setTimeout(() => {
    //         setShowAlert(false);
    //         setReload(true);
    //         // window.location.reload(1)
    //       }, 1);
    //     }else if (response.status_code == 400) {
    //       setLgShow(false);
    //       setShowPreview(false)
    //       setShowAlert(true);
    //       setTimeout(() => {
    //         setShowAlert(false);
    //         setReload(true);
    //       }, 1);
    //       alert_data = {
    //         code: response.status_code,
    //         data: response.data,
    //       };
    //       setAlertData(alert_data);
    //     } 
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("An error occurred while editing the issue");
    //   });
  };

  const handleDelete = async (id) => {
    let comfired = window.confirm(
      "Are you sure you want to delete the details??"
    );

    if (comfired) {
      try {
        deleteAPI(apinames.DELETE_PURCHASE_LEDGER + id);
        window.location.reload();
      } catch (error) {
        console.log(error + "errors");
      }
    }

    try {
      if (window.confirm("Are you sure to delete the data??")) {
        await axios.delete(url.server_url + `/delete_purchase_ledger/${id}`);
      }
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g. show an error message to the user
    }
  };
  //--------------keyboard entry
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

  if (showPreview) {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-bodered" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Supplier Name</th>
                  <th>Invoice Date</th>
                  <th>Received Date</th>
                  <th>Supplier</th>
                  <th>Vehical No</th>
                  <th>Invoice No</th>
                  <th>Type</th>
                  <th>Freight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{pl_data.supplierName}</td>
                  <td>{pl_data.invoice_date}</td>
                  <td>{pl_data.received_date}</td>
                  <td>{pl_data.supplier}</td>
                  <td>{pl_data.vehical_no}</td>
                  <td>{pl_data.invoice_no}</td>
                  <td>{pl_data.type}</td>
                  <td>{pl_data.freight}</td>
                </tr>
              </tbody>
            </table>
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

            {pl_data.prodcutArray.map((item, index) => (
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
                  {/* <p>{item.rate}</p> */}

                  {/* <p>{item. grand_total}</p> */}
                  <p>{getGtotal(item)}</p>
                </td>
                <td>
                  <p>{item.u_cost_with_gst}</p>
                  {/* <p>{getTotalWithGST(item, index)}</p> */}
                </td>
                <td>
                  <p>{item.u_cost_without_gst}</p>

                  {/* <p>{getTotalWithoutGST(item, index)}</p> */}
                </td>
              </tr>
            ))}
          </table>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          style={{ position: "relative", bottom: "-100px" }}
          onClick={() => setShowPreview(false)}
        >
          Go Back
        </button>

        {editShow ? (
          <button
            type="button"
            onClick={() => {
              onSubmit2();
              reset2()
            }}
            className="btn btn-primary"
            style={{
              position: "relative",
              bottom: "-100px",
              marginLeft: "10px",
            }}
          >
            Update
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              onsubmit();
            }}
            className="btn btn-primary"
            style={{
              position: "relative",
              bottom: "-100px",
              marginLeft: "10px",
            }}
          >
            SAVE
          </button>
        )}
        <div style={{ float: "right" }}>
          <h6>
            {/* Grand Total (₹):
                <span>{grandTotal}</span> */}
          </h6>
        </div>
      </div>
    );
  }

  const checkWarning = (e) => {
    if (warning != null && parseFloat(e) > warning.rate) {
      setToast(true);
    } else {
      setToast(false);
    }
  };

  const Warning = (id) => {
    getAPI(apinames.GET_WARNING + id).then((responce) => {
      console.log(responce.data, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
      setWarning(responce.data[0]); // to reverse data
    });
  };
  const onChangeDate = ({ target }) => {
    alert(1)
    const newDate = moment(target.value.timeStamp).format('YYYY-MM-DD');
    setInvoicedate(newDate);
    console.log(newDate,"LLLL"); //always log "1970-01-01"
  };
  return (
    <div>
      <Tabs
        defaultActiveKey={1}
        id="uncontrolled-tab-example"
        activeKey={tab}
        onSelect={(k) => {
          setTab(k);
        }}
      >
        <Tab eventKey={1} title="Purchase">
          <form onSubmit={handleSubmit(OnPreview)} onKeyDown={handleKeyDown}>
            <div className="row">
              <div className="col-md-4">
                <label>
                  Supplier Name: <span className="text-danger">*</span>{" "}
                </label>
                <br />
                <DynamicSearch
                  data={sget}
                  type={2}
                  {...register("supplier_name")}
                  defValue={select.supplier_name}
                  onFocus={false}
                  onChangeData={(data) => {
                    console.log("sdsd", data);
                    setSelect(data);
                  }}
                />
                <span>
                  {errors.supplier_name && errors.supplier_name.message}
                </span>
                <label>
                  Invoice Date: <span className="text-danger">*</span>{" "}
                </label>
                <br />
                <input
                  type="date"
                  id="invoice_date"
                  
                  
                  
                 {...register("invoice_date")}
                />
                <span className="text-danger">
                  {errors.invoice_date && errors.invoice_date.message}
                </span>
                <br />
                <label>
                  Received Date: <span className="text-danger">*</span>{" "}
                </label>
                <br />
                <input
                  type="date"
                  id="received_date"
                  
                  {...register("received_date")}
                />
                <span className="text-danger">
                  {errors.received_date && errors.received_date.message}
                </span>
                <br />
                <label>
                  Supplier: <span className="text-danger">*</span>{" "}
                </label>
                <br />
                <select value={values.supplier} className="GST" {...register("supplier")}>
                  <option value="select">select</option>
                  <option value="supplier">Supplier</option>
                  <option value="owner">Owner</option>
                </select>
                <span className="text-danger">
                  {errors.supplier && errors.supplier.message}
                </span>
                <br />
                <label>
                  Vehicle No: <span className="text-danger">*</span>{" "}
                </label>
                <br />
                <input
                  type="text"
                  value={values.vehical_no}
                  {...register("vehical_no")}
                />
                <span className="text-danger">
                  {errors.vehical_no && errors.vehical_no.message}
                </span>
                <br />
                <label>
                  Invoice No:
                  {/* <span className="text-danger">*</span>{" "} */}
                </label>
                <br />
                <input
                  type="text"
                  value={values.invoice_no}
                  {...register("invoice_no")}
                />
                <span className="text-danger">
                  {errors.invoice_no && errors.invoice_no.message}
                </span>
                <br />
              </div>
              <div className="col-md-8" style={{ width: "100px ! important" }}>
                <label>Type: </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="radio"
                  value="selling"
                  name="selling"
                  checked
                  {...register("type")}
                />
                Selling &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="radio"
                  value="adhoc"
                  name="selling"
                  {...register("type")}
                />
                Adhoc
                <br />
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Attached Invoice:</Form.Label>
                  <br />
                  <input type="file" id="file_name" className="file" name="file_name"/>
                  <div id="data"></div>
                  {/* <Form.Control type="file" {...register("attached_invoice")} /> */}
                  <span>
                    {errors.attached_invoice && errors.attached_invoice.message}
                  </span>
                </Form.Group>
                <label>
                  Freight:
                  <span className="text-danger">*</span>{" "}
                </label>
                <br />
                <input
                  min={0}
                  step="0.01"
                  type="number"
                  value={values.freight}
                  {...register("freight")}
                />
                <span className="text-danger">
                  {errors.freight && errors.freight.message}
                </span>
                '
                <br />
                <label>
                  Dispatch Through :
                  {/* <span className="text-danger">*</span> */}
                </label>
                <br />
                <select className="GST" {...register("dispatch_through")}>
                  <option value="select">Select</option>
                  <option value="vrl">VRL</option>
                  <option value="ideal">Ideal</option>
                  <option value="by hand">By Hand</option>
                  <option value="portal">Portal</option>
                </select>{" "}
                <br />
                <span className="text-danger">
                  {errors.dispatch_through && errors.dispatch_through.message}
                </span>{" "}
                <br />
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
                    <th>GST(%)</th>
                    <th>Amount (₹)</th>
                    <th></th>
                  </tr>
                  <br />
                  <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Size</th>
                      <th>UOM</th>
                      <th>QTY</th>
                      <th>Sub UOM</th>
                      <th>Sub QTY</th>
                      <th>Unit Price(₹)</th>
                      <th>GST(%)</th>
                      <th>Amount (₹)</th>
                      <th></th>
                  </tr>
                  <tr>
                  <td></td>
                  <td>
                    <ProductSearch
                      data={productGet}
                      ref={childRef}
                      onChangeData={(data) => {
                        console.log("sdsd", data);
                        setProductSelect(data);
                        productChange(data.product_name, "material_type"); // to store product_name
                        productChange(data.id, "product_id"); //to sore product_id in databse
                        Warning(data.id); //
                      }}
                    />

                    {/* <span>
                      {errors.material_type && errors.material_type.message}
                    </span> */}
                  </td>
                  <td>
                    <input
                      onChange={(e) => productChange(e.target.value, "size")}
                      value={add.size}
                      type="text"
                      style={{ padding: "0 5px", width: "100px" }}
                      // {...register("size")}
                    />
                    <span className="text-danger">
                      {isError && add.size == "" && "Size cannot be empty"}
                    </span>
                    {/* <span className="text-danger"> {errors.size && errors.size.message}</span> */}
                  </td>

                  <td>
                    <select
                      onChange={(e) => {
                        productChange(e.target.value, "uom");
                      }}
                      value={add.uom}
                      style={{ padding: "0 5px", width: "100px" }}
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
                    {/* <span className="text-danger">{errors.uom && errors.uom.message}</span> */}
                  </td>

                  <td>
                    <input
                      min={0}
                      onChange={(e) => {
                        productChange(e.target.value, "qty");

                        if (e.target.value >= 1) {
                          let unit_qty = e.target.value;
                          console.log(unit_qty, "unit_qty");

                          productChange(unit_qty, "unit_qty");
                        }
                      }}
                      value={add.qty}
                      type="number"
                      style={{ padding: "0 5px", width: "50px" }}
                      // {...register("qty")}
                    />
                    <span className="text-danger">
                      {isError && add.qty == "" && "Qty cannot be empty"}
                    </span>
                    {/* <span className="text-danger">{errors.qty && errors.qty.message}</span> */}
                  </td>

                  <td>
                    <select
                      onChange={(e) => {
                        productChange(e.target.value, "sub_uom");

                        if (e.target.value != "") {
                          setSubQtyDisabled(false);
                        } else {
                          setSubQtyDisabled(true);
                        }
                      }}
                      value={add.sub_uom}
                      style={{ padding: "0 5px", width: "100px" }}
                    >
                      <option value="select">Select</option>
                      <option value="kg">KG</option>
                      <option value="gram">Gram</option>
                      <option value="rolls">Rolls</option>
                      <option value="number">Number</option>
                      <option value="pieces">Pieces</option>
                      <option value="box">Box</option>
                    </select>
                    <span>{errors.sub_uom && errors.sub_uom.message}</span>
                  </td>
                  <td>
                    <input
                      min={1}
                      onChange={(e) => {
                        productChange(e.target.value, "sub_qty");
                        if (e.target.value >= 1) {
                          let unit_qty = parseFloat(add.qty) * e.target.value;
                          console.log(unit_qty, "unit_qty");

                          productChange(unit_qty, "unit_qty");
                        }
                      }}
                      value={add.sub_qty}
                      type="number"
                      style={{ padding: "0 5px", width: "50px" }}
                      disabled={subQtyDisabled}
                    />

                    {/* <span>{errors.sub_qty && errors.sub_qty.message}</span> */}
                  </td>

                  <td>
                    <input
                      onChange={(e) => {
                        amountInfo(e.target.value);
                        productChange(e.target.value, "rate");
                      }}
                      onBlur={(e) => checkWarning(e.target.value)}
                      type="number"
                      value={add.rate}
                      min={0}
                      style={{ padding: "0 5px", width: "70px" }}
                      // {...register("rate")}
                    />
                    <span className="text-danger">
                      {isError && add.rate == "" && "Rate cannot be empty"}
                    </span>

                    {/* <span className="text-danger">{errors.rate && errors.rate.message}</span> */}
                  </td>

                  <td>
                    <select
                      value={add.gst}
                      style={{ width: "200px", padding: "0 5px" }}
                      onChange={(e) => {
                        productChange(e.target.value, "gst");
                      }}
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
                      value={add.amount}
                      disabled
                      type="number"
                      style={{ padding: "0 5px", width: "200px" }}
                      // {...register("amount")}
                    />
                    <span>{errors.amount && errors.amount.message}</span>
                  </td>

                  <td>
                    <button type="button" className="btn btn-outline-warning ps-3 pe-3 ms-3 me-3 mb-1 mt-2" onClick={upadteAdd}>
                      ADD
                    </button>
                  </td>
                </tr>
                  
                </thead>

                {arrayObject.map((item, index) => (
                  <tr>
                    <td style={{ width: "70px" }}>{index + 1}</td>
                    <td>
                      <ProductSearch
                        ref={childRef}
                        data={productGet}
                        defValue={item.material_type}
                        // +"(GSM:"+item.gsm+ "capacity:"+item.capacity+")"}
                        onChangeData={(data) => {
                          console.log("sdsd", data);
                          Warning(data.id); //
                          setProductSelect(data);
                        }}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        value={item.size || ""}
                        onChange={(e) =>
                          editInput(e.target.value, index, "size")
                        }
                        style={{ width: "200px", padding: "0 5px" }}
                      />
                    </td>
                    <td>
                      <select
                        value={item.uom || ""}
                        onChange={(e) =>
                          editInput(e.target.value, index, "uom")
                        }
                        style={{ width: "200px", padding: "0 5px" }}
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
                      {" "}
                      <input
                        type="number"
                        value={item.qty || ""}
                        onChange={(e) =>
                          editInput(e.target.value, index, "qty")
                        }
                        min={0}
                        style={{ width: "200px", padding: "0 5px" }}
                      />
                    </td>
                    <td>
                      <select
                        value={item.sub_uom || ""}
                        onChange={(e) => {
                          editInput(e.target.value, index, "sub_uom");
                          if (e.target.value != "") {
                            setSubQtyDisabled(false);
                          } else {
                            setSubQtyDisabled(true);
                          }
                        }}
                        style={{ width: "200px", padding: "0 5px" }}
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
                      {" "}
                      <input
                        type="number"
                        value={item.sub_qty || ""}
                        onChange={(e) => {
                          editInput(e.target.value, index, "sub_qty");
                          if (e.target.value >= 1) {
                            console.log(item.qty);
                            let unit_qty = parseFloat(item.qty) * e.target.value;
                            console.log(e.target.value);
                            console.log(unit_qty);
                            editInput(unit_qty, index, "unit_qty");
                          }
                        }}
                        min={1}
                        disabled={subQtyDisabled}
                        style={{ width: "200px", padding: "0 5px" }}
                      />
                    </td>
                    <td>
                      {" "}
                      <input
                        type="text"
                        value={item.rate || ""}
                        onChange={(e) =>
                          editInput(e.target.value, index, "rate")
                        }
                        onBlur={(e) => checkWarning(e.target.value)}
                        min={0}
                        style={{ width: "200px", padding: "0 5px" }}
                      />
                    </td>

                    <td>
                      <select
                        value={item.gst || ""}
                        style={{ width: "200px", padding: "0 5px" }}
                        onChange={(e) =>
                          editInput(e.target.value, index, "gst")
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
                        disabled
                        value={getGtotal(item)}
                        // onChange={(e) =>
                        //   editInput(e.target.value, index, "amount")
                        // }
                        style={{ width: "200px", padding: "0 5px" }}
                      />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          FilterDelete(index);
                        }}
                        style={{ backgroundColor: "#dc3545" }}
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
                {/* <thead>
                  <th>Product</th>
                  <th>Size</th>
                  <th>UOM</th>
                  <th>QTY</th>
                  <th>Sub UOM</th>
                  <th>Sub QTY</th>
                  <th>Unit Price(₹)</th>
                  <th>GST(%)</th>
                  <th>Amount (₹)</th>
                </thead> */}
                
              </table>
            </div>

            <button
              type="Submit"
              className="btn btn-primary"
              style={{ position: "relative", bottom: "-100px" }}
            >
              Preview
            </button>

            <div style={{ float: "right" }}>
              <h6>
                Grand Total (₹):
                <span>{grandTotal}</span>
              </h6>
            </div>
          </form>

          {/* <button onClick={submitAllData} className="btn btn-primary">
            SAVE ALL
          </button> */}
        </Tab>
        <Tab eventKey={2} title="Purchase History">
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
                  className="date ms-1"
                />
              </td>
              <td>
                <p className="ms-3 me-1">End:</p>
              </td>
              <td>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="date"
                />
              </td>
              <td>
                <button type="button" className="btn btn-primary ms-3">
                  Refresh
                </button>
              </td>
            </div>
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
                  type="serach"
                  placeholder="Search Supplier Name"
                  className="w-25 form-control mb-4"
                  onChange={(e) => searchItems(e.target.value)}
                />
              }
              customStyles={customStyles}
            />
          </div>

          {/* </div>  */}
        </Tab>
      </Tabs>
      <div>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => {setLgShow(false)}}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Purchase History
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit2(OnPreview_edit)} onKeyDown={handleKeyDown}>
              <div className="row">
                <div className="col-md-4">
                  <label>Supplier Name:</label>
                  <h5>{values.supplier_name}</h5>
                  <label>
                    Invoice Date:<span className="text-danger">*</span>{" "}
                  </label>
                  <br />
                  <input
                    type="date"
                    value={values.invoice_date}
                    {...register2("invoice_date")}
                  />
                  <span>
                    {errors2.invoice_date && errors2.invoice_date.message}
                  </span>
                  <br />
                  <label>
                    Received Date: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="date"
                    value={values.received_date}
                    {...register2("received_date")}
                  />
                  <span>
                    {errors2.received_date && errors2.received_date.message}
                  </span>
                  <br />
                  <label>
                    Supplier: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <select value={values.supplier} {...register2("supplier")}>
                    <option value="select">select</option>
                    <option value="supplier">Supplier</option>
                    <option value="owner">Owner</option>
                  </select>
                  <span>{errors2.supplier && errors2.supplier.message}</span>
                  <br />
                  <label>
                    Vehicle No: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    value={values.vehical_no}
                    {...register2("vehical_no")}
                  />
                  <span>
                    {errors2.vehical_no && errors2.vehical_no.message}
                  </span>
                  <br />
                  <label>
                    Invoice No: <span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    value={values.invoice_no}
                    {...register2("invoice_no")}
                  />
                  <span>
                    {errors2.invoice_no && errors2.invoice_no.message}
                  </span>
                  <br />
                </div>
                <div
                  className="col-md-8"
                  style={{ width: "100px ! important" }}
                >
                  <label>Type:</label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    value="selling"
                    name="selling"
                    checked
                    {...register2("type")}
                  />
                  Selling &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    value="adhoc"
                    name="selling"
                    {...register2("type")}
                  />
                  Adhoc
                  <br />
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Attached Invoice:</Form.Label>
                    <input type="file" id="file_name1" name="file_name1"/>
                    <div id="data1"></div>
                    {/* <Form.Control
                      type="file"
                      {...register2("attached_invoice")}
                    />
                    <span>
                      {errors2.attached_invoice &&
                        errors2.attached_invoice.message}
                    </span> */}
                  </Form.Group>
                  <label>
                    Freight:
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <br />
                  <input
                    min={0}
                    step="0.01"
                    type="number"
                    value={values.freight}
                    {...register2("freight")}
                  />
                  <span className="text-danger">
                    {errors2.freight && errors2.freight.message}
                  </span>
                  <br />
                  <label>
                    Dispatch Through :
                    {/* <span className="text-danger">*</span> */}
                  </label>
                  <br />
                  <select {...register2("dispatch_through")}>
                    <option value="select">Select</option>
                    <option value="vrl">VRL</option>
                    <option value="ideal">Ideal</option>
                    <option value="by hand">By Hand</option>
                    <option value="portal">Portal</option>
                  </select>{" "}
                  <br />
                  <span className="text-danger">
                    {errors2.dispatch_through &&
                      errors2.dispatch_through.message}
                  </span>{" "}
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
                      <th>GST (%)</th>
                      <th>Amount (₹)</th>
                      <th></th>
                    </tr>
                  </thead>

                  {arrayObject_edit.map((item, index) => (
                    <tr>
                      <td style={{ width: "70px" }}>{index + 1}</td>
                      <td>
                        <ProductSearch
                          ref={childRef}
                          data={productGet}
                          defValue={item.material_type}
                          onChangeData={(data) => {
                            console.log("sdsd", data);
                            setProductSelect(data);
                            Warning(data.id); //
                          }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          value={item.size || ""}
                          onChange={(e) =>
                            editInput(e.target.value, index, "size")
                          }
                          style={{ width: "200px", padding: "0 5px" }}
                        />
                      </td>
                      <td>
                        <select
                          value={item.uom || ""}
                          onChange={(e) =>
                            editInput(e.target.value, index, "uom")
                          }
                          style={{ width: "200px", padding: "0 5px" }}
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
                        {" "}
                        <input
                          type="number"
                          value={item.qty || ""}
                          onChange={(e) =>
                            editInput(e.target.value, index, "qty")
                          }
                          min={0}
                          style={{ width: "200px", padding: "0 5px" }}
                        />
                      </td>
                      <td>
                        <select
                          value={item.sub_uom || ""}
                          onChange={(e) => {
                            editInput(e.target.value, index, "sub_uom");
                            if (e.target.value != "") {
                              setSubQtyDisabled(false);
                            } else {
                              setSubQtyDisabled(true);
                            }
                          }}
                          style={{ width: "200px", padding: "0 5px" }}
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
                        {" "}
                        <input
                          type="number"
                          value={item.sub_qty || ""}
                          onChange={(e) => {
                            editInput(e.target.value, index, "sub_qty");

                            if (e.target.value >= 1) {
                              let unit_qty =
                                parseFloat(item.qty) * e.target.value;
                              editInput(unit_qty, "unit_qty");
                            }
                          }}
                          min={1}
                          disabled={subQtyDisabled}
                          style={{ width: "200px", padding: "0 5px" }}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="text"
                          value={item.rate || ""}
                          onChange={(e) =>
                            editInput(e.target.value, index, "rate")
                          }
                          onBlur={(e) => checkWarning(e.target.value)}
                          min={0}
                          style={{ width: "200px", padding: "0 5px" }}
                        />
                      </td>

                      <td>
                        <select
                          value={item.gst || ""}
                          style={{ width: "200px", padding: "0 5px" }}
                          onChange={(e) =>
                            editInput(e.target.value, index, "gst")
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
                          disabled
                          value={getGtotal(item)}
                          onChange={(e) =>
                            editInput(e.target.value, index, "amount")
                          }
                          style={{ width: "200px", padding: "0 5px" }}
                        />
                      </td>
                      <td>
                        {" "}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            FilterDelete_edit(index);
                          }}
                          style={{ backgroundColor: "#dc3545" }}
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
                  <thead>
                    <th>Product</th>
                    <th>Size</th>
                    <th>UOM</th>
                    <th>QTY</th>
                    <th>Sub UOM</th>
                    <th>Sub QTY</th>
                    <th>Unit Price(₹)</th>
                    <th>GST (%)</th>
                    <th>Amount (₹)</th>
                  </thead>
                  <tbody>
                    <td>
                      <ProductSearch
                        data={productGet}
                        ref={childRef}
                        onChangeData={(data) => {
                          console.log("sdsd", data);
                          setProductSelect(data);
                          Warning(data.id); //
                          productChange(data.product_name, "material_type"); // to store product_name
                          productChange(data.id, "product_id"); //to sore product_id in databse
                        }}
                      />

                      <span>
                        {errors2.material_type && errors2.material_type.message}
                      </span>
                    </td>
                    <td>
                      <input
                        onChange={(e) => productChange(e.target.value, "size")}
                        value={add.size}
                        type="text"
                        style={{ padding: "0 5px", width: "100px" }}
                        // {...register("size")}
                      />
                      <span className="text-danger">
                        {isError && add.size == "" && "Size cannot be empty"}
                      </span>
                    </td>

                    <td>
                      <select
                        onChange={(e) => {
                          productChange(e.target.value, "uom");
                        }}
                        value={add.uom}
                        style={{ padding: "0 5px", width: "100px" }}
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
                      <span>{errors2.uom && errors2.uom.message}</span>
                    </td>

                    <td>
                      <input
                        min={0}
                        onChange={(e) => {
                          productChange(e.target.value, "qty");
                        }}
                        value={add.qty}
                        type="number"
                        style={{ padding: "0 5px", width: "50px" }}
                        // {...register("qty")}
                      />
                      <span className="text-danger">
                        {isError && add.qty == "" && "QTY cannot be empty"}
                      </span>
                    </td>

                    <td>
                      {" "}
                      <select
                        onChange={(e) => {
                          productChange(e.target.value, "sub_uom");
                          if (e.target.value != "") {
                            setSubQtyDisabled(false);
                          } else {
                            setSubQtyDisabled(true);
                          }
                        }}
                        value={add.sub_uom}
                        style={{ padding: "0 5px", width: "100px" }}
                      >
                        <option value="select">Select</option>
                        <option value="kg">KG</option>
                        <option value="gram">Gram</option>
                        <option value="rolls">Rolls</option>
                        <option value="number">Number</option>
                        <option value="pieces">Pieces</option>
                        <option value="box">Box</option>
                      </select>
                      <span>{errors2.sub_uom && errors2.sub_uom.message}</span>
                    </td>
                    <td>
                      <input
                        min={1}
                        onChange={(e) => {
                          productChange(e.target.value, "sub_qty");
                          if (e.target.value >= 1) {
                            let unit_qty = parseFloat(add.qty) * e.target.value;
                            productChange(unit_qty, "unit_qty");
                          }
                        }}
                        value={add.sub_qty}
                        type="number"
                        disabled={subQtyDisabled}
                        style={{ padding: "0 5px", width: "50px" }}
                        // {...register("qty")}
                      />
                      <span>{errors2.sub_qty && errors2.sub_qty.message}</span>
                    </td>

                    <td>
                      <input
                        onChange={(e) => {
                          amountInfo(e.target.value);
                          productChange(e.target.value, "rate");
                        }}
                        onBlur={(e) => checkWarning(e.target.value)}
                        type="number"
                        value={add.rate}
                        min={0}
                        style={{ padding: "0 5px", width: "70px" }}
                        // {...register("rate")}
                      />
                      <span className="text-danger">
                        {isError && add.rate == "" && "Rate cannot be empty"}
                      </span>
                    </td>

                    <td>
                      <select
                        value={add.gst}
                        style={{ width: "200px", padding: "0 5px" }}
                        onChange={(e) => {
                          productChange(e.target.value, "gst");
                        }}
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
                        value={add.amount}
                        disabled
                        type="number"
                        style={{ padding: "0 5px", width: "200px" }}
                        // {...register("amount")}
                      />
                      <span>{errors2.amount && errors2.amount.message}</span>
                    </td>

                    <td>
                      <button type="button" onClick={upadteAdd_edit}>
                        ADD
                      </button>
                    </td>
                  </tbody>
                  <button type="Submit" className="btn btn-primary">
                    SAVE
                  </button>
                </table>
              </div>
              <div style={{ float: "right" }}>
                <h6>
                  Grand Total (₹):
                  <span>{grandTotal2}</span>
                </h6>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <div>
          <Snackbar
            open={toast}
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={1}
            onClose={() => setToast(false)}
            ClickAwayListenerProps={{
              mouseEvent: false,
            }}
            key={"bottom" + "center"}
          >
            <Alert
              onClose={() => setToast(false)}
              severity="warning"
              sx={{ width: "100%" }}
            >
              The previous purchase cost was less.
            </Alert>
          </Snackbar>
        </div>
      </div>
      <div>
        <FunctionAlert 
        
        isVisible={showAlert}
        onClose={() => {
          setShowAlert(false);
        }}
        data={alertData}/>
      </div>
    </div>
  );
};
export default Purchaseledger;

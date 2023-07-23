import React, { useState, useEffect, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import * as yup from "yup";
import Tabs from "react-bootstrap/Tabs";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteAPI, getAPI, postAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import DynamicSearch from "../../components/AutoComplete/DynamicSearch";
import ProductSearch from "../../components/AutoComplete/ProductSearch";
import FunctionAlert from "../alert/FunctionAlertpo";
import url from "../../views/config";


const SignupSchema = yup.object({
  contact_mobile: yup
    .string()
    .required("Mobile is required")
    .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
  mobile_no: yup
    .string()
    .required("Mobile is required")
    .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  gst_no: yup
    .string()
    .min(10, "GST number must be at least 10 characters long")
    .max(10, "GST number can be maximum 10 characters long")
    .required("GST number is required"),

  address1: yup.string().required("Address is required"),
  address2: yup.string().required("Address is required"),
  place_of_delivery: yup.string().required("Place of Delivery is required"),

  state: yup
    .string()
    .matches(/^[A-Za-z]+$/, "State should only contain alphabet")
    .oneOf(
      ["Karnataka", "Pune", "Goa", "Kerala", "Chennai"],
      "Please select a valid state"
    )
    .required("State is required"),

  date: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date is required")
    .nullable(),
  contact_person: yup
    .string()
    .required("Contact name is required")
    .matches(/^(\S+\s?)+$/, "Contact name should contain at least one space")
    .max(100, "Contact name should not exceed 100 characters"),
});

const initialState = {
  product: "",
  size: "",
  hsn: "",
  qty: "",
  uom: "",
  rate: "",
  gst: "",
  product_id: 0,
  grandtotal: 0,
};

export default function Purchase() {
  const [reload, setReload] = useState(false);
  const [alertData, setAlertData] = useState({
    code: 200,
    data: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [refNo, setRefNo] = useState("");
  const [productSelect, setProductSelect] = useState({});
  const childRef = useRef(); // forward ref transfering from child to parent
  const [isError, setIsError] = useState(false); //prodarry validation
  const [lgShow, setLgShow] = useState(false);
  const [productGet, setProductGet] = useState([]); // product master name and uom gst
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [key, setKey] = useState(1); //tabs
  const [add, setAdd] = useState([]);
  const [isEdit, setIsEdit] = useState(false); //to flip post and put
  const [eedit, setEedit] = useState(""); /// to store in id in setvalue
  const [sget, setSGet] = useState([]);
  const [select, setSelect] = useState({}); //autocomplete

  const [api, setApi] = useState([]); // filter
  const [thearray, setThearray] = useState([]);
  const [thearray_edit, setThearray_edit] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [subTotal2, setSubTotal2] = useState(0);
  const [taxTotal2, setTaxTotal2] = useState(0);
  const [grandTotal2, setGrandTotal2] = useState(0);

  const [added, setadded] = useState(initialState);

  const editDisplay = (data, prodArray) => {
  
    setEedit(data.id);
    setValue("supplier_name", data.supplier_name);
    setValue("address1", data.address1);
    setValue("mobile_no", data.mobile_no);
    setValue("address2", data.address2);
    setValue("gst_no", data.gst_no);
    setValue("email", data.email);
    setValue("state", data.state);
    // setValue("date", moment(data.date).format("yyyy-MM-dd"));
    setValue("date", moment(data.date).format('YYYY-MM-DD'));
    setValue("place_of_delivery", data.place_of_delivery);
    setValue("contact_person", data.contact_person);
    setValue("contact_mobile", data.contact_mobile);
    setValue("grandTotal", data.grand_total);
    // setValue("thearray", data.productArray);
    console.log(data.date);
    setSubTotal(0);
    setTaxTotal(0);
    setGrandTotal(0);
    console.log(moment(data.date).format("DD-MM-YYYY"));
    setThearray_edit(prodArray);
    revisedGTotal2(prodArray)
  };

  const {
    register,
reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });
  const values = watch();

  const {
    register: register2,
    setValue,
    reset:reset2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  const productChange = (e, key) => {
    setadded((prevState) => ({
      ...prevState,
      [key]: e,
    }));
  };

  const editInput = (dis, i, data) => {
    // let editData = [];
    // editData = [...thearray];
    // editData[i][data] = dis;
    // getGrandTotal(dis);
    // setThearray(editData);
  };

  const getGrandTotal = (e) => {
    let gstValue = parseInt(e) / 100;
    let gsttotal = parseInt(added.rate) * parseInt(added.qty) * gstValue;
    let subtotal = gsttotal + parseInt(added.rate) * parseInt(added.qty);
    productChange(subtotal, "grandtotal");
    productChange(e, "gst");
  };
  const getGTotal = (item) => {
    // mapping sub toatal display
    let gstValue = parseInt(item.gst) / 100;
    let gsttotal = parseInt(item.rate) * parseInt(item.qty) * gstValue;
    let subtotal = parseInt(item.rate) * parseInt(item.qty);
    let grtotal = gsttotal + subtotal;

    // setSubTotal(subTotal + subtotal);
    // setTaxTotal(taxTotal + gsttotal);
    // setGrandTotal(grandTotal + grtotal);
    return grtotal;
  };

  // const table_data=[]
  const addUpdate = () => {
    //  console.log(JSON.stringify(added));

    if (
      added.product == "" ||
      added.size == "" ||
      added.hsn == "" ||
      added.qty == "" ||
      added.uom == "" ||
      added.rate == "" ||
      added.gst == ""
    ) {
      // errors.product="product need"
      // alert("all fields mandoratory")
      setIsError(true);
    } else {
      setThearray([...thearray, added]);
      getTotalInfo(added);
      setIsError(false);
      childRef.current.clearProdValue();

      setadded({ ...initialState });
      var remove = [...thearray, added];

        setThearray(remove);
        revisedGTotal(remove);
    }
  };

  const addUpdate_edit = () => {
    //  console.log(JSON.stringify(added));

    if (
      added.product == "" ||
      added.size == "" ||
      added.hsn == "" ||
      added.qty == "" ||
      added.uom == "" ||
      added.rate == "" ||
      added.gst == ""
    ) {
      // errors.product="product need"
      // alert("all fields mandoratory")
      setIsError(true);
    } else {
      setThearray([...thearray_edit, added]);
      getTotalInfo2(added);
      setIsError(false);
      childRef.current.clearProdValue();

      setadded({ ...initialState });
      var remove = [...thearray_edit, added];

        setThearray_edit(remove);
        revisedGTotal2(remove);
    }
  };

  const getTotalInfo = (added) => {
    let gstValue = parseInt(added.gst) / 100;
    let gsttotal = parseInt(added.rate) * parseInt(added.qty) * gstValue;
    let subtotal = parseInt(added.rate) * parseInt(added.qty);
    let grtotal = gsttotal + subtotal;

    setSubTotal(subTotal + subtotal);
    setTaxTotal(taxTotal + gsttotal);
    setGrandTotal(grandTotal + grtotal);
  };

  const getTotalInfo2 = (added) => {
    let gstValue = parseInt(added.gst) / 100;
    let gsttotal = parseInt(added.rate) * parseInt(added.qty) * gstValue;
    let subtotal = parseInt(added.rate) * parseInt(added.qty);
    let grtotal = gsttotal + subtotal;

    setSubTotal2(subTotal2 + subtotal);
    setTaxTotal2(taxTotal2 + gsttotal);
    setGrandTotal2(grandTotal2 + grtotal);
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
       gstValue = parseFloat(i.gst) / 100;
       gsttotal =parseFloat(gsttotal)+ (parseFloat(i.rate) * parseFloat(i.qty) * gstValue);
       subtotal =parseFloat(subtotal)+ (parseFloat(i.rate) * parseFloat(i.qty));
       grtotal =parseFloat(gsttotal) + parseFloat(subtotal);
      setSubTotal2(subtotal);
      setTaxTotal2(gsttotal);
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
      name: "Sl No",
      selector: (row, index) => index + 1,
      sortable: true,
      width:"100px"
    },
    {
      name: "Po No",
      selector: (row) => row.main.po_no,
      sortable: true,
      width:"100px"
    },
    {
      name: "Po Date",
      selector: (row) => row.main.date,
      sortable: true,
      width:"100px"
    },
    {
      name: "Supplier Name",
      selector: (row) => row.main.supplier_name,
      sortable: true,
      width:"150px"
    },
    {
      name: "Mobile No",
      selector: (row) => row.main.mobile_no,
      sortable: true,
      width:"100px"
    },

    {
      name: "Email Status",
      selector: (row) => row.main.email,
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) => row.main.created_by,
      sortable: true,
      width:"150px"
    },
    {
      name: "Action",
      selector: (row) => row.main.Type,
      sortable: true,
      cell: (row) => (
        <div>
          <button
            type="button "
            className="btn btn-primary"
            onClick={() => {
              
              // setIsEdit(true); //looping post and put
              editDisplay(row.main, row.sub_main);
              //setKey("1");
              setLgShow(true);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            type="button "
            className="btn btn-danger"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              deleteHandle(row.main.id);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
          <a
            style={{ marginLeft: "5px" }}
           
            
            href={url.pdf_url+`/purchase_order.php?id=${row.main.id}`}
          >
            <button type="button" className="btn btn-danger">
              PDF
            </button>
          </a>
        </div>
      ),
    },
  ];

  const onsubmit = (data) => {
    var created_by = localStorage.getItem("ootel_admin_created_by");
    console.log(data, "karthik");
    let postData = {
      id: eedit,
      number: refNo,
      supplier_name: select.supplier_name,
      supplier_id: select.id,
      address1: data.address1,
      mobile_no: data.mobile_no,
      address2: data.address2,
      gst_no: data.gst_no,
      email: data.email,
      state: data.state,
      date: moment(data.date).format('YYYY-MM-DD'),

      place_of_delivery: data.place_of_delivery,
      contact_person: data.contact_person,
      contact_mobile: data.contact_mobile,
      grand_total: grandTotal,
      productArray: thearray,
      created_by: created_by,
    };
    console.log(postData, "postData");
    console.log(thearray, "thearray");

    postAPI(apinames.POST_PURCHASE, postData)
    .then((response) => {
    console.log(response,"response");
      var status_code = response.status_code;
      let alert_data;
      if (status_code == 200) {
        // setShowPreview(false);

        alert_data = {
          code: status_code,
          data: ["Purchase Order Submitted Successfully"],
        };
        setAlertData(alert_data);
        setShowAlert(true);
        reset();
        setTimeout(() => {
          setShowAlert(false);
          setReload(true);
          window.location.reload();
        }, 2000);
      } else if (status_code == 400) {
        // setShowPreview(false);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setReload(true);
          window.location.reload(1);
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
};

  const editSubmit = (data1) => {
    let editData = {
      id: eedit,
      number: data1.refNo,
      supplier_name: data1.supplier_name,
      supplier_id: data1.id,
      address1: data1.address1,
      mobile_no: data1.mobile_no,
      address2: data1.address2,
      gst_no: data1.gst_no,
      email: data1.email,
      state: data1.state,
      date: moment(data1.date).format('YYYY-MM-DD'),

      place_of_delivery: data1.place_of_delivery,
      contact_person: data1.contact_person,
      contact_mobile: data1.contact_mobile,
      grand_total: grandTotal,
      productArray: thearray_edit,
    };

    postAPI(apinames.PUT_PURCHASE, editData)
    .then((response) => {
      var status_code = response.status_code;
      let alert_data;
      if (response.status_code === 200) {
        setLgShow(false);
        // setShowPreview(false)
        alert_data = {
          code: response.status_code,
          data: "Purchase Order Submitted Successfully",
        };
        setAlertData(alert_data);
        setShowAlert(true);
        reset2();
        setTimeout(() => {
          setShowAlert(false);
          setReload(true);
           window.location.reload()
        }, 2000);
      } else if (response.status_code == 400) {
        setLgShow(false);
        // setShowPreview(false)
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setReload(true);
        }, 1000);
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
};

  useEffect(() => {
    getAPI(apinames.GET_PURCHASE).then((data) => {
      const reversedData = data.data.slice().reverse();
      console.log(data, "datttttttaaa");
      setRefNo(data.number);
      console.log(data.number, "setRefNo");
      setAdd(reversedData);
      setApi(data.data); //filter
    });

    getAPI(apinames.GET_SUPPLIER_MASTER)
      .then((response) => {
        console.log(response.data, "supplier");
        setSGet(response.data);
      })

      .catch((error) => {
        console.log(error, "api error");
      }); //-------------------------------------------------------------------------get customer_master
    getAPI(apinames.GET_PRODUCT_MASTER).then((response) => {
      console.log(response.data, "product master getting");
      setProductGet(response.data);
    });
  }, [reload]);

 
  const deleteHandle = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_PURCHASE + id).then((response) => {
          console.log(response, "response");
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };

  // filter for deleting array of object on in front end

  const deleteProduct = (e1) => {
    // console.log(e, "wqewew");
    // console.log(thearray, "thearray");

    // var remove = [...thearray];
    // var index = remove.indexOf(e);
    // console.log(remove, "remove");
    // console.log(index, "thearray index");
    // if (index == -1) {
    //   remove.splice(index, 1);
    //   setThearray(remove);
    // }
    var remove = [...thearray];
    
    var index = remove.indexOf(e1);
    //alert(JSON.stringify(remove))
   
      remove.splice(e1, 1);
      setThearray(remove);
      revisedGTotal(remove);
  };
  const deleteProduct_edit = (e1) => {
    // console.log(e, "wqewew");
    // console.log(thearray, "thearray");

    // var remove = [...thearray];
    // var index = remove.indexOf(e);
    // console.log(remove, "remove");
    // console.log(index, "thearray index");
    // if (index == -1) {
    //   remove.splice(index, 1);
    //   setThearray(remove);
    // }
    var remove = [...thearray_edit];
    
    var index = remove.indexOf(e1);
    //alert(JSON.stringify(remove))
   
      remove.splice(e1, 1);
      setThearray_edit(remove);
      revisedGTotal2(remove);
  };
  // filter
  const searchItems = (searchValue) => {
    // setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = add.filter((item) => {
        return (
          item.main.supplier_name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.main.mobile_no.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setAdd(filteredData);
    } else {
      setAdd(api);
    }
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
        <Tab eventKey={1} title="Purchase Order">
          <div className="main-cointainer">
            <form
              onSubmit={handleSubmit(onsubmit)}
              style={{
                padding: "10px",
                margin: "20px",
              }}
            >
              <div
                className="row"
                style={{
                  padding: "20px",
                  border: "1px solid black",
                  backgroundColor: "aliceblue",
                }}
              >
                <div className="col-md-6">
                  <div className="buyer">
                    <label>Supplier Name:</label>
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

                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.supplier_name && errors.supplier_name.message}
                    </span>
                    <br />
                    <label>Address 1:</label>
                    <br />
                    <input
                      maxLength={200}
                      type="text"
                      value={values.address1}
                      {...register("address1")}
                    />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.address1 && errors.address1.message}
                    </span>
                    <br />
                    <label>Address 2:</label>
                    <br />
                    <input
                      maxLength={200}
                      type="text"
                      value={values.address2}
                      {...register("address2")}
                    />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.address2 && errors.address2.message}
                    </span>

                    <br />
                    <label>Mobile No:</label>
                    <br />
                    <input
                      type="number"
                      minLength={12}
                      maxLength={12}
                      value={values.mobile_no}
                      {...register("mobile_no")}
                    />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.mobile_no && errors.mobile_no.message}
                    </span>
                    <br />
                    <label>Gst:</label>
                    <br />
                    <input
                      maxLength={15}
                      type="text"
                      value={values.gst_no}
                      {...register("gst_no")}
                    />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.gst_no && errors.gst_no.message}
                    </span>
                    <br />
                    <label>Email:</label>
                    <br />
                    <input
                      type="email"
                      value={values.email}
                      {...register("email")}
                    />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.email && errors.email.message}
                    </span>
                    <br />
                    <label>State:</label>
                    <br />
                    <select value={values.state} {...register("state")}>
                      <option value="select">Select</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Pune">Pune</option>
                      <option value="Goa">Goa</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.state && errors.state.message}
                    </span>
                    <br />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="delivery">
                    <p>Ref No:{refNo}</p>
                    <label>Date:</label>
                    <br />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={values.date}
                      {...register("date")}
                    />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.date && errors.date.message}
                    </span>
                    <br />
                    <label>Place Of Delivery:</label>
                    <br />
                    <textarea
                      rows={3}
                      maxLength={200}
                      value={values.place_of_delivery}
                      onChange={(e) => {
                        setValue("place_of_delivery", e.target.value);
                      }}
                      {...register("place_of_delivery")}
                    ></textarea>
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.place_of_delivery &&
                        errors.place_of_delivery.message}
                    </span>
                    <br />
                    <label>Contact Person:</label>
                    <br />
                    <input
                      max={100}
                      type="text"
                      value={values.contact_person}
                      {...register("contact_person")}
                    />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.contact_person && errors.contact_person.message}
                    </span>
                    <br />
                    <label>Contact Mobile:</label>
                    <br />
                    <input
                      type="number"
                      value={values.contact_mobile}
                      {...register("contact_mobile")}
                    />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.contact_mobile && errors.contact_mobile.message}
                    </span>
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
                      <th style={{ width: "50px" }}>Sl no</th>
                      <th>Product</th>
                      <th>Size</th>
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
                      <tbody>
                        <tr>
                          <td style={{ width: "50px" }}>{index + 1}</td>
                          <td>
                            <ProductSearch
                              ref={childRef}
                              data={productGet}
                              defValue={item.product}
                              onChangeData={(data) => {
                                console.log("sdsd", data);
                                setProductSelect(data);
                              }}
                            />
                          </td>

                          <td>
                            {" "}
                            <input
                              type="text "
                              value={item.size || ""}
                              onChange={(e) =>
                                editInput(e.target.value, index, "size")
                              }
                              style={{ width: "150px" }}
                            />
                          </td>
                          <td>
                            <input
                              type="text "
                              value={item.hsn || ""}
                              onChange={(e) =>
                                editInput(e.target.value, index, "hsn")
                              }
                              style={{ width: "100px" }}
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
                            <input
                              type="number "
                              value={item.rate || ""}
                              onChange={(e) =>
                                editInput(e.target.value, index, "rate")
                              }
                              style={{ width: "50px" }}
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
                              type="number"
                              // value={item.gst*item.qty* item.rate || ""}
                              value={getGTotal(item)}
                              disabled
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger"
                              style={{ backgroundColor: "#dc3545" }}
                              onClick={() => {
                                deleteProduct(index);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
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
                      <th>Size</th>
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
                          ref={childRef}
                          onChangeData={(data) => {
                            console.log("sdsd", data);
                            setProductSelect(data);
                            productChange(data.product_name, "product"); // to store product_name
                            productChange(data.id, "product_id"); //to sore product_id in databse
                          }}
                        />
                        <span className="text-danger">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          {errors.product && errors.product.message}
                        </span>
                      </td>
                      <td>
                        <input
                          style={{ width: "90px" }}
                          type="text"
                          value={added.size}
                          onChange={(e) =>
                            productChange(e.target.value, "size")
                          }
                          // {...register("size")}
                        />
                        <span className="text-danger">
                          {isError &&
                            added.size == "" &&
                            "SIZE cannot be empty"}
                        </span>
                      </td>

                      <td>
                        <input
                          style={{ width: "100px" }}
                          type="type"
                          value={added.hsn}
                          onChange={(e) => productChange(e.target.value, "hsn")}
                          // {...register("hsn")}
                        />
                        <span className="text-danger">
                          {isError && added.hsn == "" && "HSN cannot be empty"}
                        </span>
                      </td>

                      <td>
                        <input
                          style={{ width: "70px" }}
                          type="number"
                          min={0}
                          value={added.qty}
                          onChange={(e) => productChange(e.target.value, "qty")}
                          // {...register("qty")}
                        />
                        <span className="text-danger">
                          {isError && added.qty == "" && "QTY cannot be empty"}
                        </span>
                      </td>

                      <td>
                        <select
                          style={{ width: "100px" }}
                          value={added.uom}
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
                          {isError && added.uom == "" && "UOM cannot be empty"}
                        </span>
                      </td>

                      <td>
                        <input
                          type="number"
                          style={{ width: "100px" }}
                          value={added.rate}
                          onChange={(e) =>
                            productChange(e.target.value, "rate")
                          }
                          // {...register("rate")}
                        />
                        <span className="text-danger">
                          {isError &&
                            added.rate == "" &&
                            "RATE cannot be empty"}
                        </span>
                      </td>

                      <td>
                        <select
                          style={{ width: "100px" }}
                          value={added.gst}
                          onChange={(e) => {
                            getGrandTotal(e.target.value);
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
                          {isError && added.gst == "" && "GST cannot be empty"}
                        </span>
                      </td>

                      <td>
                        <input
                          type="number"
                          value={added.grandtotal}
                          disabled
                          onChange={(e) =>
                            productChange(e.target.value, "grandtotal")
                          }
                        />
                        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                      </td>
                      <button
                        type="button"
                        classname="btn btn-success"
                        onClick={addUpdate}
                        style={{ float: "right" }}
                      >
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

              <br />

              <div
                style={{
                  textAlign: "end",
                }}
              >
                <h6>
                  Sub Total (₹):<span>{subTotal}</span>
                </h6>
                <br />
                <h6>
                  GST (₹) :<span>{taxTotal}</span>
                </h6>
                <br />
                <h6>
                  Grand Total (₹) :<span>{grandTotal}</span>
                </h6>
              </div>
            </form>
          </div>
        </Tab>
        <Tab eventKey={2} title="Purchase Order History">
          <div>
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
                  data={add}
                  pagination
                  paginationReverse={true}
                  fixedHeader
                  fixedHeaderScrollHeight="450px"
                  defaultSortField="id"
                  defaultSortAsc={false}
                  // selectableRows
                  // selectRowsHighlight
                  highlightOnHover
                  actions={
                    <button type="button" className="btn btn-primary">
                      Export
                    </button>
                  }
                  subHeader
                  subHeaderComponent={
                    <input
                      type="search"
                      placeholder="Search supplier name or mobile no"
                      className="w-25 form-content"
                      onChange={(e) => searchItems(e.target.value)}
                    />
                  }
                  customStyles={customStyles}
                />
              </div>
            </div>
            <div className="main-cointainer">
              <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Purchase History
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form
                    onSubmit={handleSubmit2(editSubmit)}
                    style={{
                      padding: "10px",
                      margin: "20px",
                    }}
                  >
                    <div
                      className="row"
                      style={{
                        padding: "20px",
                        border: "1px solid black",
                        backgroundColor: "aliceblue",
                      }}
                    >
                      <div className="col-md-6">
                        <div className="buyer">
                          <h5>Supplier Name:</h5>
                          <p>{values.supplier_name}</p>
                          <label>Address 1:</label>
                          <br />
                          <input
                            type="text"
                            maxLength={200}
                            {...register2("address1")}
                          />
                          <span className="text-danger">
                            {errors2.address1 && errors2.address1.message}
                          </span>{" "}
                          <br />
                          <label>Address 2:</label>
                          <br />
                          <input
                            type="text"
                            maxLength={200}
                            {...register2("address2")}
                          />
                          <span>
                            {errors2.address2 && errors2.address2.message}
                          </span>
                          <br />
                          <label>Mobile No:</label>
                          <br />
                          <input
                            type="number"
                            minLength={12}
                            maxLength={12}
                            {...register2("mobile_no")}
                          />
                          <span>
                            {errors2.mobile_no && errors2.mobile_no.message}
                          </span>
                          <br />
                          <label>Gst:</label>
                          <br />
                          <input
                            maxLength={15}
                            type="text"
                            {...register2("gst_no")}
                          />
                          <span>
                            {errors2.gst_no && errors2.gst_no.message}
                          </span>
                          <br />
                          <label>Email:</label>
                          <br />
                          <input type="email" {...register2("email")} />
                          <span>{errors2.email && errors2.email.message}</span>
                          <br />
                          <label>State:</label>
                          <br />
                          <select {...register2("state")}>
                            <option value="select">Select</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Pune">Pune</option>
                            <option value="Goa">Goa</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Chennai">Chennai</option>
                          </select>
                          <span>{errors2.state && errors2.state.message}</span>
                          <br />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="delivery">
                          <p>Ref No:{refNo}</p>
                          <label>Date:</label>
                          <br />
                          <input
                            type="date"
                            id="date"
                            name="date"
                            {...register2("date")}
                          />
                          <span>{errors2.date && errors2.date.message}</span>
                          <br />
                          <label>Place Of Delivery:</label>
                          <br />
                          <textarea
                            rows={3}
                            maxLength={200}
                            {...register2("place_of_delivery")}
                          ></textarea>
                          <span>
                            {errors2.place_of_delivery &&
                              errors2.place_of_delivery.message}
                          </span>
                          <br />
                          <label>Contact Person:</label>
                          <br />
                          <input
                            type="text"
                            max={100}
                            {...register2("contact_person")}
                          />
                          <span>
                            {errors2.contact_person &&
                              errors2.contact_person.message}
                          </span>
                          <br />
                          <label>Contact Mobile:</label>
                          <br />
                          <input
                            type="number"
                            {...register2("contact_mobile")}
                          />
                          <span>
                            {errors2.contact_mobile &&
                              errors2.contact_mobile.message}
                          </span>
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
                            <th style={{ width: "50px" }}>Sl no</th>
                            <th>Product</th>
                            <th>Size</th>
                            <th>HSN</th>
                            <th>Qty</th>
                            <th>UOM</th>
                            <th>Unit Price (₹)</th>
                            <th>GST</th>
                            <th>Grand Total (₹)</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        {thearray_edit.map((item, index) => {
                          return (
                            <tbody>
                              <tr>
                                <td style={{ width: "50px" }}>{index + 1}</td>
                                <td>
                                  <ProductSearch
                                    ref={childRef}
                                    data={productGet}
                                    defValue={item.product}
                                    onChangeData={(data) => {
                                      console.log("sdsd", data);
                                      setProductSelect(data);
                                    }}
                                  />
                                </td>

                                <td>
                                  {" "}
                                  <input
                                    type="text "
                                    value={item.size || ""}
                                    onChange={(e) =>
                                      editInput(e.target.value, index, "size")
                                    }
                                    style={{ width: "150px" }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text "
                                    value={item.hsn || ""}
                                    onChange={(e) =>
                                      editInput(e.target.value, index, "hsn")
                                    }
                                    style={{ width: "100px" }}
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
                                  <input
                                    type="number "
                                    value={item.rate || ""}
                                    onChange={(e) =>
                                      editInput(e.target.value, index, "rate")
                                    }
                                    style={{ width: "50px" }}
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
                                    type="number"
                                    // value={item.gst*item.qty* item.rate || ""}
                                    value={getGTotal(item)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    style={{ backgroundColor: "#dc3545" }}
                                    onClick={() => {
                                      deleteProduct_edit(index);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </tbody>
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
                            <th>Size</th>
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
                                ref={childRef}
                                onChangeData={(data) => {
                                  console.log("sdsd", data);
                                  setProductSelect(data);
                                  productChange(data.product_name, "product"); // to store product_name
                                  productChange(data.id, "product_id"); //to sore product_id in databse
                                }}
                              />
                              <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                {errors2.product && errors2.product.message}
                              </span>
                            </td>
                            <td>
                              <input
                                style={{ width: "90px" }}
                                type="text"
                                value={added.size}
                                onChange={(e) =>
                                  productChange(e.target.value, "size")
                                }
                                // {...register2("size")}
                              />
                              <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                {errors2.size && errors2.size.message}
                              </span>
                            </td>

                            <td>
                              <input
                                style={{ width: "100px" }}
                                type="type"
                                value={added.hsn}
                                onChange={(e) =>
                                  productChange(e.target.value, "hsn")
                                }
                                // {...register2("hsn")}
                              />
                              <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                {errors2.hsn && errors2.hsn.message}
                              </span>
                            </td>

                            <td>
                              <input
                                style={{ width: "70px" }}
                                type="number"
                                min={0}
                                value={added.qty}
                                onChange={(e) =>
                                  productChange(e.target.value, "qty")
                                }
                                // {...register2("qty")}
                              />
                              <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                {errors2.qty && errors2.qty.message}
                              </span>
                            </td>

                            <td>
                              <select
                                style={{ width: "100px" }}
                                value={added.uom}
                                onChange={(e) =>
                                  productChange(e.target.value, "uom")
                                }
                                // {...register2("uom")}
                              >
                                <option value="select">Select</option>
                                <option value="kg">KG</option>
                                <option value="gram">Gram</option>
                                <option value="rolls">Rolls</option>
                                <option value="number">Number</option>
                                <option value="pieces">Pieces</option>
                                <option value="box">Box</option>
                              </select>
                              <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                {errors2.uom && errors2.uom.message}
                              </span>
                            </td>

                            <td>
                              <input
                                type="number"
                                style={{ width: "100px" }}
                                value={added.rate}
                                onChange={(e) =>
                                  productChange(e.target.value, "rate")
                                }
                                // {...register2("rate")}
                              />
                              <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                {errors2.rate && errors2.rate.message}
                              </span>
                            </td>

                            <td>
                              <select
                                style={{ width: "100px" }}
                                value={added.gst}
                                onChange={(e) => {
                                  getGrandTotal(e.target.value);
                                }}
                                // {...register2("gst")}
                              >
                                <option value="select">select</option>
                                <option value="0">0</option>
                                <option value="5">5</option>
                                <option value="12">12</option>
                                <option value="18">18</option>
                                <option value="28">28</option>
                              </select>
                              <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                {errors2.gst && errors2.gst.message}
                              </span>
                            </td>

                            <td>
                              <input
                                type="number"
                                value={added.grandtotal}
                                disabled
                                onChange={(e) =>
                                  productChange(e.target.value, "grandtotal")
                                }
                              />
                              <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                            </td>
                            <button
                              type="button"
                              classname="btn btn-success"
                              onClick={addUpdate_edit}
                              style={{ float: "right" }}
                            >
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

                    <br />

                    <div
                      style={{
                        textAlign: "end",
                      }}
                    >
                      <h6>
                        Sub Total (₹):<span>{subTotal2}</span>
                      </h6>
                      <br />
                      <h6>
                        GST (₹) :<span>{taxTotal2}</span>
                      </h6>
                      <br />
                      <h6>
                        Grand Total (₹) :<span>{grandTotal2}</span>
                      </h6>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </Tab>
      </Tabs>
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

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
import "./productMaster.css";
import Filter from "../../components/Filter";
import FunctionAlert from "../alert/FunctionAlert";

import "./productMaster.css";
import {
  postAPI,
  getAPI,
  PutAPI,
  deleteAPI,
} from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import Select from "react-select";

const SignupSchema = yup.object({
  product_name: yup
    .string()

    .required("Product name is required")
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "Product name must contain only letters, numbers, and spaces"
    ),

  // category_id: yup
  //   .string()
  //   .required("Category name is required")
  //   .matches(/^[a-zA-Z]+$/, "Category name must contain only letters"),

  hsn: yup.string().required("HSN Code is required"),
  uom: yup
    .string()
    .oneOf(
      ["kg", "gram", "pieces", "box", "gram", "rolls", "number"],
      "Uom is Required"
    ),
  price: yup
    .string()
    .required(" Sale Price is required")
    .matches(/^[0-9]+(\.[0-9]{1,2})?$/, "Sale Price must be a valid number"),

  gst: yup.string().oneOf(["0", "5", "12", "18", "28"], "Gst is required"),

  specification: yup
    .string()
    .max(250, "Specification can not be more than 250 characters long")
    .required("Specification is required"),
});

export default function MasterProduct() {
  const [getCategory, setGetCategory] = useState([]);
  const [getCategoryId, setGetCategoryId] = useState(null);
  const [reload, setReload] = useState(false);
  const [alertData, setAlertData] = useState({
    code: 200,
    data: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [eedit, setEedit] = useState(""); //to store put id value
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

  const editDisplay = (data) => {
    setEedit(data.id);
    setValue("product_name", data.product_name);
    setValue("hsn", data.hsn);
    setValue("uom", data.uom);
    setValue("price", data.price);
    setValue("cost", data.cost);
    setValue("gst", data.gst);
    setValue("specification", data.specification);
    setValue("description", data.description);
    setValue("gsm", data.gsm);
    setValue("min_stock", data.min_stock);
    setValue("capacity", data.capacity);
    setValue("check_gsm", data.check_gsm);
    setValue("check_capacity", data.check_capacity);
    setValue("parameter", data.parameter);
    setValue("dealer_price", data.dealer_price);
    setValue("capacity_opt", data.capacity_opt);
    setValue("no_unit", data.no_unit);

    setGetCategoryId(data.category_id);
    console.log(data, "check category idddddddd");
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
  const values = watch();

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
    },
    // {
    //   name: "Date",
    //   selector: (row) => row.Date,
    // },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
    },
    {
      name: "HSN Code",
      selector: (row) => row.hsn,
    },
    {
      name: "UOM",
      selector: (row) => row.uom,
    },
    {
      name: "Sale Price(₹)",
      selector: (row) => row.price,
    },
    {
      name: "GST(%) ",
      selector: (row) => row.gst,
      color: "#A52A2A",
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
            className="btn btn-danger"
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
    //get axios api
    //----------------GET CATEGORY MASTER
    //store response token in sessions

    getAPI(apinames.GET_PRODUCT_MASTER).then((response) => {
      const reversedData = response.data.slice().reverse();
      setAdd(reversedData);
      setApi(reversedData);
    });
    getAPI(apinames.GET_CATEGORY_MASTER).then((response) => {
      const reversedData = response.data.slice().reverse();
      setGetCategory(
        reversedData.map((item) => ({
          value: item.id,
          label: item.category_name,
        }))
      );

      console.log(response.data, "gettetdcatsgvv");
    });
  }, [reload]);

  const HandleFilter = (filteredData) => {
    setAdd(filteredData);
  };
  //post
  const onSubmit = (data) => {
    // posting
    const postData = {
      product_name: data.product_name,

      hsn: data.hsn,
      uom: data.uom,
      price: data.price,
      cost: data.cost,
      gst: data.gst,
      specification: data.specification,
      category_id: getCategoryId,
      description: data.description,
      gsm: data.gsm,
      min_stock: data.min_stock,
      capacity: data.capacity,
      check_gsm: data.check_gsm ? "1" : "0",
      check_capacity: data.check_capacity ? "1" : "0",
      parameter: data.parameter,
      dealer_price: data.dealer_price,
      capacity_opt: data.capacity_opt,
      no_unit: data.no_unit,
    };
    console.log(postData, "dataaaa");
    postAPI(apinames.POST_PRODUCT_MASTER, postData)
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
            window.location.reload(5000)
          }, 5000);
          
        } 
        else if (status_code == 400) {
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
      product_name: data1.product_name,
      description: data1.description,
      hsn: data1.hsn,
      uom: data1.uom,
      price: data1.price,
      cost: data1.cost,
      gst: data1.gst,
      specification: data1.specification,
      category_id: getCategoryId,
      gsm: data1.gsm,
      min_stock: data1.min_stock,
      capacity: data1.capacity,
      check_gsm: data1.check_gsm ? "1" : "0",
      check_capacity: data1.check_capacity ? "1" : "0",
      parameter: data1.parameter,
      dealer_price: data1.dealer_price,
      capacity_opt: data1.capacity_opt,
      no_unit: data1.no_unit,
    };
    console.log(EditData, "EDIT DATA");

    PutAPI(apinames.PUT_PRODUCT_MASTER + eedit, EditData)
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
            window.location.reload(5000);
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

   // refresh page
   const Refresh =()=>window.location.reload(true);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        await axios.delete(`${url.server_url}/delete_product_master/${id}`);
        deleteAPI(apinames.DELETE_PRODUCT_MASTER + id).then((response) => {
          console.log(response, "response");
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };

  // Select REACT autocomplete

  const handleCaterogySelect = (selectedOption) => {
    console.log(selectedOption, "selectedOption");
    setGetCategoryId(selectedOption.value);
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

  return (
    <div className="Main-Cointainer">
      <div className="button-cointainer" style={{ floatLeft: "30px" }}>
        <button
          type="button"
          className="btn btn-success" 
          onClick={Refresh}
        >
          Refresh
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => productOpen()}
          outlines
          style={{ marginLeft: "20px" }}
        >
          ADD Product
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
          actions={<button className="btn btn-warning">Export</button>}
          subHeader
          subHeaderComponent={
            <Filter
              api={api}
              onUpdateData={HandleFilter}
              placeholder=" Search product Name"
              name="product_name"
              name2="product_name"
            />
          }
          customStyles={customStyles}
        />
      </div>
      <div>
        <Modal show={show} onHide={productClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form
                key={1}
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={handleKeyDown}
              >
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>
                        Product Name: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input
                          type="text"
                          maxLength={100}
                          {...register("product_name")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.product_name && errors.product_name.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>Description:</th>
                      <td>
                        <input
                          type="text"
                          maxLength={250}
                          {...register("description")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.description && errors.description.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>Category Name:  <span className="text-danger">*</span></th>
                      <td>
                        <Select
                          options={getCategory}
                          defaultValue={getCategoryId}
                          onChange={handleCaterogySelect}
                          placeholder="Select a Catergory"
                          // {...register("category_id")}
                        />{" "}
                        <span className="text-danger">
                          {errors.category_id && errors.category_id.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        HSN Code: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input type="text" {...register("hsn")} />
                        <br />
                        <span className="text-danger">
                          {errors.hsn && errors.hsn.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        UOM: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <select {...register("uom")} >
                          <option value="select">Select</option>
                          <option value="kg" className="uom">KG</option>
                          <option value="gram" className="uom">Gram</option>
                          <option value="rolls" className="uom">Rolls</option>
                          <option value="number" className="uom">Number</option>
                          <option value="pieces" className="uom">Pieces</option>
                          <option value="box" className="uom">Box</option>
                        </select>

                        <br />
                        <span className="text-danger">
                          {errors.uom && errors.uom.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        Number Unit:
                        {/* <span className="text-danger">*</span>{" "} */}
                      </th>
                      <td>
                        <input
                          type="text"
                          step="any"
                          {...register("no_unit")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.no_unit && errors.no_unit.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        Sale Price (₹): <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input
                          min={0}
                          type="number"
                          step="any"
                          {...register("price")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.price && errors.price.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>Dealer price (₹): </th>
                      <td>
                        <input
                          type="number"
                      
                          min={0}
                          step="any"
                          {...register("dealer_price")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.dealer_price && errors.dealer_price.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>Addition Cost (₹): </th>
                      <td>
                        <input
                          type="number"
                          
                          min={0}
                          step="any"
                          {...register("cost")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.cost && errors.cost.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        {" "}
                        <input type="checkbox" className="form-check-input" {...register("check_gsm")} />
                         {" "} GSM :
                      </th>
                      <td>
                        <input type="number" min={0} {...register("gsm")} />
                        &nbsp;
                        <select {...register("parameter")}>
                          <option value="select">Select</option>
                          <option value="gsm">GSM</option>
                          <option value="micron">Micron</option>
                          <option value="gram">Gram</option>
                          <option value="pieces">Pieces</option>
                          <option value="weight">Weight</option>
                        </select>
                        <br />
                        <span className="text-danger">
                          {errors.parameter && errors.parameter.message}
                        </span>
                        <span className="text-danger">
                          {errors.gsm && errors.gsm.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        {" "}
                        <input
                          type="checkbox"
                          className="form-check-input" 
                          {...register("check_capacity")}
                        />{" "}
                        Capacity:
                      </th>
                      <td>
                        <input
                          type="number"
                          min={0}
                          {...register("capacity")}
                        />
                        &nbsp;
                        <select className="btn btn-outline-success bg-light text-dark" {...register("capacity_opt")}>
                          <option value="select" className="bg-danger">Select</option>
                          <option value="size">Size</option>
                          <option value="kg">KG</option>
                          <option value="ml">ML</option>
                        </select>
                        <br />
                        <span className="text-danger">
                          {errors.capacity_opt && errors.capacity_opt.message}
                        </span>
                        <span className="text-danger">
                          {errors.capacity && errors.capacity.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        GST (%): <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        {" "}
                        <select {...register("gst")}>
                          <option value="select">Select</option>
                          <option value="0">0</option>
                          <option value="5">5</option>
                          <option value="12">12</option>
                          <option value="18">18</option>
                          <option value="28">28</option>
                        </select>
                        <br />
                        <span className="text-danger">
                          {errors.gst && errors.gst.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>Min Stock Alert:</th>
                      <td>
                        <input
                        min={0}
                       
                          type="number"
                          step="any"
                          {...register("min_stock")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.min_stock && errors.min_stock.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th style={{ verticalAlign: "middle !important" }}>
                        Specification: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <textarea
                          maxLength={250}
                          rows={3}
                          cols={15}
                          {...register("specification")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.specification && errors.specification.message}
                        </span>
                      </td>{" "}
                    </tr>
                  </thead>
                </table>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  {" "}
                  Add Product
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal show={open} onHide={editClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form
                key={2}
                onSubmit={handleSubmit2(onSubmitEmail)}
                onKeyDown={handleKeyDown}
              >
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>
                        Product Name: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input
                          type="text"
                          maxLength={100}
                          value={values.product_name}
                          onChange={(e) => {
                            setValue("product_name", e.target.value);
                          }}
                          {...register2("product_name")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors2.product_name && errors2.product_name.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>Description:</th>
                      <td>
                        <input
                          maxLength={250}
                          type="text"
                          {...register2("description")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors2.description && errors2.description.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>Category Name:  <span className="text-danger">*</span></th>
                      <td>
                        <Select
                          options={getCategory}
                          defaultValue={getCategory.filter(
                            (item) => item.value == getCategoryId
                          )}
                          onChange={handleCaterogySelect}
                          placeholder="Select a Catergory"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        HSN Code: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input
                          value={values.hsn}
                          onChange={(e) => {
                            setValue("hsn", e.target.value);
                          }}
                          type="text"
                          {...register2("hsn")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.hsn && errors2.hsn.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <p>
                          UOM: <span className="text-danger">*</span>{" "}
                        </p>
                      </th>
                      <td>
                        <select
                          type="text"
                          value={values.uom}
                          {...register2("uom")}
                        >
                          <option value="select">Select</option>
                          <option value="kg">KG</option>
                          <option value="gram">Gram</option>
                          <option value="rolls">Rolls</option>
                          <option value="number">Number</option>
                          <option value="pieces">Pieces</option>
                          <option value="box">Box</option>
                        </select>

                        <br />
                        <span className="text-danger">
                          {errors2.uom && errors2.uom.message}
                        </span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <th>
                        Number Unit:
                        {/* <span className="text-danger">*</span>{" "} */}
                      </th>
                      <td>
                        <input
                          type="text"
                          step="any"
                          {...register2("no_unit")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.no_unit && errors2.no_unit.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        <p>
                          Sale Price (₹): <span className="text-danger">*</span>{" "}
                        </p>{" "}
                      </th>
                      <td>
                        <input
                          type="number"
                          step="any"
                          min={0}
                          value={values.price}
                          onChange={(e) => {
                            setValue("price", e.target.value);
                          }}
                          {...register2("price")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.price && errors2.price.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Dealer price (₹): </th>
                      <td>
                        <input
                 
                          type="number"
                          min={0}
                          step="any"
                          {...register2("dealer_price")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.dealer_price && errors2.dealer_price.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        <p>Addition Cost(₹):</p>{" "}
                      </th>
                      <td>
                        <input
                       
                          min={0}
                          step="any"
                          type="number"
                          value={values.cost}
                          onChange={(e) => {
                            setValue("price", e.target.value);
                          }}
                          {...register2("cost")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.cost && errors2.cost.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {" "}
                        <input type="checkbox" {...register2("check_gsm")} />
                        GSM :{" "}
                      </th>
                      <td>
                        <input type="number" min={0} {...register2("gsm")} />
                        &nbsp;
                        <select {...register2("parameter")}>
                          <option value="select">Select</option>
                          <option value="gsm">GSM</option>
                          <option value="micron">Micron</option>
                          <option value="gram">Gram</option>
                          <option value="pieces">Pieces</option>
                          <option value="weight">Weight</option>
                        </select>
                        <br />
                        <span className="text-danger">
                          {errors2.parameter && errors2.parameter.message}
                        </span>
                        <span className="text-danger">
                          {errors2.gsm && errors2.gsm.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        {" "}
                        <input
                          type="checkbox"
                          {...register2("check_capacity")}
                        />{" "}
                        Capacity:
                      </th>
                      <td>
                        <input
                          type="number"
                          min={0}
                          {...register2("capacity")}
                        />
                        &nbsp;
                        <select {...register2("capacity_opt")}>
                          <option value="select">Select</option>
                          <option value="size">Size</option>
                          <option value="kg">KG</option>
                          <option value="ml">ML</option>
                        </select>
                        <br />
                        <span className="text-danger">
                          {errors2.capacity_opt && errors2.capacity_opt.message}
                        </span>
                        <span className="text-danger">
                          {errors2.capacity && errors2.capacity.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        <p>
                          GST (%): <span className="text-danger">*</span>{" "}
                        </p>
                      </th>
                      <td>
                        <select
                          type="number"
                          value={values.gst}
                          onChange={(e) => {
                            setValue("gst", e.target.value);
                          }}
                          {...register2("gst")}
                        >
                          <option value="select">Select</option>
                          <option value="0">0</option>
                          <option value="5">5</option>
                          <option value="12">12</option>
                          <option value="18">18</option>
                          <option value="28">28</option>
                        </select>
                        <br />
                        <span className="text-danger">
                          {errors2.gst && errors2.gst.message}
                        </span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <th>Min Stock Alert:</th>
                      <td>
                        <input
                      
                                min={0}
                          type="number"
                          // step="any"
                          {...register2("min_stock")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.min_stock && errors2.min_stock.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th style={{ verticalAlign: " middle !important" }}>
                        <p>
                          Specification: <span className="text-danger">*</span>{" "}
                        </p>
                      </th>
                      <td>
                        <textarea
                          maxLength={250}
                          value={values.Specification}
                          onChange={(e) => {
                            setValue("specification", e.target.value);
                          }}
                          rows={3}
                          cols={15}
                          {...register2("specification")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.specification &&
                            errors2.specification.message}
                        </span>
                        <br />
                      </td>{" "}
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
            <Modal.Title>View Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Product Name:</th>
                  <td>
                    <input
                      disabled
                      type="text"
                      value={values.product_name}
                      onChange={(e) => {
                        setValue("product_name", e.target.value);
                      }}
                      {...register2("product_name")}
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors2.product_name && errors2.product_name.message}
                    </span>{" "}
                  </td>
                </tr>
                <tr>
                  <th>Description:</th>
                  <td>
                    <input type="text" {...register2("description")} disabled />{" "}
                    <br />
                    <span className="text-danger">
                      {errors2.description && errors2.description.message}
                    </span>{" "}
                  </td>
                </tr>
                <tr>
                  <th>Category Name:  </th>
                  <td>
                    <Select
                      isDisabled
                      options={getCategory}
                      defaultValue={getCategory.filter(
                        (item) => item.value == getCategoryId
                      )}
                      onChange={handleCaterogySelect}
                      placeholder="Select a Catergory"
                    />
                  </td>
                </tr>

                <tr>
                  <th>HSN Code:</th>
                  <td>
                    <input
                      disabled
                      value={values.hsn}
                      onChange={(e) => {
                        setValue("hsn", e.target.value);
                      }}
                      type="text"
                      {...register2("hsn")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.hsn && errors2.hsn.message}
                    </span>
                    <br />
                  </td>
                </tr>
                <tr>
                  <th>UOM:</th>
                  <td>
                    <input
                      disabled
                      value={values.uom}
                      onChange={(e) => {
                        setValue("uom", e.target.value);
                      }}
                      type="text"
                      {...register2("uom")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.uom && errors2.uom.message}
                    </span>
                    <br />
                  </td>
                </tr>
                <tr>
                  <th>
                    Number Unit:
                    {/* <span className="text-danger">*</span>{" "} */}
                  </th>
                  <td>
                    <input type="text" step="any" {...register2("no_unit")} />
                    <br />
                    <span className="text-danger">
                      {errors2.no_unit && errors2.no_unit.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Sale Price (₹): </th>
                  <td>
                    <input
                      disabled
                      type="number"
                      value={values.price}
                      onChange={(e) => {
                        setValue("price", e.target.value);
                      }}
                      {...register2("price")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.price && errors2.price.message}
                    </span>
                    <br />
                  </td>
                </tr>
                <tr>
                  <th>Dealer price (₹): </th>
                  <td>
                    <input
                      type="number"
                      min={0}
                      disabled
                      step="any"
                      {...register2("dealer_price")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.dealer_price && errors2.dealer_price.message}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>
                    <p>Addition Cost(₹):</p>{" "}
                  </th>
                  <td>
                    <input
                      disabled
                      type="number"
                      value={values.cost}
                      onChange={(e) => {
                        setValue("price", e.target.value);
                      }}
                      {...register2("cost")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.cost && errors2.cost.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>
                    {" "}
                    <input type="checkbox" {...register2("check_gsm")} />
                    GSM :{" "}
                  </th>
                  <td>
                    <input type="number" min={0} {...register2("gsm")} />
                    &nbsp;
                    <select {...register2("parameter")}>
                      <option value="select">Select</option>
                      <option value="gsm">GSM</option>
                      <option value="micron">Micron</option>
                      <option value="gram">Gram</option>
                      <option value="pieces">Pieces</option>
                      <option value="weight">Weight</option>
                    </select>
                    <br />
                    <span className="text-danger">
                      {errors2.parameter && errors2.parameter.message}
                    </span>
                    <span className="text-danger">
                      {errors2.gsm && errors2.gsm.message}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>
                    {" "}
                    <input
                      type="checkbox"
                      {...register2("check_capacity")}
                    />{" "}
                    Capacity:
                  </th>
                  <td>
                    <input type="number" min={0} {...register2("capacity")} />
                    &nbsp;
                    <select {...register2("capacity_opt")}>
                      <option value="select">Select</option>
                      <option value="size">Size</option>
                      <option value="kg">KG</option>
                      <option value="ml">ML</option>
                    </select>
                    <br />
                    <span className="text-danger">
                      {errors2.capacity_opt && errors2.capacity_opt.message}
                    </span>
                    <span className="text-danger">
                      {errors2.capacity && errors2.capacity.message}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>GST (%):</th>
                  <td>
                    <select
                      disabled
                      type="number"
                      value={values.gst}
                      onChange={(e) => {
                        setValue("gst", e.target.value);
                      }}
                      {...register2("gst")}
                    >
                      <option value="select">Select</option>
                      <option value="0">0</option>
                      <option value="5">5</option>
                      <option value="12">12</option>
                      <option value="18">18</option>
                      <option value="28">28</option>
                    </select>
                    <br />
                    <span className="text-danger">
                      {errors2.gst && errors2.gst.message}
                    </span>
                    <br />
                  </td>
                </tr>
                <tr>
                  <th>Min Stock Alert:</th>
                  <td>
                    <input
                      type="number"
                      // step="any"
                      {...register2("min_stock")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.min_stock && errors2.min_stock.message}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Specification:</th>
                  <td>
                    <textarea
                      disabled
                      value={values.Specification}
                      onChange={(e) => {
                        setValue("specification", e.target.value);
                      }}
                      rows={3}
                      cols={15}
                      {...register2("specification")}
                    />
                    <br />
                    <span className="text-danger">
                      {errors2.specification && errors2.specification.message}
                    </span>
                    <br />
                  </td>{" "}
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

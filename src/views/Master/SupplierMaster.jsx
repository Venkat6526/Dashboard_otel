import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./productMaster.css";
import Filter from "../../components/Filter";
import {
  deleteAPI,
  getAPI,
  postAPI,
  PutAPI,
} from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import FunctionAlert from "../alert/SupplierMasterAlert";
import { Refresh } from "@mui/icons-material";
const phoneRegExp = /^[6-9]\d{9}$/;

const SignupSchema = yup.object({
  supplier_name: yup
    
  .string()
  .matches( /^[a-zA-Z0-9\s]+$/, "Supplier name should only contain letters and spaces")
 
  .required("Supplier name is required"),

  
  mobile_no: yup
    .string()
    .matches(phoneRegExp, "Entire phone number only")
    .required("Enter phone number only"),
  email: yup.string().required("Email is required"),
  gst: yup
    .string()
    .matches(/^[a-zA-Z0-9]*$/, "GST number should not contain special characters")
    .min(15, "GST number must be at least 15 characters long")
    .max(15, "GST number can be maximum 15 characters long")
    .required("GST number is required"),
  address: yup.string().required("Address is required"),
  state: yup
    .string()
    .oneOf(
      ["Karnataka", "Pune", "Goa", "Kerala", "Chennai"],
      "Please select a valid state"
    ),
});

export default function SupplierMaster() {
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

const [productName,setProductName]=useState([])

  const editDisplay = (data) => {
    setEedit(data.id);
    setValue("supplier_name", data.supplier_name);
    setValue("address", data.address);
    setValue("mobile_no", data.mobile_no);
    setValue("gst", data.gst_no);
    setValue("email", data.email);
    setValue("state", data.state);
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
    reset:reset2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } =  useForm({
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
    

    {
      name: "Supplier Name",
      selector: (row) => row.supplier_name,
    },

    {
      name: "Mobile No",
      selector: (row) => row.mobile_no,
    },
    {
      name: "GST No ",
      selector: (row) => row.gst_no,
      color: "#fff",
    },
    {
      name: "State ",
      selector: (row) => row.state,
      color: "#fff",
    },
    {
      name: "Created By",
      selector: (row) => row.created_by,
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
    getAPI(apinames.GET_SUPPLIER_MASTER).then((response) => {
      // const reversedData = response.data.slice().reverse();
      setAdd(response.data);
      setApi(response.data);
    },[reload]);

    // getAPI(apinames.GET_PRODUCT_MASTER).then((response) => {
    //   setProductName(response.data)
    // });

  }, []);
  // filter
  const HandleFilter = (filteredData) => {
    setAdd(filteredData);
  };
  //post
  const onSubmit = (data) => {
    // posting
    const postData = {
      supplier_name: data.supplier_name,  
      address: data.address,
      mobile_no: data.mobile_no,
      gst_no: data.gst,
      email: data.email,
      state: data.state,
    };
    console.log(postData, "dataaaa");
    postAPI(apinames.POST_SUPPLIER_MASTER, postData)
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
      supplier_name: data1.supplier_name,
      address: data1.address,
      mobile_no: data1.mobile_no,
      gst_no: data1.gst,
      email: data1.email,
      state: data1.state,
    };
    console.log(EditData, "EDIT DATA");

    PutAPI(apinames.PUT_SUPPLIER_MASTER + eedit, EditData)
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
          window.location.reload(3000)
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
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_SUPPLIER_MASTER + id).then((response) => {
          console.log(response, "response");
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };

   // refresh page
   const Refresh =()=>window.location.reload(true);

  return (
    <div className="Main-Cointainer">
      <div className="button-cointainer" style={{ floatLeft: "30px" }}>
        <button type="button" class="btn btn-success" onClick={Refresh}>
          Refresh
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          onClick={() => productOpen()}
          outlines
          style={{ marginLeft: "20px" }}
        >
          ADD Supplier
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
              placeholder="Search Supplier Name"
              onUpdateData={HandleFilter}
              name="supplier_name"
              name2="supplier_name"
            />
          }
          customStyles={customStyles}
        />
      </div>
      <div>
        <Modal show={show} onHide={productClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Supplier Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form key={1} onSubmit={handleSubmit(onSubmit)}>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>Supplier Name: <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <input type="text" maxLength={100} {...register("supplier_name")} />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.supplier_name && errors.supplier_name.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>Address: <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <textarea
                        maxLength={250}
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
                      <th>Mobile No:  <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <input type="number" maxLength={10} {...register("mobile_no")} />
                        <br />
                        <span className="text-danger">
                          {errors.mobile_no && errors.mobile_no.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>GST No: <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <input
                          min={15}
                          max={15}
                          type="text"
                          {...register("gst")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.gst && errors.gst.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Email:<span className="text-danger">*</span>{" "} </th>
                      <td>
                        <input type="email" {...register("email")} />
                        <br />
                        <span className="text-danger">
                          {errors.email && errors.email.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>State:<span className="text-danger">*</span>{" "}</th>
                      <td>
                        {" "}
                        <select className="btn btn-outline-dark" {...register("state")} type="text">
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
                  </thead>
                </table>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  {" "}
                  Add Supplier
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal show={open} onHide={editClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Supplier Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form key={2} onSubmit={handleSubmit2(onSubmitEmail)}>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>Supplier Name: <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <input type="text" maxLength={100} {...register2("supplier_name")} />{" "}
                        <br />
                        <span className="text-danger">
                          {errors2.supplier_name &&
                            errors2.supplier_name.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th>Address: <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <textarea
                        maxLength={250}
                          rows={3}
                          cols={15}
                          {...register2("address")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.address && errors2.address.message}
                        </span>
                      </td>{" "}
                    </tr>
                    <tr>
                      <th>Mobile No:  <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <input type="number" maxLength={10} {...register2("mobile_no")} />
                        <br />
                        <span className="text-danger">
                          {errors2.mobile_no && errors2.mobile_no.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>GST No: <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <input
                          min={15}
                          max={15}
                          type="text"
                          {...register2("gst")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors2.gst && errors2.gst.message}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Email:<span className="text-danger">*</span>{" "} </th>
                      <td>
                        <input type="email" {...register2("email")} />
                        <br />
                        <span className="text-danger">
                          {errors2.email && errors2.email.message}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th>State: <span className="text-danger">*</span>{" "}</th>
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
                  </thead>
                </table>
                <br />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                  
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
            <Modal.Title>View Supplier Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Supplier Name:</th>
                  <td>
                    <input
                      disabled
                      type="text"
                      {...register2("supplier_name")}
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors2.supplier_name && errors2.supplier_name.message}
                    </span>{" "}
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
                  <th>GST No:</th>
                  <td>
                    <input
                  
                      type="text"
                      {...register2("gst")}
                      disabled
                    />
                    <br />
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

{
}

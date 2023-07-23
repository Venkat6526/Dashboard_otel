import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Filter from "../../components/Filter";


import FunctionAlert from "../alert/SalesMasterAlert";
import { deleteAPI, getAPI, postAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import { Refresh } from "@mui/icons-material";

const SignupSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Name must contain only alphabets and spaces"),
   
  mobile: yup
    .string() .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
   
  designation: yup
    .string()
    .required("Designation is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "Designation must contain only alphabets and spaces",
    ),
    password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
  confirm: yup
    .string()
    .required("Confirm Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
    
});
export default function DeliveryExecutive() {
  const [reload, setReload] = useState(false);
  const [alertData, setAlertData] = useState({
    code: 200,
    data: "",
  });
 
  const [get, setGet] = useState([]);
  const [eedit, setEedit] = useState(""); //to store put id value
  const [api, setApi] = useState([]); // filter
  const [show, setShow] = useState(false); // add product
  const deliveryClose = () => setShow(false); //product model close
  const deliveryOpen = () => {
    setShow(true); // product model open
  };
  const [showAlert, setShowAlert] = useState(false);

  const [open, setOpen] = useState(false); // edit product
  const editClose = () => setOpen(false);
  const editOpen = () => {
    setOpen(true);
  };
  //edit view
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
      name: "Name ",
      selector: (row) => row.name,
    },
    {
      name: "Mobile No ",
      selector: (row) => row.mobile,
    },
    {
      name: "Designation ",
      selector: (row) => row.designation,
    },
    {
      name: "Status ",
      selector: (row) => row.delivery_status,
    },

    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <>
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

  //   const editDisplay = (data) => {
  //     setValue("name", data.name);
  //     setValue("mobile", data.mobile);
  //     setValue("designation", data.designation);
  //     setValue("delivery_status", data.delivery_status);
  //   };
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
    mode: "onchange",
  });

  useEffect(() => {
    getdeliveryExecutive();
  }, [reload]);

  const getdeliveryExecutive = () => {
    getAPI(apinames.GET_SALES_MASTER)
      .then((response) => {
        setGet(response.data);
        setApi(response.data);
      })
      .catch((error) => {
        console.log(error + "error");
      });
  };

  //----------------filter
  const HandleFilter = (filteredData) => {
    setGet(filteredData);
  };

  // props for status_code  close
  const handleCloseModal = (message) => {
    setShowAlert(message);
    deliveryClose();
  };

  // props for status_code  opebn

  const onSubmit = (data) => {
    // posting

    let isPresent = false;
    isPresent = checkIssue(data.mobile);
    if (!isPresent) {
      const postData = {
        type:"sales",
        name: data.name,
        mobile: data.mobile,
        password: data.password,
        confirm: data.confirm,
        designation: data.designation,
        delivery_status: data.status ? "Active" : "Inactive",
      };
      console.log(postData, "jgfgtfg");
      // console.log(postData, "dataaaa");
      postAPI(apinames.POST_SALES_MASTER, postData)
      .then((response) => {
        console.log(response, "sssssss");
        var status_code = response.status_code;
        let alert_data;
        if (status_code == 200) {
          deliveryClose();

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
            window.location.reload(5000);
          }, 5000);
        } else if (status_code == 400) {
          deliveryClose();
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
  } else {
    alert("Mobile Number already exist ");
    reset()
  }
};


  //   const onSubmitEdit = async (data) => {
  //     try {
  //       const isPresentResponse = await getAPI(apinames.GET_FOOD_MASTER);
  //       const isPresentData = isPresentResponse.data;

  //       // check if the new reporting subject already exists for the same role
  //       const isPresent = isPresentData.some((item) => item.name === data.name);

  //       if (isPresent) {
  //         alert("Name already exists");
  //       } else {
  //         const editData = {
  //           name: data.name,
  //         };

  //         const response = await PutAPI(
  //           apinames.PUT_FOOD_MASTER + eedit,
  //           editData
  //         );

  //         if (response.status_code === 200) {
  //           alert("Edit successful");
  //           window.location.reload();
  //         } else {
  //           const errorMessage = JSON.stringify(response.data);
  //           alert(errorMessage);
  //           console.log(response.message);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(JSON.stringify(error));
  //       alert("An error occurred while editing the issue");
  //     }
  //   };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        // await axios.delete(`${url.server_url}/delete_product_master/${id}`);
        deleteAPI(apinames.DELETE_SALES_MASTER + id).then((response) => {
          console.log(response, "response");
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };

  const checkIssue = (check, role) => {
    return get.some((o) => o.mobile == check);
  };

   // refresh page
   const Refresh =()=>window.location.reload(true);

  return (
    <div>
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
          actions={
            <>
              <button
                className="btn btn-primary"
                onClick={() => deliveryOpen()}
                outlines="true"
              >
                Add Sales Executive
              </button>

              <button type="button" className="btn btn-success" onClick={Refresh}>
                Refresh
              </button>
            </>
          }
          subHeader
          subHeaderComponent={
            <Filter
              api={api}
              onUpdateData={HandleFilter}
              placeholder="search Name and Mobile No"
              name="name"
              name2="mobile"
            />
          }
          customStyles={customStyles}
        />
      </div>
      <div>
        <Modal show={show} onHide={deliveryClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Sales Executive</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form key={1} onSubmit={handleSubmit(onSubmit)}>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th> Sales Executive  Name:</th>
                      <td>
                        <input type="text" {...register("name")} /> <br />
                        <span className="text-danger">
                          {errors.name && errors.name.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th> Mobile No:</th>
                      <td>
                        <input type="text" {...register("mobile")} /> <br />
                        <span className="text-danger">
                          {errors.mobile && errors.mobile.message}
                        </span>{" "}
                      </td>
                    </tr>


                    <tr>
                      <th>
                        {" "}
                        Password: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input
                          type="text"
                          minLength={6}
                          maxLength={20}
                          {...register("password")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.password && errors.password.message}
                        </span>{" "}
                      </td>
                    </tr>

                    <tr>
                      <th>
                        {" "}
                        Confirm Password: <span className="text-danger">
                          *
                        </span>{" "}
                      </th>
                      <td>
                        <input
                          type="text"
                          minLength={6}
                          maxLength={20}
                          {...register("confirm")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.confirm && errors.confirm.message}
                        </span>{" "}
                      </td>
                    </tr>








                    <tr>
                      <th> Designation:</th>
                      <td>
                        <input type="text" {...register("designation")} />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.designation && errors.designation.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th> Status:</th>
                      <td>
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          {...register("status")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.status &&
                            errors.status.message}
                        </span>{" "}
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
                  Add Sales Executive
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        {/* <div>
          <Modal show={open} onHide={editClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Food</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form key={2} onSubmit={handleSubmit2(onSubmitEdit)}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th> Food Name:</th>
                        <td>
                          <input
                            type="text"
                            value={values.name}
                            onChange={(e) => {
                              setValue("name", e.target.value);
                            }}
                            {...register2("name")}
                          />{" "}
                          <br />
                          <span className="text-danger">
                            {errors2.name && errors2.name.message}
                          </span>{" "}
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
        </div> */}
      </div>

      <div>
        <FunctionAlert
        isVisible={showAlert}
        onClose={() => {
          setShowAlert(false);
        }}
        data={alertData}  />
      </div>
    </div>
  );
}

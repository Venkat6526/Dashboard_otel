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
import {
  postAPI,
  getAPI,
  PutAPI,
  deleteAPI,
} from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import FunctionAlert from "../alert/RewardMasterAlert";
import { Refresh } from "@mui/icons-material";

const SignupSchema = yup.object({
  name: yup.string().required("Name  is required"),
  description: yup.string().required("Description is required"),
  reward_amount: yup
    .number()
    .typeError("Enter Amount in number")
    .required("Amount is required"),
  description: yup.string().required("Description is required"),
});

export default function ReportingMaster() {
  const [reload, setReload] = useState(false);
  const [alertData, setAlertData] = useState({
    code: 200,
    data: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const [get, setGet] = useState([]);
  const [eedit, setEedit] = useState(""); //to store put id value
  const [api, setApi] = useState([]); // filter
  const [show, setShow] = useState(false); // add product
  const reportingClose = () => setShow(false); //product model close
  const reportingOpen = () => {
    setShow(true); // product model open
  };
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
      width: "70px",
    },

    {
      name: "Name",
      selector: (row) => row.name,
      width: "170px",
    },
    {
      name: "Description  ",
      selector: (row) => row.description,
      width: "400px",
    },
    {
      name: "Amount ",
      selector: (row) => row.reward_amount,
      width: "170px",
    },
    {
      name: "Status ",
      selector: (row) => row.reward_status,
      width: "250px",
    },
    {
      name: "Action",
      selector: (row) => row.Action,

      cell: (row) => (
        <>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              editOpen();
              editDisplay(row);
              //   EditHandle(row);
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

  const editDisplay = (data) => {
    setEedit(data.id);
    setValue("name", data.name);
    setValue("description", data.description);
    setValue("reward_amount", data.reward_amount);
    setValue("reward_status", data.reward_status);
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
    mode: "onchange",
    resolver: yupResolver(SignupSchema),
  });

  useEffect(() => {
    getAPI(apinames.GET_REWARD_MASTER)
      .then((response) => {
        setGet(response.data);
        setApi(response.data);
      })
      .catch((error) => {
        console.log(error + "error");
      });
  }, [reload]);

  //----------------filter
  const HandleFilter = (filteredData) => {
    setGet(filteredData);
  };

  const onSubmit = (data) => {
    // posting

    let isPresent = false;
    isPresent = checkIssue(data.name);

    if (!isPresent) {
      const postData = {
        name: data.name,
        description: data.description,
        reward_amount: data.reward_amount,
        reward_status: data.reward_status,
      };
      // console.log(postData, "dataaaa");
      postAPI(apinames.POST_REWARD_MASTER, postData)
        .then((response) => {
          console.log(response, "sssssss");
          var status_code = response.status_code;
          let alert_data;
          if (status_code == 200) {
            reportingClose();

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
          } else if (response.status_code == 400) {
            reportingClose();
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
      alert("Name already exist ");
      reset();
    }
  };

  const onSubmitEdit = async (data) => {
    try {
      const isPresentResponse = await getAPI(apinames.GET_REWARD_MASTER);
      const isPresentData = isPresentResponse.data;

      // check if the new reporting subject already exists for the same members_role
      const isPresent = isPresentData.some(
        (item) => item.name === data.name && item.id !== eedit
      );
      if (isPresent) {
        alert("Name  already exists");
        reset2();
      } else {
        const editData = {
          name: data.name,
          description: data.description,
          members_role: data.members_role,
          reward_amount: data.reward_amount,
          reward_status: data.reward_status,
        };

        const response = await PutAPI(
          apinames.PUT_REWARD_MASTER + eedit,
          editData
        );

        let alert_data;
        if (response.status_code === 200) {
          editClose();

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
            window.location.reload(5000);
          }, 3000);
        } else if (response.status_code == 400) {
          editClose();
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
        } else {
          const errorMessage = JSON.stringify(response.data);
          alert(errorMessage);
          console.log(response.message);
        }
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      alert("An error occurred while editing the issue");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        // await axios.delete(`${url.server_url}/delete_product_master/${id}`);
        deleteAPI(apinames.DELETE_REWARD_MASTER + id).then((response) => {
          console.log(response, "response");
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };

  const checkIssue = (subj, role) => {
    return get.some((o) => o.name.toLowerCase() === subj.toLowerCase());
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
                onClick={() => reportingOpen()}
                outlines
                style={{ marginLeft: "20px" }}
              >
                Add Reward
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
              placeholder="search Reward Name"
              name="name"
              name2="name"
            />
          }
          customStyles={customStyles}
        />
      </div>
      <div>
        <Modal show={show} onHide={reportingClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Reward</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form key={1} onSubmit={handleSubmit(onSubmit)}>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>
                        Name: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <input
                          type="text"
                          maxLength={100}
                          {...register("name")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.name && errors.name.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <tr>
                      <th style={{ verticalAlign: "middle !important" }}>
                        Description: <span className="text-danger">*</span>{" "}
                      </th>
                      <td>
                        <textarea
                          maxLength={250}
                          rows={3}
                          cols={15}
                          {...register("description")}
                        />
                        <br />
                        <span className="text-danger">
                          {errors.description && errors.description.message}
                        </span>{" "}
                        <br />
                      </td>{" "}
                    </tr>
                    <tr>
                      <th>
                        Amount(₹): <span className="text-danger">*</span>{" "}
                        {/* <span className="text-danger">
                          {errors.star && errors.star.message}
                        </span>{" "} */}
                      </th>
                      <td>
                        <input
                          type="number"
                          min={0}
                          {...register("reward_amount")}
                        />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.reward_amount && errors.reward_amount.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <th>Status:</th>
                      <td>
                        <select className="btn btn-outline-dark" {...register("status")}>
                          <option value="select">Select</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                        <span className="text-danger">
                          {errors.status && errors.status.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <br />
                  </thead>
                </table>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  {" "}
                  Add Reward
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <div>
          <Modal show={open} onHide={editClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Reward</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form key={2} onSubmit={handleSubmit2(onSubmitEdit)}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>
                          Name : <span className="text-danger">*</span>{" "}
                        </th>
                        <td>
                          <input
                            type="text"
                            maxLength={100}
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

                      <br />
                      <tr>
                        <th style={{ verticalAlign: " middle !important" }}>
                          Description: <span className="text-danger">*</span>{" "}
                        </th>
                        <td>
                          <textarea
                            maxLength={250}
                            value={values.description}
                            onChange={(e) => {
                              setValue("description", e.target.value);
                            }}
                            rows={3}
                            cols={15}
                            {...register2("description")}
                          />
                          <br />
                          <span className="text-danger">
                            {errors2.description && errors2.description.message}
                          </span>
                          <br />
                        </td>{" "}
                      </tr>
                      <br />
                      <tr>
                        <th>
                          Amount(₹) : <span className="text-danger">*</span>{" "}
                        </th>
                        <td>
                          <input
                            min={0}
                            type="number"
                            value={values.reward_amount}
                            onChange={(e) => {
                              setValue("reward_amount", e.target.value);
                            }}
                            {...register2("reward_amount")}
                          />{" "}
                          <br />
                          <span className="text-danger">
                            {errors2.reward_amount &&
                              errors2.reward_amount.message}
                          </span>{" "}
                        </td>
                      </tr>
                      <br />
                      <tr>
                        <th>Status :</th>
                        <td>
                          <select
                            onChange={(e) => {
                              setValue("reward_status", e.target.value);
                            }}
                            {...register2("reward_status")}
                          >
                            <option value="select">Select</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                          <br />
                          <span className="text-danger">
                            {errors2.amount && errors2.amount.message}
                          </span>{" "}
                        </td>
                      </tr>
                      <br />
                    </thead>
                  </table>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: "right" }}
                    onClick={() => {
             
                    }}
                  >
                    {" "}
                    Save
                  </button>
                </form>
              </div>
            </Modal.Body>
          </Modal>
        </div>
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

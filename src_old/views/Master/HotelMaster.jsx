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
import FunctionAlert from "../alert/FunctionAlert";

const SignupSchema = yup.object({
  hotel_type: yup.string().required("Hotel Type is required"),
});

export default function HotelMaster() {
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
    },

    {
      name: "Hotel Type ",
      selector: (row) => row.hotel_type,
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

  const editDisplay = (data) => {
    setEedit(data.id);
    setValue("hotel_type", data.hotel_type);
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
  } = useForm({
    mode: "onchange",
  });

  useEffect(() => {
    getAPI(apinames.GET_HOTEL_MASTER)
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

    isPresent = checkIssue(data.hotel_type);

    if (!isPresent) {
      const postData = {
        hotel_type: data.hotel_type,
      };
      console.log(postData, "jgfgtfg");
      // console.log(postData, "dataaaa");
      postAPI(apinames.POST_HOTEL_MASTER, postData)
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
        } else if (status_code == 400) {
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
    reset()
  }
};

  const onSubmitEdit = async (data) => {
    try {
      const isPresentResponse = await getAPI(apinames.GET_HOTEL_MASTER);
      const isPresentData = isPresentResponse.data;

      // check if the new reporting subject already exists for the same role
      const isPresent = isPresentData.some((item) => item.hotel_type === data.hotel_type);

      if (isPresent) {
        alert("Hotel type already exists");
        reset2()
      } else {
        const editData = {
            hotel_type: data.hotel_type,
        };

        const response = await PutAPI(
          apinames.PUT_HOTEL_MASTER + eedit,
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
            window.location.reload(5000)
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
        deleteAPI(apinames.DELETE_HOTEL_MASTER + id).then((response) => {
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
    return get.some((o) => o.hotel_type.toLowerCase() === subj.toLowerCase());
  };

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
                Add Hotel
              </button>

              <button type="button" className="btn btn-primary">
                Refresh
              </button>
            </>
          }
          subHeader
          subHeaderComponent={
            <Filter
              api={api}
              onUpdateData={HandleFilter}
              placeholder="search Hotel Name"
              name="hotel_type"
              name2="hotel_type"
            />
          }
          customStyles={customStyles}
        />
      </div>
      <div>
        <Modal show={show} onHide={reportingClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Hotel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form key={1} onSubmit={handleSubmit(onSubmit)}>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th> Hotel Name:  <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <input type="text" maxLength={100} {...register("hotel_type")} /> <br />
                        <span className="text-danger">
                          {errors.hotel_type && errors.hotel_type.message}
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
                  Add Hotel
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
              <Modal.Title>Edit Hotel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form key={2} onSubmit={handleSubmit2(onSubmitEdit)}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th> Hotel Type :  <span className="text-danger">*</span>{" "}</th>
                        <td>
                          <input
                            type="text"
                            maxLength={100} 
                            value={values.hotel_type}
                            onChange={(e) => {
                              setValue("hotel_type", e.target.value);
                            }}
                            {...register2("hotel_type")}
                          />{" "}
                          <br />
                          <span className="text-danger">
                            {errors2.hotel_type && errors2.hotel_type.message}
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

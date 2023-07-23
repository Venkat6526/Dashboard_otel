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
import { postAPI, getAPI, PutAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import FunctionAlert from "../alert/CategoryAlert";


const SignupSchema = yup.object({
  category_name: yup
    .string()
    .required("  Category Name required ")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
});

export default function CategoryMaster() {
  const [get, setGet] = useState([]);
  const [reload, setReload] = useState(false);
  const [alertData, setAlertData] = useState({
    code: 200,
    data: "",
  });
  const [showAlert, setShowAlert] = useState(false);

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
      name: "Name ",
      selector: (row) => row.category_name,
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
        </>
      ),
    },
  ];

  const editDisplay = (data) => {
    setEedit(data.id);
    setValue("category_name", data.category_name);
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
    getAPI(apinames.GET_CATEGORY_MASTER)
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

    isPresent = checkIssue(data.category_name);

    if (!isPresent) {
      const postData = {
        category_name: data.category_name,
      };
      console.log(postData, "jgfgtfg");
      // console.log(postData, "dataaaa");
      postAPI(apinames.POST_CATEGORY_MASTER, postData)
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
            reset();
            setTimeout(() => {
              setShowAlert(false);
              setReload(true);
              window.location.reload(5000);
            }, 5000);
          } else if (status_code == 400) {
            editClose();
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
              setReload(true);
              window.location.reload(3000);
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
      const isPresentResponse = await getAPI(apinames.GET_CATEGORY_MASTER);
      const isPresentData = isPresentResponse.data;

      // check if the new reporting subject already exists for the same role
      const isPresent = isPresentData.some(
        (item) => item.category_name === data.category_name
      );

      if (isPresent) {
        alert("Name already exists");
        reset2();
      } else {
        const editData = {
          category_name: data.category_name,
        };

        const response = await PutAPI(
          apinames.PUT_CATEGORY_MASTER + eedit,
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

   // refresh page
   const Refresh =()=>window.location.reload(true);

  const checkIssue = (N, role) => {
    return get.some((o) => o.category_name == N);
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
                Add Category
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
              placeholder="search Category Name"
              name="category_name"
              name2="category_name"
            />
          }
          customStyles={customStyles}
        />
      </div>
      <div>
        <Modal show={show} onHide={reportingClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form key={1} onSubmit={handleSubmit(onSubmit)}>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>Category Name:  <span className="text-danger">*</span>{" "}</th>
                      <td>
                        <input type="text" {...register("category_name")} />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.category_name && errors.category_name.message}
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
                  Add Category
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
              <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form key={2} onSubmit={handleSubmit2(onSubmitEdit)}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th> Category Name:  <span className="text-danger">*</span>{" "} </th>
                        <td>
                          <input
                            type="text"
                            value={values.category_name}
                            onChange={(e) => {
                              setValue("category_name", e.target.value);
                            }}
                            {...register2("category_name")}
                          />{" "}
                          <br />
                          <span className="text-danger">
                            {errors2.category_name &&
                              errors2.category_name.message}
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


{/* <button class="Refresh" role="button">Button 86</button> */}

/* CSS */

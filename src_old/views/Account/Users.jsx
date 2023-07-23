import React, { useEffect, useState } from "react";
import url from "../../views/config";
import axios from "axios";
import { useForm } from "react-hook-form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import Filter from "../../components/Filter";
import DynamicSearch from "../../components/AutoComplete/DynamicSearch";
import DataTable from "react-data-table-component";
import moment from "moment";
import { deleteAPI, getAPI, postAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";

export default function Users() {
  const [oldAmount, setOldAmount] = useState(0);
  const [supplierSelect, setSupplierSelect] = useState({});
  const [eedit, setEedit] = useState(); /// to store in id in setvalue
  const [key, setKey] = useState(1); //tabs
  const [get, setGet] = useState([]);
  const [cGet, setCGet] = useState([]);
  const [select, setSelect] = useState({});
  const [open, setOpen] = useState(false); // transport view
  const editClose = () => setOpen(false);
  const [api, setApi] = useState([]);
  const editOpen = () => {
    setOpen(true);
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
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "User Id",
      selector: (row) => row.msisdn,
    },
    {
      name: " Status",
      selector: (row) => row.status,
    },
  

    {
      name: "Action",
      selector: (row) => row.Action,
      width:"400px",
      cell: (row) => (
        <>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              editOpen();
              // setIsEdit(true);
              displayEdit(row);
              setSupplierSelect(row);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          &nbsp;
          <a
          className="form-control"
            href={`#/Accessebility/${row.id}`}
           
          >
           Accessebility
          </a>
        </>
      ),
    },
  ];

  const {
    register: register2,
    setValue: setValue2,
    reset,
    watch,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
  const values = watch();

  const displayEdit = (display) => {
    setEedit(display.id);
    setValue2("name", display.name);
   
    setValue2("msisdn", display.msisdn);
    setValue2("password", "");
 
    
  };

  useEffect(() => {
  

    getAPI(apinames.GET_USERS)
      .then((response) => {
        console.log(response.data, "customer payments");
        let reversedData = response.data.slice().reverse();
        setCGet(reversedData); // to reverse data
        setApi(response.data);
      })
      .catch((error) => {
        console.log(error + "error");
      });
  }, []);

  //-----------------Filter
  const HandleFilter = (filteredData) => {
    setCGet(filteredData);
  };

  const onSubmit2 = (data) => {
   
    let editData = {
      id: eedit,
      name: data.name,
      mobile: data.mobile,
      password: data.password,
    };

    postAPI(apinames.UPDATE_USERS, editData)
      .then((response) => {
        let status_code = response.status_code;

        if (status_code == 200) {
          alert(response.data);
          window.location.reload();
        }else{
          alert(response.data)
        }
      })
      .catch((error) => {
        console.log(error + "error");
      });
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let postData = {
      type: 2,
      id: data.id,
      name: data.name,
      mobile: data.mobile,
      password: data.password,
     
    };
    console.log(postData, "postData");

    postAPI(apinames.POST_USERS, postData)
      .then((response) => {
        let status_code = response.status_code;

        if (status_code == 200) {
          alert("posting sucessfully");
          window.location.reload();
        }else{
          alert(response.data)
        }
      })
      .catch((error) => {
        console.log(error + "error");
      });
  };
  // delete button to delete data
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        postAPI(apinames.DELETE_SUPPLIER_PAYMENTS,{id:id}) .then((response) => {
          let status_code = response.status_code;
  
          if (status_code == 200) {
            alert("Successful");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error + "error");
        });;
        
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };

  return (
    <Tabs
      defaultActiveKey={1}
      id="uncontrolled-tab-example"
      activeKey={key}
      onSelect={(e) => {
        console.log(e, "dsdsdsd");
        setKey(e);
      }}
    >
      {" "}
      <Tab eventKey={1} title="Users">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                  </tr>
                  <tr>
                    <td><input
                      type="text"
                      id="name"
                      name="name"
                      {...register("name")}
                    /></td>
                  </tr>
               

                 

                  <tr>
                    <td>User Id:</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        id="text"
                        name="mobile"
                        {...register("mobile")}
                      />
                     
                    </td>
                  </tr>

                  <tr>
                    <td>Password:</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="password" {...register("password")} />
                     
                    </td>
                  </tr>

                  

                  <br />

                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </tbody>
              </table>
            </div>
           
          </div>
        </form>
      </Tab>
      <Tab eventKey={2} title="Users History">
        <div>
          <DataTable
            columns={columns}
            data={cGet}
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
                placeholder="Search Name"
                onUpdateData={HandleFilter}
                name="name"
                name2="name"
              />
            }
            customStyles={customStyles}
          />
        </div>
        <div>
          <Modal show={open} onHide={editClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
              <form onSubmit={handleSubmit2(onSubmit2)}>
          <div className="row">
            <div className="col-md-6">
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                  </tr>
                  <tr>
                    <td><input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={values.name}
                      {...register2("name")}
                    /></td>
                  </tr>
               

                 

                  <tr>
                    <td>User Id:</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        id="text"
                        name="mobile"
                        defaultValue={values.msisdn}
                        {...register2("mobile")}
                      />
                     
                    </td>
                  </tr>

                  <tr>
                    <td>Password:</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="password"  defaultValue={values.password} {...register2("password")} />
                     
                    </td>
                  </tr>

                  

                  <br />

                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </tbody>
              </table>
            </div>
           
          </div>
        </form>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </Tab>
    </Tabs>
  );
}

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

export default function SupplierPayment() {
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
      name: "Supplier Name",
      selector: (row) => row.supplier_name,
    },
    {
      name: "Payment Date",
      selector: (row) => row.payment_date,
    },
    {
      name: " Payment Mode",
      selector: (row) => row.payment_mode,
    },
    {
      name: "Payment Description",
      selector: (row) => row.payment_description,
    },

    {
      name: " Amount",
      selector: (row) => row.amount,
    },

    {
      name: "Created By",
      selector: (row) => row.name,
    },

    {
      name: "Action",
      selector: (row) => row.Action,
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

  const {
    register: register2,
    setValue: setValue2,
    reset,
    watch,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    mode: "onchange",
  });
  const values = watch();

  const displayEdit = (display) => {
    setEedit(display.id);
    setValue2("supplier_name", display.supplier_name);
    setValue2(
      "payment_date",
      moment(display.payment_date).format('YYYY-MM-DD')
    );
    setValue2("payment_description", display.payment_description);
    setValue2("pay_mode", display.payment_mode);
    setValue2("amount", display.amount);
    setValue2("payment_bank", display.payment_bank);
    setValue2("remarks", display.remarks);
    setOldAmount(display.amount);
  };

  useEffect(() => {
    getAPI(apinames.GET_SUPPLIER_MASTER)
      .then((response) => {
        console.log(response.data, "supplier data to display dynamic value");
        setGet(response.data);
      })
      .catch((error) => {
        console.log(error + "error");
      });

    getAPI(apinames.GET_SUPPLIER_PAYMENTS)
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
      type: 2,
      entity_id: supplierSelect.entity_id,

      payment_date: data.payment_date,
      payment_description: data.payment_description,
      payment_mode: data.pay_mode,
      amount: data.amount,
      remarks: data.remarks,
      balance: supplierSelect.balance,
      credit: supplierSelect.credit,
      // debit: supplierSelect.debit,
      newAmount: oldAmount,
      payment_bank: data.payment_bank,
      // customer_id: supplierSelect.id,
      supplier_name: supplierSelect.supplier_name,
      added_by:localStorage.getItem("ootel_admin_created_by")
    };

    postAPI(apinames.PUT_PAYMENTS, editData)
      .then((response) => {
        let status_code = response.status_code;

        if (status_code == 200) {
          alert("Edit is  sucessfully");
          window.location.reload();
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
      entity_id: select.id,
      name: select.supplier_name,
      payment_date: data.payment_date,
      remarks: data.remarks,
      payment_description: data.payment_description,
      payment_bank: data.payment_bank,
      payment_mode: data.pay_mode,
      amount: data.amount,
      balance: select.balance,
      credit: select.credit,
      debit: select.debit,
      added_by:localStorage.getItem("ootel_admin_created_by")
    };
    console.log(postData, "postData");

    postAPI(apinames.POST_PAYMENTS, postData)
      .then((response) => {
        let status_code = response.status_code;

        if (status_code == 200) {
          alert("posting sucessfully");
          window.location.reload();
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
      <Tab eventKey={1} title="Supplier  Payments">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <table>
                <tbody>
                  <tr>
                    <td>Supplier Name:</td>
                  </tr>

                  <tr>
                    <DynamicSearch
                      data={get}
                      type={2}
                      onChangeData={(data) => {
                        console.log("sdsd", data);
                        setSelect(data);
                      }}
                    />
                  </tr>

                  <tr>
                    <td>Payment Date:</td>
                  </tr>
                  <tr>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      {...register("payment_date")}
                    />
                    <span>
                      {errors.payment_date && errors.payment_date.message}
                    </span>
                  </tr>
                  <tr>
                    <td>Payment Mode:</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="radio"
                        id="radio"
                        value="cash"
                        {...register("pay_mode")}
                      />
                      <span>{errors.pay_mode && errors.pay_mode.message}</span>
                      <span>Cash</span>

                      <input
                        type="radio"
                        id="radio"
                        value="cheque"
                        {...register("pay_mode")}
                      />
                      <span>{errors.pay_mode && errors.pay_mode.message}</span>
                      <span>Cheque</span>

                      <input
                        type="radio"
                        id="radio"
                        value="online"
                        {...register("pay_mode")}
                      />
                      <span>{errors.pay_mode && errors.pay_mode.message}</span>
                      <span>Online</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Payment Description:</td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        id="text"
                        name="text"
                        {...register("payment_description")}
                      />
                      <span>
                        {errors.payment_description &&
                          errors.payment_description.message}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Amount:</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="number" {...register("amount")} />
                      <span>{errors.amount && errors.amount.message}</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Payment Bank:</td>
                  </tr>
                  <tr>
                    <td>
                      <select {...register("payment_bank")}>
                        <option value="select">Select</option>
                        <option value="hdfc bank">HDFC Bank</option>
                        <option value="icici bank">ICICI Bank</option>
                      </select>

                      <span>
                        {errors.payment_bank && errors.payment_bank.message}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Invoice No:</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" {...register("remarks")} />
                      <span>{errors.remarks && errors.remarks.message}</span>
                    </td>
                  </tr>

                  <br />

                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </tbody>
              </table>
            </div>
            <div className="col-md-6" style={{ marginTop: "50px" }}>
              <h4>Customer Details:</h4>
              <p>Address:{select.address}</p>
              <p>Mobile No:-{select.mobile_no}</p>
              {/* <p>{select.pincode}</p>  */}
              <br />
              <br />
              <p>GST NO:-{select.gst_no}</p>
              <br />
              <br />
              <p>Total Credit:{select.credit} </p>
              <p>Total Debit:{select.debit}</p>
              <p>Total Balance:{select.balance}</p>
            </div>
          </div>
        </form>
      </Tab>
      <Tab eventKey={2} title="Supplier Payments History">
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
          <Modal show={open} onHide={editClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Supplier Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form onSubmit={handleSubmit2(onSubmit2)}>
                  <label>Supplier Name:</label> <br />
                  <input
                    type="text"
                    defaultValue={values.supplier_name}
                    {...register2("supplier_name")}
                  />{" "}
                  <br />
                  <span className="text-danger">
                    {errors2.supplier_name && errors2.supplier_name.message}
                  </span>{" "}
                  <label>Payment Date:</label>
                  <br />
                  <input
                    type="date"
                    defaultValue={values.payment_date}
                    {...register2("payment_date")}
                  />
                  <br />
                  <span>
                    {errors2.payment_date && errors2.payment_date.message}
                  </span>
                  <label>Payment Mode:</label>
                  <br />
                  <input
                    type="radio"
                    id="radio"
                    value="cash"
                    defaultValue={values.pay_mode}
                    {...register2("pay_mode")}
                  />
                  <span>{errors2.pay_mode && errors2.pay_mode.message}</span>
                  <span>Cash</span>
                  <input
                    type="radio"
                    id="radio"
                    value="cheque"
                    defaultValue={values.pay_mode}
                    {...register2("pay_mode")}
                  />
                  <span>{errors2.pay_mode && errors2.pay_mode.message}</span>
                  <span>Cheque</span>
                  <input
                    type="radio"
                    id="radio"
                    value="online"
                    defaultValue={values.pay_mode}
                    {...register2("pay_mode")}
                  />
                  <br />
                  <span>{errors2.pay_mode && errors2.pay_mode.message}</span>
                  <span>Online</span>
                  <br />
                  <label>Payment Description:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={values.payment_description}
                    {...register2("payment_description")}
                  />
                  <br />
                  <span>
                    {errors2.payment_description &&
                      errors2.payment_description.message}
                  </span>
                  <label>Amount:</label>
                  <br />
                  <input
                    type="number"
                    defaultValue={values.amount}
                    {...register2("amount")}
                  />
                  <br />
                  <span>{errors2.amount && errors2.amount.message}</span>
                  <label>Payment Bank:</label>
                  <br />
                  <select {...register2("payment_bank")}>
                    <option value="select">Select</option>
                    <option value="hdfc bank">HDFC Bank</option>
                    <option value="icici bank">ICICI Bank</option>
                  </select>
                  <span>
                    {errors2.payment_bank && errors2.payment_bank.message}
                  </span>
                  <label>Invoice No:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={values.remarks}
                    {...register2("remarks")}
                  />
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
      </Tab>
    </Tabs>
  );
}

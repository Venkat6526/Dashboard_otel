import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Tab from "react-bootstrap/Tab";
import Select from "react-select";
import Tabs from "react-bootstrap/Tabs";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import moment from "moment";
import DynamicSearch from "../../components/AutoComplete/DynamicSearch";
import Filter from "../../components/Filter";
import { deleteAPI, getAPI, postAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
const styles = {
  
  width: '200px',
}
const schema = yup.object().shape({
  payment_date: yup
    .date()
    .typeError("Date  is required")
    .required("Payment date is required"),
  // pay_mode: yup
  //   .string()
  //   .typeError("payment mode  is required")
  //   .oneOf(["online", "cheque", "cash"], "Invalid payment mode")
  //   .required("Payment mode is required"),
  payment_description: yup.string().required("Payment description is required"),
  amount: yup
    .number()
    .typeError("Amount is required")
    .positive("Amount must be a positive number")
    .required("Amount is required"),

  sales_executive: yup
    .string()
    .typeError("Sales Executive  is required")
    .oneOf(["digital", "cash"], "Choose Sales Executive ")
    .notOneOf(["select"], "Please select a Sales Executive ")
    .required("Sales Executive  is required"),

  // remarks: yup
  //   .string()
  //   .matches(/^IN\/\d{2}-\d{2}\/\d{1,10}$/, "Invalid Invoice Number  format")
  //   .required("Invoice Number are required"),
});

export default function CustomerPayment() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [onlinePaymentType, setOnlinePaymentType] = useState("");
  const [role, setRole] = useState([]);
  const [dsRole, setDsRole] = useState(null);
  const [oldAmount, setOldAmount] = useState(0);
  const [key, setKey] = useState(1); //tabs
  const [eedit, setEedit] = useState(); /// to store in id in setvalue
  const [get, setGet] = useState([]);

  const [cGet, setCGet] = useState([]);
  const [api, setApi] = useState([]); //filter
  const [select, setSelect] = useState({});
  const [customerSelect, setCustomerSelect] = useState({});
  const [open, setOpen] = useState(false); // transport view
  const editClose = () => setOpen(false);
  const editOpen = () => {
    setOpen(true);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // const handlePaymentDetailsChange = (event) => {
  //   setPaymentDetails(event.target.value);
  // };
  const handleOnlinePaymentTypeChange = (event) => {
    setOnlinePaymentType(event.target.value);
  };
  // post deliver sales executive
  const handleProductChange = (selectedOption) => {
    console.log("aesyu", selectedOption);
    setValue("name", selectedOption);
    setValue2("name", selectedOption);
  };
  // put deliver sales executive

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
      name: "Customer Name",
      selector: (row) => row.customer_name,
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
      name: "Sales Executive",
      selector: (row) => row.sales_executive,
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
          {/* <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              editOpen();
              // setIsEdit(true);
              displayEdit(row);
              setCustomerSelect(row);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button> */}
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
    resolver: yupResolver(schema),
  });
  const values = watch();

  const displayEdit = (display) => {
    setEedit(display.id);
    setValue2("customer_name", display.customer_name);
    setValue2(
      "payment_date",
      moment(display.payment_date).format('YYYY-MM-DD')
    );
    setValue2("payment_description", display.payment_description);
    setValue2("pay_mode", display.payment_mode);
    setValue2("amount", display.amount);
    setValue2("remarks", display.remarks);
    setValue2("sales_executive", display.sales_executive);
    setOldAmount(display.amount);
  };

  useEffect(() => {
    getAPI(apinames.GET_CUSTOMER_MASTER)
      .then((response) => {
        console.log(response.data, "customer data to display dynamic value");
        setGet(response.data);
      })
      .catch((error) => {
        console.log(error + "error");
      });

    getAPI(apinames.GET_CUSTOMER_PAYMENTS)
      .then((response) => {
        console.log(response.data, "customer payments");
        let reversedData = response.data.slice().reverse();
        setCGet(reversedData); // to reverse data
        setApi(response.data);
      })
      .catch((error) => {
        console.log(error + "error");
      });

    getAPI(apinames.GET_DELIVERY_SALES_EXECUTIVE)
      .then((response) => {
        console.log(response.data, "delivery sales executive");
        let dataStored = response.data;
        setRole(
          dataStored.map((item) => ({
            value: item,
            label: item.name + ` (${item.role})`,
          }))
        );
        // setRole(response.data)
      })
      .catch((error) => {
        console.log(error, "api error");
      });
  }, []);
  //  // filter
  const HandleFilter = (filteredData) => {
    setCGet(filteredData);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
  });

  // const onSubmit2 = (data) => {
  //   const index = data.remarks.lastIndexOf("/");
  //   const invoice_id = data.remarks.substring(index + 1);
  //   console.log(data.remarks, "remarks");
  //   console.log(index, "assas");
  //   console.log(invoice_id, "aaaaaaabbbbbb");

  //   let editData = {
  //     id: eedit,
  //     type: 1,
  //     entity_id: customerSelect.entity_id,
  //     payment_date: moment(data.payment_date).toISOString().slice(0, 10),
  //     payment_description: data.payment_description,
  //     payment_mode: paymentMethod,
  //     amount: data.amount,
  //     remarks: data.remarks,
  //     executive_type: data.name != undefined ? data.name.value.type : "",
  //     executive_name: data.name != undefined ? data.name.value.role : "",
  //     payment_bank: data.payment_bank,
  //     invoice_id: invoice_id,
  //     sales_executive: data.sales_executive,
  //     balance: customerSelect.balance,
  //     credit: customerSelect.credit,
  //     debit: customerSelect.debit,
  //     newAmount: oldAmount,
  //     // customer_id: customerSelect.id,
  //     customer_name: customerSelect.customer_name,
  //   };
  //   postAPI(apinames.PUT_PAYMENTS, editData).then((response) => {
  //     var status_code = response.status_code;
  //     if (status_code == 200) {
  //       alert("Editting is successfull");
  //       window.location.reload();
  //     }
  //   });
  // };
  const onSubmit = (data) => {
    const index = data.remarks.lastIndexOf("/");
    const invoice_id = data.remarks.substring(index + 1);
    console.log(data.remarks, "remarks");
    console.log(index, "assas");
    console.log(invoice_id, "aaaaaaabbbbbb");

    let postData = {
      // id: eedit,
      type: 1,
      entity_id: select.id,
      name: select.customer_name,
      payment_date: moment(data.payment_date).format('YYYY-MM-DD'),
      payment_description: data.payment_description,
      payment_mode: paymentMethod,
      amount: data.amount,
      remarks: data.remarks,

      executive_type: data.name != undefined ? data.name.value.type : "",
      executive_name: data.name != undefined ? data.name.value.role : "",
      payment_bank: data.payment_bank,

      invoice_id: invoice_id,
      sales_executive: data.sales_executive,
      balance: select.balance,
      credit: select.credit,
      debit: select.debit,
      newAmount: oldAmount,
      customer_id: select.id,
      added_by:localStorage.getItem("ootel_admin_created_by")
    };
    console.log(data, "datatatatatatatataat");
    postAPI(apinames.POST_PAYMENTS_CUSTOMER, postData).then((response) => {
      console.log(data);
      console.log(data, "showing data");
      var status_code = response.status_code;
      if (status_code == 200) {
          alert("sucessful");
           window.location.reload();
      }
    });
  };

  // delete button to delete data
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_CUSTOMER_PAYMENTS + id);
        window.location.reload();
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
      <Tab eventKey={1} title="Customer  Payments">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <table>
                <tbody>
                  <tr>
                    <td>Customer Name:</td>
                  </tr>
                  <tr>
                    <DynamicSearch
                      data={get}
                      type={1}
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
                    <span className="text-danger">
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
                        name="pay_mode"
                        checked={paymentMethod === "cash"}
                        onChange={handlePaymentMethodChange}
                        value="cash"
                        // {...register("pay_mode")}
                      />

                      <span>Cash</span>

                      <input
                        type="radio"
                        name="pay_mode"
                        checked={paymentMethod === "cheque"}
                        onChange={handlePaymentMethodChange}
                        value="cheque"
                        // {...register("pay_mode")}
                      />

                      <span>Cheque</span>

                      <input
                        type="radio"
                        name="pay_mode"
                        checked={paymentMethod === "online"}
                        onChange={handlePaymentMethodChange}
                        value="online"
                        // {...register("pay_mode")}
                      />

                      <span>Online</span>
                    </td>
                    <span className="text-danger">
                      {errors.pay_mode && errors.pay_mode.message}
                    </span>
                    <br />
                    {paymentMethod === "cash" && (
                      <Select
                        id="executive"
                        name="executive"
                       
                        options={role}
                        placeholder="Select a Executive"
                        onChange={handleProductChange}
                      />
                    )}

                    {paymentMethod === "online" && (
                      <select
                        {...register("payment_bank")}
                        // value={onlinePaymentType}
                        // onChange={handleOnlinePaymentTypeChange}
                      >
                        <option value="select">Select</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                      </select>
                    )}
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
                      <span className="text-danger">
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
                      <input
                        type="number"
                        id="number"
                        name="number"
                        {...register("amount")}
                      />
                      <span className="text-danger">
                        {errors.amount && errors.amount.message}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Invoice No:</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" {...register("remarks")} />
                      <span className="text-danger">
                        {errors.remarks && errors.remarks.message}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>Sales Executive:</td>
                  </tr>
                  <tr>
                    <td>
                      <select {...register("sales_executive")}>
                        <option value="select">select</option>
                        <option value="digital">digital</option>
                        <option value="cash">cash</option>
                      </select>
                      <span className="text-danger">
                        {errors.sales_executive &&
                          errors.sales_executive.message}
                      </span>
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
              <p>GST NO:-{select.gst}</p>
              <br />
              <br />
              <p>Total Credit:{select.credit} </p>
              <p>Total Debit:{select.debit}</p>
              <p>Total Balance:{select.balance}</p>
            </div>
          </div>
        </form>
      </Tab>
      <Tab eventKey={2} title="Customer Payments History">
        <div
          className="main-container"
          style={{ backgroundColor: "aliceblue" }}
        >
          {/* <div
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
            </div> */}
        </div>
        <br />

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
                placeholder="Search Customer Name"
                onUpdateData={HandleFilter}
                name="customer_name"
                name2="customer_name"
              />
            }
            customStyles={customStyles}
          />
        </div>

        <div>
          <Modal show={open} onHide={editClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Customer Payment Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {/* <form onSubmit={handleSubmit2(onSubmit2)}>
                  <label>Customer Name:</label> <br />
                  <p>{customerSelect.name}</p>
                  <input
                    type="text"
                    defaultValue={values.customer_name}
                    {...register2("customer_name")}
                  />{" "}
                  {/* <DynamicSearch
                    data={get}
                    type={1}
           
                    getOptionDisabled={(select) => select.customer_name}
                    onChangeData={(data) => {
                      setSelect(data);
                    }}
                    {...register2("customer_name")}
                  /> */}
                  <br />
                  <span className="text-danger">
                    {errors2.customer_name2 && errors2.customer_name2.message}
                  </span>{" "}
                  <label>Payment Date:</label>
                  <br />
                  <input
                    type="date"
                    defaultValue={values.payment_date}
                    {...register2("payment_date")}
                  />
                  <br />
                  <span className="text-danger">
                    {errors2.payment_date && errors2.payment_date.message}
                  </span>
                  <label>Payment Mode:</label>
                  <br />
                  

                    <input
                      type="radio"
                      name="payment_mode"
                      value="cash"
                      checked={values.pay_mode === "cash"}
                      onChange={handlePaymentMethodChange}
                      // {...register2("payment_mode")}
                    />
                    <label htmlFor="cash">Cash</label>
                    <input
                      type="radio"
                      name="payment_mode"
                      value="cheque"
                      checked={values.pay_mode  === "cheque"}
                      onChange={handlePaymentMethodChange}
                      // {...register2("payment_mode")}
                    />
                    <label htmlFor="cheque">Cheque</label>
                    <input
                      type="radio"
                      name="payment_mode"
                      value="online"
                      checked={values.pay_mode  === "online"}
                      onChange={handlePaymentMethodChange}
                      // {...register2("payment_mode")}
                    />
                    <label htmlFor="online">Online</label>
                    <br />
                    {values.pay_mode === "cash" && (
                      <Select
                        id="executive"
                        name="executive"
                        className="select"
                        defaultValue={values.executive_name}
                        options={role}
                        placeholder="Select a Executive"
                        onChange={handleProductChange}
                      />
                    )}

                    {values.pay_mode  === "online" && (
                      <select
                        {...register2("payment_bank")}
                        // value={onlinePaymentType}
                        // onChange={handleOnlinePaymentTypeChange}
                      >
                        <option value="select">Select</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                      </select>
                    )}

                  <br />
                  <label>Payment Description:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={values.payment_description}
                    {...register2("payment_description")}
                  />
                  <br />
                  <span className="text-danger">
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
                  <span className="text-danger">
                    {errors2.amount && errors2.amount.message}
                  </span>
                  <label>Invoice No:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={values.remarks}
                    {...register2("remarks")}
                  />
                  <br />
                  <label>Sales Executive:</label>
                  <br />
                  <select {...register2("sales_executive")}>
                    <option value="select">select</option>
                    <option value="digital">digital</option>
                    <option value="cash">cash</option>
                  </select>
                  <br />
                  <span className="text-danger">
                    {errors2.sales_executive && errors2.sales_executive.message}
                  </span>
                  <br />
                  <button
                    value="${values.id}"
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    {" "}
                    Save
                  </button>
                {/* </form> */} 
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </Tab>
    </Tabs>
  );
}

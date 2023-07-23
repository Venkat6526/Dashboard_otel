import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import * as yup from "yup";
import Tabs from "react-bootstrap/Tabs";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import DataTable from "react-data-table-component";
import axios from "axios";
import url from "../../views/config";
import "react-datepicker/dist/react-datepicker.css";
import { yupResolver } from "@hookform/resolvers/yup";

// const SignupSchema = yup.object({
//   supplier_name: yup.string().required("Supplier name is required"),
//   Address1: yup.string().required("First address is required"),
//   mobile_no: yup
//     .string()
//     .matches(phoneRegExp)
//     .required("Enter phone number only"),
//   Address2: yup.string().required("Second address is required"),
//   gst_no: yup.string().required("Gst number should not be more than 10 digit"),
//   email: yup.string().required("Email ID is required"),
//   state: yup.string().required("Choose the state"),
//   date: yup.string().required(),
//   place_of_delivery: yup.string().required("Place of delivery is required"),
//   contact_person: yup.string().required("Contact person field is required"),
//   contact_mobile: yup.string().required("Enter the contact mobile number"),
// });
// // po_products
const ProductSchema = yup.object({
  product: yup.string().required("Product is required"),
  size: yup.string().required("Size is required"),
  hsn: yup.string().required("HSN/SAC is required"),
  qty: yup.string().required("Qty is required"),
  uom: yup.string().required("UOM is required"),
  rate: yup.string().required("Rate is required"),
  gst: yup.string().required("GST is required"),
});
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export default function Purchase() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isModal, setIsModal] = useState(false);
  const [add, setAdd] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [api, setApi] = useState([]);
  const [thearray, setThearray] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [added, setadded] = useState({
    product: "",
    Size: "",
    HSN: "",
    qty: 0,
    uom: "",
    rate: "",
    gst: "",
    grandtotal: 0,
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(SignupSchema),
  });
  const {
    register: register2,
    setValue: setValue2,
    handleSubmit: handleSubmit2,
    formState: { errors: error2 },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(ProductSchema),
  });

  const values = watch();
  const productChange = (e, key) => {
    setadded((prevState) => ({
      ...prevState,
      [key]: e,
    }));
  };

  const getGrandTotal = (e) => {
    let gstValue = parseInt(e.target.value) / 100;
    let gsttotal = parseInt(added.rate) * parseInt(added.qty) * gstValue;
    let subtotal = gsttotal + parseInt(added.rate) * parseInt(added.qty);
    productChange(subtotal, "grandtotal");
    productChange(e.target.value, "gst");
  };
  // const table_data=[]
  const addUpdate = (data) => {
        console.log(new_Add, "asasasasasdewdq");

    let new_Add = {
      product: data.product,
      size: data.size,
      hsn: data.hsn,
      qty: data.qty,
      uom: data.uom,
      rate: data.rate,
      gst: data.gst,
      grandtotal: data.grandtotal,
    };
    console.log(new_Add, "asasasasasdewdq");

    setThearray([...thearray, new_Add]);
    getTotalInfo(new_Add);
    //   var product="ball"

    //   table_data.push({"product":prodcut,"size":size,"hsn":hsn,"qty":qty,"uom":uom,"base_price":base_price,
    // "gst":gst})
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

  const demo = () => {
    setIsModal(true);
    // MicroModal.show("modal-13");
  };
  function testClickEvent(param) {
    alert("Row Click Event");
  }
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
      selector: (row) => row.Sl_no,
    },
    {
      name: "Created On",
      selector: (row) => row.Created_On,
    },
    {
      name: "Customer Name",
      selector: (row) => row.Customer_Name,
    },
    {
      name: "Po No",
      selector: (row) => row.Po_No,
    },
    {
      name: "Email Status",
      selector: (row) => row.Email_Status,
    },
    {
      name: "Created By",
      selector: (row) => row.Created_By,
    },
    {
      name: "Action",
      selector: (row) => row.Type,
      cell: (row) => (
        <div>
          <button type="button " className="btn btn-primary">
            Edit
          </button>
          <button
            type="button "
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  const onsubmit = (data) => {
    alert(1);
    axios.post(url.server_url + "/save_purchase", data);
    // var status_code = data.data.status_code;
    // if(status_code==200){
    // }
    // setAdd(data.data.data);// data from backend
    // setApi(data.data.data) // filter
  };
  const data = [
    {
      Sl_no: "1",
      Created_On: "22/07/96",
      Customer_Name: "Dinesh",
      Po_No: "1000",
      Email_Status: "pending",
      Created_By: "kaushik",
    },
    {
      Sl_no: "1",
      Created_On: "22/07/96",
      Customer_Name: "Dinesh",
      Po_No: "1000",
      Email_Status: "pending",
      Created_By: "kaushik",
    },
    {
      Sl_no: "1",
      Created_On: "22/07/96",
      Customer_Name: "Dinesh",
      Po_No: "1000",
      Email_Status: "pending",
      Created_By: "kaushik",
    },
    {
      Sl_no: "1",
      Created_On: "22/07/96",
      Customer_Name: "Dinesh",
      Po_No: "1000",
      Email_Status: "pending",
      Created_By: "kaushik",
    },
  ];

  const handleDelete = (id) => {
    axios.delete(url.server_url + "/delete_purchase/:id");
    var status_code = data.data.status_code;
    if (window.confirm("Are you sure to delete the data??")) {
      window.location.reload();
    }
  };

  // filter
  const searchItems = (searchValue) => {
    // setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = add.filter((item) => {
        return (
          item.customer_name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.Po_No.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setAdd(filteredData);
    } else {
      setAdd(api);
    }
  };
  return (
    <div>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Purchase Order">
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
                    <input type="text" {...register("supplier_name")} />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.supplier_name && errors.supplier_name.message}
                    </span>
                    <br />
                    <label>Address 1:</label>
                    <br />
                    <input type="text" {...register("Address1")} />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.Address1 && errors.Address1.message}
                    </span>
                    <br />
                    <label>Address 2:</label>
                    <br />
                    <input type="text" {...register("Address2")} />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.Address2 && errors.Address2.message}
                    </span>
                    <br />
                    <label>Address 3:</label>
                    <br />
                    <input type="text" {...register("Address3")} />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.Address3 && errors.Address3.message}
                    </span>
                    <br />
                    <label>Mobile No:</label>
                    <br />
                    <input type="number" {...register("mobile_no")} />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.mobile_no && errors.mobile_no.message}
                    </span>
                    <br />
                    <label>Gst:</label>
                    <br />
                    <input maxLength={14} type="text" {...register("gst_no")} />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.gst_no && errors.gst_no.message}
                    </span>
                    <br />
                    <label>Email:</label>
                    <br />
                    <input type="email" {...register("email")} />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.email && errors.email.message}
                    </span>
                    <br />
                    <label>State:</label>
                    <br />
                    <select {...register("state")}>
                      <option value="">--please choose an option--</option>
                      <option value="female">goa</option>
                      <option value="male">karnataka</option>
                      <option value="other">pune</option>
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
                    <p>Ref No:PO/2022-23/0037</p>
                    <label>Date:</label>
                    <br />
                    <input
                      type="date"
                      id="date"
                      name="date"
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
                    <input type="text" {...register("contact_person")} />
                    <span className="text-danger">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                      {errors.contact_person && errors.contact_person.message}
                    </span>
                    <br />
                    <label>Contact Mobile:</label>
                    <br />
                    <input type="number" {...register("contact_mobile")} />
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
              <div>
              <form onSubmit={handleSubmit2(addUpdate)}>
                  <table
                    style={{
                      width: "100%",
                      padding: "0px",
                      marginLeft: "-15px",
                    }}
                  >
                    <thead>
                      <tr
                        className="bg-success text-white"
                        style={{ width: "100%" }}
                      >
                        <th>Sl no</th>
                        <th>Product</th>
                        <th>Size</th>
                        <th>HSN</th>
                        <th>Qty</th>
                        <th>Uom</th>
                        <th>Unit Price</th>
                        <th>Gst</th>
                        <th>Grand Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {thearray.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.product}</td>
                        <td>{item.Size}</td>
                        <td>{item.HSN}</td>
                        <td>{item.qty}</td>
                        <td>{item.uom}</td>
                        <td>{item.rate}</td>
                        <td>{item.gst}</td>
                        <td>{item.grandtotal}</td>
                      </tr>
                    ))}
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Size</th>
                        <th>HSN/SAC</th>
                        <th>Qty</th>
                        <th>Uom</th>
                        <th>Rate/unit</th>
                        <th>gst</th>
                        <th>Grand total</th>
                      </tr>
                    </thead>
                    <tbody style={{ marginLeft: "15px" }}>
                      <tr>
                        <td>
                          <input
                            type="text"
                            // value={added.product}
                            // onChange={(e) =>
                            //   productChange(e.target.value, "product")
                            // }
                            {...register2("product")}
                          />
                          <span className="text-danger">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {error2.product && error2.product.message}
                          </span>
                        </td>
                        <td>
                          <input
                            style={{ width: "90px" }}
                            type="text"
                            // value={added.Size}
                            // onChange={(e) =>
                            //   productChange(e.target.value, "Size")
                            // }
                            {...register2("size")}
                          />
                          <span className="text-danger">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {error2.size && error2.size.message}
                          </span>
                        </td>

                        <td>
                          <input
                            type="type"
                            // value={added.HSN}
                            // onChange={(e) =>
                            //   productChange(e.target.value, "HSN")
                            // }
                            {...register2("hsn")}
                          />
                          <span className="text-danger">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {error2.hsn && error2.hsn.message}
                          </span>
                        </td>

                        <td>
                          <input
                            style={{ width: "100px" }}
                            type="number"
                            // value={added.qty}
                            // onChange={(e) =>
                            //   productChange(e.target.value, "qty")
                            // }
                            {...register2("qty")}
                          />
                          <span className="text-danger">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {error2.qty && error2.qty.message}
                          </span>
                        </td>

                        <td>
                          <select
                            style={{ width: "100px" }}
                            // value={added.uom}
                            // onChange={(e) =>
                            //   productChange(e.target.value, "uom")
                            // }
                            {...register2("uom")}
                          >
                            <option value="select">select</option>
                            <option value="">kg</option>
                            <option value="8">meter</option>
                          </select>
                          <span className="text-danger">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {error2.uom && error2.uom.message}
                          </span>
                        </td>

                        <td>
                          <input
                            type="number"
                            // value={added.rate}
                            // onChange={(e) =>
                            //   productChange(e.target.value, "rate")
                            // }
                            {...register2("rate")}
                          />
                          <span className="text-danger">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {error2.rate && error2.rate.message}
                          </span>
                        </td>

                        <td>
                          <select
                            style={{ width: "100px" }}
                            // value={added.gst}
                            onChange={(e) => {
                              getGrandTotal(e);
                            }}
                            {...register2("gst")}
                          >
                            <option value="select">select</option>
                            <option value="5">5</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                            <option value="18">18</option>
                            <option value="28">28</option>
                          </select>
                          <span className="text-danger">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {error2.gst && error2.gst.message}
                          </span>
                        </td>

                        <td>
                          <input
                            type="number"
                            value={added.grandtotal}
                            onChange={(e) =>
                              productChange(e.target.value, "grandtotal")
                            }
                          />
                          <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                        </td>
                        <button
                          type="submit"
                          classname="btn btn-success"
                          // onClick={onsubmit}
                          style={{ float: "right" }}
                        >
                          Add
                        </button>
                      </tr>
                    </tbody>
                  </table>
                </form>
                <br />
                <button type="submit" class="btn btn-primary">
                  save & preview
                </button>
              </div>
              <br />

              <div
                style={{
                  marginTop: "15px",
                  width: "250px",
                  float: "right",
                }}
              >
                <h6>
                  subTotal:
                  <span>{subTotal}</span>
                </h6>
                <br />
                <h6>
                  Gst:
                  <span>{taxTotal}</span>
                </h6>
                <br />
                <h6>
                  GrandTotal:
                  <span>{grandTotal}</span>
                </h6>
              </div>
            </form>


          
          </div>
        </Tab>
        <Tab eventKey="profile" title="Purchase Order History">
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
            {/* <div style={{ backgroundcolor: "green" }} className="table-sect">
              <CDBContainer>
                <CDBModal
                  isOpen={isModal}
                  toggle={() => {
                    setIsModal(false);
                  }}
                  centered
                  fade
                >
                  <CDBCard>
                    <CDBCardBody>
                      <div>
                        <tr
                          style={{
                            backgroundColor: "lightcoral",
                            width: "100%",
                          }}
                        >
                          <td>
                            <h4>AFROZ</h4>
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn-close"
                              aria-label="Close"
                            ></button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              TO:(put comma in between for multiple email ids)
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input type="email" name="email" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>
                              CC:(put comma in between for multiple email ids)
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input type="email" name="email" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Subject:</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input type="text" name="text" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Message:</p>
                          </td>
                        </tr>
                        <tr style={{ width: "100%" }}>
                          <RichTextEditor value={add} onChange={onChange} />
                        </tr>
                        <br />
                        <br />
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => {
                            setIsModal(false);
                          }}
                        >
                          Send
                        </button>
                      </div>
                    </CDBCardBody>
                  </CDBCard>
                </CDBModal>
                <CDBCard>
                  <CDBCardBody>
                    
                    <CDBBtn color="primary" onClick={() => demo()} outline>
                      Primary
                    </CDBBtn>
                    <CDBDataTable
                      striped
                      bordered
                      hover
                      scrollY
                      maxHeight="50vh"
                      // backgroundColor="green"
                      // width="100%"
                      data={data1()}
                      materialSearch
                    />
                  </CDBCardBody>
                </CDBCard>
              </CDBContainer>
            </div> */}

            <div>
              <DataTable
                columns={columns}
                data={data}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
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
                    type="text"
                    placeholder="Search Customer name or Po_No"
                    className="w-25 form-content"
                    onChange={(e) => searchItems(e.target.value)}
                  />
                }
                customStyles={customStyles}
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

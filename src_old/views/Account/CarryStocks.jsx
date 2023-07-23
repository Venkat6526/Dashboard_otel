import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Select from "react-select";
import DataTable from "react-data-table-component";
import * as yup from "yup";
import { deleteAPI, getAPI, postAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import { yupResolver } from "@hookform/resolvers/yup";
import "../Master/productMaster.css";
const schema = yup.object().shape({
  date: yup
    .date()
    .required("Date is required")
    .typeError("Date must be a valid date in YYYY-MM-DD format"),

  product_name: yup.object().shape({
    label: yup.string().required("Please select a product name"),
    value: yup.string().required("Please select a product name"),
  }),
  supplier_name: yup.object().shape({
    label: yup.string().required("Please select a Suppplier name"),
    value: yup.string().required("Please select a Suppplier name"),
  }),
  // supplier_name: yup
  //   .string()
  //   .required("Supplier name is required")
  //   .matches(
  //     /^[a-zA-Z\s]+$/,
  //     "Supplier name should only contain alphabets and spaces"
  //   ),
  qty: yup
    .number()
    .typeError("Quantity is required")
    .integer("Quantity must be a positive integer")
    .positive("Quantity must be a positive integer")
    .required("Quantity is required"),

  remarks: yup
    .string()
    .max(255, "Remarks cannot exceed 255 characters")
    .required("Remarks is required"),
});

export default function CarryStocks() {
  const [get, setGet] = useState([]);
  const [productGet, setProductGet] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // inside product function handle
  const [supplierGet, setSelectGet] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [show, setShow] = useState(false); // add product
  const close = () => setShow(false); //product model close
  const open = () => {
    setShow(true); // product model open
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
      name: "Sl no",
      selector: (row, index) => index + 1,
    },

    {
      name: "Date ",
      selector: (row) => new Date(row.date).toLocaleString(),
    },

    {
      name: "Product Name ",
      selector: (row) => row.product_name,
    },
    {
      name: "Supplier Name ",
      selector: (row) => row.supplier_name,
    },
    {
      name: "QTY ",
      selector: (row) => row.qty,
    },
    {
      name: " Financial year  ",
      selector: (row) => row.financial_year,
    },
    {
      name: "Remarks ",
      selector: (row) => row.remarks,
    },

    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <>
          <button
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              handleDelete(row.id);
              // EditHandle(row);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  //----------------------Prodct Master

  const handleProductSelect = (selectedOption) => {
    console.log(selectedOption, "selectedOption");
    const product = {
      name: selectedOption.name,
      id: selectedOption.id,
    };
    setSelectedProduct(product);
  };
  //------------------Supplier Master
  const handleSupplierSelect = (selectedOption) => {
    console.log(selectedOption, "selectedOption");
    const supplier = {
      value: selectedOption.value,
      label: selectedOption.label,
    };
    setSelectedSupplier(supplier);
  };

  useEffect(() => {
    getAPI(apinames.GET_PRODUCT_MASTER).then((response) => {
      let dataStored = response.data;
      setProductGet(
        dataStored.map((item) => ({
          value: item.id,
          label: item.product_name,
        }))
      );
    });
    getAPI(apinames.GET_SUPPLIER_MASTER).then((response) => {
      let dataStored = response.data;
      setSelectGet(
        dataStored.map((item) => ({
          value: item.id,
          label: item.supplier_name,
        }))
      );
    });

    getAPI(apinames.GET_CARRY_FORWARD_STOCKS)
      .then((response) => {
        setGet(response.data);
      })
      .catch((error) => {
        console.log(error + "error");
      });
  }, []);

  const onSubmit = (data) => {
    console.log(data, "qewrdg");
    // if (selectedProduct != null && selectedSupplier != null) {
    const postData = {
      date: moment(data.date).toISOString().slice(0, 10),
      product_name: data.product_name.label,
      product_id: data.product_name.value,
      supplier_name: data.supplier_name.label,
      supplier_id: data.supplier_name.value,
      qty: data.qty,
      remarks: data.remarks,
      financial_year: data.financial_year,
    };
    console.log(postData, "data");
    postAPI(apinames.POST_CARRY_FORWARD_STOCKS, postData)
      .then((response) => {
        console.log(response, "post");
        var status_code = response.status_code;
        if (status_code == 200) {
          alert("sucessful");
          window.location.reload();
        } else if (status_code == 400) {
          alert(JSON.stringify(response.data));
          console.log(response.message, "response.message");
        }
      })
      .catch((error) => {
        console.log(error, "api error");
      });
    // }
  };
  //-----------------------Delete  // delete button to delete data
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this details?"
    );
    if (confirmed) {
      try {
        deleteAPI(apinames.DELETE_CARRY_FORWARD_STOCKS + id);
        window.location.reload();
      } catch (error) {
        console.error(error);
        // Handle error here
      }
    }
  };
  const handleProductChange = (selectedOption) => {
    console.log("wqer", selectedOption);
    setValue("product_name", selectedOption);
  };
  const handleSupplierChange = (selectedOption) => {
    console.log("wqer", selectedOption);
    setValue("supplier_name", selectedOption);
  };
  return (
    <div>
      <div style={{ float: "Right" }}></div>
      <div>
        <Modal show={show} onHide={close}>
          <Modal.Header closeButton style={{ backgroundColor: "aliceblue" }}>
            <Modal.Title>Add Stocks</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "aliceblue" }}>
            <div>
              <form key={1} onSubmit={handleSubmit(onSubmit)}>
                <table>
                  <tbody>
                    <tr>
                      <th>Date:</th>
                      <td>
                        {" "}
                        <input type="date" {...register("date")} /> <br />
                        <span className="text-danger">
                          {errors.date && errors.date.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <th>Product:</th>
                      <td>
                        {" "}
                        <Select
                          id="product_name"
                          name="product_name"
                          options={productGet}
                          placeholder="Select a Product"
                          onChange={handleProductChange}
                          // {...register("product_name")}
                        />
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <th>Supplier:</th>
                      <td>
                        {" "}
                        <Select
                          id="supplier_name"
                          name="supplier_name"
                          options={supplierGet}
                          placeholder="Select a Supplier"
                          onChange={handleSupplierChange}
                        />
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <th>QTY:</th>
                      <td>
                        <input type="number" min={0} {...register("qty")} />{" "}
                        <br />
                        <span className="text-danger">
                          {errors.qty && errors.qty.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <br />

                    <tr>
                      <th> Financial Year:</th>
                      <td>
                        <select {...register("financial_year")}>
                          <option value="select">Select</option>
                          <option value="FY 2022-23">FY 2022-23</option>
                          <option value="FY 2021-22">FY 2021-22</option>
                        </select>
                        <span className="text-danger">
                          {errors.financial_year &&
                            errors.financial_year.message}
                        </span>{" "}
                        <br />
                      </td>
                    </tr>
                    <br />
                    <tr>
                      <th>Remarks:</th>
                      <td>
                        <textarea
                          col="25"
                          row="2"
                          {...register("remarks")}
                        ></textarea>{" "}
                        <br />
                        <span className="text-danger">
                          {errors.remarks && errors.remarks.message}
                        </span>{" "}
                      </td>
                    </tr>
                    <br />
                  </tbody>
                </table>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ float: "right" }}
                >
                  {" "}
                  Add Stocks
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
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
                onClick={() => open()}
                outlines
                style={{ marginLeft: "20px" }}
              >
                Add New
              </button>
            </>
          }
          subHeader
          //   subHeaderComponent={
          //     <Filter
          //       api={api}
          //       onUpdateData={HandleFilter}
          //       placeholder="search Category Name"
          //       name="category_name"
          //       name2="category_name"
          //     />
          //   }
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

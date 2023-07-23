import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import axios from "axios";
import url from "../../views/config";
import { useForm } from "react-hook-form";
import Filter from "../../components/Filter";


function Product() {

  const [api, setApi] = useState([]); // filter
  const [get, setGet] = useState([]); // getting data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [edit, setEdit] = useState("");
  const handleShow = () => {
    setShow(true);
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const values = watch();
  const searchItems = (searchValue) => {
    // setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = get.filter((item) => {
        return item.product_name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setGet(filteredData);
    } else {
      setGet(api);
    }
  };
  const columns = [
    {
      name: "Sl No",
      selector: (row,index) => index+1,
      width: "100px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      width: "200px",
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      width: "250px",
    },
    {
      name: "Size",
      selector: (row) => row.size,
      width: "150px",
    },
    {
      name: " Price (₹)",
      selector: (row) => row.price,
      width: "70px",
    },
    {
      name: "GST (%)",
      selector: (row) => row.gst,
      color: "#fff",
      width: "100px",
    },
    {
      name: "Main Image",
      selector: (row) => row.main_image,
      cell: (row) => (
        // <a href={row.main_image} target="_blank">
        //   Image
        // </a>
        <img src={row.main_image} height="40px" width="40px"></img>
      ),
    },
    {
      name: "Action",
      selector: (row) => row.Action,
      width: "250px",
      cell: (row) => (
        <>
          <Link
            to={{ pathname: "/ProductDetails", state: row }}
            className="btn btn-secondary"
          >
            <i className="fa fa-eye"></i>
          </Link>

          <button
            style={{ marginLeft: "10px" }}
            className="btn btn-primary"
            type="button"
            onClick={() => {
              handleShow();
              getEditData(row);
            }}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            type="button"
            class="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              deleteHandle(row.id);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    axios.get(url.server_url + "/get_product").then((data) => {
      let reversedData = data.data.data.slice().reverse();
      setGet(reversedData);
      setApi(data.data.data);
      console.log(setGet, "vdsfghdsg");
      var status_code = data.data.status_code;
      if (status_code == 200) {
        window.location.reload()
      }
    });
  }, []);



//------filter
const handleDataUpdate = (filteredData) => {
  setGet(filteredData);
};



  const deleteHandle = (id) => {
    if (window.confirm("Are you sure to delete the data ?")) {
      axios.delete(url.server_url + `/delete_product/${id}`).then((data) => {
        console.log(data, "data");
        var status_code = data.data.status_code;
        if (status_code == 200) {
          window.location.reload();
        }
      });
    }
  };
  // Display modified data

  const getEditData = (data) => {
    console.log(data, "datatatatatatata");
    setEdit(data.id);
    setValue("product_name", data.product_name);
    setValue("size", data.size);
    setValue("description", data.description);
    setValue("price", data.price);
    setValue("gst", data.gst);
    setValue("main_image", data.main_image); // setValue("main_image", data.main_image);
    setValue("display_image1", data.display_image1);
    setValue("display_image2", data.display_image2);
    setValue("display_image3", data.display_image3);
    setValue("display_image4", data.display_image4);
  };

  // modify data
  const onSubmit = (data) => {
    const newFormData = new FormData();
    console.log(data, "newformdata");
    newFormData.append("product_name", data.product_name);
    newFormData.append("size", data.size);
    newFormData.append("description", data.description);
    newFormData.append("price", data.price);
    newFormData.append("gst", data.gst);
    newFormData.append("main_image", data.main_image);
    newFormData.append("display_image1", data.display_image1);
    newFormData.append("display_image2", data.display_image2);
    newFormData.append("display_image3", data.display_image3);
    newFormData.append("display_image4", data.display_image4);

    console.log(newFormData, "newform");

    axios
      .put(url.server_url + `/modify_product/${edit}`, newFormData)
      .then((data) => {
        console.log(data, "data");
        var status_code = data.data.status_code;
        if (status_code == 200) {
          handleClose(true);
          window.location.reload();
        }
      });
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
            <Link to="/AddProduct" className="btn btn-primary">
              Add New
            </Link>
          }
          subHeader
          subHeaderComponent={
        

<Filter 
 api={api}
  onUpdateData={handleDataUpdate}
  placeholder="Search Product Name"
  name="product_name"
  name2="date"
 
/>
          }
          customStyles={customStyles}
        />
      </div>
      <div className="mx-auto col-10 col-md-8 col-lg-6 align-items-center" style={{width:"800px"}} >
        <Modal show={show}  onHide={handleClose}>
          <Modal.Header className="w-100%" closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="shadow-lg shadow-info p-5 bg-body rounded complaint"
              onSubmit={handleSubmit(onSubmit)}
             
            >
              <label>Product Name:</label>&nbsp;
              <input
                type="text"
                className="form-control"
                defaultValue={values.product_name}
                onChange={(e) => {
                  setValue("product_name", e.target.value);
                }}
              />
              <br />
              <label>Size:</label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="form-control"
                defaultValue={values.size}
                onChange={(e) => {
                  setValue("size", e.target.value);
                }}
              />
              <br />
              <label>Description:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <textarea
                name=""
                id=""
                className="form-control"
                cols=""
                rows="3"
                defaultValue={values.description}
                onChange={(e) => {
                  setValue("description", e.target.value);
                }}
              ></textarea>
              <br />
              <label>Price:</label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="number"
                defaultValue={values.price}
                className="form-control"
                onChange={(e) => {
                  setValue("price", e.target.value);
                }}
              />
              <br />
              <label>GST (%):</label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <select
                name=""
                defaultValue={values.gst}
                className="form-control"
                onChange={(e) => {
                  setValue("gst", e.target.value);
                }}
              >
                <option value="select">Select</option>
                <option value="0">0</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="18">18</option>
                <option value="28">28</option>
              </select>
              <br />
              <label>Main Image:</label>
              <br />
              <img src={values.main_image} height={"35px"} width={"35px"} />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  setValue("main_image", e.target.files[0]);
                 
                  // handleChange()
                }}
              />
              <br />
              <label>Display Image 1:</label>
              <br />
              <img
                src={values.display_image1}
                height={"25px"}
                width={"25px"}
                // onClick={}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  setValue("display_image1", e.target.files[0]);
                }}
              />
              <br />
              <label>Display Image 2:</label>
              <br />
              <img
                src={values.display_image2}
                height={"25px"}
                width={"25px"}
                // onClick={}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  setValue("display_image2", e.target.files[0]);
                }}
              />
              <br />
              <label>Display Image 3:</label>
              <br />
              <img
                src={values.display_image3}
                height={"25px"}
                width={"25px"}
                // onClick={}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  setValue("display_image3", e.target.files[0]);
                }}
              />
              <br />
              <label>Display Image 4:</label>
              <br />
              <img
                src={values.display_image4}
                height={"25px"}
                width={"25px"}
                // onClick={}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="file"
                className="form-control"
                onChange={(e) => {
                  setValue("display_image4", e.target.files[0]);
                }}
              />
              <br /> <br />
              <Button
                variant="primary"
                type="submit"
                
              >
                Save
              </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Product;

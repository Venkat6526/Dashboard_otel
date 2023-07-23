import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

export default function SalesOrder() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
        minWidth: "1800px", // override the row height
        // override the row height
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
      name: "sl no",
      selector: (row) => row.sl_no,
    },
    {
      name: "Date",
      selector: (row) => row.Date,
    },
    {
      name: "Customer ID",
      selector: (row) => row.Customer_ID,
    },
    {
      name: "Business Name",
      selector: (row) => row.Business_Name,
    },
    {
      name: "Contact Person",
      selector: (row) => row.Contact_Person,
    },
    {
      name: "Mobile",
      selector: (row) => row.Mobile,
    },
    {
      name: "Product",
      selector: (row) => row.Product,
      cell: (row) => (
        <Button variant="link" onClick={() => handleShow()}>
          View
        </Button>
      ),
    },
    {
      name: "Remark",
      selector: (row) => row.Remark,
    },
    {
      name: "Total Value",
      selector: (row) => row.Total_Value,
    },
    {
      name: "Delivery Date",
      selector: (row) => row.Delivery_Date,
      cell: (row) => <input type="date" />,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
    },
    {
      name: "Currently With",
      selector: (row) => row.Currently_With,
    },
    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <div style={{ fontSize: "16px" }}>
          {/* <Button variant="link">Delivery Assign</Button> */}
          <i className="fa fa-trash" style={{ padding: "5px" }}></i>
          <i className="fa fa-pencil" style={{ padding: "5px" }}></i>
          <i className="fa fa-close" style={{ padding: "5px" }}></i>
          {/* <button type="button" className="btn btn-danger"><i className="fa fa-trash" style={{ padding: "5px" }}></i></button>
         <button type="button" className="btn btn-primary"><i className="fa fa-pencil" style={{ padding: "5px" }}></i></button> 
         <button type="button" className="btn btn-secondary"><i className="fa fa-close" style={{ padding: "5px" }}></i></button> */}
        </div>
      ),
    },
    {
      name: "Delivered Date",
      selector: (row) => row.Delivered_Date,
      cell: (row) => <input type="date" />,
    },
  ];
  const data = [
    {
      sl_no: "",
      Date: "",
      Customer_ID: "",
      Business_Name: "",
      Contact_Person: "",
      Mobile: "",
      Product: "",
      remark: "",
      Total_Value: "",
      Delivery_Date: "",
      Status: "",
      Currently_With: "",
      Delivered_Date: "",
    },
  ];

  return (
    <div>
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
            <Link to="" className="btn btn-primary">
              Add New
            </Link>
          }
          subHeader
          subHeaderComponent={
            <input type="text" className="w-25 form-content" />
          }
          customStyles={customStyles}
        />
      </div>
      <div className="alert-view">
        <Modal dialogClassName="modal-width" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Product View </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: "750px !important" }}>
            <div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Product No</th>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>UOM</th>
                    <th>Price</th>
                  </tr>
                </thead>
              </table>
              <p style={{ float: "right" }}>Total Price:</p>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

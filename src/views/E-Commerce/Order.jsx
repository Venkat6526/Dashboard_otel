import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import  "../../index.css";

export default function Order() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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
  const columns = [
    {
      name: "sl no",
      selector: (row) => row.sl_no,
    },
    {
      name: "Invoice No",
      selector: (row) => row.Invoice_No,
    },
    {
      name: "Order Date",
      selector: (row) => row.Order_Date,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      color: "#fff",
    },
    {
      name: "Mobile",
      selector: (row) => row.Mobile,
    },
    {
      name: "Product",
      selector: (row) => row.Product,
      cell: (row) => (
        <>
          <Button variant="link" onClick={() => handleShow()}>
            View
          </Button>
        </>
      ),
    },
    {
      name: "Dispatch Date",
      selector: (row) => row.Dispatch_Date,
      cell: (row) => <input type="date"  />,
    },
    {
      name: "Shipment",
      selector: (row) => row.Shipment,
      color: "#fff",
    },
    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <>
          <Button variant="link">Dispatch</Button>
          <Button variant="link">Delete</Button>
        </>
      ),
    },
  ];

  const data = [
    {
      sl_no: "1",
      Invoice_No: "424242",
      Order_Date: "",
      Name: "vijay",
      Mobile: "5352600",
      Product: "",
      Dispatch_Date: "",
      Shipment: "bangalore",
      action: () => {},
    },
    {
      sl_no: "2",
      Invoice_No: "424242",
      Order_Date: "",
      Name: "vijay",
      Mobile: "5352600",
      Product: "",
      Dispatch_Date: "",
      Shipment: "bangalore",
      action: () => {},
    },
    {
      sl_no: "3",
      Invoice_No: "424242",
      Order_Date: "",
      Name: "vijay",
      Mobile: "5352600",
      Product: "",
      Dispatch_Date: "",
      Shipment: "bangalore",
      action: () => {},
    },
    {
      sl_no: "4",
      Invoice_No: "424242",
      Order_Date: "",
      Name: "vijay",
      Mobile: "5352600",
      Product: "",
      Dispatch_Date: "",
      Shipment: "bangalore",
      action: () => {},
    },
  ];
  return (
    <div>
      <div className="Datatables">
        <DataTable
          columns={columns}
          data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          // selectableRows
          // selectRowsHighlight
          highlightOnHover
          actions={<button className="btn btn-primary">Export</button>}
          subHeader
          subHeaderComponent={
            <input type="text" className="w-25 form-content" />
          }
          customStyles={customStyles}
        />
      </div>
      <div>
        <Modal dialogClassName="modal-width" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>View Order</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: "750px !important" }}>
            <div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Image</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                {/* <tbody style={{width:"50px"}}>
                  <tr>
                    <td>
                      <input type="text" disabled style={{width:"200px"}} />
                    </td>
                    <td>
                      <input type="file" style={{width:"100px"}}/>
                    </td>
                    <td>
                      <input type="Number" style={{width:"50px"}}/>
                    </td>
                  </tr>
                </tbody> */}
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary" onClick={handleClose}>
              Submit
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

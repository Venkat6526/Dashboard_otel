import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

export default function SalesFollowUp() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [remark, setRemark] = useState(false);
  const handleClose1 = () => setRemark(false);
  const handleShow1 = () => {
    setRemark(true);
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
        minWidth: "1500px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "aliceblue",
        textTransform: "uppercase",
        fontWeight: "bold",
        tableLayout: "auto",
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
      width: "60px",
    },
    {
      name: "Date",
      selector: (row) => row.Date,
      width: "100px",
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
      name: "Contact Number",
      selector: (row) => row.Contact_Number,
    },
    {
      name: "Remark",
      selector: (row) => row.Remark,

      cell: (row) => (
        <Button
          variant="link"
          onClick={() => {
            console.log("jhgsdch");
            handleShow1();
          }}
        >
      <i className="fa fa-eye" style={{ padding: "5px" }}></i>
        </Button>
      ),
    },

    {
      name: "Status",
      selector: (row) => row.Status,
      width: "100px",
    },
    {
      name: "Next FollowUp Date",
      selector: (row) => row.Next_Followup_Date,
      cell: (row) => <input type="date" />,
    },
    {
      name: "Action",
      selector: (row) => row.Action,

      cell: (row) => (
        <Button variant="primary" onClick={() => handleShow()}>
          History
        </Button>
      ),
    },
  ];
  const data = [
    {
      sl_no: "1",
      Date: "25/09/2998",
      Customer_ID: "4214",
      Business_Name: "hotel",
      Contact_Person: "vijay",
      Contact_Number: "983256298",
      Mobile: "942279423",
      Product: "metal",
      remark: "no remark",

      Status: "Follow up",
      Next_Followup_Date: "15/03/2022",
    },
    {
      sl_no: "1",
      Date: "25/09/2998",
      Customer_ID: "4214",
      Business_Name: "hotel",
      Contact_Person: "vijay",
      Mobile: "942279423",
      Product: "metal",
      remark: "no remark",

      Status: "Follow up",
      Next_Followup_Date: "15/03/2022",
    },
    {
      sl_no: "2",
      Date: "25/09/2998",
      Customer_ID: "4214",
      Business_Name: "hotel",
      Contact_Person: "vijay",
      Mobile: "942279423",
      Product: "metal",
      remark: "no remark",

      Status: "Follow up",
      Next_Followup_Date: "15/03/2022",
    },
    {
      sl_no: "3",
      Date: "25/09/2998",
      Customer_ID: "4214",
      Business_Name: "hotel",
      Contact_Person: "vijay",
      Mobile: "942279423",
      Product: "metal",
      remark: "no remark",

      Status: "Follow up",
      Next_Followup_Date: "15/03/2022",
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
      <div className="alert-History">
        <Modal dialogClassName="modal-width" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> History </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: "750px !important" }}>
            <div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                {/* <tbody>
                    <td><input type="date"/></td>
                    <td><textarea name="" id="" cols="0" rows="3"></textarea></td>
                </tbody> */}
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
      <div className="alert-History">
        <Modal dialogClassName="modal-width" show={remark} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title> History </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: "750px !important" }}>
            <div>
            <div className="alert-view">
              <label>Remark:</label><br/>
              <textarea name="" id="" cols="60" rows="4">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium excepturi labore sunt, dolorum minima quasi amet
                obcaecati impedit, quos ducimus nam sint harum error ad. Iusto
                mollitia blanditiis amet! Cupiditate?
              </textarea>
            </div>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
  
    </div>
  );
}

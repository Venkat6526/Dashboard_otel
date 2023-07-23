import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Target() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [target, setTarget] = useState(false);
  const handleClose1 = () => setTarget(false);
  const handleShow1 = () => {
    setTarget(true);
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
      name: "Sl No",
      selector: (row) => row.Sl_no,
    },
    {
      name: "Employee",
      selector: (row) => row.Employee,
    },
    {
      name: "Designation",
      selector: (row) => row.Designation,
    },
    {
      name: "Target",
      selector: (row) => row.Target,
      cell: (row) => (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
          }}
        >
          <p>{row.Target}</p>
          <i
            className="fa fa-pencil"
            style={{ padding: "5px", fontSize: "16px" }}
            onClick={() => handleShow1()}
          ></i>
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.Type,
      cell: (row) => (
        <div style={{ fontSize: "16px" }}>
          <p>{row.Type}</p>

          <i
            className="fa fa-pencil"
            style={{ padding: "5px" }}
            onClick={() => handleShow()}
          ></i>
        </div>
      ),
    },
  ];
  const data = [
    {
      Sl_no: "1",
      Employee: "Dinesh",
      Designation: "Marketing",
      Target: "1000",
      Type: "",
    },
    {
      Sl_no: "2",
      Employee: "Koushik",
      Designation: "Sales",
      Target: "500",
      Type: "",
    },
    {
      Sl_no: "3",
      Employee: "Karthik",
      Designation: "Manager",
      Target: "1500",
      Type: "",
    },
  ];

  // TargetHistory

  const columns1 = [
    {
      name: "Sl no",
      selector: (row) => row.Sl_no,
    },
    {
      name: "Employee",
      selector: (row) => row.Employee,
    },
    {
      name: " Date",
      selector: (row) => row.Date,
    },
    {
      name: "Given Target",
      selector: (row) => row.Given_Target,
    },
    {
      name: "Achieved Target",
      selector: (row) => row.Achived_Target,
    },
  ];
  const data1 = [
    {
      Sl_no: "1",
      Employee: "Dinesh",
      Date: "09/02/2022",
      Given_Target: "1000 INR",
      Achived_Target: "800",
    },
    {
      Sl_no: "2",
      Employee: "koushik",
      Date: "09/12/2022",
      Given_Target: "500 KG",
      Achived_Target: "2222",
    },
    {
      Sl_no: "3",
      Employee: "karthik",
      Date: "02/12/2022",
      Given_Target: "2000 INR",
      Achived_Target: "600",
    },
    {
      Sl_no: "4",
      Employee: "Paven",
      Date: "09/22/2023",
      Given_Target: "3990 KG",
      Achived_Target: "150",
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Target">
          <div className="Main-Cointainer">
            <div className="table">
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
                  <button to="" className="btn btn-primary">
                    Export
                  </button>
                }
                subHeader
                subHeaderComponent={
                  <input type="text" className="w-25 form-content" />
                }
                customStyles={customStyles}
              />
            </div>
            <div className="Update" >
              <Modal show={target} onHide={handleClose1}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <input type="text" />
                  <Button variant="primary" onClick={handleClose1} style={{marginLeft:"10px"}}>
                    Update
                  </Button>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            </div>

            <div className="TargetValue">
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <select>
                    <option value="select">Select</option>
                    <option value="INR">INR</option>
                    <option value="KG">KG</option>
                    <option value="LTR">LTR</option>
                  </select>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            </div>
          </div>
        </Tab>
        <Tab eventKey="profile" title="TargetHistory">
          <div className="TargetHistory-container">
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
            <div>
              <DataTable
                columns={columns1}
                data={data1}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
                // selectableRows
                // selectRowsHighlight
                highlightOnHover
                actions={
                  <button to="" className="btn btn-primary">
                    Export
                  </button>
                }
                subHeader
                subHeaderComponent={
                  <input type="text" className="w-25 form-content" />
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

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RichTextEditor from "react-rte";
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "../../views/config";

export default function TaxInvoiceHistory() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [add, setAdd] = useState(RichTextEditor.createEmptyValue());
  const [get, setGet] = useState([]);
  const [api, setApi] = useState([]);
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) => console.log(data);

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
      name: "sl_no",
      selector: (row) => row.id,
    },
    {
      name: "Invoice No",
      selector: (row) => row.in_no,
    },
    {
      name: "In Date",
      selector: (row) => row.date,
    },
    {
      name: "customer_name",
      selector: (row) => row.customer_name,
      color: "#fff",
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile_no,
    },
    {
      name: "Email Status",
      selector: (row) => row.email,
    },
    {
      name: "Created_by",
      selector: (row) => row.Created_by,
      color: "#fff",
    },
    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <>
          <button className="btn btn-success" onClick={() => handleShow()}>
            Mail
          </button>
          <button className="btn btn-primary" style={{ marginLeft: "4px" }}>
            EDIT
          </button>
          <button
            type="button"
            class="btn btn-danger"
            style={{ marginLeft: "4px" }}
            onClick={() => {
              deleteHandle(row.id);
            }}
          >
            DELETE
          </button>
        </>
      ),
    },
  ];
  useEffect(() => {
    axios.get(url.server_url + "/get_invoice").then((data) => {
      console.log(data.data.invoice_main, "data");
      setGet(data.data.invoice_main);
      setApi(data.data.invoice_main);
    });
  }, []);
  const deleteHandle = (id) => {
    axios.delete(url.server_url +`/delete_invoice/${id}`).then((data) => {
      var status_code = data.data.status_code;
      if (status_code == 200) {
        alert("successful");
        window.location.reload();
      }
    });
  };

  // filter
  const searchItems = (searchValue) => {
    //  setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = get.filter((item) => {
        return (
          item.customer_name
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          item.mobile_no.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setGet(filteredData);
    } else {
      setGet(api);
    }
  };

  return (
    <div className="main-container" style={{ backgroundColor: "aliceblue" }}>
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
          columns={columns}
          data={get}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          // selectableRows
          // selectRowsHighlight
          highlightOnHover
          actions={<button className="btn btn-primary">Export</button>}
          subHeader
          subHeaderComponent={
            <input
              type="search"
              className="w-25 form-content"
              placeholder="SEARCH CUSTOMER NAME/MOBILE NO"
              onChange={(e) => searchItems(e.target.value)}
            />
          }
          customStyles={customStyles}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <tr>
              <td>
                <p>TO:(put comma in between for multiple email ids)</p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="email" name="email" />
              </td>
            </tr>
            <tr>
              <td>
                <p>CC:(put comma in between for multiple email ids)</p>
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
              <RichTextEditor value={add} onChange={handleClose} />
            </tr>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

import React,{useState} from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



import DataTable from "react-data-table-component";





export default function ApprovalPending() {
    const [show, setShow] = useState(false);




    

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
      name: "name",
      selector: (row) => row.name,
    },
  
    {
      name: "business_name ",
      selector: (row) => row.business_name,
    },
    {
          name: "mobile ",
          selector: (row) => row.mobile,
    },
       
    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <>
           <Link
          to="/ApprovalPendingView"
          className="btn btn-primary"
          style={{ float: "right" }}
        >
          View
        </Link>
        
          <button
            className="btn btn-primary"
            style={{ marginLeft: "10px" }}
            
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
            
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];



  const data = [
    {
        id: 1,
        created_on:"22-02-2023",
        name:"dinesh",
        business_name:"abc pvt limited",
        mobile:"9035635965",
    },
    {
        id: 2,
        created_on:"22-08-2023",
        name:"kARTHIK",
        business_name:"xyz pvt limited",
        mobile:"9035635965",
    },
]





    
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
            <>
              {/* <button
                className="btn btn-primary"
                onClick={() => reportingOpen()}
                outlines
                style={{ marginLeft: "20px" }}
              >
                Add Report
              </button> */}

              <button type="button" className="btn btn-primary">
                Refresh
              </button>
            </>
          }
          subHeader
        //   subHeaderComponent={
        //     <Filter
        //       api={data}
        //       onUpdateData={HandleFilter}
        //       placeholder="search Reporting Name"
        //       name="name"
        //       name2="name"
        //     />
        //   }
          customStyles={customStyles}
        />
      </div>
      <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body>
     <div>
        <div>
            <h3 style={{backgroungColor:"blue"}}>Basic Details</h3>
        </div>
     </div>
        </Modal.Body>
      </Modal>
      </div>
        </div>
    
  )

        }
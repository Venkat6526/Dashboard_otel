import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function User() {
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  

  const customStyles = {
    rows: {
      style: {
        // minHeight: "72px", // override the row height
       
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
      width:"80px"
    },
    {
      name: "Created On",
      selector: (row) => row.Created_On,
      width:"120px"
    },
    {
      name: "Modified On",
      selector: (row) => row.Modified_On,
      width:"150px"
    },
    {
      name: "User Name",
      selector: (row) => row.User_Name,
      width:"200px"
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      width:"200px"
    },
    {
      name: "Password",
      selector: (row) => row.Password,
      width:"200px"
    },
    
    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <div>
          <Link to="/UserPath" className="btn btn-primary">
            Edit
          </Link>
          <Link
            to="/AccessibilityPath"
            className="btn btn-primary"
            style={{ marginLeft: "20px" }}
          >
            Accessibility
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "20px" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Sl_no: "1",
      User_Name: "Dinesh",
      Password: "Dinesh123@",
      
    },
    {
      Sl_no: "2",
      User_Name: "Kaushik",
      Password: "kaushik46",
    
    },
    {
      Sl_no: "3",
      User_Name: "Karthik",
      Password: "Karthik$",
     
    },
    {
      Sl_no: "4",
      User_Name: "Sachin",
      Password: "Sachin@#*&",
   
    },
  ];

  return (
    <div className="Main-Cointainer">
      <div className="tables">
    
        <DataTable
    
   
          columns={columns}
          data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="500px"
          // selectableRows
          // selectRowsHighlight
          actions={
            <Link to="/UserPath" className="btn btn-primary">
              Add Users
            </Link>
          }
          highlightOnHover
          subHeader
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

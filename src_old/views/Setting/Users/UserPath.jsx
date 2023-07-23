import React from "react";

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
import { useState } from "react";

export default function UserPath() {

  const [APIData, setAPIData] = useState([ { sname: "invoice", id: 1 },
  { sname: "supplier", id: 2 },
  { sname: "target", id: 3 },
  { sname: "payment", id: 4 },])
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
 
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchValue !== '') {
        const filteredData = APIData.filter((item) => {
            return(item.sname).toLowerCase().includes(searchValue.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(APIData)
    }
}
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

  return (
    <div className="add-button">
      <div>
        <h5> Add Users :</h5>
        <br />
        <table>
          <label> Name:</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="name" placeholder="NAME" />
          <br />
          <br />
          <label>User ID:</label> &nbsp;&nbsp;&nbsp;&nbsp;
          <input type="name" placeholder="USER ID" />
          <br />
          <br />
          <label>Password:</label> &nbsp;
          <input type="password" placeholder="PASSWORD" />
          <br />
          <br />
        </table>
      </div>
      <br /> <br />
      <h6>Accessibility</h6>
      <hr></hr>
      <br />
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <h5>Account</h5>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <input icon='search'
                placeholder='Search...'
                style={{width:"50%"}}
                onChange={(e) => searchItems(e.target.value)}
            />
              <div
                className="main-button-container"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                    
                {searchInput.length > 0 ? (
                    filteredResults.map((item) => {
                        return (
                          <div className="button-icon">
                          <FormGroup>
                            <FormControlLabel
                              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            />
                          </FormGroup>
                          <p>{item.sname}</p>
                          <Button variant="link">View</Button>
                        </div>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                          <div className="button-icon">
                          <FormGroup>
                            <FormControlLabel
                              control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            />
                          </FormGroup>
                          <p>{item.sname}</p>
                          <Button variant="link">View</Button>
                        </div>
                        )
                    })
                )}
           
                {/* {add.filter(add => add.includes('J')).map((item, index) => (
                   key={item.sname} value={index}>
                  //   {item.sname}
                  <div className="button-icon">
                    <FormGroup>
                      <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      />
                    </FormGroup>
                    <p>{item.sname}</p>
                    <Button variant="link">View</Button>
                  </div>
                ))} */}
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <button
          type="button "
          className="btn btn-primary"
          style={{ float: "right" }}
        >
          Back
        </button>
        <button type="button " className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}

import React from "react";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CustomAlert = (props) => {
  const mystyle = {
    width: "18rem",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    postion: "relative",
    float: "50%",
    left: "350px",
    borderRadius: "20px"}

    
    const mystyle1={ backgroundColor: "green",
    borderRadius: "50%",
    padding: "25px",
    color: "white",
    margin: "10px",
    position: "relative",
    boxShadow: "green 1px 1px 15px 1px",
    top: "-60px",
    left: "33%"
  }
  
  return (
    <div className="card" style={mystyle}>
      <div className="card-body">
        {/* <FontAwesomeIcon icon="fa-solid fa-circle-check" /> */}
        <i
          className="fa fa-check"
        style={mystyle1}
        ></i>
        <p>{props.text}</p>
        <a href="#" class="btn btn-primary">
          Ok
        </a>
      </div>
    </div>
  );
};

export default CustomAlert;

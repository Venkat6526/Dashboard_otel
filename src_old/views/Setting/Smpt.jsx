import React,{useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Smtp() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const add = [
    {
      sl: 1,
      email: "dinesh@gmail.com",
      smpt: "smpt@gmail.com",
      port: 465,
      default: "yes",
    },
    {
      sl: 2,
      email: "karthik@gmail.com",
      smpt: "smpt@gmail.com",
      port: 2748,
      default: "No",
    },
    {
      sl: 3,
      email: "pavan@gmail.com",
      smpt: "smpt@gmail.com",
      port: 8217,
      default: "No",
    },
    {
      sl: 4,
      email: "kishore@gmail.com",
      smpt: "smpt@gmail.com",
      port: 567,
      default: "No",
    },
  ];

  return (
    <div className="Main">
      <div className="button">
        <button className="btn btn-primary" onClick={() => handleShow()}> Add New</button>
        <br/>
        <div>
          <table className="table">
            {" "}
            <thead>
              <tr>
                <td>Sl No</td>
                <td>Email</td>
                <td>SMTP Host</td>
                <td>Port</td>
                <td>Default?</td>
                <td>Action</td>{" "}
              </tr>
            </thead>
            {add.map((item) => (
              <tbody>
                <tr>
                  <td>{item.sl}</td>
                  <td>{item.email}</td>
                  <td>{item.smpt}</td>
                  <td>{item.port}</td>
                  <td>{item.default}</td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={() => handleShow()}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-primary" style={{marginLeft:"10px"}}>
                      Set Has Default
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div className="table">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SMTP Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <tr>
           <td>SMTP Host</td>
           <td><input type="email" /></td>
        </tr>
     
        <tr>
           <td>Port</td>
           <td><input type="number" /></td>
        </tr>
       
        <tr>
           <td>Username</td>
           <td><input type="text" /></td>
        </tr>
      
        <tr>
           <td>Password</td>
           <td><input type="password" /></td>
        </tr>

                    </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
     Submit
          </Button>
        </Modal.Footer>
      </Modal>
       
      </div>
    </div>
  );
}

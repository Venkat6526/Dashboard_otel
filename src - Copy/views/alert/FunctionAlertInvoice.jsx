import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "../../assets/img/Image";

function FunctionAlert({ onClose, isVisible, data }) {
  const handleClose = () => {
    onClose(false);
  };

  const getViewData = () => {
    switch (data.code) {
      case 200:
        return (
          <div>
            <Modal.Body>
              <h4 style={{ textAlign: "center" }}>Invoice Submitted Successfully!</h4>
              <br />
              <p>Thanks for submitting your application.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Okay
              </Button>
            </Modal.Footer>
          </div>
        );
      case 400:
        return (
          <div>
            <Modal.Body>
              <h3 style={{ textAlign: "center" }}>400 error!</h3>
              <br />
              {data.data!=null&&data.data.map((item) => (
                <>
                  <p>{JSON.stringify(item)}</p>
                </>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Okay
              </Button>
            </Modal.Footer>
          </div>
        );
      case 500:
        return (
          <div>
            <Modal.Body>
              <h3 style={{ textAlign: "center" }}>500 error!</h3>
              <br />
              <p>Thanks for submitting your application.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Okay
              </Button>
            </Modal.Footer>
          </div>
        );
      default:
        return (
          <div>
            <Modal.Body>
              <h3 style={{ textAlign: "center" }}>{data.code} error!</h3>
              <br />
              <p>Something went wrong.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Okay
              </Button>
            </Modal.Footer>
          </div>
        );
    }
  };

  return (
    <div>
      <div>
        <Modal
          show={isVisible}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <div>
            <Modal.Header closeButton className="text-center"></Modal.Header>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Modal.Header>
              {data.code == 200 ? (
                <img
                  src={Image.greenTick}
                  height="70px"
                  width="70px"
                  alt="Success"
                  style={{ float: "center" }}
                />
              ) : (
                <img
                  src={Image.wrong}
                  height="50px"
                  width="50px"
                  alt="Success"
                  style={{ float: "center" }}
                />
              )}
              {getViewData()}
            </Modal.Header>
          </div>
        </Modal>
      </div>

      {/* <div>
        <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <div>
            <Modal.Header closeButton className="text-center"></Modal.Header>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Modal.Header>
              <img
                src={Image.wrong}
                height="50px"
                width="50px"
                alt="Success"
                style={{ float: "center" }}
              />
            </Modal.Header>
          </div>
          <Modal.Body>
            <h3 style={{ textAlign: "center" }}>Application not submitted!</h3>
            <br />
            <p>All fields are mandatory , please fill all the fields</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Okay
            </Button>
            {/* <Button variant="primary">Understood</Button> */}
      {/* </Modal.Footer>
        </Modal> */}
      {/* </div>  */}
    </div>
  );
}

export default FunctionAlert;

import { padding } from "@mui/system";
import React, { useState, useCallback } from "react";

import ImageViewer from "react-simple-image-viewer";
import "../Hotel Owner/Approval.css";

export default function () {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [disable, setDisable] = useState('');

  const handleRadioChange = event => {
    setDisable(event.target.value);
  };

  const images = [
    "https://cdn.pixabay.com/photo/2016/11/30/15/23/apples-1873078_960_720.jpg",
    "https://cdn.pixabay.com/photo/2014/06/16/23/10/spices-370114_960_720.jpg",
    "https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/07/07/12/31/lime-2481346_960_720.jpg",
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="main-cointainer">
      <div
        className="id"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <h6>&nbsp;&nbsp;&nbsp;Business Profile ID:</h6>
          <p style={{ marginTop: "-2px" }}>12345678</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <h6>Member ID:</h6>
          <p style={{ marginTop: "-2px" }}>12345678</p>
        </div>
      </div>
      <br />
      <div className="basic-details">
        <p
          style={{
            backgroundColor: "powderblue",
            fontWeight: "600",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          &nbsp;Basic Details
        </p>

        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>Business Name:</h6>
                </td>
                <td>
                  {" "}
                  <input type="name" />
                </td>
              </tr>
              <tr>
                <td>
                  <h6>State:</h6>{" "}
                </td>
                <td>
                  <select>
                    <option value="select">Select</option>
                    <option value="goa">Goa</option>
                    <option value="pune">Pune</option>
                    <option value="karnataka">Karnataka</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <h6> District:</h6>
                </td>
                <td>
                  <select>
                    <option value="select">Select</option>
                    <option value="bangalore">Bangalore</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <h6> City:</h6>
                </td>
                <td>
                  <select>
                    <option value="select">Select</option>
                    <option value="bangalore">Bangalore</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <h6> PinCode:</h6>
                </td>
                <td>
                  {" "}
                  <span>560072</span>
                </td>
              </tr>
              <tr>
                <td>
                  <h6> Address:</h6>
                </td>
                <td>
                  <textarea name="" id="" cols="20" rows="3"></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p
          style={{
            backgroundColor: "powderblue",
            fontWeight: "600",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          &nbsp;Bussiness Details
        </p>

        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>Year Of Establishment:</h6>
                </td>
                <td>
                  <input type="date" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>No Of Employee:</h6>
                </td>
                <td>
                  <input type="number" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Bussiness Type:</h6>
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Business Description::</h6>
                </td>
                <td>
                  <textarea name="" id="" cols="20" rows="3"></textarea>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Catering Capacity:</h6>
                </td>
                <td>
                  <input
                    type="radio"
                    name="option"
                    value="yes"
                    checked={disable === "yes"}
                    onChange={handleRadioChange}
                  />
                  Yes &nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    name="option"
                    value="no"
                    checked={disable === "no"}
                    onChange={handleRadioChange}
                  />
                  No
                </td>
              </tr>
              <tr>
                <td colSpan="2">
              {disable === "yes" && (
                  <table className="table table-boderless">
                    <tbody>
                      <tr>
                        <td style={{paddingLeft:"0"}}>
                          <h6>catering Type:</h6>
                        </td>
                        <td style={{paddingLeft:"0"}}>
                          <select>
                            <option value="select">Select</option>
                            <option value="chinese">Chinese</option>
                            <option value="continental">Continental</option>
                            <option value="south_indian">South Indian</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td style={{paddingLeft:"0"}}>
                          <h6>Capacity:</h6>
                        </td>
                        <td style={{paddingLeft:"0"}}>
                          <input type="number" />
                        </td>
                      </tr>
                      <tr>
                        <td style={{paddingLeft:"0"}}>
                          <h6>Specialization Area:</h6>
                        </td>
                        <td style={{paddingLeft:"0"}}>
                          <select>
                            <option value="select">Select</option>
                            <option value="chinese">Chinese</option>
                            <option value="continental">Continental</option>
                            <option value="south_indian">South Indian</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              )}
              </td>
              </tr>
              <tr>
                <td>
                  <h6>Latitude:</h6>
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Longitude:</h6>
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <h6>location view ask:</h6>
                </td>
                <td>
                  <span>Blank </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p
          style={{
            backgroundColor: "powderblue",
            fontWeight: "600",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          &nbsp;Contact Details
        </p>

        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>Contact Name:</h6>
                </td>
                <td>
                  {" "}
                  <input type="text" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Mobile No:</h6>
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Alternate Mobile No:</h6>
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Landline No:</h6>
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Email Id:</h6>
                </td>
                <td>
                  {" "}
                  <input type="email" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Website:</h6>
                </td>
                <td>
                  {" "}
                  <input type="text" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p
          style={{
            backgroundColor: "powderblue",
            fontWeight: "600",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          &nbsp;Profile Image
        </p>

        <div>
          <img
            src="https://cdn.pixabay.com/photo/2023/03/11/20/24/animal-7845217_960_720.jpg"
            height="100px"
            width="100px"
            style={{ borderRadius: "50%" }}
          ></img>
        </div>
      </div>
      <br />
      <div>
        <p
          style={{
            backgroundColor: "powderblue",
            fontWeight: "600",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          &nbsp;Gallery Images
        </p>

        <div>
          {images.map((src, index) => (
            <img
              src={src}
              onClick={() => openImageViewer(index)}
              width="120"
              key={index}
              style={{ margin: "2px" }}
              alt=""
            />
          ))}

          {isViewerOpen && (
            <ImageViewer
              src={images}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}
        </div>
      </div>
      <br />
      <div>
        <p
          style={{
            backgroundColor: "powderblue",
            fontWeight: "600",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          &nbsp;Bank Details
        </p>

        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>Account Name:</h6>
                </td>
                <td>
                  {" "}
                  <input type="text" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Account Type:</h6>
                </td>
                <td>
                  {" "}
                  <input type="text" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Account Number:</h6>
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>IFSC Code:</h6>
                </td>
                <td>
                  {" "}
                  <input type="text" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Bank Name:</h6>
                </td>
                <td>
                  {" "}
                  <input type="text" />
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Branch:</h6>
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="submit"
          className="btn btn-danger"
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

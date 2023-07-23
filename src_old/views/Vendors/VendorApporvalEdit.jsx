import React, { useState, useCallback } from "react";

import ImageViewer from "react-simple-image-viewer";
import "../Hotel Owner/Approval.css";

export default function VendorApporvalEdit() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    "https://cdn.pixabay.com/photo/2023/03/09/15/56/monkeys-7840321_960_720.jpg",
    "https://cdn.pixabay.com/photo/2023/03/05/23/43/siberian-husky-7832373_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/05/24/04/17/husky-5212365_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/02/08/16/09/dog-3139757_960_720.jpg",
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
      <div style={{ display: "flex", gap: "10px" }}>
        <h6>&nbsp;&nbsp;&nbsp;Business Profile ID:</h6>
        <p style={{ marginTop: "-2px" }}>12345678</p>
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
                  <textarea name="" id="" cols="20"  rows="1.5"></textarea>
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
                  <h6>Business Description:</h6>
                </td>
                <td>
                  <textarea name="" id="" cols="20" rows="1.5"></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Major Supply Line:</h6>
                </td>
                <td>
                 <textarea name="" id="" cols="20" rows="1.5"></textarea>
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
            src="https://cdn.pixabay.com/photo/2022/10/19/20/02/elephants-7533472_960_720.jpg"
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
  );
}

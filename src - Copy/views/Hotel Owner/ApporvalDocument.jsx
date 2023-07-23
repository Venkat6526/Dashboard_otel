import React from "react";
import "../Hotel Owner/Approval.css";
export default function ApporvalDocument() {
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
          &nbsp;Muncipal Details
        </p>

        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>Muncipal License No :</h6>
                </td>
                <td>
                  {" "}
                  <span>86245628</span>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Muncipal License Validity :</h6>{" "}
                </td>
                <td>
                  <span>2024-04-04</span>
                </td>
              </tr>
              <tr>
                <td>
                  <h6> Muncipal License Attachment :</h6>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    {/* <i className="bi bi-file-earmark-pdf"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-pdf"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                    </svg>
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <h6> Submission Date :</h6>
                </td>
                <td>
                  <span>2023-03-23 </span>
                </td>
              </tr>
              <tr>
                <td>
                  <h6> Last Action Date :</h6>
                </td>
                <td>
                  {" "}
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6> Status:</h6>
                </td>
                <td>
                  <span>Reject</span>
                </td>
                <td>
                  {" "}
                  <button className="btn btn-success">Approve</button>
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "-20px" }}
                  >
                    Reject
                  </button>
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
          &nbsp;FSSAI Details
        </p>
        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>FSSAI License No :</h6>
                </td>
                <td>
                  <span>83463746217</span>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>FSSAI License Validity :</h6>
                </td>
                <td>
                  <span>2025-04-04</span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>FSSAI License Attachment :</h6>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    {/* <i className="bi bi-file-earmark-pdf"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-pdf"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Submission Date :</h6>
                </td>
                <td>
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Last Action Date :</h6>
                </td>
                <td>
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6> Status:</h6>
                </td>
                <td>
                  <span>Reject</span>
                </td>
                <td>
                  {" "}
                  <button className="btn btn-success">Approve</button>
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "-20px" }}
                  >
                    Reject
                  </button>
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
          &nbsp;GST Details
        </p>

        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>GST No :</h6>
                </td>
                <td>
                  {" "}
                  <span>gklpk23546</span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>GST Attachment :</h6>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    {/* <i className="bi bi-file-earmark-pdf"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-pdf"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Submission Date :</h6>
                </td>
                <td>
                  {" "}
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Last Action Date :</h6>
                </td>
                <td>
                  {" "}
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6> Status:</h6>
                </td>
                <td>
                  <span>Reject</span>
                </td>
                <td>
                  {" "}
                  <button className="btn btn-success">Approve</button>
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "-20px" }}
                  >
                    Reject
                  </button>
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
          &nbsp;MSME Details
        </p>

        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>MSME Attachment :</h6>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    {/* <i className="bi bi-file-earmark-pdf"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-pdf"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Submission Date :</h6>
                </td>
                <td>
                  {" "}
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Last Action Date:</h6>
                </td>
                <td>
                  {" "}
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6> Status:</h6>
                </td>
                <td>
                  <span>Reject</span>
                </td>
                <td>
                  {" "}
                  <button className="btn btn-success">Approve</button>
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "-20px" }}
                  >
                    Reject
                  </button>
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
          &nbsp;Pan Details
        </p>

        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>Pan No :</h6>
                </td>
                <td>
                  {" "}
                  <span>gkl3232a</span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>PAN Attachment :</h6>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    {/* <i className="bi bi-file-earmark-pdf"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-pdf"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Submission Date :</h6>
                </td>
                <td>
                  {" "}
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Last Action Date :</h6>
                </td>
                <td>
                  {" "}
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6> Status:</h6>
                </td>
                <td>
                  <span>Reject</span>
                </td>
                <td>
                  {" "}
                  <button className="btn btn-success">Approve</button>
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "-20px" }}
                  >
                    Reject
                  </button>
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
          &nbsp;Adhar Details
        </p>

        <div>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <h6>Adhar No :</h6>
                </td>
                <td>
                  {" "}
                  <span>245462882088</span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Aadhaar Attachment :</h6>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    {/* <i className="bi bi-file-earmark-pdf"></i> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-pdf"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                      <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                    </svg>
                  </button>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Submission Date :</h6>
                </td>
                <td>
                  {" "}
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6>Last Action Date :</h6>
                </td>
                <td>
                  {" "}
                  <span>2023-03-23 </span>
                </td>
              </tr>

              <tr>
                <td>
                  <h6> Status:</h6>
                </td>
                <td>
                  <span>Reject</span>
                </td>
                <td>
                  {" "}
                  <button className="btn btn-success">Approve</button>
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "-20px" }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <div>
        <p
          style={{
            backgroundColor: "powderblue",
            fontWeight: "600",
            fontSize: "20px",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          &nbsp; Detail
        </p>
      </div>
      <div>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td>
                <h6>Remarks:</h6>
              </td>
              <td>
                {" "}
                <textarea rows={2} cols={25}></textarea>
              </td>
              <td>
                {" "}
                <button className="btn btn-success">Approve</button>
              </td>
              <td>
                {" "}
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                >
                  Reject
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "5px" }}
                >
                  On Hold
                </button>
              </td>
            </tr>

            <tr>
              <td>
                <h6>Created Date:</h6>
              </td>
              <td>
                {" "}
                <span>2023-03-03</span>
              </td>
            </tr>
            <tr>
              <td>
                <h6>Modified Date:</h6>
              </td>
              <td>
                {" "}
                <span>2023-03-03</span>
              </td>
            </tr>
            <tr>
              <td>
                <h6>Last Action:</h6>
              </td>
              <td>
                {" "}
                <span>Reject</span>
              </td>
            </tr>
            <tr>
              <td>
                <h6>Last Action Date:</h6>
              </td>
              <td>
                {" "}
                <span>2023-03-23</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

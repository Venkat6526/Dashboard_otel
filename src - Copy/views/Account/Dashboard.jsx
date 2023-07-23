import React, { useEffect, useState } from "react";
import "./design.css";

function Dashboard() {
  let [invoice, setData] = useState({});
  let [notification, setNotification] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://mindroit.net:7000");
    ws.addEventListener("open", () => {
      console.log(<p style={{ color: "black" }}>"We are connected"</p>);
      // ws.send("How are you?");
    });

    // ws.addEventListener('message', function (data) {
    //    let old_data=JSON.stringify(data);
    //    setOldNotifi(old_data);

    // // });
    // let fetchData1 = async () => {
    //   let response = await fetch(
    //     `https://mindroit.net:5000/get_notification_details`
    //   );
    //   let res = await response.json();
    //   console.log(res);
    //   setNotification(res.data);
    // };
    // fetchData1();
    let fetchData1 = async () => {
      let response = await fetch(
        `https://mindroit.net:5000/get_notification_details`
      );
      let res = await response.json();
      console.log(res);
      setNotification(res.data);
      // setNotification((prevArray) => [...prevArray, res.data]);
    };
    fetchData1();
    ws.onmessage = function (e) {
      
//       try{
 //alert(JSON.stringify(noti))
//       }catch(e){

//       }
      let fetchData1 = async () => {
    let response = await fetch(
      `https://mindroit.net:5000/get_notification_details`
    );
    let res = await response.json();
    console.log(res);
    setNotification(res.data);
    // setNotification((prevArray) => [...prevArray, res.data]);
  };
  fetchData1();
     

      
    };
    console.log(notification);

    let fetchData = async () => {
      let response = await fetch(
        `https://mindroit.net:5000/get_dashboard_details`
      );
      let res = await response.json();
      console.log(res);
      setData(res.data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <h4>Accounting Dashboard</h4>

      {
        <div className=" add d-flex">
          <div>
            <div className="d-flex">
              <div
                className="container ms-2 me-3 mt-4 ps-3 pe-3 pb-3 pt-2"
                style={{
                  width: "250px",
                  height: "140px",
                  fontFamily: "Georgia, serif",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "#FF4500",
                }}
              >
                <h6>INVOICE</h6>
                <p className="new">
                  Total : <span>{invoice.invoice_total}</span>{" "}
                </p>

                <p className="new">
                  Pending Approval :{" "}
                  <span>{invoice.invoice_total_pending}</span>
                </p>
              </div>
              <div
                className="container ms-2 me-3 mt-4 ps-3 pe-3 pb-3 pt-2"
                style={{
                  width: "250px",
                  height: "140px",
                  fontFamily: "Georgia, serif",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "#20c997",
                }}
              >
                <h6>INVOICE 2</h6>
                <p className="new">
                  Total : <span>{invoice.invoice2_total}</span>{" "}
                </p>

                <p className="new">
                  Pending Approval :{" "}
                  <span>{invoice.invoice2_total_pending}</span>
                </p>
              </div>
              <div
                className="container ms-2 me-3 mt-4 ps-3 pe-3 pb-3 pt-2"
                style={{
                  width: "250px",
                  height: "140px",
                  fontFamily: "Georgia, serif",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "#187da0",
                }}
              >
                <h6>QUOTATIONS</h6>

                <p className="new pt-4">
                  Total : <span>{invoice.quotation_total}</span>{" "}
                </p>
              </div>
            </div>
            <div className="d-flex">
              <div
                className="container ms-2 me-3 mt-4 ps-3 pe-3 pb-3 pt-2"
                style={{
                  width: "250px",
                  height: "140px",
                  fontFamily: "Georgia, serif",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "#2eadd3",
                }}
              >
                <h6>PURCHASE INVOICE</h6>
                <p className="new pt-4">
                  Total : <span>{invoice.purchase_invoice_total}</span>{" "}
                </p>
              </div>
              <div
                className="container ms-2 me-3 mt-4 ps-3 pe-3 pb-3 pt-2"
                style={{
                  width: "250px",
                  height: "140px",
                  fontFamily: "Georgia, serif",
                  borderRadius: "5px",
                  color: "white",
                  backgroundColor: "#28a745 ",
                }}
              >
                <h6>PERFORMA INVOICES</h6>
                <p className="new pt-4">
                  Total : <span>{invoice.performa_invoice_total}</span>{" "}
                </p>
              </div>
              <div
                className="container ms-2 me-3 mt-4  pe-3 ps-3 pb-3 pt-2 bg-danger"
                style={{
                  width: "250px",
                  height: "140px",
                  fontFamily: "Georgia, serif",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                <h6>PURCHASE ORDER</h6>
                <p className="new pt-4">
                  Total : <span>{invoice.purchase_order_total}</span>{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex">
              <div>
              <div
                className="container ms-2 mt-4 me-2 pt-3"
                style={{
                  width: "360px",
                  height: "60px",
                  border: "1px solid black",
                  borderRadius: "10px",
                  textAlign: "center",
                  color: "black",
                 
                }}
              >
                <h5 className="head text-align-center" style={{fontWeight:"bold"}}>Notification</h5>
                </div>
                <div className="new ms-2 mt-3 me-2 pt-3 ps-3 pe-3"
                style={{
                  width: "360px",
                
                  
                  border: "1px solid black",
                  borderRadius: "10px",
                  
                 
                }} >
                  
                <marquee behavior="scoll" direction="up" scrollAmount="2" style={{height:"250px",color:"	#000000"}}>
                 
                  {notification.map((data) => (
                    <p  style={{color:"	#000000",fontSize:"16px",fontWeight:"normal"}}>
                      <li style={{color:"#000000"}} >
                        {data.text}
                        <br />
                      </li>
                      </p>
                  ))
                  }
                </marquee>
                </div>
              </div>
              </div>
          </div>
        </div>
      }
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/web-socket-js/1.0.0/web_socket.min.js"
        integrity="sha512-jtr9/t8rtBf1Sv832XjG1kAtUECQCqFnTAJWccL8CSC82VGzkPPih8rjtOfiiRKgqLXpLA1H/uQ/nq2bkHGWTQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script>
      
    </div>
  );
}

export default Dashboard;

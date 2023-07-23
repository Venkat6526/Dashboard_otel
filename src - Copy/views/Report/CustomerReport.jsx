import React, { useEffect, useState } from "react";
import { getAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import $ from 'jquery'; 
import DataTable from 'datatables.net';


import url from "../config";
function get_list(){

$("#example").DataTable({
                  "processing": true,
        "serverSide": true,
        "bPaginate":true, // Pagination True
      "sPaginationType":"full_numbers", // And its type.
       "iDisplayLength": 10,
      "bDestroy": true,
        select: true,
       //Initial no order.
         "search": {
    "search": ''
  },
        "ajax": {
           
           url:url.server_url+"/get_product_time_gap_customer_report", 
   dataType:"JSON",
   type:"POST",
   //data:{from_date:from_date,to_date:to_date},
   
 
   
           
            "dataSrc": function (json1) {
          var return_data=new Array(); 
          var data=json1.data;
           var total_records=json1.recordsTotal
          var k=1;
          for(var i=0;i<data.length;i++){
            var id=data[i].id

            
             
              
        return_data.push({
              
          'id':k++,
          
          
         "customer_name":data[i].customer_name,
          "mobile_no":data[i].mobile_no,
           "product":data[i].product,
            "qty":data[i].qty,
            "created_on":data[i].created_on,
          
            
               
         

         
        
           "recordsTotal":11,
          
           "recordsFiltered":11,
          
        });
       }
    //$("#table11_filter").find("input").css({"width":"700px","margin-left":"-50%"});
       $("#example_filter").find("input").attr("placeholder","Customer Name");
      return return_data;
       },
       error:function(xhr){
        //alert(xhr.responseText);
       //alert(13)
       }
    
        } ,
        // "createdRow": function ( row, data, index ) {
         
        //         $('td',row).find(".credit").parent().parent().addClass('highlight');
            
        // },
         "columnDefs": [
        { 
            //"targets": [ 0,2,3,5], //first column / numbering column
            "orderable": false, //set not orderable
        },
        ],
        "columns": [
           { "data": "id" },
           
          
            { "data": "customer_name" },
             { "data": "mobile_no" },
              { "data": "product" },
               { "data": "qty" },
                 { "data": "created_on" },
           //  { "data": "product" },
                                     
                                     
                             
                                  
               
        ]
   
             });
}

export default function CustomerReport() {
  const [time, setTime] = useState([]);
  const [tab, setTab] = useState(1);
  const [masterReport, setMasterReport] = useState([]);
  const [productView, setProductView] = useState([]);

  const [get, setGet] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [show, setShow] = useState(false); // add product
  const close = () => setShow(false); //product model close
  const open = () => {
    setShow(true); // product model open
  };

  useEffect(() => {
    
    getAPI(apinames.GET_TIME_INTERVAL)
      .then((response) => {
        console.log(response.data, "data");
        let cust_data = response.data;
        const sortedData = cust_data.sort((a, b) => {
          if (a.customer_id < b.customer_id) {
            return -1;
          }
          if (a.customer_id > b.customer_id) {
            return 1;
          }
          if (a.customer_id === b.customer_id) {
            if (a.date < b.date) {
              return 1;
            }
            if (a.date > b.date) {
              return -1;
            }
          }
          return 0;
        });

        // filter out duplicates and select the latest date date for each customer_id
        const uniqueData = [];
        sortedData.forEach((item) => {
          const index = uniqueData.findIndex(
            (i) => i.customer_id === item.customer_id
          );
          if (index === -1) {
            uniqueData.push(item);
          } else {
            if (new Date(item.date) > new Date(uniqueData[index].date)) {
              uniqueData[index].date = item.date;
            }
          }
        });

        console.log(uniqueData, "qewkjl");
        // response.data
        // console.log(newData,'qewkjl;');
        setMasterReport(response.data);
        setTime(uniqueData);
      })
      .catch((error) => {
        console.log(error, "api error");
      });

    //------------------Bussiness
    HandleSubmit();

  }, []);

  //------------------------Function for Product VIEW ITEM

  const productItem = (item) => {


    let users = masterReport;
    users = users.filter((obj) => obj.customer_id == item.customer_id);
    // based on product id we need to sort date

    // filter out duplicates and select the latest date date for each customer_id
    const sortProduct = [];
    users.forEach((item) => {
      const index = sortProduct.findIndex(
        (i) => i.product_id === item.product_id
      );
      if (index === -1) {
        sortProduct.push(item);
      } else {
        if (new Date(item.date) > new Date(sortProduct[index].date)) {
          sortProduct[index].date = item.date;
        }
      }
    });


    console.log(sortProduct, "sortProduct");
    setProductView(sortProduct);
  };

  let HandleSubmit = () => {
    getAPI(`${apinames.GET_BUSSINESS_VOLUME}?from_date=${from}&to_date=${to}`)
      .then((response) => {
        console.log(response.data, "data");
        setGet(response.data);
      })
      .catch((error) => {
        console.log(error, "api error");
      });
  };

  return (
    <div>
      <Tabs
        defaultActiveKey={1}
        id="uncontrolled-tab-example"
        activeKey={tab}
        onSelect={(k) => {
          setTab(k);
        }}
      >
        <Tab eventKey={1} title="Bussiness Volume">
          <div>
            <label>From Date:</label>&nbsp; &nbsp;
            <input
              type="date"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
              }}
            />{" "}
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <label>To Date:</label>&nbsp; &nbsp;
            <input
              type="date"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              style={{ marginLeft: "20px" }}
              onClick={() => {
                HandleSubmit();
              }}
            >
              Submit
            </button>
          </div>
          <br />
          <br />
          <div>
            <table className="table table-borded">
              <thead style={{ backgroundColor: "aliceblue" }}>
                <tr>
                  <th>Sl No</th>
                  <th>Customer Name</th>
                  <th>Contact Number</th>
                  <th>Total Purchase(₹)</th>
                </tr>
              </thead>
              <tbody>
                {get != null &&
                  get.map((item, index) => (
                    <tr>
                      <>
                        <td>{index + 1}</td>
                        <td>{item.customer_name}</td>
                        <td>{item.mobile_no}</td>
                        <td>{item.total_amount}</td>
                      </>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Tab>

        <Tab eventKey={2} title="Time Interval">
          <div>
            <table className="table table-bordered">
              <thead style={{ backgroundColor: "aliceblue" }}>
                <tr>
                  <th>Sl No</th>
                  <th>Customer Name</th>
                  <th>Mobile No</th>
                  <th>Latest Purchase Date</th>
                  <th>Product</th>
                </tr>
              </thead>
              <tbody>
                {time.map((item, index) => (
                  <tr>
                    <>
                      <td>{index + 1}</td>
                      <td>{item.customer_name}</td>
                      <td>{item.mobile_no}</td>
                      <td>{new Date(item.date).toLocaleString().split(',')[0]}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            open();
                            productItem(item);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <Modal show={show} onHide={close}>
              <Modal.Header closeButton>
                <Modal.Title> Product View </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <table className="table table-bordered">
                    <thead style={{ backgroundColor: "aliceblue" }}>
                      <tr>
                        <th>Sl No</th>
                        <th>Product Name</th>
                        <th>QTY</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productView.map((item, index) => (
                        <tr>
                          <>
                            <td>{index + 1}</td>
                            <td>{item.product}</td>
                            <td>{item.qty}</td>
                            <td>{new Date(item.date).toLocaleString().split(",")[0]}</td>
                          </>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </Tab>
        
        <Tab eventKey={3} title="Product Time Gap">
        <div>
               
            </div>
             <div>
            <table className="table table-bordered" id="example">
              <thead style={{ backgroundColor: "aliceblue" }}>
                <tr>
                  <th>Sl No</th>
                  <th>Customer Name</th>
                  <th>Mobile No</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Latest Purchase Date</th>
                 
                </tr>
              </thead>
              <tbody>
            
              </tbody>
            </table>
           
          </div>

       
        </Tab>
      </Tabs>
    {
    get_list()
  }
    </div>
       
  );
}

import React from "react";
import "../Hotel Owner/pdf.css";
import Image from "../../assets/img/Image";

export default function Pdf() {
  return (
  
    <div>
      <h5 style={{textAlign:"center"}}>Tax Invoice</h5>
    <div className="main-cointainer" style={{ border: "3px solid black" }}>
      <div>
        <div className="delivery-bill">
          <div style={{ borderBottom: "1px solid black" }}>
            <div className="row">
              <div
                className="col-md-5"
                style={{ paddingRight: "0", borderRight: "1px solid black" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    // paddingBottom:"30px"
                  }}
                >
                  <div>
                    <img src={Image.IROLL} alt="iRoll" />
                  </div>
                  <div>
                    <h4>IOTEL INFOTECH PVT LTD</h4>
                    <p>
                      NO- 46,BVD UPADHYA 98, BDA LAYOUT, JP NAGAR 8TH PHASE
                      <br />
                      State Name : Karnataka, Code : 29
                      <br />
                      GSTIN/UIN: 29AAFCI3151G1ZN
                      <br />
                      Contact : 9606014021,9606014022
                      <br />
                      E-Mail : iotelinfotech@gmail.com
                    </p>
                    <br />
                  </div>
                </div>
              </div>

              <div className="col-md-7" style={{ paddingLeft: "0" }}>
                <table className="table table-border pdfRightTable ">
                  <tbody>
                    <tr>
                      <td>
                        Invoice No: <span>IO/23/April/994</span>
                      </td>

                      <td>
                        Dated: <span>03-03-2023</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Delivery Note: <span>blank</span>
                      </td>

                      <td>
                        Mode/Terms of Payments: <span>cash</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Buyers's Order No: <span>1234</span>
                      </td>

                      <td>
                        Dated: <span>04-04-2022</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Dispatch Doc No:
                        <span>767676</span>
                      </td>

                      <td>
                        Delivery Note Date:
                        <span>021-04-2022</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Dispatched Through:
                        <span>Blank</span>
                      </td>

                      <td>
                        Destination: <span>bangalore</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        Terms Of Delivery: <span>............</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>











          <div className="row">
            <div
              className="col-md-5"
              style={{ paddingRight: "0", borderRight: "1px solid black" }}
            >
              <div className="Buyer-info" style={{ paddingLeft: "5px" }}>
                <div>
                  <p>Billing Address</p>
                  <h6>SHREE RATHNAM RESTAURANT PVT LTD</h6>
                  <p>
                    NO.16/3,16/4, BILLANAKUNTE-POST NELAMANGALA-TALUK BANGALORE
                    PH-8660629064
                  </p>
                </div>
                <table style={{ width: "100px" }}>
                  <tbody>
                    <tr>
                      <td>GSTIN/UIN:</td>
                      <td>29AARCS5271P1Z9</td>
                    </tr>
                    <tr>
                      <td>State :</td>
                      <td>Karnataka</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-7">
              <div className="Buyer-info">
                <div>
                  <p>Delivery Address</p>
                  <h6>SHREE RATHNAM RESTAURANT PVT LTD</h6>
                  <p>
                    NO.16/3,16/4, BILLANAKUNTE-POST NELAMANGALA-TALUK BANGALORE
                    PH-8660629064
                  </p>
                </div>
                <table style={{ width: "100px" }}>
                  <tbody>
                    <tr>
                      <td>GSTIN/UIN:</td>
                      <td>29AARCS5271P1Z9</td>
                    </tr>
                    <tr>
                      <td>State :</td>
                      <td>Karnataka</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>





        </div>





        <div>
          <table className="table">
            <thead style={{ borderBottom: "2px solid black" }}>
              <tr>
                <th>Sl No</th>
                <th>Description of Goods</th>
                <th>HSN/SAC</th>
                <th style={{ textAlign: "right" }}>GST Rate</th>
                <th>Quantity</th>
                <th>Rate(₹)</th>
                <th style={{ width: "77px" }}>UOM</th>
                <th>Disc % </th>
                <th>Amount(₹)</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: "1px solid black" }}>
              <tr>
                <td>1</td>
                <td>
                  FOOD RAPER (CLING FILM)FOOD RAPER (CLING FILM)FOOD RAPER
                  (CLING FILM)FOOD RAPER (CLING FILM)
                </td>
                <td>39204300 </td>
                <td>18 %</td>
                <td>12 </td>
                <td>313.56</td>
                <td>ROLLS</td>
                <td>...</td>
                <td>2324.78</td>
              </tr>
              <tr>
                <td>2</td>
                <td>SILVER FOIL CONTAINER SIZE 450ML(1500PIECES)</td>
                <td>23124 </td>
                <td>18 %</td>
                <td>23124 </td>
                <td>242142.56</td>
                <td>ROLLS</td>
                <td>...</td>
                <td>2345624.78</td>
              </tr>
              <tr>
                <td>3</td>
                <td>W CUT CARRY BAG( SMALL)</td>
                <td>39204300 </td>
                <td>9 %</td>
                <td>12 </td>
                <td>313.56</td>
                <td>ROLLS</td>
                <td>...</td>
                <td>2324.78</td>
              </tr>
            </tbody>
          </table>
        </div>








        <div
          style={{
            borderBottom: "1px solid black",
          }}
        >


          <div className="row">
            <div className="col-md-7" style={{ paddingRight: "0px" }}>
              <div>
                <div className="row" style={{ marginLeft: "2px" }}>
                  <div className="col-md-6">
                    <h6>Company’s Bank Details</h6>
                    <table>
                      <tbody>
                        <tr>
                          <td>Bank Name :</td>
                          <td>
                            <b> ICICI BANK</b>
                          </td>
                        </tr>
                        <tr>
                          <td>A/C NO:</td>
                          <td>
                            <b>029605007476</b>
                          </td>
                        </tr>
                        <tr>
                          <td> IFS Code : </td>
                          <td>
                            <b> ICIC0000296</b>
                          </td>
                        </tr>
                        <tr>
                          <td>Branch : </td>
                          <td>
                            <b> RAJAJINAGAR</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="col-md-6"
                    style={{ borderLeft: "1px solid black" }}
                  >
                    <img
                      src={Image.SCANNER}
                      alt="scanner"
                      height={"150px"}
                      style={{
                        marginTop: "5px",
                        marginBottom: "5px",
                        marginLeft: "100px",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid black" }}>
                <div className="row" style={{ marginLeft: "2px" }}>
                  <div className="col-md-12">
                    <div>
                      {" "}
                      <p>
                        <u>Declaration:</u>
                        <br />
                        We declare that this invoice shows the actual price of
                        the goods described and that all particulars are true
                        and correct.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: "1px solid black" }}>
                <div className="row" style={{ marginLeft: "2px" }}>
                  <div className="col-md-12">
                    <div>
                      <h5>
                        <small>
                          Amount (in words) :{" "}
                          <td style={{ float: "right" }}>E. & O.E</td>
                          <br />
                        </small>{" "}
                        ₹ Nine Thousand Eight Hundred Ninety Eight and Fifty Six
                        paise Only
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 pdfTotalAmount" style={{ padding: "0px" }}>
              <table className="table table-boderless">
                <tbody>
                  <tr>
                    <td>
                      <h6>Sub Total (₹):</h6>
                    </td>
                    <td style={{ textAlign: "right" }}>59000.72</td>
                  </tr>

                  <tr>
                    <td>
                      <h6>CGST(₹):</h6>
                    </td>
                    <td style={{ textAlign: "right" }}>100.00</td>
                  </tr>

                  <tr>
                    <td>
                      <h6>SGST(₹):</h6>
                    </td>
                    <td style={{ textAlign: "right" }}>120.00</td>
                  </tr>

                  <tr>
                    <td>
                      <h6>IGST(₹):</h6>
                    </td>
                    <td style={{ textAlign: "right" }}>100.00</td>
                  </tr>

              

                  <tr>
                    <td>
                      <h6>Total(₹):</h6>









                    </td>
                    <td style={{ textAlign: "right" }}>68,8999.28</td>
                  </tr>

                  <tr>
                    <td>
                      <h6>Round Off:</h6>
                    </td>
                    <td style={{ textAlign: "right" }}>-0.28</td>
                  </tr>

                  <tr>
                    <td>
                      <h6>Grand Total(₹):</h6>
                    </td>
                    <h5 style={{ textAlign: "right" }}>68,8999.00</h5>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>













        <div style={{borderBottom:"1px solid #111"}}>
        <div className="row" >
          <div className="col-md-4"><h6>Terms and Conditions</h6></div>
          <div className="col-md-8">
          <table className="table">
            <tbody>
              <tr>
                <td colSpan="4" rowSpan="2" style={{ textAlign: "end" }}>
                  Taxable Value
                </td>
                <td colSpan="2">CGST</td>
                <td colSpan="2">SGST</td>
                <td colSpan="2">IGST </td>
                <td rowSpan="2">
                  Total (₹) <br />
                  Tax Amount
                </td>
              </tr>
              <tr>
                <td>Rate(%)</td>
                <td>Amount(₹)</td>
                <td>Rate(%)</td>
                <td>Amount(₹)</td>
                <td>Rate(%)</td>
                <td>Amount(₹)</td>
                
              </tr>
              <tr>
                <td colSpan="4"></td>
                <td>9%</td>
                <td>4227.72</td>
                <td>9%</td>
                <td>4227.72</td>
                <td>18%</td>
                <td>1450</td>
                
                <td>8,455.44</td>
              </tr>
              <tr>
                <td colSpan="4"></td>
                <td>6%</td>
                <td>721.56</td>
                <td>6%</td>
                <td>721.56</td>
                <td>12%</td>
                <td>1450</td>
                
                <td>1443.12</td>
              </tr>
              {/* <tr>
                <td colSpan="4"></td>
                <td>18%</td>
                <td>721.56</td>
                <td>18%</td>
                <td>721.56</td>
                
              </tr> */}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="4">Total(₹)</th>









                <th colSpan="2" className="text-center">4,949.28</th>
                <th colSpan="2"  className="text-center">4,949.28</th>
                <th colSpan="2"></th>
                <th>9,898.56</th>
              </tr>
            </tfoot>
          </table>
          </div>
        </div>
        </div>




        
        <div>
          <div>
            <div className="row" style={{ marginLeft: "2px" }}>
              <div className="col-md-6">
                <p>Customer’s Seal and Signature</p>
              </div>
              <div
                className="col-md-6"
                style={{ borderLeft: "1px solid black", textAlign: "right" }}
              >
                <h6 style={{ textAlign: "center" }}>
                  for IOTEL INFOTECH PVT LTD
                </h6>
                <br /><br /><br />
                <p style={{ marginTop: "20px", textAlign: "center" }}>
                  Authorised Signatory
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

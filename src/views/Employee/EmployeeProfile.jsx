// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Tabs, Tab, Row, Button, Col, Container } from "react-bootstrap";


// export default function EmployeeProfile() {
//   const [currentTab, setCurrentTab] = useState(0);
//   return (
//     <div style={{ backgroundColour: "blue" }}>
//       <Container>
//         <Row>
//           <Col>
//             <Tabs
//               className="myClass"
//               activeKey={currentTab}
//               id="noanim-tab-example"
//               style={{backgroundColor:"lightblue"}}
              

//             >
//               <Tab
//                 eventKey={0}
//                 title="Home"
                

//                 disabled={currentTab !== 0}
//               >
//                 <br /> <br />
//                 <table>
//                   <tr>
//                     <td>
//                       <input type="checkbox" />
//                       Name
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <input type="checkbox" />
//                       Mobile
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <input type="checkbox" /> Email
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <input type="checkbox" />
//                       Address 1
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <input type="checkbox" />
//                       Address 2
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   </tr>
//                 </table>
//               </Tab>

//               <Tab eventKey={1} title="Profile" disabled={currentTab !== 1}>
//                 <br /> <br />
//                 <table>
//                   <tr>
//                     <td>
//                       <input type="text" />
//                       Rent
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <input type="text" />
//                       House
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <input type="text" /> Pg
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <input type="text" />
//                       Hostel{" "}
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <input type="text" />
//                       Villa
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   </tr>
//                 </table>
//               </Tab>
//               <Tab eventKey={2} title="Contacts" disabled={currentTab !== 2}>
//                 <br /> <br />
//                 <table>
//                   <tr>
//                     <td>
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Fugit maiores nobis minima maxime dolor ipsa veniam
//                         velit nostrum earum vel perspiciatis corrupti corporis
//                         deserunt omnis, quia non iste. At, vel.
//                       </p>
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Fugit maiores nobis minima maxime dolor ipsa veniam
//                         velit nostrum earum vel perspiciatis corrupti corporis
//                         deserunt omnis, quia non iste. At, vel.
//                       </p>
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Fugit maiores nobis minima maxime dolor ipsa veniam
//                         velit nostrum earum vel perspiciatis corrupti corporis
//                         deserunt omnis, quia non iste. At, vel.
//                       </p>
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Fugit maiores nobis minima maxime dolor ipsa veniam
//                         velit nostrum earum vel perspiciatis corrupti corporis
//                         deserunt omnis, quia non iste. At, vel.
//                       </p>
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                     <td>
//                       <p>
//                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                         Fugit maiores nobis minima maxime dolor ipsa veniam
//                         velit nostrum earum vel perspiciatis corrupti corporis
//                         deserunt omnis, quia non iste. At, vel.
//                       </p>
//                     </td>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   </tr>{" "}
//                 </table>
//                 <br />
//                 <Button
//                   className="success"
//                   disabled={currentTab === 3}
//                   // onClick={() => setCurrentTab((prev) => prev - 1)}
//                   style={{ float: "right",marginTop:"25px" }}
//                 >
//                   Save
//                 </Button>
//               </Tab>
//             </Tabs>
//           </Col>
//         </Row>
//         <br/>
//         {/* <Stack gap={3} direction="horizontal" className="mt-3"> */}
//           <Button
//             className="success"
//             disabled={currentTab === 0}
//             onClick={() => setCurrentTab((prev) => prev - 1)}
//         style={{marginLeft:"20px"}}



//           >
//             Prev
//           </Button>
//           <Button
//             className="success"
//             disabled={currentTab === 2}
//             onClick={() => setCurrentTab((prev) => prev + 1)} style={{marginLeft:"20px"}}
//           >
//             Next
//           </Button>
//         {/* </Stack> */}
//       </Container>
//     </div>
//   );
// }


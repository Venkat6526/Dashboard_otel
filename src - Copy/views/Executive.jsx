import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useForm } from "react-hook-form";

export default function Executive() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const add = [
    {
      sl: 1,
      Registration_Date: "22/07/1997",
      sname: "tom",

      mobile: 67392638798,
      role: "cook",
      action: "",
    },
    {
      sl: 2,
      Registration_Date: "08/08/1998",
      sname: "jerry",
      mobile: 89092638798,
      role: "driver",
      action: "",
    },
    {
      sl: 3,
      Registration_Date: "09/09/1999",
      sname: "vijay",
      mobile: 9082638798,
      role: "vendor",
      action: "",
    },
    {
      sl: 4,
      Registration_Date: "22/02/2002",
      sname: "arvind",
      mobile: 7542638798,
      role: "sales",
      action: "",
    },
    {
      sl: 5,
      Registration_Date: "23/03/2003",
      sname: "varun",
      mobile: 98882638798,
      role: "desk",
      action: "",
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Add Sales Executive">
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <table>
              <tr>
                <td>Name:</td>
                <td>
                  {" "}
                  <input
                    type="name"
                    {...register("Name", { pattern: /^[A-Za-z]+$/i })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.Name && <span>Name field is required</span>}
                </td>
              </tr>
              <tr>
                <td>Mobile No:</td>
                <td>
                  {" "}
                  <input
                    type="number"
                    {...register("mobile", { maxLength: "10" })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.mobile && <span>10 digit is required</span>}
                </td>
              </tr>
              <tr>
                <td>Designation: </td>
                <td>
                  {" "}
                  <select>
                    <option value="sales executive">Sales Executive</option>
                    <option value="Delivery executive">
                      Delivery Executive
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  {" "}
                  <input
                    type="password"
                    {...register("password", {
                      pattern: /^[A-Za-z]+$/i,
                      maxLength: "12",
                      minLength: "6",
                    })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.password && (
                    <span>minium 6 to maximum 12 is required</span>
                  )}
                </td>
              </tr>
              <tr>
                <td>Confirm Password:</td>
                <td>
                  {" "}
                  <input
                    type="password"
                    {...register("password", {
                      pattern: /^[A-Za-z]+$/i,
                      maxLength: "12",
                      minLength: "6",
                    })}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.password && (
                    <span>minium 6 to maximum 12 is required</span>
                  )}
                </td>
              </tr>
              {/* <button type="submit" >Submit</button> */}
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </table>
          </form>
        </Tab>

        <Tab eventKey="view Sales Executive" title="View Sales Executive">
          <div>
            <table id="table" className="table">
              <thead style={{ background: "lightsteelblue" }}>
                <tr>
                  <th>Sl No</th>
                  <th>Registration Date</th>
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {add.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.Registration_Date}</td>

                    <td>{item.sname}</td>
                    <td>{item.mobile}</td>
                    <td>{item.role}</td>
                    <td>
                      {item.action}
                      <button type="button" class="btn btn-primary">
                        EDIT
                      </button>
                      <button type="button" class="btn btn-primary">
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tab>
      </Tabs>
    </div>
    //
  );
}

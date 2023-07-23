import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import url from "../../config.js";
import Filter from "../../../components/Filter"

export default function CompanyExpenses() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [add, setAdd] = useState([]);
  const [api, setApi] = useState([]);

  useEffect(() => {
   var request =null;
    axios.get(url.server_url + "/get_save_expenses", request).then((data) => {
      console.log(data.data.data ,"no datA");
      let reversedData=data.data.data.slice().reverse()
      setAdd(reversedData);
      setApi(data.data.data)
      var status_code = data.data.status_code;
      if (status_code == 200) {
      }
    });
  }, []);
  const handledelete = (id) => {
    if (window.confirm("are you sure to delete the data")) {
      window.location.reload();
      axios
        .delete(url.server_url + `/delete_save_expenses/${id}`)
        .then((data) => {
          var status_code = data.data.status_code;
          if (status_code == 200) {
          
          }
        });
    }
  };
//-----------filter
  const handleDataUpdate = (filteredData) => {
    setAdd(filteredData);
  };
  return (
    <div className="main-container">
      <div className="button">
        <Link
          to="/AddExpenses"
          className="btn btn-primary"
          style={{ float: "right" }}
        >
          Add Expenses
        </Link>
      </div>
      <br />
      <br />
      <br />
      <div className="search-input" >
      <Filter
                  api={api}
                  onUpdateData={handleDataUpdate}
                  className='form-control'
                  
                  placeholder="  Search Description"
                  name={"description"}
                  name2={"description"}
                  
                 
                />
  
      </div>

      <br />
      <div className="table">
        <table>
          <thead>
            <tr style={{ backgroundColor: " aliceblue" }} s>
              <th>Sl No</th>
              <th>Date </th>
              <th>Description</th>
              <th>Amount (Rs)</th>
              <th>Pay Mode</th>
              <th>Transaction</th>
              <th>Remark</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchInput.length > 0
              ? filteredResults.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                    <td>{item.pay_mode}</td>
                    <td>{item.transction_no}</td>
                    <td>{item.remarks}</td>
                    <td>
                      <Link
                        to={`/EditExpenses/${item.id}`}
                        className="btn btn-primary"
                      >
                        <button type="button " className="btn btn-primary">
                          Edit
                        </button>
                      </Link>
                      <button
                        type="button "
                        className="btn btn-danger"
                        style={{ marginLeft: "20px" }}
                        onClick={() => handledelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : add.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.date}</td>
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                      <td>{item.pay_mode}</td>
                      <td>{item.transction_no}</td>
                    <td>{item.remarks}</td>
                      <td>
                        <Link
                        to={{
                          pathname: '/EditExpenses',
                          search: '?sort=name',
                          hash: '#the-hash',
                          state:item
                         }}
                        
                   
                          // to={`/EditExpenses`}
                          // state= { fromDashboard: true }
                          className="btn btn-primary"
                        >
                          Edit
                        </Link>
                        <button
                          type="button "
                          className="btn btn-danger"
                          style={{ marginLeft: "20px" }}
                          onClick={() => handledelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

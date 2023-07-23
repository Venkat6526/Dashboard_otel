import React from "react";
import { useState, useEffect } from "react";
import { getAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
export default function ProductProfitLoss() {
  const [get, setGet] = useState([]);
  useEffect(() => {
    getAPI(apinames.GET_PROFIT_LOSS)
      .then((response) => {
        setGet(response.data);
      })
      .catch((e) => {
        console.log(e, "error");
      });
  }, []);
  return (
    <div>
      <div>
        <table
          className="table tabled-bordered"
        >
          <thead  style={{ backgroundColor: "aliceblue" }}>
            <tr>
              <th>Sl No</th>
              <th>Product Name</th>
              <th>Specification</th>
              <th>Avg Buying Cost</th>
              <th>Avg Selling Cost</th>
              <th>Profit/Loss</th>
              <th>(P/L)%</th>
            </tr>
          </thead>
          <tbody>
            {get.map((item, index) => (
              <tr>
                <>
                  <td>{index + 1}</td>
                  <td>{item.product}</td>
                  <td>{item.specification}</td>
                  <td>{item.buying_cost}</td>
                  <td>{item.selling_cost}</td>
                  <td>{item.balance}</td>
                  <td>{item.balance_percentage}</td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

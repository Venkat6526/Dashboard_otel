import React, { useState } from "react";


export default function ProductView() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [totalQty, setTotalQty] = useState(0);
  const [totalcost, setTotalCost] = useState(0);

  const [add, setAdd] = useState([
    {
      product: "T-SHIRT",
      image:
        "https://cdn.pixabay.com/photo/2017/07/28/14/29/macarons-2548827__340.jpg",
      mrp: "500",
      discount: "15%",
      sale_price: "425",
      qty: 0,
    },
    {
      product: "HAT",
      image: "",
      mrp: "250",
      discount: "10%",
      sale_price: "225",
      qty: 0,
    },
    {
      product: "SHIRT",
      image: "",
      mrp: "700",
      discount: "20%",
      sale_price: "530",
      qty: 0,
    },
    {
      product: "TRACK PANT",
      image: "",
      mrp: "1200",
      discount: "5%",
      sale_price: "1140",
      qty: 0,
    },
    {
      product: "JACKET",
      image: "",
      mrp: "2000",
      discount: "30%",
      sale_price: "1400",
      qty: 0,
    },
  ]);

  // total qty to calculate
  const updateQty = (data, i) => {
    let prdData = [...add];
    prdData[i]["qty"] = data;
    setAdd(prdData);
    getSum();
  };
  // total qty
  const getSum = () => {
    const sum = add.reduce(
      (prev, curr) => parseInt(prev) + parseInt(curr.qty),
      0
    );
    setTotalQty(sum);
    gettotal();
  };
  // total cost
  const gettotal = () => {
    const totalcost = add.reduce(
      (prev, curr) =>
        parseInt(prev) + parseInt(curr.qty) * parseInt(curr.sale_price),
      0
    );
    setTotalCost(totalcost);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = add.filter((item) => {
        return item.product.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(add);
    }
  };
  return (
    <div>
      <div className="filter-bar">
        <input
          type=" text "
          placeholder="Search....."
          onChange={(e) => searchItems(e.target.value)}
        />
      </div>
      <br />
      <div className="table">
        <table>
          <thead>
            <tr style={{ backgroundColor: "aliceblue" }}>
              <th>SL NO</th>
              <th>Product</th>
              <th>Image</th>
              <th>MRP (Rs)</th>
              <th>Discount %</th>
              <th>Sale Price (Rs)</th>
              <th>Quantity (No)</th>
              <th>Total Cost</th>{" "}
            </tr>
          </thead>
          <tbody>
            {searchInput.length > 0
              ? filteredResults.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.product}</td>

                      <img
                        src={item.image}
                        alt="new"
                        height={"50px"}
                        width={"50px"}
                      />

                      <td>{item.mrp}</td>
                      <td>{item.discount}</td>
                      <td>{item.sale_price}</td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          style={{ width: "50px" }}
                          onChange={(e) => updateQty(e.target.value, index)}
                        />
                      </td>
                      <td>{item.sale_price * item.qty}</td>
                    </tr>
                  );
                })
              : add.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.product}</td>
                      <img
                        src={item.image}
                        alt="new"
                        height={"50px"}
                        width={"50px"}
                      />
                      <td>{item.mrp}</td>
                      <td>{item.discount}</td>
                      <td>{item.sale_price}</td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          style={{ width: "50px" }}
                          onChange={(e) => updateQty(e.target.value, index)}
                        />
                      </td>
                      <td>{item.sale_price * item.qty}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <div>
        <p>Total QTY: {totalQty}</p>
        <p>Total Cost: {totalcost}</p>
        <label> Pay Mode:</label>&nbsp;&nbsp;&nbsp;
        <select>
          <option value="select">Select Value</option>
          <option value="">Cash Mode</option>
          <option value="">Credite Card</option>
          <option value="">Debit Card</option>
        </select>
      </div>
    </div>
  );
}

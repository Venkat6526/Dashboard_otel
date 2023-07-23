import React, { useState, useEffect } from "react";
import "../../components/AutoComplete/reactselect/reactselect.css";
import axios from "axios";
import Select from "react-select";
import url from "../../views/config";
import { getAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import { Link } from "react-router-dom";

function Stocks() {
  const [productData, setProductData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productGet, setProductGet] = useState([]);

  const SupplierStocks = (id) => {
    getAPI(apinames.GET_STOCKS_DETAILS + id)
      .then((response) => {
        console.log(response.data, "stocks details");

        setProductData(response.data);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  useEffect(() => {
    getAPI(apinames.GET_PRODUCT_MASTER).then((response) => {
      let dataStored = response.data;
      console.log(dataStored, "dataStored");
      setProductGet(dataStored);
    });
  }, []);

  const handleProductSelect = (selectedOption) => {
    console.log(selectedOption, "selectedOption");
    SupplierStocks(selectedOption.value);
    setSelectedProduct(selectedOption);
  };

  return (
    <div>
      <div>
        <h2>Product Quantity</h2>
        <Select
          options={productGet.map((product, index) => ({
            // sl_no: index + 1,
            value: product.id,
            label: product.product_name,
          }))}
          // options={productGet}
          value={selectedProduct}
          onChange={handleProductSelect}
          placeholder="Select a product"
        />
        <button type="button" className="btn btn-primary"  style={{ float: "Right", marginTop: "-42px", marginRight: "500px" }}>Export</button>
        <Link to={{ pathname: "/CarryStocks" }}>
          <button
            className="btn btn-primary"
            style={{ float: "Right", marginTop: "-42px" }}
          >
            Carry Forward Stocks
          </button>
        </Link>
        <Link to={{ pathname: "/AllStocks" }}>
          <button
            className="btn btn-primary"
            style={{ float: "Right", marginTop: "-42px", marginRight: "352px" }}
          >
            All Stocks
          </button>
        </Link>
        <br />
        <br />
      </div>
      <div>
        <table className="table">
          <thead style={{ background: "green", color: "white" }}>
            <tr>
              <th>Sl No</th>
              <th>Supplier Name</th>
              <th>Inward (QTY)</th>
              <th> Outward (QTY)</th>
              <th> Balance (QTY)</th>
            </tr>
          </thead>

          {productData.map((item, index) => (
            <>
              <tr>
                <td>{index + 1}</td>
                <td>{item.supplier_name}</td>
                <td>{item.inward}</td>
                <td>{item.outward}</td>
                <td>{item.stock_balance}</td>
                <td></td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Stocks;

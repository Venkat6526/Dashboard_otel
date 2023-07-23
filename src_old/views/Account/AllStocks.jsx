import React, { useEffect, useState } from "react";
import { getAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import Filter from "../../components/Filter";


export default function AllStocks() {
  const [get, setGet] = useState([]);
  const [api, setApi] = useState([]);

  useEffect(() => {
    getAPI(apinames.GET_ALL_STOCKS)
      .then((response) => {
        console.log(response.data,"get");
        setGet(response.data);
        setApi(response.data);
      })
      .catch((error) => {
        console.log(error + "error");
      });
  }, []);
//-----------------Filter
const HandleFilter = (filteredData) => {
    setGet(filteredData);
  };
  return <div>
    <div style={{float:"right"}}>
       
    <Filter
              api={api}
              onUpdateData={HandleFilter}
              placeholder="search product Name and supplier name"
              name="supplier_name"
              name2="product_name"
            />

    </div>
    <br /><br />
    <div>
        <table className="table table-bordered">
            <thead style={{ backgroundColor: "aliceblue" }}>
                <tr>
                    <th>Sl No</th>
                    <th>Product Name</th>
                    <th>Supplier Name</th>
                    <th>Inward Quantity</th>
                    <th>Outward Quantity</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                {get.map((item,index)=>(
                    <tr>
                        <>
                        <td>{index+1}</td>
                        <td>{item.product_name}</td>
                        <td>{item.supplier_name}</td>
                        <td>{item.inward}</td>
                        <td>{item.outward}</td>
                        <td>{item.stock_balance}</td>
                        </>
                    </tr>
                ))}
            </tbody>

        </table>
    </div>
  </div>;
}


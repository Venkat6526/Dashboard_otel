import React, { useEffect, useState } from "react";
import { getAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";
import DataTable from "react-data-table-component";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Filter from "../../components/Filter";

export default function OutstandingReport() {
  const [customerGet, setCustomerGet] = useState([]);
  const [supplierGet, setSupplierGet] = useState([]);
  const [apiCustomer, setApiCustomer] = useState([]);
  const [apiSupplier, setApiSupplier] = useState([]);
  const [key, setKey] = useState(1);

  useEffect(() => {
    getAPI(apinames.GET_CUSTOMER_MASTER).then((response) => {
      console.log(response.data, "data");
      let reversedData = response.data.slice().reverse();
      let filteredData = reversedData.filter((item) => item.balance > 0);
      setCustomerGet(filteredData);
      setApiCustomer(filteredData);
    });
      getAPI(apinames.GET_SUPPLIER_MASTER).then((response) => {
        console.log(response.data, "data");
        let reversedData = response.data.slice().reverse();
        let filteredData = reversedData.filter((item) => item.balance > 0);
        setSupplierGet(filteredData);
        setApiSupplier(filteredData)
      });
  }, []);

// filter Customer 

 const HandleFilterCustomer = (filteredData) => {
    setCustomerGet(filteredData);
  };
  const HandleFilterSupplier = (filteredData) => {
    setSupplierGet(filteredData);
  }




  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "aliceblue",
        textTransform: "uppercase",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  // customer outstanding report
  const columns = [
    {
      name: "SL NO",
      selector: (row,index) => index+1,
      width:"100px"
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
    },
    {
      name: "Credit",
      selector: (row) => row.credit,
    },
    {
      name: " Debit",
      selector: (row) => row.debit,
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
    },
  ];

  const columns1 = [
    {
      name: "SL NO",
      selector: (row,index) =>  index+1,
      width:"100px"
    },
    {
      name: "Supplier Name",
      selector: (row) => row.supplier_name,
    },
    {
      name: "Credit",
      selector: (row) => row.credit,
    },
    {
      name: " Debit",
      selector: (row) => row.debit,
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
    },
  ];


  return (
    <div>
    
        <Tabs
           defaultActiveKey={1}
           id="uncontrolled-tab-example"
           activeKey={key}
           onSelect={(k) => {
             setKey(k);
           }}
        >
    
          <Tab    eventKey={1} title="Customer Outstanding Report">
            <DataTable
              columns={columns}
              data={customerGet}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="450px"
              // selectableRows
              // selectRowsHighlight
              highlightOnHover
              actions={<button className="btn btn-primary">Export</button>}
              subHeader
                subHeaderComponent={
                    <Filter
                    api={apiCustomer}
                    placeholder="Search Customer Name"
                    onUpdateData={HandleFilterCustomer}
                    name="customer_name"
                    name2="customer_name"
                  />
                }
              customStyles={customStyles}
            />
          </Tab>
          <Tab  eventKey={2} title="Supplier Outstanding report">
            <DataTable
              columns={columns1}
              data={supplierGet}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="450px"
              // selectableRows
              // selectRowsHighlight
              highlightOnHover
              actions={<button className="btn btn-primary">Export</button>}
              subHeader
                subHeaderComponent={
                    <Filter
                    api={apiSupplier}
                    placeholder="Search Supplier Name"
                    onUpdateData={HandleFilterSupplier}
                    name="supplier_name"
                    name2="supplier_name"
                  />
                }
              customStyles={customStyles}
            />
          </Tab>
        </Tabs>
    
    </div>
  );
}

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import url from "../../views/config";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { getAPI, postAPI } from "../../apiServices/AxiousFetch";
import apinames from "../../apiServices/ApiConstant";

export default function SupplierLedger() {
  const [get, setGet] = useState([]);
  const [api, setApi] = useState([]); //filter
  const [getting, setGetting] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [idView, setIdView] = useState(0);

  const {
    register: register,
    setValue,
    formState: { errors: errors },
    handleSubmit: handleSubmit,
  } = useForm({
    mode: "onchange",
  });
  useEffect(() => {
    getAPI(apinames.GET_SUPPLIER_MASTER).then((response) => {
      console.log(response.data, "supplier ");
      let reversedData = response.data.slice().reverse();
      setGet(reversedData); // to reverse data
      setApi(response.data);
    });
  }, []);

  const onSubmit = (data) => {
    const pData = {
      id: idView,
      from_date: data.fromDate,
      to_date: data.toDate,
    };
    console.log(pData, "pDATA");
    postAPI(apinames.POST_SUPPLIER_LEDGER_DATE, pData).then((response) => {
      var status_code = response.status_code;
      if (status_code === 200) {
        let cl_balance = 0;
        const newData = response.data.map((ele, i) => ({
          ...ele,
          cl_balance:
            parseFloat(cl_balance) +
            parseFloat(ele.grand_total) -
            parseFloat(ele.amount),
        }));
        setGetting(newData);
        
      }
    });
  };

  const getHandle = (id) => {
    setGetting([]); // it will reset to zero if not wrote on top

    getAPI(apinames.GET_SUPPLIER_LEDGER + id).then((response) => {
      console.log(response.data, "supplier view getting");

      let cl_balance = 0;
      let newArray = response.data.map((ele, i) => {
        console.log(ele.amount + "" + ele.grand_total);
        cl_balance =
          parseFloat(cl_balance) +
          parseFloat(ele.amount) -
          parseFloat(ele.grand_total);
        console.log(cl_balance, "cl_balance");

        return { ...ele, cl_balance: cl_balance };
      });

      console.log(newArray, "newArray");
      setGetting(newArray);
   
    });
  };

  // filter
  const searchItems = (searchValue) => {
    // setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = get.filter((item) => {
        return item.supplier_name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setGet(filteredData);
    } else {
      setGet(api);
    }
  };

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
  const columns = [
    {
      name: "SL NO",
      selector: (row) => row.id,
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

    {
      name: "Action",
      selector: (row) => row.Action,
      cell: (row) => (
        <>
          <button
            className="btn btn-info"
            onClick={() => {
              setLgShow(true);
              getHandle(row.id);
              setIdView(row.id)
            }}
          >
            Transfer
          </button>
        </>
      ),
    },
  ];
  const columns1 = [
    {
      name: "SL NO",
      selector: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Payment Description",
      selector: (row) => row.payment_description,
    },
    {
      name: " Credit",
      selector: (row) => row.amount,
    },
    {
      name: " Debit",
      selector: (row) => row.grand_total,
    },
    {
      name: "Closing  Balance",
      selector: (row) => row.cl_balance,
    },
  ];

  return (
    <div>
      <div>
        <DataTable
          columns={columns}
          data={get}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          // selectableRows
          // selectRowsHighlight
          highlightOnHover
          actions={<button className="btn btn-primary">Export</button>}
          subHeader
          subHeaderComponent={
            <input
              type="serach"
              placeholder="Search Supplier Name"
              className="w-25 form-content"
              onChange={(e) => searchItems(e.target.value)}
            />
          }
          customStyles={customStyles}
        />
      </div>
      <div>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Transaction History
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <form key={1} onSubmit={handleSubmit(onSubmit)}>
                  <table>
                    <tr>
                      <td>From:</td>
                      <td>
                        <input type="date" {...register("fromDate")} />
                        <span className="text-danger">
                          {errors.fromDate && errors.fromDate.message}
                        </span>{" "}
                      </td>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <td>To:</td>
                      <td>
                        <input type="date" {...register("toDate")} />
                        <span className="text-danger">
                          {errors.toDate && errors.toDate.message}
                        </span>{" "}
                      </td>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <td>
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </td>
                    </tr>
                  </table>
                </form>
              </div>
            </div>
            <div>
              <DataTable
                columns={columns1}
                data={getting}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="450px"
                // selectableRows
                // selectRowsHighlight
                highlightOnHover
                actions={<button className="btn btn-primary">Export</button>}
                subHeader
              />{" "}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

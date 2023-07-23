import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "../../config.js";
import { useLocation } from "react-router-dom";
import moment from "moment";



export default function EditExpenses() {
  const [modify, setModify] = useState([]); // put method to display

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",

  });
  const values = watch();

  const location = useLocation();
  const itemData = location.state;

  useEffect(() => {
    displayEdit();
  }, []);
  const displayEdit = () => {
    setValue("Date", moment(itemData.date).toISOString().slice(0,10));
    // setValue("date", itemData.date);
    setValue("Description", itemData.description);
    setValue("Amount", itemData.amount);
    setValue("pay_mode", itemData.pay_mode);
    setValue("Transaction", itemData.transction_no);
    setValue("remarks", itemData.remarks);
  };
  const onSubmit = (data) => {
    const article = {
      date: data.Date,
      description: data.Description,
      amount: data.Amount,
      pay_mode: data.pay_mode,
      transaction_no: data.transaction,
      remarks: data.remark,
 
    };
    console.log(data,"data");
    axios
      .put(url.server_url + "/modify_save_expenses", article)
      .then((data) => {
        console.log(data,"data1");
        var status_code = data.data.status_code;
        alert("sucessful");
        if (status_code == 200) {
          alert("sucessful");
        }
      });
  };

  return (
    <div className="table">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: "10px",
          margin: "20px",
        }}
      >
        <table>
          <tbody>

          <tr>
            <td>
        <label>Date:</label>
        </td>
        <td>
        <input
          type="date"
          value={values.Date}
          onChange={(e) => {
            setValue("Date", e.target.value);
          }}
          // {...register("Date")}
        />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.Date && errors.Date.message}
        </span></td></tr>
        <tr>
          <td>
        <label>Description:</label>
        </td><td>
        <input
          type="text"
          value={values.Description}
          // {...register("Description")}
          onChange={(e) => {
            setValue("Description", e.target.value);
          }}
        />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.Description && errors.Description.message}
        </span></td></tr>
        <tr><td>
        <label>Amount (Rs):</label>
        </td><td>
        <input
          type="number"
          value={values.Amount}
          // {...register("Amount")}
          onChange={(e) => {
            setValue("Amount", e.target.value);
          }}
        />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errors.Amount && errors.Amount.message}
        </span></td></tr>
        <tr><td>
        <label>Payment Mode:</label>
        </td><td>
        <select
          value={values.pay_mode}
          // {...register("pay_mode")}
          onChange={(e) =>
            setValue("pay_mode", e.target.value, { shouldValidate: true })
          }
        >
          <option value={"select"}>Select on option</option>
          <option value={"cash"}>Cash</option>
          <option value={"online transfer"}>online Transfer</option>
          <option value={"cheque"}>Cheque/DD</option>
          <option value={"upi"}>UPI</option>
        </select>
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.pay_mode && errors.pay_mode.message}
        </span> </td></tr>
          <tr><td>
        <label>Transaction No:</label>
       </td><td>
        <input
          type="text"
          minLength={10}
          maxLength={10}
          value={values.Transaction}
          // {...register("Transaction")}
          onChange={(e) => {
            setValue("Transaction", e.target.value);
          }}
        />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.Transaction && errors.Transaction.message}
        </span></td></tr>
        <tr><td>
        <label>Remarks:</label>
        </td><td>
        <textarea
          name=""
          id=""
          cols=""
          rows="03"
          value={values.remarks}
          // {...register("remark")}
          onChange={(e) => {
            setValue("remarks", e.target.value);
          }}
        ></textarea></td></tr>
         
       
        <button type="submit" className="btn btn-primary" style={{float:"center"}}>
          Save
        </button>
        </tbody>
        </table>
        {/* <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errors.remark && errors.remark.message}
        </span> */}
       
        {/* <button
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "20px" }}
        >
          Back
        </button> */}
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import url from "../../config.js";

const SignupSchema = yup.object({
  Date: yup.string().required(),
  Description: yup.string().required(),
  Amount: yup.string().matches(phoneRegExp).required("Enter phone number only"),
  pay_mode: yup.string().required(),
  Transaction: yup.string().required(),
  // remark: yup.string().required(),
});
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export default function AddExpenses() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit = (data) => {
    console.log(data, "dadada");
    const article = {
      date: data.Date,
      description: data.Description,
      amount: data.Amount,
      pay_mode: data.pay_mode,
      transction_no: data.Transaction,
      remarks: data.remark,
   
      // info
    };
    // posting date to database

    axios.post(url.server_url + "/save_expenses", article).then((data) => {
      var status_code = data.data.status_code;
      if (status_code == 200) {
        alert("sucessful");
        window.location.reload();
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
        <label>Date:</label>
        <br />
        <input type="date" {...register("Date")} />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.Date && errors.Date.message}
        </span>
        <br />
        <label>Description:</label>
        <br />
        <input type="text" {...register("Description")} />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.Description && errors.Description.message}
        </span>
        <br />
        <label>Amount (Rs):</label>
        <br />
        <input type="number" {...register("Amount")} />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errors.Amount && errors.Amount.message}
        </span>
        <br />
        <label>Payment Mode:</label>
        <br />
        <select
          {...register("pay_mode")}
          onChange={(e) =>
            setValue("pay_mode", e.target.value, { shouldValidate: true })
          }
        >
          <option value="">Select on option</option>
          <option value="Cash">Cash</option>
          <option value="online Transfer">online Transfer</option>
          <option value="Cheque/DD">Cheque/DD</option>
          <option value="UPI">UPI</option>
        </select>
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.pay_mode && errors.pay_mode.message}
        </span>
        <br />
        <label>Transaction No:</label>
        <br />
        <input
          type="text"
          minLength={10}
          maxLength={10}
          {...register("Transaction")}
        />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.Transaction && errors.Transaction.message}
        </span>
        <br />
        <label>Remarks:</label>
        <br />
        <textarea
          name=""
          id=""
          cols=""
          rows="03"
          {...register("remark")}
        ></textarea>
        {/* <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errors.remark && errors.remark.message}
        </span> */}
        <br />
        <br /> <br />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "20px" }}
        >
          Back
        </button>
      </form>
    </div>
  );
}

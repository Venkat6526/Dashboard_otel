import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import url from "../../config.js";
import '.././design.css';

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
    <div className="mx-auto col-10 col-md-8 col-lg-6 mt-3">
      <form className="shadow-lg shadow-info  p-4 ps-5  mb-5 bg-body rounded complaint"
       
        onSubmit={handleSubmit(onSubmit)}
        
      >
        <table  style={{marginLeft:"80px"}}>
        <tr>
        <td style={{marginTop:"-60px"}}>Date</td>
        <td>
        <input type="date" className="form-control date ms-5 mb-1"  style={{marginBottom:"-20px"}}  {...register("Date")} />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.Date && errors.Date.message}
        </span></td>
        </tr>
        <tr>
        <td>Description</td>
        <td>
        <input type="text" className="form-control ms-5 mb-1" style={{marginBottom:"-20px"}} {...register("Description")} />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.Description && errors.Description.message}
        </span></td>
        </tr> <tr>
        <td>Amount (Rs)</td>
        <td>
        <input type="number" className="form-control ms-5 mb-1" style={{marginBottom:"-20px"}} {...register("Amount")} />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errors.Amount && errors.Amount.message}
        </span></td>
        </tr><tr>
        <td>Payment Mode</td>
        <td>
        <select className="form-control ms-5 mb-1" style={{marginBottom:"-20px"}}
          {...register("pay_mode")}
          onChange={(e) =>
            setValue("pay_mode", e.target.value, { shouldValidate: true })
          }  
        >
          <option value="">Select </option>
          <option value="Cash">Cash</option>
          <option value="online Transfer">online Transfer</option>
          <option value="Cheque/DD">Cheque/DD</option>
          <option value="UPI">UPI</option>
        </select>
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.pay_mode && errors.pay_mode.message}
        </span>
        </td>
        </tr>
        <tr>
        <td>Transaction No</td>
        <td>
        <input
        className="form-control ms-5 mb-1" style={{marginBottom:"-20px"}}
          type="text"
          minLength={10}
          maxLength={10}
          {...register("Transaction")}
        />
        <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {errors.Transaction && errors.Transaction.message}
        </span>
        </td>
        </tr>
        <tr>
        <td>Remarks</td>
        <td >
        <textarea
        className="form-control ms-5 mb-1" style={{marginBottom:"-20px"}}
          name=""
          id=""
          cols=""
          rows="03"
          {...register("remark")}
        ></textarea>
        {/* <span className="text-danger">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{errors.remark && errors.remark.message}
        </span> */}
        </td>
        </tr>
       <tr className="mt-5">
        <td>
        <button type="submit" className="btn btn-primary mt-2 " style={{marginLeft:"120px"}}>
          Save
        </button></td><td>
        <button
          type="submit"
          className="btn btn-primary mt-2 "
          style={{marginLeft:"50px"}}
            
        >
          Back
        </button></td> </tr>
        </table>
      </form>
    </div>
  );
}

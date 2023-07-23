import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
export default function ProductEnquiry(){
    return(
        <>
       <GoogleReCaptchaProvider reCaptchaKey="6Lf75hIjAAAAALiIXxCO7gl5s1duO7nVDRbu0kSi">
       <GoogleReCaptch />
       </GoogleReCaptchaProvider>
        </>
    )
}
export const GoogleReCaptch=()=> {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handleReCaptchaVerify();

    //post api
  };
  // google recaptcha


  const { executeRecaptcha } = useGoogleReCaptcha();
  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("yourAction");
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
  
      <div className="table">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            {...register("name", {
              required: true,
              pattern: /^[A-Za-z]+$/i,
            })}
          />

          {errors.name && errors.name.type === "required" && (
            <span className="errorMsg" style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name is required.</span>
          )}
          {errors.name && errors.name.type === "pattern" && (
            <span className="errorMsg" style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name is not valid.</span>
          )}
          <br />
          <br />
          <input
            name="phone"
            type="number "
            placeholder="Phone"
            {...register("phone", {
              required: true, maxLength:"10",
              pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
            })}
          />
          {errors.phone && errors.phone.type === "required" && (
            <span className="errorMsg"  style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Phone Number is required </span>
          )}
          {errors.phone && errors.phone.type === "pattern" && (
            <span className="errorMsg"  style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minium 10 number is  required</span>
          )}
           {errors.phone && errors.phone.type === "maxLength" && (
            <p className="errorMsg"  style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minium 10 number is  required</p>
          )}
          <br />
          <br />
          <input
            name="email"
            type="email"
            placeholder="Email"
           
            {...register("email", {
              required: true,
              pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            })}
          />
        

          {errors.email && errors.email.type === "required" && (
            <span className="errorMsg"  style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email is required.</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span className="errorMsg"  style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email is not valid.</span>
          )}
          <br />
          <br />
          <textarea
            name="address"
            placeholder="Address"
            id=""
            cols=""
            rows="4"
            {...register("address", {
                required: true,
                maxLength:"15"
               
              })}
          ></textarea>
           {errors.address && errors.address.type === "required" && (
            <span className="errorMsg"  style={{color: "red"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Address is required.</span>
          )}
          <br />
          <br />
          {/* <YourReCaptchaComponent /> */}

          <button
            className="btn btn-primary"
            style={{ float: "left" }}
            onClick={handleReCaptchaVerify}
          >
            Submit
          </button>
        </form>
      </div>
    // </GoogleReCaptchaProvider>
  );
}

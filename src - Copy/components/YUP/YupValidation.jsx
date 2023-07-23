import React from 'react'

const SignupSchema = yup.object({
  email_a: yup
  .string()
  .required("Email is required")
  .email("Please enter a valid email address"),
    customer_name: yup
      .string()
      .required("Customer name is required")
      .matches(/^(\S+\s?)+$/, "Customer name should contain at least one space")
      .max(100, "Customer name should not exceed 100 characters"),
  
    contact_person: yup
      .string()
      .required("Contact Person name is required")
      .matches(/^(\S+\s?)+$/, "Contact Person should contain at least one space")
      .max(100, "Contact  Person should not exceed 100 characters"),
  
      mobile_no_a: yup
      .string()
      .required("Mobile is required")
      .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
    email: yup.string().required("Email is required"),
    gst: yup
      .string()
      .min(10, "GST number must be at least 10 characters long")
      .max(10, "GST number can be maximum 10 characters long")
      .required("GST number is required"),
  
    address: yup.string().required("Address is required"),
    city: yup
      .string()
      .required("City is required")
      .matches(/^[A-Za-z\s]+$/, "City should only contain alphabet"),
  
    state: yup
      .string()
      .matches(/^[A-Za-z]+$/, "State should only contain alphabet")
      .oneOf(
        ["Karnataka", "Pune", "Goa", "Kerala", "Chennai"],
        "Please select a valid state"
      )
      .required("State is required"),
    pin_code: yup
      .string()
      .required("Pin code is required")
      .matches(/^\d{6}$/, "Pin code should only contain 6 digits"),
      date: yup
      .date()
      .typeError("Please enter a valid date")
      .required("Date is required")
      .nullable(),
  
  });
  




























export default function YupValidation() {
  return (
    <div>YupValidation</div>
  )
}

import React from 'react'









const SignupSchema = yup.object({
  product_name: yup
  .string()

  .required("Product name is required")
  .matches(
    /^[a-zA-Z0-9\s]+$/,
    "Product name must contain only letters, numbers, and spaces"
  ),// not except speical character
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
  
    mobile_no: yup
      .string()
      .matches(phoneRegExp, "Entire phone number only")
      .required("Enter phone number only"),
    email: yup.string().required("Email is required"),
    gst: yup
      .string()
      .min(10, "GST number must be at least 10 characters long")
      .max(10, "GST number can be maximum 10 characters long")
      .matches(/^[a-zA-Z0-9]*$/, "GST number should not contain special characters")
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
  });










































export default function Yup_Validation() {
  return (
    <div>Yup_Validation</div>
  )
}

import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import url from "../config";

const schema = yup.object().shape({
  product_name: yup.string().required("Product name is required"),
  size: yup.string().required("Size is required"),
  description: yup.string().required("Description is required"),
  price: yup.string().required("Price value is required"),
  gst: yup.string().required("GST is required"),
  main_image: yup
    .mixed()
    .test("required", "Main image is required", (value) => value.length > 0)
    .test("fileSize", "File Size is too large", (value) => {
      return value.length && value[0].size <= 5242880;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value.length &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
      );
    }),
  display_image1: yup
    .mixed()
    // .test("required", "Main image is required", (value) => value.length > 0)
    // .test("fileSize", "File Size is too large", (value) => {
    //   return value.length && value[0].size <= 5242880;
    // })
    // .test("fileType", "Unsupported File Format", (value) => {
    //   return (
    //     value.length &&
    //     ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
    //   );
    // })
    ,

  display_image2: yup
    .mixed()
    // // .test("required", "Main image is required", (value) => value.length > 0)
    // .test("fileSize", "File Size is too large", (value) => {
    //   return value.length && value[0].size <= 5242880;
    // })
    // .test("fileType", "Unsupported File Format", (value) => {
    //   return (
    //     value.length &&
    //     ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
    //   );
    // })
    ,
  display_image3: yup
    .mixed()
    // .test("required", "Main image is required", (value) => value.length > 0)
    // .test("fileSize", "File Size is too large", (value) => {
    //   return value.length && value[0].size <= 5242880;
    // })
    // .test("fileType", "Unsupported File Format", (value) => {
    //   return (
    //     value.length &&
    //     ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
    //   );
    // })
    ,
  display_image4: yup.mixed(),
  // .test("required", "Main image is required", (value) => value.length > 0)
  // .test("fileSize", "File Size is too large", (value) => {
  //   return value.length && value[0].size <= 5242880;
  // })
  // .test("fileType", "Unsupported File Format", (value) => {
  //   return (
  //     value.length &&
  //     ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
  //   );
  // }),
});

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const newFormData = new FormData();
    // newFormData.append("file", data.file[0]);

    newFormData.append("product_name", data.product_name);
    newFormData.append("size", data.size);
    newFormData.append("description", data.description);
    newFormData.append("price", data.price);
    newFormData.append("gst", data.gst);
    newFormData.append("main_image", data.main_image[0]);
    newFormData.append("display_image1", data.display_image1[0]);
    newFormData.append("display_image2", data.display_image2[0]);
    newFormData.append("display_image3", data.display_image3[0]);
    newFormData.append("display_image4", data.display_image4[0]);

    reset();
    console.log(newFormData, "hgsadhasgdhc");

    axios.post(url.server_url + `/post_product`, newFormData).then((data) => {
      console.log(data, "zhcghasgc");
      var status_code = data.data.status_code;
      if (status_code == 200) {
        // alert("sucessful");
        // window.location.reload();
      }
    });
  };

  return (
    <div className="mx-auto col-10 col-md-8 col-lg-6 mt-3 align-items-center" >
    <Form className="shadow-lg shadow-info  p-4 mb-5 bg-body rounded complaint"  onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Product Name"
          {...register("product_name")}
        />
        <span className="text-danger">
          {errors.product_name && errors.product_name.message}
        </span>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Size</Form.Label>
        <Form.Control type="text" placeholder="Size" {...register("size")} />
        <span className="text-danger">
          {errors.size && errors.size.message}
        </span>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          {...register("description")}
        />
        <span className="text-danger">
          {errors.description && errors.description.message}
        </span>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          placeholder="Price"
          min={0}
          {...register("price")}
        />
        <span className="text-danger">
          {errors.price && errors.price.message}
        </span>
      </Form.Group>

      <Form.Group>
        <Form.Label>GST:</Form.Label>
        <Form.Control as="select" {...register("gst")}>
          <option value="">select</option>
          <option value="0">0</option>
          <option value="5">5</option>
          <option value="12">12</option>
          <option value="18">18</option>
          <option value="28">28</option>
        </Form.Control>{" "}
        <span className="text-danger">{errors.gst && errors.gst.message}</span>
      </Form.Group>
      <br />
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Main Image:</Form.Label>
        <Form.Control type="file" {...register("main_image")} />
        <span className="text-danger">
          {errors.main_image && errors.main_image.message}
        </span>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Display Image 1:</Form.Label>
        <Form.Control type="file" name="img1" {...register("display_image1")} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Display Image 2:</Form.Label>
        <Form.Control type="file" name="img2"  {...register("display_image2")} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Display Image 3:</Form.Label>
        <Form.Control type="file" name="img3"  {...register("display_image3")} />
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Display Image 4:</Form.Label>
        <Form.Control type="file" name="img4"  {...register("display_image4")} />
      </Form.Group>
      <Button className="btn btn-primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

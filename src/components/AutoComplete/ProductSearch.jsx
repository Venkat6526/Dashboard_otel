import React, { forwardRef, useImperativeHandle, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const ProductSearch = forwardRef(({ data, defValue, type, ...props }, ref) => {
  const [value, setValue] = useState("");

  // u have to call useImperativeHandle when we use useRef this clear the data to a button
  useImperativeHandle(ref, () => ({
    clearProdValue() {
      setValue("");
      console.log("deltedddddd");
    },
  }));

  const handleChange = (event, newValue) => {
    if (newValue != null) {
      console.log(newValue, "new value");
      props.onChangeData(newValue);
      setValue(newValue);
    }
  };

  return (
    <Autocomplete
      options={data}
      //put your default value here. It should be an object of the categories array.
      // inputValue={defValue}
      value={value}
      getOptionLabel={(option) =>option.product_name}
        // option.product_name != undefined &&
        // option.product_name +
        //   "( gsm:" +
        //   option.gsm +
        //   ") (capacity: " +
        //   option.capacity +
        //   ")"
      
        renderOption={(props, option) => {
          return (
            <li {...props}>
              {props.product_name}
              <p>{ "(" + props.parameter + ":" +
          props.gsm +
          ") (" +
          props.capacity + ":"+
          props.capacity_opt + ")"}</p>
            </li>
          );
        }}
      renderInput={(params) => (
        // <TextField
        //   {...params}
        //   variant="outlined"
        //   value={value}
        //   placeholder=
        //   size="small"
        //   className="formField"
        // />
        <TextField {...params} variant="outlined" placeholder={defValue} />
      )}
      onChange={handleChange}
    />
  );
});

export default ProductSearch;

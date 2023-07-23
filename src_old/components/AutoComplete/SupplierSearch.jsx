import React, { useState, forwardRef, useImperativeHandle } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
const SupplierSearch = forwardRef(({ data, defValue, type, ...props }, ref) => {
  const [value, setValue] = useState([]);

  useImperativeHandle(ref, () => ({
    clearSupplierValue() {
      setValue([]);
      console.log("deltedddddd");
    },
  }));

  const handleChange = (event, newValue) => {
    if (newValue != null) {
      setValue(newValue);
      console.log(newValue, "new value");
      props.onChangeData(newValue);
    }
  };

  return (
    <div>
      <Autocomplete
        // disableClearable
        id="my-autocomplete"
        ref={ref}
        options={data}
        //put your default value here. It should be an object of the categories array.
        // inputValue={defValue}
        value={value}
        getOptionLabel={(option) => option.supplier_name}
        // getOptionLabel={(option) =>
        //   option.supplier_name != undefined &&
        //   option.supplier_name + "( Qty:" + option.unit_qty + ")"
        // }
        renderOption={(props, option) => {
          return (
            <li {...props}>
              {props.supplier_name}
              {/* <p>{"("+props.uom +" "+ props.unit_qty +" "+ props.sub_uom +")"}</p> */}
            </li>
          );
        }}
        // renderOption={(props, option) => (
        //   <p {...props}>
        //     {/* {option.supplier_name} */}
        //     {option.supplier_name}
        //   </p>
        // )}
        renderInput={(params) => (
          // <TextField
          //   {...params}
          //   variant="outlined"
          //   value={value}
          //   placeholder={defValue}
          //   size="small"
          //   className="formField"
          // />
          <TextField
            {...params}
            value={value.supplier_name}
            variant="outlined"
            placeholder={defValue}
          />
        )}
        onChange={handleChange}
      />
    </div>
  );
});

export default SupplierSearch;

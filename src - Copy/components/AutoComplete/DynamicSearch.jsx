
// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import Form from 'react-bootstrap/Form';

// const DynamicSearch = ({ data, type, ...props }) => {
//   const [suggestions, setSuggestions] = useState([]);
//   const [suggestionIndex, setSuggestionIndex] = useState(0);
//   const [suggestionsActive, setSuggestionsActive] = useState(false);
//   const [value, setValue] = useState("");

//   const handleChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setValue(query);
//     if (query.length >= 1) {
//       let filterSuggestions = [];
//       if (type == 1) {
//         filterSuggestions = data.filter(
//           (suggestion) =>
//             suggestion.customer_name.toLowerCase().indexOf(query) > -1
//         );
//       } else {
//         filterSuggestions = data.filter(
//           (suggestion) =>
//             suggestion.supplier_name.toLowerCase().indexOf(query) > -1
//         );
//       }

//       setSuggestions(filterSuggestions);
//       setSuggestionsActive(true);
//     } else {
//       setSuggestionsActive(false);
//     }
//   };

//   const handleClick = (e) => {
//     console.log(e, "item click");
//     setSuggestions([]);

//     if (type == 1) {
//       setValue(e.customer_name);
//     } else {
//       setValue(e.supplier_name);
//     }
//     setSuggestionsActive(false);

//     props.onChangeData(e);
//   };

//   const handleKeyDown = (e) => {
//     // UP ARROW
//     if (e.keyCode === 38) {
//       if (suggestionIndex === 0) {
//         return;
//       }
//       setSuggestionIndex(suggestionIndex - 1);
//     }
//     // DOWN ARROW
//     else if (e.keyCode === 40) {
//       if (suggestionIndex - 1 === suggestions.length) {
//         return;
//       }
//       setSuggestionIndex(suggestionIndex + 1);
//     }
//     // ENTER
//     else if (e.keyCode === 13) {
//       setValue(suggestions[suggestionIndex]);
//       setSuggestionIndex(0);
//       setSuggestionsActive(false);
//     }
//   };

//   const Suggestions = () => {
//     return (
//       <input className="form-control">

//         {suggestions.map((item, index) => {
//           return (
//             <div>
//               className={index === suggestionIndex ? "active" : ""}
//               key={index}
//               onClick={() => handleClick(item)}

//               {type == 1 ? item.customer_name : item.supplier_name}
//               </div>
//           );
//         })}
//       </input>
//     );
//   };

//   return (
//     <div className="autocomplete">
//       {/* <Autocomplete
//         disablePortal
//         type="text"
//         id="combo-box-demo"
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         sx={{ width: 300 }}
//         renderInput={(params) => <TextField {...params} />}
//       /> */}

//       <input
//         type="text"
//          class="form-control"
//         value={value}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//       />
//       {suggestionsActive && <Suggestions />}
//     </div>
//   );
// };

// export default DynamicSearch;
// import React, { useState } from "react";
// import Form from 'react-bootstrap/Form';

// const DynamicSearch = ({ data, type, ...props }) => {
//   const [value, setValue] = useState("");

//   const handleChange = (e) => {
//     setValue(e.target.value);
//     if (type === 1) {
//       const selected = data.find(item => item.customer_name === e.target.value);
//       props.onChangeData(selected);
//     } else {
//       const selected = data.find(item => item.supplier_name === e.target.value);
//       props.onChangeData(selected);
//     }
//   };

//   return (
//     <div className="autocomplete">
//       <Form.Select aria-label="Default select example" value={value} onChange={handleChange}>
//         <option value="">Select an option</option>
//         {data.map((item, index) => {
//           return (
//             <option key={index} value={type === 1 ? item.customer_name : item.supplier_name}>
//               {type === 1 ? item.customer_name : item.supplier_name}
//             </option>
//           );
//         })}
//       </Form.Select>
//     </div>
//   );
// };















//--------------------------------------------------------------------------------------------------------------------------





// import React, { useState } from "react";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import "./Dynamic.css";

// const DynamicSearch = ({ data, type,defValue, ...props }) => {
//   const [value, setValue] = useState("");



//   const handleChange = (event, newValue) => {
//     if (newValue != null) {
//       setValue(newValue);
//       console.log(newValue, "new value");
//       props.onChangeData(newValue);
//     }
//   };




//   return (
//     <Autocomplete
//       // disableClearable
//       options={data}
//       //put your default value here. It should be an object of the categories array.

//       getOptionLabel={(option) =>
//         type === 1 ? option.customer_name : option.supplier_name
//       }
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           variant="outlined"
//           placeholder={defValue}
//           size="small"
//           className="formField"
//           value={value}
//         />
//       )}
//       onChange={handleChange}
//     />
//   );
// };

// export default DynamicSearch;

//============================================================================================================
import React, { useState, forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./Dynamic.css";

const DynamicSearch = forwardRef(({ data, type, defValue, onChangeData }, ref) => {
  const [value, setValue] = useState(defValue);

  const handleChange = (event, newValue) => {
    if (newValue != null) {
      setValue(newValue);
      console.log(newValue, "new value");
      onChangeData(newValue);
    }
  };

  return (
    <Autocomplete
      ref={ref}
      options={data}
      getOptionLabel={(option) =>
        option ? (type === 1 ? option.customer_name : option.supplier_name) : ""
      }
      // getOptionLabel={(option) =>
      //   type === 1 ? option.customer_name : option.supplier_name
      // }
      renderInput={(params) => (
        <TextField
        autoFocus 
          {...params}
            
          variant="outlined"
          placeholder={value}
          // defaultValue={defValue}
          size="small"
          className="formField"
          // value={value}
        />
      )}
      onChange={handleChange}
    />
  );
});

export default DynamicSearch;


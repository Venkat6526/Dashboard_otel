import React from "react";

function Filter({ api, onUpdateData, placeholder, name, name2 }) {
  const searchItems = (searchValue) => {
    console.log(api, "searchItems");

    let masterApi = api;
    if (searchValue !== "") {
      const filteredData = masterApi.filter((item) => {
        return (
          item[name].toLowerCase().includes(searchValue.toLowerCase()) ||
          item[name2].toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      onUpdateData(filteredData);
    } else {
      onUpdateData(api);
    }
  };

  return (
    <div>
      <input
        type="search"
        className=" form-content"
        placeholder={placeholder}
        onChange={(e) => searchItems(e.target.value)}
      />
    </div>
  );
}

export default Filter;

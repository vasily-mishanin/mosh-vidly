import React from "react";

const SearchBox = (props) => {
  const { value, onChange } = props;
  return (
    <div className="form-group">
      <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;

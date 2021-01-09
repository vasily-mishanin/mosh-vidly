import React from "react";
import PropTypes from "prop-types";

//interface:
//In: checked ?
//Out: checked genre

let ListGroup = (props) => {
  const { items, selectedItem, itemKey, itemText, onItemChange } = props;
  const itemClass = "list-group-item";

  return (
    <ul className="list-group">
      {items.map((item) => {
        return (
          <li
            key={item[itemKey]}
            className={
              selectedItem === item ? itemClass + " active" : itemClass
            }
            onClick={() => onItemChange(item)}>
            {item[itemText]}
          </li>
        );
      })}
    </ul>
  );
};

//set default properties for this component
ListGroup.defaultProps = {
  itemText: "name",
  itemKey: "_id",
};

//checking porps types
ListGroup.propTypes = {
  itemText: PropTypes.string.isRequired,
};

export default ListGroup;

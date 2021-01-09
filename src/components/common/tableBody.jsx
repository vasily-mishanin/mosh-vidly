import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  //item i.e. row of the table
  renderCell = (item, column) => {
    /* takes item and returns item's value by path or content=>ReactElement (like, delete button)*/
    return column.content ? column.content(item) : _.get(item, column.path);
  };

  createKey = (row, column) => {
    return row._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;

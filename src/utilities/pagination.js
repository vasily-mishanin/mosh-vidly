//import _ from "lodash";

export function paginate(items, currentPage, pageSize) {
  const startIndex = pageSize * (currentPage - 1);
  const endIndex = startIndex + pageSize;
  //return _(items).slice(startIndex).take(pageSize).value();
  //or with vanilla JS
  return items.slice(startIndex, endIndex);
}

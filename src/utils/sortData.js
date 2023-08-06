import React from "react";

// 昇順　asc　降順　desc
const sortData = (data, key, direction = "desc", type = "default") => {
  const compareFunction = (a, b) => {
    if (type === "time") {
      return new Date(a[key]) - new Date(b[key]);
    } else {
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    }
  };

  if (direction === "asc") {
    return data.sort(compareFunction);
  } else {
    return data.sort((a, b) => compareFunction(b, a));
  }
};

export default sortData;


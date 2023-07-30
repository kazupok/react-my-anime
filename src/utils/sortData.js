import React from "react";

// 昇順　asc　降順　desc
const sortData = (data, key, direction = "desc") => {
  if (direction === "asc") {
    return data.sort((a, b) => a[key] - b[key]);
  } else {
    return data.sort((a, b) => b[key] - a[key]);
  }
};

export default sortData;

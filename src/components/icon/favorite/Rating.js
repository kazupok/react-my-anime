import React from "react";
import Star from "./Star";

const Rating = ({ rating, size }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    let fillPercentage;
    if (rating >= i + 1) {
      fillPercentage = 1;
    } else if (rating > i) {
      fillPercentage = rating - i;
    } else {
      fillPercentage = 0;
    }

    stars.push(<Star fillPercentage={fillPercentage} key={i} size={size}/>);
  }

  return <div>{stars}</div>;
};

export default Rating;

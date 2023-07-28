import React from "react";
import Star from "./Star";

const EditRating = ({ rating, setHandler, size }) => {
  const handleStarClick = (starValue) => {
    // クリックされたスターの値をset関数に設定
    setHandler(starValue);
  };

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

    stars.push(
      <Star
        fillPercentage={fillPercentage}
        key={i}
        onClick={() => handleStarClick(i + 1)}
        size={size}
      />
    );
  }

  return <div>{stars}</div>;
};

export default EditRating;

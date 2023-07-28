import React from "react";
import { FaStar as FullStar } from "react-icons/fa";
import {ProgressIcon} from 'components/index';

const Star = ({ fillPercentage, onClick , size}) => {
  return (
    <ProgressIcon
      icon={FullStar}
      filledColor="white"
      emptyColor="gray"
      fillPercentage={fillPercentage}
      size={size}
      onClick={onClick}
    />
  );
};

export default Star;

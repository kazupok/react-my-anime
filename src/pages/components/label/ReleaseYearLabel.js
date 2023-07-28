import React from 'react';
import { useCustomTheme } from "../../../context/style/CustomThemeContext";
import CustomLabel from '../../../components/label/CustomLabel';

const ReleaseYearLabel = ({ year }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <CustomLabel
      style={{
        ...theme.label,
      }}
      fontSize="1.1rem"
      fontWeight="bold"
    >
      ｜{year}年
    </CustomLabel>
  );
};

export default ReleaseYearLabel;

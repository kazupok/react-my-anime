import React from 'react';
import { useCustomTheme } from "../../../context/style/CustomThemeContext";
import CustomLabel from '../../../components/label/CustomLabel';

const IconDescriptionLabel = ({ description }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <CustomLabel
      style={{
        ...theme.labelDescription,
      }}
      fontSize="0.7rem"
      fontWeight="none"
    >
      {description}
    </CustomLabel>
  );
};

export default IconDescriptionLabel;

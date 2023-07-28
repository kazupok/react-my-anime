import React from 'react';
import { useCustomTheme } from '../../../context/style/CustomThemeContext';

const AccentWrapper = ({ children, styleName }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <div style={{...theme[styleName]}}>
      {children}
    </div>
  );
};

export default AccentWrapper;

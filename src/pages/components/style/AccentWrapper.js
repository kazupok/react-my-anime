import React from 'react';
import { useCustomTheme } from '../../../contexts/CustomThemeContext';

const AccentWrapper = ({ children, styleName }) => {
  const theme = useCustomTheme().customTheme;

  return (
    <div style={{...theme[styleName]}}>
      {children}
    </div>
  );
};

export default AccentWrapper;

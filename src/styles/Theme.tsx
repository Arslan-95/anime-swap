import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyles';
import { stylePalettes } from '@features/theme';

type Props = {
  children?: React.ReactNode;
};

const Theme: React.FC<Props> = ({ children }) => {
  const [currentTheme] = React.useState(stylePalettes.yellow);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;

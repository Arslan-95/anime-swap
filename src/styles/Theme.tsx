import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyles';

type Props = {
  children?: React.ReactNode;
};

type Theme = {
  
};

const yellowTheme = {
};

const theme = {
  main: {},
  yellow: yellowTheme,
};

const Theme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;

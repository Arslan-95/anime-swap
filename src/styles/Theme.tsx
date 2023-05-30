import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyles';
import { stylePalettes } from '@features/theme';
import { useLocation } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
};

const Theme: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const isDappPage = !!location.pathname.match(/^\/dapp/);
  const [currentTheme] = React.useState(stylePalettes.main);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle isDappPage={isDappPage} />
      {children}
    </ThemeProvider>
  );
};

export default Theme;

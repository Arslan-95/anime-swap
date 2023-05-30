import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyles';
import StylePalette from '@features/theme/StylePalette';

type Props = {
  children?: React.ReactNode;
};

const yellowTheme = new StylePalette(
  '#E9DF33',
  '#C5BC20',
  '#628B1F',
  '#E9E9E9',
  '#171717',
  '#71EF51',
  'rgba(91, 235, 123, 0.16)',
  '#EFCC51',
  'rgba(235, 195, 91, 0.16)'
);

const theme = {
  main: yellowTheme,
  yellow: yellowTheme,
};

const Theme: React.FC<Props> = ({ children }) => {
  const [currentTheme] = React.useState(theme.main);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;

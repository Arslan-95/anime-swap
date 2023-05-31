import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ isDappPage: boolean }>`
  html, body {
    height: 100%;
  }

  body {
    font-family: Montserrat, sans-serif;
    padding: 0;
    background: ${({ isDappPage, theme }) =>
      isDappPage
        ? theme.colors.dappBackground
        : theme.colors.landingBackground};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  input, button, textarea, select {
    font: inherit;
  }

  button {
    background: none;
    border: none;
  }
`;

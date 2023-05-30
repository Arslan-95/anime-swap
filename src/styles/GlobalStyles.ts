import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    font-family: Montserrat, sans-serif;
    padding: 0;
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
`;

export default GlobalStyle;

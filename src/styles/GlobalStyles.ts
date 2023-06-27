import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ isDappPage: boolean }>`
  html, body {
    min-height: 100%;
  }

  body {
    font-family: Montserrat, sans-serif;
    padding: 0;
    background: ${({ isDappPage, theme }) =>
      isDappPage
        ? theme.colors.dappBackground
        : theme.colors.landingBackground};
    color: ${(props) => props.theme.colors.defaultText};
    font-size: ${(props) => props.theme.fontSizes.small};

    &.modal {
      overflow: hidden;
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: PocketMonk;
    font-weight: 400;
    letter-spacing: 0.025em;
  }

  h2 {
    font-size: ${({ isDappPage, theme }) =>
      isDappPage ? theme.fontSizes.large : theme.fontSizes.xlarge}
  }

  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  button {
    background: none;
    border: none;
  }
`;

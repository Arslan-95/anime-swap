type Color = string;
type LinearGradient = string;

interface IColors {
  dappBackground: Color | LinearGradient;
  landingBackground: Color;
  main: Color;
  secondary: Color;
  second: Color;
  light: Color;
  dark: Color;
  defaultText: Color;
  success: Color;
  progress: Color;
  successBackground: Color;
  progressBackground: Color;
}

interface IFontSizes {
  xsmall: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
}

interface ITheme {
  colors: IColors;
  fontSizes: IFontSizes;
}

class Theme implements ITheme {
  public colors: IColors;
  public fontSizes: IFontSizes = {
    xsmall: '12px',
    small: '18px',
    medium: '28px',
    large: '50px',
    xlarge: '80px',
  };

  constructor(colors: IColors) {
    this.colors = colors;
  }
}

export default Theme;

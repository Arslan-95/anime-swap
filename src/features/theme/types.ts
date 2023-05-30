export type Color = string;
export type LinearGradient = string;

export interface IColors {
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

export interface IFontSizes {
  xsmall: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
}

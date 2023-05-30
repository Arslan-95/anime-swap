import { DefaultTheme } from 'styled-components';
import { IColors, IFontSizes } from './types';

class Theme implements DefaultTheme {
  public colors: IColors;
  public fontSizes: IFontSizes = {
    xsmall: '12px',
    small: '18px',
    medium: '32px',
    large: '50px',
    xlarge: '80px',
  };

  constructor(colors: IColors) {
    this.colors = colors;
  }
}

export default Theme;

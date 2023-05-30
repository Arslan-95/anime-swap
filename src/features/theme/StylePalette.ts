import { Color } from './types';

class StylePalette {
  constructor(
    public main: Color,
    public secondary: Color,
    public second: Color,
    public white: Color,
    public black: Color,
    public success: Color,
    public successTransparent: Color,
    public inProgress: Color,
    public inProgressTransparent: Color
  ) {}
}

export default StylePalette;

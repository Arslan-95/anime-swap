// import original module declarations
import 'styled-components';
import { IColors, IFontSizes } from '@features/theme/types';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: IColors;
    fontSizes: IFontSizes;
  }
}

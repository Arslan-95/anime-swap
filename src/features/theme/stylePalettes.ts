import StylePalette from './StylePalette';

interface IStylePalettes {
  [key: string]: StylePalette;
}

const yellow = new StylePalette(
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

const stylePalettes: IStylePalettes = {
  main: yellow,
  yellow,
};

export default stylePalettes;

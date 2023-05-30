import Theme from './Theme';

const yellowTheme = new Theme({
  dappBackground:
    'linear-gradient(180deg, rgba(197, 188, 32, 0.14) 0%, rgba(146, 247, 252, 0.14) 100%), #000;',
  landingBackground: 'rgba(19, 19, 19, 1)',
  main: 'rgba(233, 223, 51, 1)',
  secondary: 'rgba(197, 188, 32, 1)',
  second: 'rgba(98, 139, 31, 1)',
  light: 'rgba(233, 233, 233, 1)',
  dark: 'rgba(23, 23, 23, 1)',
  defaultText: 'rgba(233, 233, 233, 1)',
  success: 'rgba(113, 239, 81, 1)',
  progress: 'rgba(239, 204, 81, 1)',
  successBackground: 'rgba(91, 235, 123, 0.16)',
  progressBackground: 'rgba(235, 195, 91, 0.16)',
});

const stylePalettes = {
  main: yellowTheme,
  yellow: yellowTheme,
};

export default stylePalettes;

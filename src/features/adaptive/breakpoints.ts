const maxWidth = (size: number) => `(max-width: ${size}px)`;

export const sizes = {
  mobileXS: 320,
  mobileS: 375,
  mobileM: 425,
  mobileL: 768,
  tablet: 1024,
  laptop: 1440,
  desktop: 1920,
};

export const mediaBreakpoints = {
  mobileXS: maxWidth(sizes.mobileXS),
  mobileS: maxWidth(sizes.mobileS),
  mobileM: maxWidth(sizes.mobileM),
  mobileL: maxWidth(sizes.mobileL),
  tablet: maxWidth(sizes.tablet),
  laptop: maxWidth(sizes.laptop),
  desktop: maxWidth(sizes.desktop),
};

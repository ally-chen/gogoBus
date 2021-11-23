export const apiRoot = 'https://ptx.transportdata.tw/MOTC';
export const desktopMedia = (styles) => (`@media (min-width: 768px){${styles}}`);

export const colors = {
  main: '#0077FF',
  mainLight: '#ECEEFF',
  secondary: '#FFC44E',
  dark: '#1E222B',
  tint: '#99BADD',
  light: '#486AE8',
  textDark: '#363636',
  textMedium: '#7D7D7D',
  textLight: '#B6B6B6',
  textLighter: '#D9D9D9',
};

export const directionText = {
  E:'東行', W:'西行', S:'南行', N:'北行', SE:'東南行', NE:'東北行', SW:'西南行', NW:'西北行'
};

export const auth = {
  id: process.env.REACT_APP_TDXID,
  key: process.env.REACT_APP_TDXKEY,
  gMapKey: process.env.REACT_APP_GMAPKEY,
  mapBoxToken: process.env.REACT_APP_MAPBOXTOKEN
};
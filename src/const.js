export const apiRoot = 'https://ptx.transportdata.tw/MOTC';
export const desktopMedia = (styles) => (`@media (min-width: 1024px){${styles}}`);

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

export const statusMap = {0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運'};

export const auth = {
  id: process.env.REACT_APP_TDXID,
  key: process.env.REACT_APP_TDXKEY,
  gMapKey: process.env.REACT_APP_GMAPKEY,
  mapBoxToken: process.env.REACT_APP_MAPBOXTOKEN
};

export const cities = [
  {
    name: '臺北市',
    key: 'Taipei',
    latlng: {lat: 25.04454809288478, lng: 121.53947779457634}
  },
  {
    name: '新北市',
    key: 'NewTaipei',
    latlng: {lng: 121.4627838, lat: 25.0170177}
  },
  {
    name: '桃園市',
    key: 'Taoyuan',
    latlng: {lng: 121.3009071, lat: 24.993682}
  },
  {
    name: '臺中市',
    key: 'Taichung',
    latlng: {lng: 120.6736565, lat: 24.1477718}
  },
  {
    name: '臺南市',
    key: 'Tainan',
    latlng: {lng: 120.2268219, lat: 22.9997997}
  },
  {
    name: '高雄市',
    key: 'Kaohsiung',
    latlng: {lng: 120.3014088, lat: 22.6272419}
  },
  {
    name: '基隆市',
    key: 'Keelung',
    latlng: {lng: 121.7391586, lat: 25.1275685}
  },
  {
    name: '新竹市',
    key: 'Hsinchu',
    latlng: {lng: 120.9674549, lat: 24.813849}
  },
  {
    name: '新竹縣',
    key: 'HsinchuCounty',
    latlng: {lng: 121.0177517, lat: 24.8386986}
  },
  {
    name: '苗栗縣',
    key: 'MiaoliCounty',
    latlng: {lng: 120.8214569, lat: 24.5602388}
  },
  {
    name: '彰化縣',
    key: 'ChanghuaCounty',
    latlng: {lng: 120.5161572, lat: 24.0517939}
  },
  {
    name: '南投縣',
    key: 'NantouCounty',
    latlng: {lng: 120.9718323, lat: 23.9608425}
  },
  {
    name: '雲林縣',
    key: 'YunlinCounty',
    latlng: {lng: 120.4313564, lat: 23.7092168}
  },
  {
    name: '嘉義縣',
    key: 'ChiayiCounty',
    latlng: {lng: 120.2554893, lat: 23.4518294}
  },
  {
    name: '嘉義市',
    key: 'Chiayi',
    latlng: {lng: 120.4491234, lat: 23.4800943}
  },
  {
    name: '屏東縣',
    key: 'PingtungCounty',
    latlng: {lng: 120.5488586, lat: 22.5518792}
  },
  {
    name: '宜蘭縣',
    key: 'YilanCounty',
    latlng: {lng: 121.7537498, lat: 24.7591271}
  },
  {
    name: '花蓮縣',
    key: 'HualienCounty',
    latlng: {lng: 121.601572, lat: 23.9871544}
  },
  {
    name: '臺東縣',
    key: 'TaitungCounty',
    latlng: {lng: 121.1438155, lat: 22.7613225}
  },
  {
    name: '金門縣',
    key: 'KinmenCounty',
    latlng: {lng: 118.3766556, lat: 24.4493374}
  },
  {
    name: '澎湖縣',
    key: 'PenghuCounty',
    latlng: {lng: 119.5793152, lat: 23.5712249}
  },
  {
    name: '連江縣',
    key: 'LienchiangCounty',
    latlng: {lng: 119.9516487, lat: 26.1602145}
  },
];

export const cityCodeMap = {
  TPE: 'Taipei',
  TXG: 'Taichung',
  KEE: 'Keelung',
  TNN: 'Tainan',
  KHH: 'Kaohsiung',
  NWT: 'NewTaipei',
  ILA: 'YilanCounty',
  TAO: 'Taoyuan',
  CYI: 'Chiayi',
  HSQ: 'HsinchuCounty',
  MIA: 'MiaoliCounty',
  NAN: 'NantouCounty',
  CHA: 'ChanghuaCounty',
  HSZ: 'Hsinchu',
  YUN: 'YunlinCounty',
  CYQ: 'ChiayiCounty',
  PIF: 'PingtungCounty',
  HUA: 'HualienCounty',
  TTT: 'TaitungCounty',
  KIN: 'KinmenCounty',
  PEN: 'PenghuCounty',
  LIE: 'LienchiangCounty',
};
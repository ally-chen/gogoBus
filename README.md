# GoGo Bus | 全台公車動態時刻查詢應用服務
本專案為[The F2E 3rd](https://2021.thef2e.com/)挑戰第三周：全台公車動態時刻查詢應用服務，前端個人組作品\
→ [Demo](https://ally-chen.github.io/gogoBus)


採用設計師[Tracy](https://2021.thef2e.com/users/6296427084285739806)的美美設計搞（感謝設計師大大！）

## 系統說明
(本專案使用create react app建立)\
`npm install` -> 安裝此專案必須的模組\
`npm start` -> 運行此專案 (打開[本地端](http://localhost:3101)即可瀏覽)

p.s 專案所用到的token存放在根目錄的.env，須設定REACT_APP_TDXID、REACT_APP_TDXKEY以存取TDX API，\
以及REACT_APP_MAPBOXTOKEN來存取mapbox地圖

版本說明：\
Node.js: 14.15.4\
React: 17.0.2

## 資料夾說明
* containers - 頁面
* components - 共用元件、頁面元件
* images - 圖片、icon
* store - 用於全域的資料(專案內實作的資料為使用者的定位資料)
* common.js -> 常用function與custom hooks
* const.js -> 常用常數

## 使用技術
* React(hooks)
* Axios
* styled-components
* [leaflet](https://leafletjs.com/)

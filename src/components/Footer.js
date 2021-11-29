import ptxLogo from '@/images/PTX-logo.png';
import {FooterWrapper, SourceFrom} from '@/style';

const Footer = () => (
  <FooterWrapper>
    <div>©2021 Development by <a href="https://github.com/ally-chen" target="_blank">Ally Chen</a>,
    Design by <a href="https://2021.thef2e.com/users/6296427084285739806?week=3&type=1" target="_blank">Tracy</a></div>
    <SourceFrom>資料來源：<a href="https://ptx.transportdata.tw/PTX/" target="_blank">交通部PTX平臺</a><a href="https://ptx.transportdata.tw/PTX/" target="_blank"><img src={ptxLogo} alt="PTX" width="150" /></a></SourceFrom>
  </FooterWrapper>
);

export default Footer;
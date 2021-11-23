import bus from '@/images/ic-bus-main.svg';
import {EmptyWrapper, EmptyText} from './style';

const Empty = ({text = '沒有資料'}) => (
  <EmptyWrapper>
    <img src={bus} width={100} style={{opacity: .5}} />
    <EmptyText>{text}</EmptyText>
  </EmptyWrapper>  
);

export default Empty;
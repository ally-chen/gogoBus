import bus from '@/images/ic-bus-main.svg';
import { EmptyWrapper, EmptyText } from '@/style';

const Empty = ({text = '沒有資料'}) => (
  <EmptyWrapper>
    <EmptyText>{text}</EmptyText>
  </EmptyWrapper>  
);

export default Empty;
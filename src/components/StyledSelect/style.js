import styled from 'styled-components';
import icArrow from '@/images/dropdown-arrow.svg';
import { SearchBoard } from '@/component/ui-components';
import { colors, desktopMedia } from '@/const';

export const MobileSelect = styled.select`
background: url(${icArrow}) right 20px center/18px no-repeat, linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 0px -1px 4px rgba(0, 0, 0, 0.3);
border-radius: 30px;
position: relative;
z-index: 1;
border: 0;
font-size: 18px;
line-height: 25px;
padding: 12.5px;
appearance: none;
&:focus {
  background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #F5F5F5;
  box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 3px 2px 5px rgba(0, 0, 0, 0.3);
}
${SearchBoard} &{
  width: calc(50% - 5px);
  margin-bottom: 10px;
  text-align: center;
  padding-right: 30px;
  +select {
    margin-left: 10px;
  }
}
`;

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  + * {
    margin-left: 20px;
  }
  ${desktopMedia(`
    min-width: 180px;
    button {
      width: 100%;
      padding-right: 40px;
      position: relative;
      > img {
        position: absolute;
        right: 22px;
        top: 50%;
        margin-top: -4px;
        width: 20px;
      }
    }
  `)}
`;

export const DropdownList = styled.ul`
  position: absolute;
  z-index: 1001;
  top: calc(100% + 4px);
  background: linear-gradient(180deg, rgba(239, 239, 239, 0) 0%, rgba(206, 206, 206, 0.2) 100%), #FFFFFF;
  box-shadow: 2px 2px 3px -2px rgba(0, 0, 0, 0.25), inset 0px -1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 250px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.grey};
    border-radius: 8px;
    border: 2px solid transparent;
  }
`;
export const DropdownListItem = styled.li`
 font-size: 18px;
 padding: 12.5px 0;
 text-align: center;
 cursor: pointer;
 &:hover {
  background: ${colors.mainLight};
 }
`;

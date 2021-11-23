import styled from 'styled-components';
import icSearch from '@/images/ic-search-grey.svg';
import emptyBg from '@/images/empty-card.svg';
import { Link } from 'react-router-dom';
import { colors, desktopMedia } from '@/const';

// Common

export const Container = styled.div`
min-height: 100vh;
${desktopMedia(`
display: flex;
`)}
`;

export const PageWrapper = styled.div`
padding: 25px 26px 40px;
flex: 1;
${desktopMedia(`
padding: 46px 82px 67px;
`)}
`;

export const PageTitle = styled.h1`
font-size: 16px;
text-transform: uppercase;
color: var(--light);
${desktopMedia(`
font-size: 26px;
letter-spacing: 1.5px;
`)}`;

export const SecondTitle = styled.h2`
font-size: 20px;
color: var(--text-medium);
margin-bottom: 1.5em;
`;

export const ItemTitle = styled.h3`
color: var(--light);
font-size: 18px;
margin-bottom: 0.5em;
`;

export const TitleSplit = styled.hr`
border: 0;
margin: 0 0.5em;
border-right: 2px solid var(--light);
display: inline-block;
vertical-align: -2px;
height: 0.8em;
${desktopMedia(`
border-right-width: 3px;
`)}
`

export const Board = styled.div`
position: relative;
background: #FFFFFF;
box-shadow: 2px 4px 7px rgba(196, 196, 196, 0.11);
border-radius: 16px;
overflow: hidden;
`;

export const StripedList = styled.ul`
> li {
  line-height: 1.7;
  > a {
    display: block;
    padding: 24px 20px;
    font-weight: 500;
    color: var(--text-medium);
    font-size: 14px;
    ${desktopMedia(`
      padding: 24px 70px;
      font-size: 18px;
    `)}
  }
  &:nth-child(odd) {
    background: #F6F7FF;
  }
  &:nth-child(even) {
    background: #ECEEFF;
  }
   + li {
    margin-top: 2px;
  }
}
max-height: calc(100vh - 380px);
overflow-y: scroll;
&::-webkit-scrollbar {
  width: 6px;
}
&::-webkit-scrollbar-track {
  background: #F6F7FF;
}
&::-webkit-scrollbar-thumb {
  background: var(--light);
  border-radius: 6px;
  &:hover {
    background: var(--tint);
  }
}
`;

export const StopsStripedList = styled.ul`
> li {
  line-height: 1.7;
  font-size: 14px;
  display: flex;
  align-items:center;
  &:nth-child(odd) {
    background: #F2F2F2;
  }
  &:nth-child(even) {
    background: #FEFCFC;
  }
}
max-height: calc(100% - 40px);
overflow-y: scroll;
&::-webkit-scrollbar {
  width: 5px;
}
&::-webkit-scrollbar-track {
  background: #F6F7FF;
}
&::-webkit-scrollbar-thumb {
  background: #C4C4C4;
  &:hover {
    background: var(--text-medium);
  }
}
`;

export const TabList = styled.ul`
display: flex;
width: 100%;
> li {
  flex: 1;
  padding: 0.75em 1em;
  font-size: 18px;
  font-weight: bold;
  background-color: #BFCDFF;
  color: #fff;
  text-align: center;
  cursor: pointer;
  &.active {
    background-color: var(--light);
    cursor: default;
  }
  &:first-child {
    border-top-left-radius: 16px;
  }
  &:last-child {
    border-top-right-radius: 16px;
  }
}
`;

export const TitleWithSearch = styled.div`
display: flex;
align-items:center;
flex-wrap: wrap;
justify-content: space-between;
margin-bottom: 16px;
`;

// Menu
export const MenuWrapper = styled.div`
box-shadow: 3px 2px 6px rgba(121, 121, 121, 0.25);
background: var(--light);
${desktopMedia(`
border-radius: 16px;
`)}
`;

export const LinkLogo = styled(Link)`
padding: 14px;
display: block;
> img {
  width: 70px;
}
${desktopMedia(`
border-bottom: 1px solid rgba(255, 255, 255, 0.5);
padding: 40px 20px;
> img {
  width: 100px;
}
`)}
`;

export const NavList = styled.ul`
display: flex;
flex-direction: column;
align-items:center;
`;

export const NavListItem = styled.li`
${desktopMedia(`
margin-top: 38px;
`)}
`;

export const NavLink = styled(Link)`
display: flex;
align-items: center;
&.active, &:hover {
  background-color: #2A4AC2;
}
${desktopMedia(`
border-radius: 16px;
width: 62px;
height: 62px;
justify-content: center;
`)}
`;

// Modal

export const Overlay = styled.div`
position: fixed;
left: 0;
top: 0;
right: 0;
bottom: 0;
background: #486ae880;
z-index: 1000;
`;

export const ModalWrapper = styled.div`
overflow-y: scroll;
height: 100vh;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
&::-webkit-scrollbar {
  width: 0;
}
`;

export const Modal = styled.div`
border-radius: 16px;
background: #fff;
padding: 20px;
margin: 20px;
width: 600px;
${desktopMedia(`
padding: 24px 36px;
`)}
`;

export const MapContainer = styled.div`
height: 360px;
border-radius: 16px;
margin-top: 20px;
`;

// Quick Search

export const SearchInput = styled.input`
outline: none;
width: 100%;
font-family: inherit;
font-size: 18px;
background: url(${icSearch}) right 24px center/22px no-repeat, #ffffff;
box-shadow: 4px 4px 25px rgba(148, 148, 148, 0.25);
border-radius: 16px;
border: 0;
padding: 12px 30px 12px 12px;
text-align: center;
color: var(--text-dark);
&::-webkit-placeholder {
  color: var(--text-medium);
}
`

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  ${desktopMedia(`
    width: 300px;
  `)}
`;

export const DropdownList = styled.ul`
  position: absolute;
  z-index: 1001;
  top: calc(100% + 16px);
  box-shadow: 4px 4px 25px rgba(148, 148, 148, 0.25);
  border-radius: 16px;
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 140px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.light};
    border-radius: 6px;
    border: 2px solid #F5F6FF;
  }
`;

export const DropdownListItem = styled.li`
 font-size: 18px;
 padding: 12px;
 text-align: center;
 cursor: pointer;
 background: #fff;
 &:nth-child(odd) {
  background: #F5F6FF;
 }
 &:hover {
  background: ${colors.mainLight};
 }
`;

// Empty

export const EmptyWrapper = styled.div`
text-align: center;
background: url(${emptyBg}) center bottom 10%/cover no-repeat;
height: 30vw;
min-height: 240px;
max-height: 340px;
padding: 60px 30px;
`;

export const EmptyText = styled.div`
color: #bfcdff;
font-size: 18px;
letter-spacing: 0.05em;
`;

// Search

export const SearchWrapper = styled.div`
height: calc(100vh - 200px);
display:flex;
`;

export const SearchCol1 = styled.div`
flex: 3;
display: flex;
flex-direction: column;
margin-right: 28px;
> div {
  flex: 1;
  max-height:calc(50% - 14px);
  > div {
    height: 100%;
  }
  &:first-child {
    margin-bottom: 28px;
  }
}
${EmptyWrapper} {
  height: 100%;
  min-height: auto;
  padding: 40px 20px;
}
`;

export const SearchCol2 = styled.div`
flex: 5;
`;

export const ClockText = styled.div`
position: absolute;
left: 50%;
top: 30%;
transform: translate(-50%, 0);
font-size: 72px;
color: #fff;
`;
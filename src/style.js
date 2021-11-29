import styled from 'styled-components';
import icSearch from '@/images/ic-search-grey.svg';
import icBus from '@/images/ic-bus-main.svg';
import emptyBg from '@/images/empty-card.svg';
import dashedBorder from '@/images/dashed-line.svg';
import { Link, NavLink } from 'react-router-dom';
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
max-height: 100vh;
overflow-y: scroll;
&::-webkit-scrollbar {
  width: 12px;
}
&::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: rgba(72,106,232,0.5);
  border: 2px solid #F5F6FF;
}
`)}
`;

export const PageTitle = styled.h1`
font-size: 16px;
text-transform: uppercase;
color: var(--light);
width: 100%;
${desktopMedia(`
font-size: 26px;
letter-spacing: 1.5px;
width: auto;
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

export const IconBtn = styled.button`
border: 0;
background: none;
padding: 0;
outline: 0;
cursor: pointer;
&:hover {
  opacity: 0.7
}
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
> li {
  line-height: 1.7;
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr 80px 90px;
  grid-column-gap: 12px;
  padding: 0.25em 1.5em;
  align-items: center;
  &:nth-child(odd) {
    background: #F2F2F2;
  }
  &:nth-child(even) {
    background: #FEFCFC;
  }
}
`;

export const StopStatus = styled.span`
font-weight: bold;
letter-spacing: 0.05em;
text-align: center;
color: ${({children}) => {
  switch (children) {
    case '進站中':
      return 'var(--secondary)';
    case '末班車已過':
    case '今日未營運':
    case '尚未發車':
      return 'var(--text-medium)';
    default:
      return 'var(--light)';
  }
}};
`;

export const BusPlate = styled.span`
font-size: 12px;
color: var(--light);
padding-left: 32px;
background: url(${icBus}) 12px center/11px no-repeat;
`;

export const TabList = styled.ul`
display: flex;
width: 100%;
> li {
  flex: 1;
  padding: 0.75em 1em;
  font-size: ${({size}) => size === 'small' ? '14px' : '18px'};
  font-weight: bold;
  background-color: #BFCDFF;
  white-space: nowrap;
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

// Menu
export const MenuWrapper = styled.div`
box-shadow: 3px 2px 6px rgba(121, 121, 121, 0.25);
background: var(--light);
display: flex;
justify-content: space-between;
align-items: center;
${desktopMedia(`
border-radius: 16px;
display: block;
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
align-items:center;
${desktopMedia(`
flex-direction: column;
`)}
`;

export const NavListItem = styled.li`
margin-right: 16px;
${desktopMedia(`
margin-top: 38px;
margin-right: 0;
`)}
`;

export const MenuLink = styled(NavLink)`
display: flex;
align-items: center;
justify-content: center;
width: 40px;
height: 40px;
border-radius: 16px;
> img {
  width: 24px;
}
&.active, &:hover {
  background-color: #2A4AC2;
}
${desktopMedia(`
width: 62px;
height: 62px;
> img {
  width: auto;
}
`)}
`;

// Footer

export const FooterWrapper = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
align-items: center;
font-size: 12px;
color: var(--text-light);
a {
  color: var(--text-light);
  text-decoration: underline;
  &:hover {
    color: var(--text-medium);
  }
}
> div {
  margin-top: 10px;
}
${desktopMedia(`
margin-bottom: -30px;
`)}
`;

export const SourceFrom = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
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
margin: 0 20px;
width: 600px;
position: relative;
${IconBtn} {
  position: absolute;
  right: 12px;
  top: 12px;
}
${ItemTitle} {
  margin-right: 1em;
}
${desktopMedia(`
padding: 48px 36px;
width: 1100px;
`)}
`;

export const MapContainer = styled.div`
height: 360px;
border-radius: 16px;
margin-top: 20px;
${desktopMedia(`
margin-top: 0px;
`)}
`;

// Quick Search

export const SearchInput = styled.input`
outline: none;
width: 100%;
font-family: inherit;
background: url(${icSearch}) right 24px center/18px no-repeat, #ffffff;
box-shadow: 4px 4px 25px rgba(148, 148, 148, 0.25);
border-radius: 16px;
border: 0;
padding: 8px 24px 8px 12px;
text-align: center;
color: var(--text-dark);
&::placeholder {
  color: var(--text-medium);
}
${desktopMedia(`
font-size: 18px;
padding: 12px 30px 12px 12px;
background-size: 22px;
`)}
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
  &::-webkit-scrollbar-track {
    background: #ffffff;
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
height: 35vw;
min-height: 240px;
max-height: calc(100vh - 390px);
padding: 60px 30px;
`;

export const EmptyText = styled.div`
color: #bfcdff;
font-size: 18px;
letter-spacing: 0.05em;
`;

// Search

export const TitleWithSearch = styled.div`
display: flex;
align-items:center;
flex-wrap: wrap;
justify-content: flex-end;
margin-bottom: 16px;
${DropdownWrapper} {
  width: 160px;
}
${PageTitle} {
  margin-top: 10px;
}
${desktopMedia(`
justify-content: space-between;
${PageTitle} {
  order: -1;
  margin-top: 0px;
}
${DropdownWrapper} {
  width: 310px;
  margin-bottom: 0px;
}
`)}
`;

export const SearchWrapper = styled.div`
${desktopMedia(`
height: calc(100vh - 200px);
min-height: 650px;
display:flex;
`)}
`;

export const SearchCol1 = styled.div`
flex-basis: 380px;
display: flex;
flex-direction: column;
margin-bottom: 28px;
${desktopMedia(`
margin-right: 28px;
margin-bottom: 0px;
`)}
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
  min-height: 240px;
  max-height: none;
  padding: 40px 20px;
${desktopMedia(`
  min-height: auto;
`)}
}
`;

export const SearchCol2 = styled.div`
flex: 1;
`;

export const ClockText = styled.div`
position: absolute;
left: 50%;
top: 30%;
transform: translate(-50%, 0);
font-size: 72px;
color: #fff;
`;

export const SearchFieldWrapper = styled.div`
display: flex;
align-items: center;
padding: 12px 6px;
position: relative;
+ div {
  border-top: 1px dashed transparent;
  border-image: url('${dashedBorder}') 1 1 round;
}
> img {
  width: 20px;
  margin-right: 16px;
}
&:after{
  content: '';
  border-top: 11px solid var(--text-light);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  position: absolute;
  top: 50%;
  margin-top: -6px;
  right: 32px;
  z-index: 1;
}
${DropdownList} {
  top: calc(100% - 4px);
  max-height: 125px;
  max-width: 230px;
}
${DropdownListItem} {
  padding: 8px 12px;
}
${SearchInput} {
  background: none;
  box-shadow: none;
  font-weight: bold;
  text-align: left;
  font-size: 14px;
  color: var(--text-dark);
  &::placeholder {
    color: var(--text-light);
  }
}
`;

export const SearchBtn = styled.button`
border-radius: 20px;
background: var(--light);
text-align: center;
color: #fff;
padding: 0.5em 1em;
font-weight: bold;
font-size: 16px;
border: 0;
width: 90%;
display: block;
margin: 1em auto 0;
cursor: pointer;
`;

export const RouteMap = styled.div`
height: 100%;
min-height: 360px;
box-shadow: 1px 4px 15px rgba(140, 140, 140, 0.25);
border-radius: 16px;
.icon-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: var(--light);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
}
.icon-bus {
  padding: 6px;
  border-radius: 6px;
  font-size: 10px;
  text-align: center;
  width: 72px;
  background: var(--light);
  color: #fff;
  > img {
    display: block;
    margin: 0 auto;
  }
}
`;
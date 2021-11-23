import styled from 'styled-components';
import { colors, desktopMedia } from '@/const';

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
background: #FFFFFF;
box-shadow: 2px 4px 7px rgba(196, 196, 196, 0.11);
border-radius: 16px;
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

export const TabList = styled.ul`
display: flex;
width: 100%;
> li {
  flex-basis: 50%;
  max-width: 50%;
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
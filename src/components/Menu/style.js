import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { desktopMedia } from '@/const';

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
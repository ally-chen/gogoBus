import Logo from '@/images/logo.svg';
import icSearch from '@/images/ic-search.svg';
import icMapPin from '@/images/ic-map-pin.svg';
import icAlert from '@/images/ic-alert.svg';
import {MenuWrapper, LinkLogo, NavList, NavListItem, MenuLink as NavLink} from '@/style';

const Menu = () => (
  <MenuWrapper>
    <LinkLogo to="/"><img src={Logo} /></LinkLogo>
    <NavList>
      <NavListItem>
        <NavLink to="nearby"><img src={icMapPin} /></NavLink>
      </NavListItem>
      <NavListItem>
        <NavLink to="search"><img src={icSearch} /></NavLink>
      </NavListItem>
      <NavListItem>
        <NavLink to="news"><img src={icAlert} /></NavLink>
      </NavListItem>
    </NavList>
  </MenuWrapper>
);

export default Menu;
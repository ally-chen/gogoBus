import React from 'react';
import {useNavigate} from 'react-router-dom';
// import PropTypes from 'prop-types';
import { SearchInput, DropdownWrapper, DropdownList, DropdownListItem } from '@/style';
import {commonAxios} from '@/common';

const StyledSelect = () => {
  const navigate = useNavigate();
  const [options, setOptions] = React.useState([]);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const inputRef = React.useRef(null);

  const searchRoutes = (keyword) => {
    commonAxios({
      url: `/v2/Bus/Route/City/Taipei/${keyword}?$top=10`,
    }).then((res) => {
      setOptions(res?.map((n) => ({value: n.RouteUID, label: n.RouteName.Zh_tw})).sort((a, b) => a.label.localeCompare(b.label)));
    });
  };
  const onChange = (e) => {
    if (e.target.value) {
      searchRoutes(e.target.value);
    } else {
      setOptions([]);
    }
  };
  const onListSelect = (val) => {
    navigate(`/search/Taipei/${val}`);
  };

  React.useEffect(() => {
    const root = document.getElementById('root');
    const onOtherClick = (e) => {
      if (e.target !== inputRef.current) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      root.addEventListener('click', onOtherClick);
    }
    return () => {
      root.removeEventListener('click', onOtherClick);
    }
  }, [showDropdown]);

  React.useEffect(() => {
    if (options.length > 0) {
      setShowDropdown(true);
    }
  }, [options]);

  return (
    <DropdownWrapper>
      <SearchInput ref={inputRef} type="text" placeholder="快速搜尋" onChange={onChange} onFocus={() => setShowDropdown(true)} />
      {showDropdown && (
        <DropdownList>
          {options.map((opt) => <DropdownListItem key={opt.label} onClick={() => onListSelect(opt.value)}>{opt.label}</DropdownListItem>)}
        </DropdownList>
      )}
    </DropdownWrapper>
  );
};

export default StyledSelect;

// StyledSelect.propTypes = {
//   defaultValue: PropTypes.string.isRequired,
//   options: PropTypes.array.isRequired,
//   onSelect: PropTypes.func.isRequired
// };

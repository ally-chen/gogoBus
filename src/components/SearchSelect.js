import React from 'react';
// import PropTypes from 'prop-types';
import { SearchFieldWrapper, SearchInput, DropdownWrapper, DropdownList, DropdownListItem } from '@/style';

const SearchSelect = ({options, placeholder, onSelect, icon}) => {
  const [inputValue, setInputValue] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const inputRef = React.useRef(null);

  const onChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
    if (e.target.value) {
      setFilterOptions(options.filter((n) => n.label.includes(e.target.value)));
    } else {
      setFilterOptions(options);
    }
  };

  const onListClick = (option) => {
    setInputValue(option.label);
    onSelect(option.value);
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
      setFilterOptions(options);
    }
  }, [options]);

  return (
    <SearchFieldWrapper>
      <img src={icon} alt="" />
      <DropdownWrapper>
        <SearchInput
          ref={inputRef}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setShowDropdown(true)}
          autocomplete="off"
        />
        {showDropdown && (
          <DropdownList>
            {filterOptions.map((opt) => <DropdownListItem key={opt.label} onClick={() => onListClick(opt)}>{opt.label}</DropdownListItem>)}
          </DropdownList>
        )}
      </DropdownWrapper>
    </SearchFieldWrapper>
  );
};

export default SearchSelect;

// SearchSelect.propTypes = {
//   defaultValue: PropTypes.string.isRequired,
//   options: PropTypes.array.isRequired,
//   onSelect: PropTypes.func.isRequired
// };

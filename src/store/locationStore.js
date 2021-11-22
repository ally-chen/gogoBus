import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const LocationContext = createContext();

export const useLocationStore = () => useContext(LocationContext);

export const LocationContextProvider = ({ children }) => {
  const [locationData, setLocationData] = React.useState(null);

  return (
    <LocationContext.Provider
      value={{
        locationData,
        setLocationData,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

LocationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

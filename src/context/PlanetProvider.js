import PropTypes from 'prop-types';
import { useState, useMemo, useEffect, createContext } from 'react';
import FetchPlanets from '../services/FetchPlanets';

export const PlanetContext = createContext();

export function PlanetProvider({ children }) {
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const results = await FetchPlanets('https://swapi.dev/api/planets');
      setPlanetList(results);
    };
    fetch();
  }, []);

  const value = useMemo(() => ({
    planetList,
  }), [planetList]);

  return (
    <PlanetContext.Provider value={ { value } }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

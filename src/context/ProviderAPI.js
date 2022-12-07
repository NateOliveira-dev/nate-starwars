import { useState, useMemo, useEffect, createContext } from 'react';
import planetsAPI from '../services/PlanetsApi';

export const planetsContext = createContext();

export function ProviderAPI({ children }) {
  const [listOfPlanets, setListOfPlanets] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await planetsAPI('https://swapi.dev/api/planets');
      setListOfPlanets(response);
    };
    fetch();
  }, []);

  const PlanetValue = useMemo(() => ({
    listOfPlanets,
  }), [listOfPlanets]);

  return (
    <planetsContext.Provider value={ { PlanetValue } }>
      { children }
    </planetsContext.Provider>
  );
}

ProviderAPI.propTypes = {
  children: PropTypes.node.isRequired,
};

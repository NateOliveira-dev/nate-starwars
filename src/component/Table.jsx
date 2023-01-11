import React, { useContext, useState, useEffect } from 'react';
import { PlanetContext } from '../context/PlanetProvider';
import useFilter from '../hooks/useFilter';

function Table() {
  const planets = useContext(PlanetContext);
  const [planetsRender, setplanetsRender] = useState([]);
  const [filtersApply, setfiltersApply] = useState([]);
  const arrayDefault = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [arrOpt, setarrOpt] = useState(arrayDefault);
  const [column, setcolumn] = useState('population');
  const names = useFilter('');
  const compare = useFilter('maior que');
  const value = useFilter(0);

  const columnsHandleChange = ({ target }) => {
    setcolumn(target.value);
  };

  const defaultState = (col) => {
    compare.setFilter('maior que');
    value.setFilter(0);
    setcolumn(col);
  };

  const filterToApply = (i) => {
    const filter = filtersApply;
    filter.splice(i, 1);
    setfiltersApply(filter);
  };

  const filtersDone = (arr) => filtersApply.reduce((acc, curr) => acc
    .filter((planet) => {
      switch (curr.comparacao) {
      case 'maior que':
        return +planet[curr.categoria] > +curr.valor;
      case 'menor que':
        return +planet[curr.categoria] < +curr.valor;
      default:
        return +planet[curr.categoria] === +curr.valor;
      }
    }), arr);

  useEffect(() => {
    setplanetsRender(planets.value.planetList);
  }, [planets.value.planetList]);

  const allPlanets = planets.value.planetList;

  useEffect(() => {
    const filteredNames = allPlanets.filter((planet) => planet.name.toLowerCase()
      .includes(names.filter.toLowerCase()));
    const filteredCollumn = filtersDone(filteredNames);
    setplanetsRender(filteredCollumn);
  }, [names.filter, arrOpt]);

  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        value={ names.filter }
        onChange={ names.handleChange }
      />

      <select
        data-testid="column-filter"
        onChange={ columnsHandleChange }
        onClick={ columnsHandleChange }
      >
        {arrOpt.map((e) => (

          <option
            key={ e }
            value={ e }
          >
            {e}
          </option>

        ))}
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ compare.handleChange }

      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ value.filter }
        onChange={ value.handleChange }
      />

      <button
        type="button"
        data-testid="button-filter"
        disabled={ arrOpt.length === 0 }
        onClick={ () => {
          setfiltersApply([...filtersApply,
            { categoria: column, comparacao: compare.filter, valor: value.filter }]);
          const newArr = arrOpt.filter((e) => e !== column);
          setarrOpt(newArr);
          defaultState(newArr[0]);
        } }
      >
        Adicionar filtro
      </button>

      {filtersApply.map(({ cat, com, val }, i) => (
        <div
          key={ i }
          data-testid="filter"
        >
          {`${cat} ${com} ${val}`}
          <button
            type="button"
            onClick={ () => {
              filterToApply(i);
              setarrOpt([cat, ...arrOpt]);
            } }
          >
            X

          </button>
        </div>
      ))}
      {filtersApply.length > 1
       && (
         <button
           data-testid="button-remove-filters"
           type="button"
           onClick={ () => {
             setarrOpt(arrayDefault);
             setfiltersApply([]);
           } }
         >
           Remova todas os filtros
         </button>
       )}

      <table>
        <thead>
          <tr>
            <th data-testid="planet-name">Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {planetsRender
            .map((elements) => {
              const { name, rotationPeriod, orbitalPeriod,
                diameter, climate, gravity, terrain, surfaceWater,
                population, films, created, edited, url } = elements;
              return (
                <tr key={ name }>
                  <td>{name}</td>
                  <td>{rotationPeriod}</td>
                  <td>{orbitalPeriod}</td>
                  <td>{diameter}</td>
                  <td>{climate}</td>
                  <td>{gravity}</td>
                  <td>{terrain}</td>
                  <td>{surfaceWater}</td>
                  <td>{population}</td>
                  <td>{films}</td>
                  <td>{created}</td>
                  <td>{edited}</td>
                  <td>{url}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default Table;

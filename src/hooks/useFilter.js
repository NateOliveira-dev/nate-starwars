import { useState } from 'react';

function useFilter(firstValue) {
  const [filter, setFilter] = useState(firstValue);

  function handleChange({ target }) {
    setFilter(target.value);
  }

  return ({ filter, handleChange, setFilter });
}

export default useFilter;

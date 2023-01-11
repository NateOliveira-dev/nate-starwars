// import React from 'react';
// import './App.css';
// import Table from './component/Table';
// import { ProviderAPI } from './context/ProviderAPI';

// function App() {
//   return (
//     <ProviderAPI>
//       <Table />
//     </ProviderAPI>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import Table from './component/Table';
import { PlanetProvider } from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <Table />
    </PlanetProvider>
  );
}

export default App;

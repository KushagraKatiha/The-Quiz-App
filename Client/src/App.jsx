import React from 'react';
import {Outlet} from 'react-router-dom';
import AvailableTests from './Component/AvailableTests';

const App = () => {
  return (
    <>
      <Outlet/>
    </>
  );
};

export default App;

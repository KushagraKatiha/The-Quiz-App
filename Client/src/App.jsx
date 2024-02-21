import React from 'react';
import {Outlet} from 'react-router-dom';
import AddQuestionComponent from './Component/AddQuestionComponent';
import ShowQuestionComponent from './Component/ShowQuestionComponent';

const App = () => {
  return (
    <>
      <AddQuestionComponent/>
      <ShowQuestionComponent/>
      <Outlet/>
    </>
  );
};

export default App;

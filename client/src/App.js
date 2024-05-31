import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import New from './pages/new-pages/New';
import Update from './pages/update-pages/Update';
import ClassObject from './pages/ClassObject';
import TimeTable from './pages/TimeTable';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/update/:ttRoute' element={<Update />} />
        <Route path='/class/:classRoute' element={<ClassObject />} />
        <Route path=':ttRoute' element={<TimeTable />} />
      </Routes>
    </>
  );
}

export default App;

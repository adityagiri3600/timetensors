import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import New from './pages/New';
import Update from './pages/Update';
import TimeTable from './pages/TimeTable';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/update/:ttRoute' element={<Update />} />
        <Route path=':ttRoute' element={<TimeTable />} />
      </Routes>
    </>
  );
}

export default App;

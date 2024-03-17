import React from 'react';
import {Routes, Route} from "react-router-dom";
import Section from './pages/Section';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path=':section' element={<Section />} />
      </Routes>
    </>
  );
}

export default App;

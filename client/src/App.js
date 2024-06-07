import React from 'react';
import {Routes, Route} from "react-router-dom";
import AnimatedRoutes from './AnimatedRoutes';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<AnimatedRoutes />} />
      </Routes>
    </>
  );
}

export default App;

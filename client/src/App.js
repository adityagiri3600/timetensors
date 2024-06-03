import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import New from './pages/new-pages/New';
import Update from './pages/update-pages/Update';
import ClassObject from './pages/ClassObject';
import TimeTable from './pages/TimeTable';
import './App.css';
import NewUpdate from './pages/update-pages/NewUpdate';
import Metadata from './pages/update-pages/Metadata';
import Regular from './pages/update-pages/Regular';
import Events from './pages/update-pages/Events';
import AddExtraClasses from './pages/update-pages/AddExtraClasses';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/newupdate/:ttRoute' element={<NewUpdate />} />
        <Route path='/update/metadata/:ttRoute' element={<Metadata />} />
        <Route path='/update/regular/:ttRoute' element={<Regular />} />
        <Route path='/update/events/:ttRoute' element={<Events />} />
        <Route path='/update/extraclass/:ttRoute' element={<AddExtraClasses />} />
        <Route path='/update/:ttRoute' element={<Update />} />
        <Route path='/class/:classRoute' element={<ClassObject />} />
        <Route path=':ttRoute' element={<TimeTable />} />
      </Routes>
    </>
  );
}

export default App;

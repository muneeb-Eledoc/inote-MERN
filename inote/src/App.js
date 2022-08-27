import React, { useState } from 'react'
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState  from './components/context/NoteState';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [progress, setProgress] = useState(0)
  return (
    <div className="App">
      <NoteState>
        <BrowserRouter>
          <LoadingBar
          color='#f11946'
          progress={progress}
          />
          <Routes>
            <Route path="/" element={<Home setprogress={setProgress}/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;

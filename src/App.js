import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Contactus from './Contact';
import Login from './screens/Login';
import Header from './components/header';
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contactus />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
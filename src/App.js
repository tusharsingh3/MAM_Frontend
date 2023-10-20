import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Contactus from './Contact';
import Login from './screens/Login';
import Channels from './screens/Channels';
import Header from './components/header';
import './App.css'
import Register from './screens/Register';

function App() {
  return (
    <div>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/roles" element={<Contactus />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
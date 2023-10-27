import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import ContactUs from './screens/Contact';
import loginModel from './screens/Login';
import channelModel from './screens/Channels';
import Header from './components/header';
import Register from './screens/Register';
import rolesModel from './screens/Roles';
import './App.css'


function App() {
  return (
    <div>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<loginModel.Form />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/channels" element={<channelModel.Grid />} />
          <Route path="/roles" element={<rolesModel.Grid />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
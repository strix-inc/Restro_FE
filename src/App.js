import React, { useState } from 'react';
import Kot from './components/kot/Kot';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import SignUpForm from './components/SignUp/SignUpForm';
import OrderedKT from "./components/kot/ItemTicket/OrederedKT";
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import KotHistory from './components/kot history/KotHistory';
import HomePage from './components/homepage/Index';
import ItemMenu from './components/menu/ItemMenu';
import Setting from './components/setting/Setting';

function App() {
  // covert the page in dark mode and as well light mode !!
  const [mode, setMode] = useState();
  const OnClickMoon = () => {
    setMode('black');
  }
  const OnClickSun = () => {
    setMode('white');
  }


  // Checking wether the user is loggedIN or loggedOUT 
  const [IsLoggedIn, setLoggedIn] = useState(false);
  const loggedOut = () => {
    localStorage.removeItem('access');
    setLoggedIn(false);
    window.location = '/login';
  }

  return (
    <div className={`${mode === 'black' ? 'inBlack' : 'inWhite'} w-[100%] h-[100vh] overflow-auto`}>
      <Navbar mode={mode} OnClickMoon={OnClickMoon} OnClickSun={OnClickSun} loggedOut={loggedOut} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route exact path='/dashboard' element={<Dashboard mode={mode} />} />
        <Route exact path='/kot' element={<Kot mode={mode} />} />
        <Route exact path='/KT' element={<OrderedKT />} />
        <Route exact path='/kotHistory' element={<KotHistory mode={mode} />} />
        <Route exact path='/menu' element={<ItemMenu mode={mode} />} />
        <Route exact path='/setting' element={<Setting mode={mode} />} />
        <Route exact path='/login' element={<Login setLoggedIn={setLoggedIn} IsLoggedIn={IsLoggedIn} />} />
        <Route exact path='/signUp' element={<SignUpForm />} />
      </Routes>
    </div>
  )
}

export default App;

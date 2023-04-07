import React, { useEffect, useState } from 'react';
import Kot from './components/kot/Kot';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import SignUpForm from './components/SignUp/SignUpForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import KotHistory from './components/kot history/KotHistory';
import HomePage from './components/homepage/Index';
import ItemMenu from './components/menu/ItemMenu';
import Setting from './components/setting/Setting';
import Bill from './components/GenerateBill/Bill';
import AddStaff from './components/setting/AddStaff';
import GeneratedInvoice from './components/GenerateBill/GeneratedInvoice';
import SaleHistory from './components/dashboard/SaleHistory';
import PrintKotHistory from './components/kot history/PrintKotHistory';
import PrivateRoute from './components/ProtectRoute/PrivateRoute';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';




function App() {

  // covert the page in dark mode and as well light mode !!
  const bg_mode = localStorage.getItem('modes');
  const [mode, setMode] = useState(bg_mode);
  const OnClickMoon = () => {
    // Add mode to black
    localStorage.setItem('modes', 'black');
    const modes = localStorage.getItem('modes');
    setMode(modes);
  }
  const OnClickSun = () => {
    // Add mode to white
    localStorage.setItem('modes', 'white');
    const modes = localStorage.getItem('modes');
    setMode(modes);
  }

  useEffect(() => {
  }, [])


  // Checking wether the user is loggedIN or loggedOUT 
  const [IsLoggedIn, setLoggedIn] = useState(false);
  const loggedOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    window.location = 'login';
  }

  return (
    <div className={`${mode === 'black' ? 'inBlack' : 'inWhite'} w-[100%] h-[100vh] overflow-auto scrollbar-hide`}>
      <BrowserRouter>
        <Navbar mode={mode} OnClickMoon={OnClickMoon} OnClickSun={OnClickSun} loggedOut={loggedOut} />
        <Routes>
          <Route path='/' element={
            <ProtectRoute>
              <HomePage />
            </ProtectRoute>
          } />
          <Route path='signUp' element={<SignUpForm />} />
          <Route path='login' element={<Login setLoggedIn={setLoggedIn} IsLoggedIn={IsLoggedIn} />} />
          <Route path='dashboard' element={
            <PrivateRoute>
              <Dashboard mode={mode} />
            </PrivateRoute>
          } />
          <Route path='salehistory' element={
            <PrivateRoute>
              <SaleHistory />
            </PrivateRoute>
          } />
          <Route path='kot' element={
            <PrivateRoute>
              <Kot mode={mode} />
            </PrivateRoute>
          } />
          <Route path='bill' element={
            <PrivateRoute>
              <Bill mode={mode} />
            </PrivateRoute>
          } />
          <Route path='invoice' element={
            <PrivateRoute>
              <GeneratedInvoice />
            </PrivateRoute>
          } />
          <Route path='kotHistory' element={
            <PrivateRoute>
              <KotHistory mode={mode} />
            </PrivateRoute>
          } />
          <Route path='kotbill' element={
            <PrivateRoute>
              <PrintKotHistory />
            </PrivateRoute>
          } />
          <Route path='menu' element={
            <PrivateRoute>
              <ItemMenu mode={mode} />
            </PrivateRoute>
          } />
          <Route path='setting' element={
            <PrivateRoute>
              <Setting mode={mode} />
            </PrivateRoute>
          } />
          <Route path='addstaff' element={
            <PrivateRoute>
              <AddStaff mode={mode} />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

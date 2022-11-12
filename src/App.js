
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
   <>

   <BrowserRouter>
   <Routes>
    <Route path={"/"} element={<SignIn/>}/>
    <Route path={"/signUp"} element={<SignUp/>}/>
    <Route path={"/home"} element={<Home/>}/>
   </Routes>
   </BrowserRouter>
   
   </>
  );
}

export default App;

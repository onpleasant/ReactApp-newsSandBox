import React from 'react';
import {HashRouter,Navigate,Route, Routes} from 'react-router-dom'
import Login from '../views/login/login';
import NewsSandBox from '../views/sandbox/NewsSandBox';

export default function IndexRouter() {
  return (
  <HashRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={ localStorage.getItem('token') ? <NewsSandBox /> : <Navigate to={"/login"} />} />
    </Routes>
  </HashRouter>
  );
}
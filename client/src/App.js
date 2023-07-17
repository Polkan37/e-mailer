import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import useMelissaToken from './utils/useMelissaToken';
import useLicaToken from './utils/useLicaToken';


function App() {
  const { melissaToken, setMelissaToken } = useMelissaToken();
  const { licaToken, setLicaToken } = useLicaToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!melissaToken || !licaToken) {
      console.log('you need to login')
      navigate("login");
    }
  }, [melissaToken, licaToken])

  return (
    <Routes>
      <Route path="*" element={<Home licaToken={licaToken} melissaToken={melissaToken} />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;

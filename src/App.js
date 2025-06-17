import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { LoginScreen } from "./pages/loginScreen/LoginScreen";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

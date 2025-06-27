import React from "react";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import {LoginPage} from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import {CreateUserPage} from "./pages/createUser/CreateUserPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Outlet />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<CreateUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

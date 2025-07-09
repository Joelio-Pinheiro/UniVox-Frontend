import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import { CreateUserPage } from "./pages/createUser/CreateUserPage";
import { EmailForResetPage } from "./pages/emailForReset/EmailForResetPage";
import { NewPasswordPage } from "./pages/newPassword/NewPasswordPage";
import { EmailCodePage } from "./pages/emailCode/EmailCodePage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Outlet />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} /> 
          <Route path="register" element={<CreateUserPage />} />
          <Route path="verify/:type" element={<EmailCodePage />} />
          <Route path="emailfornewpass" element={<EmailForResetPage />} />
          <Route path="newpassword" element={<NewPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

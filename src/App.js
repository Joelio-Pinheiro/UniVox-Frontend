import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import { CreateUserPage } from "./pages/createUser/CreateUserPage";
import { EmailForResetPage } from "./pages/passwordReset/EmailForResetPage";
import { CodeForResetPage } from "./pages/passwordReset/CodeForResetPage";
import { NewPasswordPage } from "./pages/newPassword/NewPasswordPage";
import { EmailConfirmPage } from "./pages/emailConfirmation/EmailConfirmPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Outlet />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<CreateUserPage />} />
          <Route path="verifyemail" element={<EmailConfirmPage />} />
          <Route path="emailfornewpass" element={<EmailForResetPage />} />
          <Route path="codeconfirm" element={<CodeForResetPage />} />
          <Route path="newpassword" element={<NewPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

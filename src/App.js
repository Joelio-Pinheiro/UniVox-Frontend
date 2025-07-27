import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import { CreateUserPage } from "./pages/createUser/CreateUserPage";
import { EmailForResetPage } from "./pages/emailForReset/EmailForResetPage";
import { NewPasswordPage } from "./pages/newPassword/NewPasswordPage";
import { EmailCodePage } from "./pages/emailCode/EmailCodePage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { CreatePostPage } from "./pages/createPost/CreatePostPage";
import MainLayout from "./layout/MainLayout";
import { FaqPage } from "./pages/faq/faqPage";
import { AlertProvider } from "./context/AlertContext";
import DetailPage from "./pages/detailPage/detailPage";

export function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <Routes>
          <Route exact path="/" element={<Outlet />}>
            <Route index element={<MainLayout children={<HomePage />} />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<CreateUserPage />} />
            <Route path="verify/:type" element={<EmailCodePage />} />
            <Route path="emailfornewpass" element={<EmailForResetPage />} />
            <Route path="newpassword" element={<NewPasswordPage />} />
            <Route
              path="profile"
              element={<MainLayout children={<ProfilePage />} />}
            />
            <Route
              path="create-post"
              element={<MainLayout children={<CreatePostPage />} />}
            />
            <Route
              path="faq"
              element={<MainLayout children={<FaqPage />} />}
            />
            <Route
              path="post/:id"
              element={<MainLayout children={<DetailPage />} />}
            />
            <Route
              path="create-post"
              element={<MainLayout children={<CreatePostPage />} />}
            />
          </Route>
        </Routes>
      </AlertProvider>
    </BrowserRouter>
  );
}

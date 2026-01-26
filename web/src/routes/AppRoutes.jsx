import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  LandingPage,
  LoginPage,
  RegisterPage,
} from "../pages/index.js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;

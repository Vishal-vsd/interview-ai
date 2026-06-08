import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import ProtectRoutes from "./ProtectedRoutes";
import Interview from "../pages/Interview";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectRoutes>
            <Dashboard />
          </ProtectRoutes>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectRoutes>
            <History />
          </ProtectRoutes>
        }
      />
      <Route
        path="/interview"
        element={
          <ProtectRoutes>
            <Interview />
          </ProtectRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

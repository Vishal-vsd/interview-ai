import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import ProtectRoutes from "./ProtectedRoutes";
import Interview from "../pages/Interview";
import InterviewDetails from "../pages/InterviewDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectRoutes>
            <Dashboard />
          </ProtectRoutes>
        }
      />
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
      <Route path="/history/:id" element={<ProtectRoutes>
        <InterviewDetails />
      </ProtectRoutes>} />
    </Routes>
  );
};

export default AppRoutes;

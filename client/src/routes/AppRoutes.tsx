import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import ProtectRoutes from "./ProtectedRoutes";
import Interview from "../pages/Interview";
import InterviewDetails from "../pages/InterviewDetails";
import AdminProtectedRoute from "./AdminProtectedRoutes";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import AdminUsers from "../pages/AdminUsers";
import AdminInterviews from "../pages/AdminInterviews";
import AdminInterviewDetails from "../pages/AdminInterviewDetails";
import AdminUserDetails from "../pages/AdminUserDetails";


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

      <Route
        path="/interview/retake/:id"
        element={
          <ProtectRoutes>
            <Interview />
          </ProtectRoutes>
        }
      />

      <Route
        path="/history/:id"
        element={
          <ProtectRoutes>
            <InterviewDetails />
          </ProtectRoutes>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="users" element={<AdminUsers />} />

        <Route path="users/:id" element={<AdminUserDetails />} />

        <Route path="interviews" element={<AdminInterviews />} />

        <Route path="interviews/:id" element={<AdminInterviewDetails />}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

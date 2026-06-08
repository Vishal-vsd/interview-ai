import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/history" element={<History/>} />
        </Routes>
    )
}

export default AppRoutes;
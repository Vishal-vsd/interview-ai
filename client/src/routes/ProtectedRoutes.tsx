import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectRoutes = ({children}: ProtectedRouteProps) => {

    const {user, loading} = useAuth();

    if(loading){
        return <div>Loading</div>
    }

    return user ? children : <Navigate to="/login" />
}

export default ProtectRoutes;
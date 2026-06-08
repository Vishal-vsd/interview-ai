import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { getMe } from "../services/authService";

interface AuthContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const data = await getMe();

                if(data.success) {
                    setUser(data.user)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setloading(false)
            }
        }

        fetchUser()
    }, [])

    return(
        <AuthContext.Provider value={{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used within AuthProvider")
    }

    return context;
}
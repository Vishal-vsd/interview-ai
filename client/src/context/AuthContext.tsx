import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>
}
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState(null);

    return(
        <AuthContext.Provider value={{user, setUser}}>
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
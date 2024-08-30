import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxiosInstance from "../services/AxiosInstance";
import { UserInterface } from "../interfaces/UserInterface";


interface AuthContextType {
    token: string | null;
    user: UserInterface | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true); // loading state to ensure token is set so every refresh will not return to login page.
    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance(token);


    // Refresh check local storage for token and reassigned to ensure token loss does not occur
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedJwtToken = localStorage.getItem('token');

        if (storedJwtToken && storedUser) {
            setUser(JSON.parse(storedUser));
            setToken(storedJwtToken);
        }

        setLoading(false);

    }, []);

    // Render loading text in the event that a slow load occurs. 
    if (loading) {
        return <div>Authenticating...</div>
    }



    const login = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            const { token, adminId, firstName, lastName, email: userEmail }: { token: string; adminId: string; firstName: string; lastName: string; email: string } = response.data;

            if (token && adminId && firstName && lastName && userEmail) {
                setToken(token);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({
                    adminId,
                    firstName,
                    lastName,
                    email: userEmail,
                    token
                }));

                setUser({
                    adminId,
                    firstName,
                    lastName,
                    email: userEmail,
                    token
                });
                navigate('/');
                console.log('Login successful');
            } else {
                throw new Error('Login response is missing expected fields');
            }
        } catch (error) {
            console.error('Login Failed: ', error);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };


    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Think of this as our custom useState() method but instead of useState we are using useAuth to access items from this context. 
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used with Auth Provider');
    }
    return context;
}
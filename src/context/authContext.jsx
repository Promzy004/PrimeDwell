import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(0);

    const navigate = useNavigate()

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(100);
            return;
        }

        try {
            setLoading(20)
            await delay(4000)

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setLoading(60)

            const res = await axios.get("http://127.0.0.1:8000/api/user");
            setLoading(100)
            setUser(res.data);

            console.log(loading)
        } catch (err) {
            console.error("Auth check failed:", err);
        } finally {
            setLoading(100)

            console.log(loading)
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const logout = async () => {
        try{
            await axios.post("http://127.0.0.1:8000/api/logout")
        } catch (err) {
            console.error("Logout error:")
        } finally {
            localStorage.removeItem('token')
            setUser(null)
            delete axios.defaults.headers.common["Authorization"]
            navigate('/login')
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, setUser, loading, logout, fetchUser}}
        >
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;
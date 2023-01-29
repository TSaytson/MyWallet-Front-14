import { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({children}){
    
    const [token, setToken] = useState(null);
    const [name, setName] = useState('');
    const REACT_APP_API_URL = 'http://localhost:5000';
    // const REACT_APP_API_URL = 'https://mywallet-api-jy4z.onrender.com';
    
    return(
        <AuthContext.Provider value={ { name, setName, token, setToken, REACT_APP_API_URL } } >
            {children}
        </AuthContext.Provider>
    );

}
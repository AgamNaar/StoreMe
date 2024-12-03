import { createContext, useContext, useState, useEffect } from 'react';

// Creating the context
const GlobalContext = createContext();

// Custom hook to access the global context
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalContext provider component
const GlobalContextProvider = ({ children }) => {
    // State to track login status, user data, and loading state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authToken, setAuthToken] = useState(null);  // Add token state

    // Retrieve token from localStorage on initial load
    useEffect(() => {
        // const token = localStorage.getItem('authToken');
        // if (token) {
        //     setAuthToken(token);
        //     setIsLoggedIn(true);  // User is logged in if token exists
        //     // Optionally, you could also fetch user data using the token
        // }
        setIsLoading(false);  // Finish loading once the check is done
    }, []);

    // Function to log in and save token to context and localStorage
    const login = (token, userData) => {
        setAuthToken(token);
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('authToken', token);
    };

    // Function to log out and remove token from context and localStorage
    const logout = () => {
        setAuthToken(null);
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('authToken');
    };

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                user,
                isLoading,
                authToken,
                login,
                logout,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;

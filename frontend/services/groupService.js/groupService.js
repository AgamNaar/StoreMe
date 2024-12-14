// Class to handle auth services to the server (log in, create new account ect)
import fetchApi from '../api';

// Sign Up Function
export const getUserGroupList = async (authToken, setIsLoading) => {
    try {
        setIsLoading(true);  // This should work now because setIsLoading is passed correctly

        console.log('...................')
        console.log(authToken)

        // Send request to the server
        return await fetchApi('/users/getUserGroupList', 'GET', {}, authToken);
    } catch (error) {
        // Log the error and return a user-friendly message
        const errorForUser = errorHandler(error);
        console.log(error);
        throw new Error((errorForUser.message || error.message) || 'An error occurred during login.');
    } finally {
        setIsLoading(false); // Turn off loading
    }
}



// Login Function
export const loginRequest = async (email, password, setsSignUpToServer, setGlobalProviderAfterLogin) => {
    try {
        setsSignUpToServer(true);

        // Checks all info was entered
        if (!email || !password)
            throw new Error('Please enter all fields');

        // Send request to the server
        const data = await fetchApi('/users/login', 'POST', { email, password });

        setGlobalProviderAfterLogin(email, password, data.token)
    } catch (error) {
        // Log the error and return the user an error he can understand
        const errorForUser = errorHandler(error);
        console.log(error);
        throw new Error((errorForUser.message || error.message) || 'An error occurred during login.');
    } finally {
        setsSignUpToServer(false)
    }
}

// Instep of returning the row response to the user, send seething meaningful
const errorHandler = async (error) => {
    if (error == 'TypeError: Failed to fetch')
        return new Error('Failed to connect to server')
    return new Error(`Login failed: ${error.message}`);
}



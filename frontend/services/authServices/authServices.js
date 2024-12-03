// Class to handle auth services to the server (log in, create new account ect)
import fetchApi from '../api';

// Sign Up Function
export const signUpRequest = async (userName, email, password, rePassword, setsSignUpToServer) => {
    try {
        setsSignUpToServer(true);

        // Checks all info was entered
        if (!userName || !email || !password || !rePassword)
            throw new Error('Please enter all fields');

        // Check password and re password are the same
        if (password !== rePassword)
            throw new Error('Passwords do not match');


        // Send request to the server
        const data = await fetchApi('/users/signUp', 'POST', { email, password, userName });
        console.log(data)

        return data;
    } catch (error) {
        // Log the error and return the user an error he can understand
        const errorForUser = errorHandler(error);
        console.log(error);
        throw new Error((errorForUser.message || error.message) || 'An error occurred during login.');
    } finally {
        setsSignUpToServer(false)
    }
}


// Login Function
export const loginRequest = async (email, password, setsSignUpToServer) => {
    try {
        setsSignUpToServer(true);

        // Checks all info was entered
        if (!email || !password)
            throw new Error('Please enter all fields');

        // Send request to the server
        const data = await fetchApi('/users/login', 'POST', { email, password });

        return data;
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


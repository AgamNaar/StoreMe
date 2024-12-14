// API Base URL
const API_BASE_URL = 'http://192.168.14.114:6969';

// Generic fetch wrapper with timeout
const fetchApi = async (endpoint, method, body = null, authToken, headers = {}) => {
  const timeout = 10000; // 10 seconds
  const controller = new AbortController(); // Create an AbortController instance
  const signal = controller.signal; // Extract the signal



  const timeoutId = setTimeout(() => {
    controller.abort(); // Abort the fetch request after timeout
  }, timeout);

  try {
    // Only include the body for POST, PUT, PATCH, or DELETE methods
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken ? `Bearer ${authToken}` : '',
        ...headers,
      },
      signal, // Pass the signal to the fetch request
    };


    // Add the body only if it's allowed for the method
    if (body && method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    clearTimeout(timeoutId); // Clear the timeout if fetch succeeds

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error; // Throw other errors
  }
};

export default fetchApi;

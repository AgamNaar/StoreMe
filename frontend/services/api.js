// API Base URL
const API_BASE_URL = 'http://192.168.14.114:6969';

// Generic fetch wrapper with timeout
const fetchApi = async (endpoint, method, body = null, headers = {}, token) => {
  const timeout = 10000; // 10 seconds
  const controller = new AbortController(); // Create an AbortController instance
  const signal = controller.signal; // Extract the signal

  const timeoutId = setTimeout(() => {
    controller.abort(); // Abort the fetch request after timeout
  }, timeout);

  try {
    console.log(`${API_BASE_URL}${endpoint}`);
    console.log(JSON.stringify(body));

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
      signal, // Pass the signal to the fetch request
    });

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

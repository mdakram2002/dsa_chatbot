const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5000/api';

const handleResponse = async (response) => {
  // console.log('Response Details:', {
  //   status: response.status,
  //   statusText: response.statusText,
  //   url: response.url,
  //   ok: response.ok
  // });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Full error response:', errorText);
    throw new Error(`HTTP ${response.status}: ${errorText || 'Request failed'}`);
  }
  return response.json();
};

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  console.log('Making API request:', {
    url: url,
    method: options.method || 'GET',
    endpoint: endpoint
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    console.error('Failed URL:', url);
    throw error;
  }
};

export default apiRequest;
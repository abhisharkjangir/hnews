const API_ENDPOINTS = {
  search: 'search',
};

const getApiEndPoint = name => (name && API_ENDPOINTS[name]) || '';

export default getApiEndPoint;

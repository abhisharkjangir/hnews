import axios from './axios';
import getApiEndPoint from '../apis';

const apiService = ({ method = 'GET', url, data, appendUrl = '' }) => {
  // eslint-disable-next-line no-param-reassign
  url = getApiEndPoint(url) + appendUrl;
  return new Promise((resolve, reject) => {
    axios({ url, method, data })
      .then(response => {
        resolve({ ...response });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default apiService;

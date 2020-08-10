import isServer from './isServer';

export const setInLocalStorage = (key, value) => {
  if (!isServer) {
    localStorage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value
    );
    return true;
  }
  return false;
};

export const getFromLocalStorage = key => {
  if (!isServer) {
    const value = localStorage.getItem(key);
    return typeof value === 'string' ? JSON.parse(value) : value;
  }
  return false;
};

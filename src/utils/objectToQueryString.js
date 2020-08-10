const objectToQueryString = json => {
  return `?${Object.keys(json)
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
    })
    .join('&')}`;
};

export default objectToQueryString;

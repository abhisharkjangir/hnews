const queryStringToObject = queryString => {
  if (queryString === '') return {};
  return JSON.parse(
    `{"${decodeURI(queryString.replace(/&/g, '","').replace(/=/g, '":"'))}"}`
  );
};

export default queryStringToObject;

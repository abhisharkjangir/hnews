import React from 'react';

const Loading = () => <></>; // <div id='loading-ruc'>Loading -> React Universal Component</div>;

const Error = () => <></>; // <div id='error-ruc'>Error -> React Universal Component</div>;

// const Render = (props, Mod, isLoading, error) => <div id='render-ruc'>Render -> React Universal Component</div>;

const universalOptions = {
  loading: <Loading />,
  error: <Error />,
  timeout: 15000, // Default,
  // key
  // minDelay: 0,
  // alwaysDelay: false,
  // loadingTransition: true,
  // ignoreBabelRename: false, // default
  // render: (props, Mod, isLoading, error) => Render(props, Mod, isLoading, error),
  // onError:(error, { isServer }) => console.log("onError -> React Universal Component" ),
  // onLoad : (module, { isSync, isServer }, props, context) => console.log("onLoad -> React Universal Component" ),
};

export default universalOptions;

import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AppComponent from '../../components/app';
import '../../styles/common.css';

const App = props => {
  const location = useLocation();
  return <AppComponent {...props} location={location} />;
};

export default connect(null, null)(App);

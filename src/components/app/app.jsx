import React from 'react';
import PropTypes from 'prop-types';
import styles from './app.scss';
import Routes from '../../routes';
import Helmet from '../../containers/common/helmet/helmet';
import Header from '../Header/Header';

const App = ({ location }) => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes location={location} />
        <Helmet />
      </main>
    </div>
  );
};

App.propTypes = {
  location: PropTypes.object.isRequired,
};

App.defaultProps = {};

export default App;

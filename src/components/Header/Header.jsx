import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styles from './Header.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoWrapper}>
        <span className={styles.logo}>Y</span>
        {' Hacker News'}
      </Link>
    </header>
  );
};

Header.propTypes = {
  // name: PropTypes.string.isRequired,
  // className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Column = ({ children, className }) => {
  return <div className={classnames('col', className)}>{children}</div>;
};

Column.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Column.defaultProps = { className: '' };

export default Column;

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Clearfix = ({ children, className }) => {
  return <div className={classnames('clearfix', className)}>{children}</div>;
};

Clearfix.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Clearfix.defaultProps = { className: '' };

export default Clearfix;

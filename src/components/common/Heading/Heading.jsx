import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Heading = ({ level, className, children }) => {
  const Tag = `h${level}`;
  return <Tag className={classnames(Tag, className)}>{children}</Tag>;
};

Heading.propTypes = {
  level: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Heading.defaultProps = {
  className: '',
};

export default Heading;

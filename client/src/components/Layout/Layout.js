import React from 'react';
import { compose, join, map, omit } from 'ramda';
import styles from './Layout.module.css';
import { columnClassNamesFromProps } from './layout-utils';
import cx from 'classnames';

const COLUMN_MODIFIERS = ['xs', 'sm', 'span'];

const Container = ({ children, className = '', ...props }) => {
  return (
    <div className={`${styles.container} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Row = ({ children, className = '', options = {}, ...props }) => {
  return (
    <div
      className={cx(
        styles.row,
        className,
        { [styles.centerContent]: options.center },
        { [styles.spaceBetween]: options.spaceBetween }
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Col = ({ children, className = '', options = {}, ...props }) => {
  const columnBreakpoints = columnClassNamesFromProps(COLUMN_MODIFIERS, props);
  const columnClassNames = compose(
    join(' '),
    map(breakpointClassName => styles[breakpointClassName])
  )(columnBreakpoints);

  return (
    <div
      className={cx(
        styles.column,
        columnClassNames,
        className,
        { [styles.hidden]: options.hidden },
        { [styles.hiddenSm]: options.hiddenSm },
        { [styles.hiddenXs]: options.hiddenXs }
      )}
      {...omit(COLUMN_MODIFIERS, props)}
    >
      {children}
    </div>
  );
};

export { Container, Row, Col };

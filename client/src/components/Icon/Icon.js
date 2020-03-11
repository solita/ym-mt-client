import React from 'react';
import * as Icons from './icons';

const Icon = ({ name, color, size = 32, title, ...props }) => {
  const SvgIcon = Icons[name];
  const hasExtraProps = !!Object.entries(props).length;
  const iconElement = <SvgIcon color={color} size={size} title={title} />;

  if (hasExtraProps) {
    return <span {...props}>{iconElement}</span>;
  }

  return iconElement;
};

export default Icon;

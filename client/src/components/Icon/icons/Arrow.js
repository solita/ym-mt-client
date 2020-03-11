import React from 'react';

const Arrow = ({ classes = '', color = 'currentColor' }) => (
  <svg
    className={classes}
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="21"
    viewBox="0 0 14 21"
  >
    <text
      fill={color}
      fillRule="evenodd"
      fontFamily="Lato-Black, Lato"
      fontSize="22"
      fontWeight="700"
      transform="rotate(-90 -780 1567)"
    >
      <tspan x="765.5" y="2360">
        →
      </tspan>
    </text>
  </svg>
);

export default Arrow;

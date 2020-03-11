import React from 'react';

const RfoOutline = ({ color, size, title }) => (
  <svg
    version="1.1"
    id="RfoOutline"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 86.35 104.39"
    height={size}
    width={size}
  >
    <defs>
      <style>
        {`
          rect {
            stroke-miterlimit: 10;
            stroke-width: 2px;
          }
        `}
      </style>
    </defs>
    <title>{title}</title>
    <g>
      <rect fill="none" stroke={color} x="1" y="1" width="84.35" height="102.39" rx="4" ry="4" />
      <rect fill="none" stroke={color} x="14.09" y="13.6" width="58.18" height="28.78" />
      <rect fill="none" stroke={color} x="14.4" y="81.83" width="57.56" height="7.19" />
      <rect fill="none" stroke={color} x="14.4" y="67.44" width="57.56" height="7.19" />
      <rect fill="none" stroke={color} x="14.4" y="53.05" width="57.56" height="7.19" />
    </g>
  </svg>
);

export default RfoOutline;

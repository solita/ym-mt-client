import React from 'react';

const UserOutline = ({ color, size, title }) => (
  <svg
    version="1.1"
    id="UserOutline"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 56.62 68.12"
    height={size}
    width={size}
  >
    <defs>
      <style>
        {`
          path {
            stroke-miterlimit: 10;
            stroke-width: 2px;
          }
        `}
      </style>
    </defs>
    <title>{title}</title>
    <g>
      <path
        fill="none"
        stroke={color}
        d="M28.31,38.37c-9.6,0-15.81-7.34-15.81-18.69S18.71,1,28.31,1,44.12,8.34,44.12,19.69,37.91,38.37,28.31,38.37Z"
      />
      <path
        fill="none"
        stroke={color}
        d="M54.18,67.12H2.44A1.44,1.44,0,0,1,1,65.68,21.58,21.58,0,0,1,22.56,44.12h11.5A21.58,21.58,0,0,1,55.62,65.68,1.44,1.44,0,0,1,54.18,67.12Z"
      />
    </g>
  </svg>
);

export default UserOutline;

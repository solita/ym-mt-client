import React from 'react';

const Pennant = ({ color, size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.19 87" height={size} width={size}>
    <path
      stroke={color || '#000'}
      fill={'none'}
      d="M88.62,16.9c-57,22.83-33.94-38.62-78.18-6.27L1.19,14,19.52,86H29.61l-9-35.29C60.11,17.62,44.13,86.77,90.82,18.92,91.91,17.35,90.45,16.17,88.62,16.9Z"
    />
  </svg>
);

export default Pennant;

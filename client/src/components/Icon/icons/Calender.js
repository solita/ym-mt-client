import React from 'react';

const Calender = ({ classes = '', date = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.8 76.8">
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          fill="none"
          stroke="#231f20"
          strokeMiterlimit="10"
          strokeWidth="2px"
          d="M67.49,9.31H63.75v8.31H50.45V9.31H26.35v8.31H13.05V9.31H9.31A8.34,8.34,0,0,0,1,17.62V67.49A8.34,8.34,0,0,0,9.31,75.8H67.49a8.34,8.34,0,0,0,8.31-8.31V17.62A8.34,8.34,0,0,0,67.49,9.31Zm0,58.18H9.31V34.25H67.49ZM22.61,1H16.79V15.13h5.82ZM60,1H54.19V15.13H60Z"
        />
        <text
          fontSize="31px"
          fill="#231f20"
          fontFamily="Lato-Black, Lato"
          transform="translate(38 61.81)"
          width="40"
          textAnchor="middle"
        >
          {date}
        </text>
      </g>
    </g>
  </svg>
);

export default Calender;

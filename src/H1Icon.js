import React from "react";

export default ({ color = "#fff", size = 16 }) => (
  <svg
    height={size}
    viewBox="0 0 22 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M4 0H0V16H4V10H9V16H13V0H9V6H4V0ZM17 3H18H21H22V16H18V7H15L17 3Z"
        fill={color}
      />
    </g>
  </svg>
);

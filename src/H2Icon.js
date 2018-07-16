import React from "react";

export default ({ color = "#fff", size = 16 }) => (
  <svg
    height={size}
    viewBox="0 0 21 12"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path d="M0 0H3V5H7V0H10V12H7V8H3V12H0V0Z" fill={color} />
      <path
        d="M11.8569 4.66846V4.7124H14.3179V4.66113C14.3179 3.78955 14.9478 3.17432 15.856 3.17432C16.7275 3.17432 17.2988 3.69434 17.2988 4.4707C17.2988 5.09326 16.9033 5.62793 15.3506 7.06348L12.0107 10.2056V12H20.0454V9.90527H15.5923V9.76611L17.3354 8.16211C19.2104 6.49219 19.8989 5.45215 19.8989 4.28027C19.8989 2.4126 18.3169 1.14551 15.9512 1.14551C13.4976 1.14551 11.8569 2.56641 11.8569 4.66846Z"
        fill={color}
      />
    </g>
  </svg>
);

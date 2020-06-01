import React from 'react';
import SVG from '../SVG';

export const Delete = (props) => (
  <SVG {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
);

export const Edit = (props) => (
  <SVG {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
);

export const Play = (props) => (
  <SVG {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </SVG>
);

export const Add = (props) => (
  <SVG {...props}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
);

export const Exit = (props) => (
  <SVG {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </SVG>
);

export const Account = (props) => (
  <SVG {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
);

export const Cancel = (props) => (
  <SVG {...props}>
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
);

export const Close = (props) => (
  <SVG {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
);

export const Menu = (props) => (
  <SVG {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </SVG>
);

export const Search = (props) => (
  <SVG {...props}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
);

export const Back = (props) => (
  <SVG {...props}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
);

export const Verified = (props) => (
  <SVG {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </SVG>
);

export const Undo = (props) => (
  <SVG {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
  </SVG>
);

export const Remove = (props) => (
  <SVG {...props}>
    <path d="M19 13H5v-2h14v2z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </SVG>
);

export const Thumbnail = (props) => (
  <SVG {...props}>
    <polygon points="0 0 24 0 24 24 0 24" />
    <path
      d="M4,8 L8,8 L8,4 L4,4 L4,8 Z M10,20 L14,20 L14,16 L10,16 L10,20 Z M4,20 L8,20 L8,16 L4,16 L4,20 Z M4,14 L8,14 L8,10 L4,10 L4,14 Z M10,14 L14,14 L14,10 L10,10 L10,14 Z M16,4 L16,8 L20,8 L20,4 L16,4 Z M10,8 L14,8 L14,4 L10,4 L10,8 Z M16,14 L20,14 L20,10 L16,10 L16,14 Z M16,20 L20,20 L20,16 L16,16 L16,20 Z"
      fill={props.color || '#1D1D1D'}
    />
  </SVG>
);

export const List = (props) => (
  <SVG {...props}>
    <line
      stroke={props.color || '#000'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={props.strokeWidth || '2px'}
      x1="6"
      y1="7"
      x2="18"
      y2="7"
    />
    <line
      stroke={props.color || '#000'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={props.strokeWidth || '2px'}
      x1="6"
      y1="12"
      x2="18"
      y2="12"
    />
    <line
      stroke={props.color || '#000'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={props.strokeWidth || '2px'}
      x1="6"
      y1="17"
      x2="18"
      y2="17"
    />
  </SVG>
);

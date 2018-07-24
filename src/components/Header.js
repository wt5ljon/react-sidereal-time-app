import React from 'react';

const Header = (props) => (
  <div>
    <h1>WT5L Sidereal Time Calculator</h1>
    {props.subtitle && <h3>{props.subtitle}</h3>}
  </div>
);

export default Header;

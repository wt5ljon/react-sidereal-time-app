import React from 'react';

const Header = (props) => (
  <div className="header">
    <div className="container">
      <h1 className="header__title">Worldwide Julian Date and Sidereal Time</h1>
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
    </div>
  </div>
);

export default Header;

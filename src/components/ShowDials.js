import React from 'react';
import { calcJD, calcLST, parseTime } from './../utilities/astro';

export default class ShowDial extends React.Component {
  render() {
    const localTimeRotation = -((this.props.localHour * 15.0) + (this.props.localMinute * 0.25));
    const lstTimeRotation = -((this.props.lstHour * 15.0) + (this.props.lstMinute * 0.25));
    
    return (
      <div className="dials-container" style={this.props.show ? { } : { display: 'none' } }>
        <div>
          <img style={{ transform: `rotate(${lstTimeRotation}deg)`}} className="bottomdial" src="/images/clockface_2.png" width="650px" height="650px" />
          <img style={{ transform: `rotate(${localTimeRotation}deg)`}} className="topdial" src="/images/clockface_3.png" width="550px" height="550px"  />
          <img className="pointer" src="/images/pointer.png" width="2px" height="321px" />
        </div>
      </div>
    );
  };
}

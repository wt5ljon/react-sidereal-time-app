import React from 'react';
import { calcJD, calcLST, parseTime } from './../utilities/astro';

export default class ShowDial extends React.Component {
  render() {
    const localTimeRotation = -((this.props.localHour * 15.0) + (this.props.localMinute * 0.25));
    const lstTimeRotation = -((this.props.lstHour * 15.0) + (this.props.lstMinute * 0.25));
    
    return (
      <div>
        <span className="textData">
          <h3>Sidereal Time (Outer Scale): {('0' + this.props.lstHour).slice(-2)}:{('0' + this.props.lstMinute).slice(-2)}</h3>
          <h3>Local Time (Inner Scale): {('0' + this.props.localHour).slice(-2)}:{('0' + this.props.localMinute).slice(-2)}</h3>
        </span>
        <div className="dials-container" style={this.props.show ? { } : { display: 'none' } }>
          <div>
            <img style={{ transform: `rotate(${lstTimeRotation}deg)`}} className="bottomdial" src="/images/clockface_2.png" width="650px" height="650px" />
            <img style={{ transform: `rotate(${localTimeRotation}deg)`}} className="topdial" src="/images/clockface_3.png" width="550px" height="550px"  />
            <img className="pointer" src="/images/pointer.png" width="2px" height="321px" />
          </div>
        </div>
      </div>
      );
  };
}

import React from 'react';

export default class ShowDial extends React.Component {
  state = {
    mode: 'Automatic',
    sidereal: '',
    local: '',
  };

  onInputChange = (e) => {
    const input = e.target.value;
    if (input === '' || input.match(/^[0-2]$/) || input.match(/^[0-2][0-9]$/) || input.match(/^[0-2][0-9][0-5]$/) || input.match(/^[0-2][0-9][0-5][0-9]$/))  {
      if (e.target.name === 'siderealTime') {
        this.setState(() => ({ sidereal: input }));
      } else {
        this.setState(() => ({ local: input}));
      }
    }
  };

  onModeChange = () => {
    this.setState((prevState) => {
      return {
        mode: prevState.mode === 'Automatic' ? 'Manual' : 'Automatic'
      };
    });
  };

  render() {
    const { mode, sidereal, local } = this.state;
    const { localHour, localMinute, lstHour, lstMinute, show } = this.props;
    
    let localTimeRotation, lstTimeRotation;

    if (mode === 'Automatic') {
      localTimeRotation = -((localHour * 15.0) + (localMinute * 0.25));
      lstTimeRotation = -((lstHour * 15.0) + (lstMinute * 0.25));
    } else {
      if (sidereal.length === 4 && local.length === 4) {
        localTimeRotation = -((local.substr(0,2) * 15.0) + (local.substr(2) * 0.25));
        lstTimeRotation = -((sidereal.substr(0,2) * 15.0) + (sidereal.substr(2) * 0.25));
      } else {
        localTimeRotation = 0;
        lstTimeRotation = 0;
      }
    }

    return (
      <div>
        <span className="textData">
          <h3>Tool Mode: {mode}</h3>
          <button onClick={this.onModeChange}>Change Tool Mode</button>
        </span>
        <div className="dials-container" style={show ? { } : { display: 'none' } }>
          <div>
            <img style={{ transform: `rotate(${lstTimeRotation}deg)`}} className="bottomdial" src="/images/clockface_2.png" width="650px" height="650px" />
            <img style={{ transform: `rotate(${localTimeRotation}deg)`}} className="topdial" src="/images/clockface_3.png" width="550px" height="550px"  />
            <img className="pointer" src="/images/pointer.png" width="2px" height="321px" />
          </div>
        </div>
        <span className="textData">
          {mode === 'Automatic' && <h3>Sidereal Time (Outer Scale): {('0' + lstHour).slice(-2)}:{('0' + lstMinute).slice(-2)}</h3>}
          {mode === 'Automatic' && <h3>Local Time (Inner Scale): {('0' + localHour).slice(-2)}:{('0' + localMinute).slice(-2)}</h3>}
          {mode === 'Manual' && <h3>Sidereal Time: <input onChange={this.onInputChange} value={sidereal} name="siderealTime" placeholder="hhmm" /></h3>}
          {mode === 'Manual' && <h3>Local Time: <input onChange={this.onInputChange} value={local} name="localTime" placeholder="hhmm" /></h3>}
        </span>
      </div>
    );
  };
}

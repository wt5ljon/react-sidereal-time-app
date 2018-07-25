import React from 'react';
import moment from 'moment';
import { calcJD } from './../utilities/astro';

export default class ShowTime extends React.Component {
  state = {
    now: moment().local(),
    nowUTC: moment().utc()
  };

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  };

  tick() {
    this.setState(() => {
      return {
        now: moment().local(),
        nowUTC: moment().utc()
      }
    })
  };

  render() {
    return (
      <div>
        <h3>Local Date: {this.state.now.format("ddd, MMM D, YYYY")}</h3>
        <h3>Local Time: {this.state.now.format("HH:mm:ss")}</h3>
        <h3>UTC Date: {this.state.nowUTC.format("ddd, MMM D, YYYY")}</h3>
        <h3>UTC Time: {this.state.nowUTC.format("HH:mm:ss")}</h3>
        <h3>Julian Date: {calcJD(this.state.nowUTC, false)}</h3>
      </div>
    );
  };
}

import React from 'react';
import moment from 'moment';
import { calcJD } from './../utilities/astro';

export default class ShowTime extends React.Component {
  state = {
    nowLocal: moment().utc(),
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
        nowLocal: moment().utc(),
        nowUTC: moment().utc()
      }
    })
  };

  render() {
    // convert nowLocal from UTC to local time using time zone offset and dst offset
    this.state.nowLocal.add(this.props.location.rawOffset, 's').add(this.props.location.dstOffset, 's');

    return (
      <div>
        <h3>Local Date: {this.state.nowLocal.format("ddd, MMM D, YYYY")}</h3>
        <h3>Local Time: {this.state.nowLocal.format("HH:mm:ss")}</h3>
        <h3>UTC Date: {this.state.nowUTC.format("ddd, MMM D, YYYY")}</h3>
        <h3>UTC Time: {this.state.nowUTC.format("HH:mm:ss")}</h3>
        <h3>Julian Date: {calcJD(this.state.nowUTC).toFixed(5)}</h3>
      </div>
    );
  };
}
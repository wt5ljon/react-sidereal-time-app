import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { calcJD, calcLST, parseTime } from './../utilities/astro';

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
        <div className="block">
          <div className="block__details">
            <span className="row__data">
              <h3>Local Date</h3>
              <h3>{this.props.location.address && this.state.nowLocal.format("ddd, MMM D, YYYY")}</h3>
            </span>
            <span className="row__data">
              <h3>Local Time</h3>
              <h3>{this.props.location.address && this.state.nowLocal.format("HH:mm:ss")}</h3>
            </span>
            <span className="row__data">
              <h3>UTC Date</h3>
              <h3>{this.state.nowUTC.format("ddd, MMM D, YYYY")}</h3>
            </span>
            <span className="row__data row__data--last">
              <h3>UTC Time</h3>
              <h3>{this.state.nowUTC.format("HH:mm:ss")}</h3>
            </span>
          </div>
        </div>
        <div className="block">
          <div className="block__details">
            <span className="row__data">
              <h3>Julian Date</h3>
              <h3>{numeral(calcJD(this.state.nowUTC)).format('0,0.00000')}</h3>
            </span>
            <span className="row__data row__data--last">
              <h3>Sidereal Time</h3>
              <h3>{this.props.location.address && parseTime(calcLST(this.state.nowUTC, this.props.location.longitude))}</h3>
            </span>
          </div>
        </div>
      </div>
    );
  };
}
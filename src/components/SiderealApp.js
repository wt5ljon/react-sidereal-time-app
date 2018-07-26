import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Header from './Header';
import Location from './Location';
import ShowLocation from './ShowLocation';
import ShowTime from './ShowTime';

const apiKey = process.env.GEOCODE_API_KEY;

export default class SiderealApp extends React.Component {
  state = {
    location: undefined,
    error: undefined
  };

  handleGetLocation = (location) => {
    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`;
    axios.get(geocodeURL)
      .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
          throw ('Address not found');
        } else {
          this.setState(() => {
            return {
              location: {
                address: response.data.results[0].formatted_address,
                latitude: response.data.results[0].geometry.location.lat,
                longitude: response.data.results[0].geometry.location.lng
              },
              error: undefined
            };
          });
          const lat = response.data.results[0].geometry.location.lat;
          const lng = response.data.results[0].geometry.location.lng;
          const timestamp = moment().unix().valueOf();
          const timezoneURL = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${apiKey}`;
          return axios.get(timezoneURL);
        }
      })
      .then((response) => {
        this.setState((prevState) => {
          return {
            location: {
              address: prevState.location.address,
              latitude: prevState.location.latitude,
              longitude: prevState.location.longitude,
              timezone: response.data.timeZoneName,
              rawOffset: response.data.rawOffset,
              dstOffset: response.data.dstOffset  
            },
            error: undefined
          };
        });
      })
      .catch((error) => {
        this.setState(() => {
          return {
            location: undefined,
            error
          };
        });
      })
  }

  componentWillMount() {
    const json = localStorage.getItem('location');
    const data = JSON.parse(json);
    
    if (data) {
      this.setState(() => {
        return ({
          location: data.location 
        });
      });
    }
  }

  componentDidUpdate() {
    const json = JSON.stringify({
      location: this.state.location 
    });
    localStorage.setItem('location', json);
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Location
          handleGetLocation={this.handleGetLocation}
          buttonText={this.state.location.address ? "Change" : "Choose"}
        />
        <ShowLocation location={this.state.location} />
        <ShowTime location={this.state.location} />
      </div>
    );
  };
}
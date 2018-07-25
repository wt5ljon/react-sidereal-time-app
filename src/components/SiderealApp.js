import React from 'react';
import axios from 'axios';
import Header from './Header';
import Location from './Location';
import ShowTime from './ShowTime';

const apiKey = process.env.GEOCODE_API_KEY;

export default class SiderealApp extends React.Component {
  state = {
    address: undefined,
    latitude: undefined,
    longitude: undefined,
    error: undefined
  };

  handleGetLocation = (location) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${apiKey}`)
      .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
          throw ('Address not found');
        } else {
          this.setState(() => {
            return {
              address: response.data.results[0].formatted_address,
              latitude: response.data.results[0].geometry.location.lat,
              longitude: response.data.results[0].geometry.location.lng,
              error: undefined
            };
          });
        }
      })
      .catch((error) => {
        this.setState(() => {
          return {
            address: undefined,
            latitude: undefined,
            longitude: undefined,
            error
          };
        });
      })
  }

  componentDidMount() {
    const json = localStorage.getItem('location');
    const location = JSON.parse(json);

    if (location) {
      this.setState(() => {
        return ({
          address: location.address,
          latitude: location.latitude,
          longitude: location.longitude
        });
      });
    }
  }

  componentDidUpdate() {
    const json = JSON.stringify({
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    });
    localStorage.setItem('location', json);
  }

  render() {
    return (
      <div>
        <Header />
        <Location
          handleGetLocation={this.handleGetLocation}
          buttonText={this.state.address ? "Change" : "Choose"}
        />
        <div>
          {this.state.address && <h3>Location: {this.state.address}</h3>}
          {this.state.latitude && <h3>Latitude: {this.state.latitude}</h3>}
          {this.state.longitude && <h3>Longitude: {this.state.longitude}</h3>}
          {this.state.error && <h3>Error: {this.state.error}</h3>}
        </div>
        <ShowTime />
      </div>
    );
  };
}
import React from 'react';

const ShowLocation = (props) => {
    return (
        <div>
          {props.location.address && <h3>Location: {props.location.address}</h3>}
          {props.location.latitude && <h3>Latitude: {props.location.latitude.toFixed(4)}</h3>}
          {props.location.longitude && <h3>Longitude: {props.location.longitude.toFixed(4)}</h3>}
          {props.location.timezone && <h3>Time Zone: {props.location.timezone}</h3>}
          {props.location.error && <h3>Error: {props.location.error}</h3>}
        </div>
    );
};

export default ShowLocation;
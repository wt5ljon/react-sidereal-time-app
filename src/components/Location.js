import React from 'react';

const Location = (props) => {
  const handleSearchLocation = (e) => {
    e.preventDefault();
    const location = e.target.elements.location.value.trim();
    props.handleGetLocation(location);
    e.target.elements.location.value = '';
  }
  const buttonText = props.buttonText;
  return (
    <div>
      <form onSubmit={handleSearchLocation}>
        <input type="text" name="location" placeholder="zipcode, city, address" />
        <button>{buttonText} Location</button>
      </form>
    </div>
  );
};

export default Location;

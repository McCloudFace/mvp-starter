import React from 'react';

const IataItem = (props) => (
  <div className="input-group mb-3">
    <input type="text" className="form-control" id="airportIata" placeholder="Enter airport IATA code"></input>
    <button className="btn btn-primary" type="submit">Search</button>
  </div>
);

export default IataItem;
import React from 'react';

const NameItem = (props) => (
  <div className="input-group mb-3">
    <input type="text" className="form-control" id="airportName" placeholder="Enter airport name"></input>
    <button className="btn btn-primary" type="submit">Search</button>
  </div>
);

export default NameItem;
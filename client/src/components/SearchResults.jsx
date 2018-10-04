import React from 'react';

const SearchResults = (props) => {

  var airportResults = props.results.map( (airport, index) => {
    return (
      <div key={index} className="card mb-4 cardshadow" onClick={() => props.handleSelect(airport)}>
        <div className="card-header">
          <h4 className="my-0 font-weight-normal"></h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title"><small className="text-muted">{airport.name}</small></h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>{airport.municipality}, {airport.iso_region}</li>
          </ul>
        </div>
      </div>);
  });


  return (
    <div className="searchResults">
      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto">
        <p className="lead">Click the card for the airport and area Travel Briefing you need.</p>
      </div>

      <div className="container">
        <div className="card-deck mb-3">
          {airportResults}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
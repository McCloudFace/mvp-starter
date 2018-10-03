import React from 'react';

const SearchResults = (props) => {

  const airportCards = props.results.map(airport => {
    <div className="card-deck mb-3 text-center">
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <h4 className="my-0 font-weight-normal">&#nbsp;</h4>
        </div>
        <div className="card-body">
          <h1 className="card-title pricing-card-title"><small className="text-muted">{airport.name}</small></h1>
          <ul className="list-unstyled mt-3 mb-4">
            <li>{airport.municipality}, {airport.iso_region}  {airport.iso_country}</li>
          </ul>
          {
            /* TODO: link button to setState airportData of this one airport
          <button type="button" class="btn btn-lg btn-block btn-outline-primary">Get your briefing</button>
             */
          }
        </div>
      </div>
    </div>
  });


  return (
    <div className="searchResults">

      {console.log('props in SearchResults: ', props.results)}

      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Aiports</h1>
        <p className="lead">Click the link for the aiport and area Travel Briefing you need.</p>
      </div>

      <div className="container">
        {airportCards}
      </div>

    </div >
  );
};

export default SearchResults;
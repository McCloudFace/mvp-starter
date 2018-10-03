import React from 'react';

const Search = (props) => (
  <div className="searchForm">
    <p className="h3">Get your briefing</p>
    <form onSubmit={props.handleSubmit}>

      <div className="input-group mb-3">
        <input
          type="text"
          id="airportName"
          className="form-control"
          placeholder="Enter airport name"
          value={props.searchTermName}
          onChange={props.handleNameChange}
        />
        <button
          type="submit"
          className="btn btn-secondary">Search
        </button>
      </div>

      {
        /*
        <div className="text-muted">
          <p>or</p><p></p>
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            id="airportIata"
            className="form-control"
            placeholder="Enter airport IATA code"
            value={props.searchTermIata}
            onChange={props.handleIataChange}
          />
          <button
            type="submit"
            className="btn btn-secondary">Search
          </button>
        </div>
        */
      }

    </form>
  </div>
);

export default Search;
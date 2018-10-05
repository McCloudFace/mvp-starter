import React from 'react';

const SearchDetail = (props) => {

  var escName = encodeURI(props.detail.name);
  var googUrl = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyCUOh_aI6aDKSxTpIKl7KTiqe-twk8ZOr8&q=' + escName + '&center=' + props.detail.latitude_deg + ',' + props.detail.longitude_deg;

  return (
    <div className="searchResults">

      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <p className="lead">{props.detail.name}</p>
      </div>

      <div className="container">
        <div className="mb-3">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h2 className="display-4">{props.detail.name}</h2>
              <p className="lead">{props.detail.municipality}, {props.detail.iso_region}</p>
              {
                props.detail.home_link ? <p>Home: <a href={props.detail.home_link}>{props.detail.home_link}</a></p> : <p></p>
              }
              {
                props.detail.wikipedia_link ? <p>Wikipedia: <a href={props.detail.wikipedia_link}>{props.detail.wikipedia_link}</a></p> : <p></p>
              }
            </div>
          </div>

          <div>
            <iframe width="580" height="350" frameBorder="0" src={googUrl} />
          </div>

          {/* TODO
              Dark Sky key needs to be on server, not client
              Client sends req to server, server make api call & responds
              Client renders weather component in SearchDetail
              <div id="weather">
                <p>Weather <a href="https://darksky.net/poweredby/">powered by Dark Sky</a></p>
              </div>
            */
          }

        </div>

      </div>
    </div>
  );
};

export default SearchDetail;
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import SearchDetail from './components/SearchDetail';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTermName: '',
      searchTermIata: '',
      airportData: [],
      weatherData: {},
      haveWeatherData: false,
      stateDeptData: [],
      haveStateDeptData: false
    };
  }

  componentDidMount() {
    // do stuff
  }

  handleNameChange(e) {
    var decoded = decodeURI(e.target.value);
    this.setState({ searchTermName: decoded });
  }

  handleIataChange(e) {
    this.setState({ searchTermIata: e.target.value });
  }

  getWeather(latitude, longitude) {
    axios.post('http://localhost:3000/weather/forecast', {
      lat: latitude,
      long: longitude
    })
      .then(res => {
        this.setState( { weatherData: res.data, haveWeatherData: true });
      })
      .catch(err => {
        console.log('getWeather axios post err: ', err);
      });
  }

  getFacts(country) {
    let stateDeptUrl = 'https://www.state.gov/api/v1/?command=get_country_fact_sheets&fields=id,title,content_url,full_url&terms=' + country;
    axios.get(stateDeptUrl)
      .then(res => {
        this.setState({ stateDeptData: res.country_fact_sheets, haveStateDeptData: true });
        console.log('stateDept res: ', res);
      })
      .catch(err => {
        console.error('getFacts axios err: ', err);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchTermName !== '') {
      var searched = this.state.searchTermName;
      var postUrl = 'http://localhost:3000/airport/name/' + searched;
    } else {
      // when I add searching by IATA code @backlog
      var searched = this.state.searchTermIata;
      var postUrl = 'http://localhost:3000/airport/iata/' + searched;
    }

    axios.post(postUrl, {
      airport_name: searched
    })
      .then(res => {
        var airportInfo = res.data;
        console.log('airportInfo: ', airportInfo);
        this.setState({ airportData: airportInfo });
        if (airportInfo.length === 1 ) {
          this.getWeather(airportInfo[0].latitude_deg, airportInfo[0].longitude_deg);
        }

      })
      .catch(err => {
        console.log('axios post err: ', err);
      });
  }

  handleSelect(airport) {
    this.getWeather(airport.latitude_deg, airport.longitude_deg);
    this.getFacts(airport.iso_country);
    let objArr = [];
    objArr.push(airport);
    this.setState({ airportData: objArr });
  }

  render() {
    if (this.state.airportData.length === 0) {
      return (
        <div>
          <Search
            handleNameChange={this.handleNameChange.bind(this)}
            handleIataChange={this.handleIataChange.bind(this)}
            searchTerm={this.state}
            handleSubmit={this.handleSubmit.bind(this)}
          />
        </div>);
    } else if (this.state.airportData.length === 1) {
      return (
        <div>
          <SearchDetail
            detail={this.state.airportData[0]}
            weather={this.state.weatherData}
            haveWeather={this.state.haveWeatherData}
            haveStateDept={this.state.haveStateDeptData}
          />
        </div>
      );
    } else if (this.state.airportData.length > 1) {
      return (
        <div>
          <SearchResults
            results={this.state.airportData}
            handleSelect={this.handleSelect.bind(this)}
          />
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
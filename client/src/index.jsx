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
      airportData: []
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
        // console.log('axios post res.data: ', res.data);
        this.setState({ airportData: airportInfo });
      })
      .catch(err => {
        console.log('axios post err: ', err);
      });
  }

  handleSelect(airport) {
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
          <SearchDetail detail={this.state.airportData[0]} />
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
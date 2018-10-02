import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTermName: '',
      searchTermIata: ''
    };
  }

  componentDidMount() {
    // do stuff
  }

  handleNameChange(e) {
    this.setState({ searchTermName: e.target.value });
  }

  handleIataChange(e) {
    this.setState({ searchTermIata: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.searchTermName !== '') {
      var searched = this.state.searchTermName;
      console.log('searched: ', searched);
      var postUrl = 'http://localhost:3000/airport/name/' + searched;
      console.log('postUrl', postUrl);
    } else {
      var searched = this.state.searchTermIata;
      var postUrl = 'http://localhost:3000/airport/iata/' + searched;
    }

    axios.post(postUrl, {
      airport_name: searched
    })
      .then(res => {
        console.log('axios post res.data: ', res.data);
      })
      .catch( err => {
        console.log('axios post err: ', err);
      });
  }

  render() {
    return (
      <div>
        <Search
          handleNameChange={this.handleNameChange.bind(this)}
          handleIataChange={this.handleIataChange.bind(this)}
          searchTerm={this.state}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
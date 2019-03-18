import { BrowserRouter as Router, Route} from 'react-router-dom';
import React, { Component } from 'react';
import './App.scss';
import Home from './Home.js';
import SharingBoard from './SharingBoard';

class App extends Component {

  render() {
    return (
      <Router >
        <div className="appWrapper">
          <Route path="/" render={() => <SharingBoard />} />
        </div>
      </Router>
    );
  }
}

export default App;

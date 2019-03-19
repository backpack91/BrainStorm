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
          <Route exact path="/" render={() => <Home/>} />
          <Route path="/room/:room_id" render={() => <SharingBoard />} />
        </div>
      </Router>
    );
  }
}

export default App;


//원래
// <Route exact path="/" render={() => <Home/>} />
// <Route path="/room/:room_id" render={() => <SharingBoard />} />


//스케치 보기
// <Route path="/" render={() => <SharingBoard />} />

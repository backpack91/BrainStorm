import { HashRouter as Router, Route} from 'react-router-dom';
import React, { Component } from 'react';
import './App.scss';
import Home from './Home.js';
import SharingBoard from './SharingBoard';

class App extends Component {

  render() {
    const {
      createNewRoom,
      getRoomTitle,
      room_title,
      routeToRoom,
    } = this.props.appState;

    return (
      <Router>
        <div className="appWrapper">
          <Route
            exact path="/"
            render={() =>
              <Home
                createNewRoom={createNewRoom}
                getRoomTitle={getRoomTitle}
                roomTitle={room_title}
              />
            }
          />
          <Route path="/room/:room_id" render={() => <SharingBoard />} />
        </div>
      </Router>
    );
  }
}

export default App;

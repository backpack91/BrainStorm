import { BrowserRouter as Router, Route} from 'react-router-dom';
import React, { Component } from 'react';
import './App.scss';
import Home from './Home.js';
import SharingBoard from './SharingBoard.js';

class App extends Component {

  render() {
    const {
      createNewRoom,
      getRoomTitle,
      room_title,
      routeToRoom,
      makePostIt,
      postIts,
      latestPostItId,
      setStateOfPostItValue,
      setStateOfPostItLocation,
      deletePostIt
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
          <Route
            path="/room/:room_id"
            render={() =>
              <SharingBoard
                makePostIt={makePostIt}
                postIts={postIts}
                latestPostItId={latestPostItId}
                setStateOfPostItValue={setStateOfPostItValue}
                setStateOfPostItLocation={setStateOfPostItLocation}
                deletePostIt={deletePostIt}
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;

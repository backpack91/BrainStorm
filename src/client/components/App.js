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
      deletePostIt,
      toggleUrlbox,
      urlBoxOpened,
      toggleModal,
      isModalOpened,
      userList,
      userName,
      joinRoom,
      getRoomInfos,
      connectSocketWithRoomId,
      selectPostIt,
      postItStyles,
      editPostItStyle,
      selectedPostItId,
      openPictureSubmissionFormModal,
      modalType,
      submitPicture
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
            render={(props) =>
              <SharingBoard
                {...props}
                makePostIt={makePostIt}
                postIts={postIts}
                latestPostItId={latestPostItId}
                setStateOfPostItValue={setStateOfPostItValue}
                setStateOfPostItLocation={setStateOfPostItLocation}
                deletePostIt={deletePostIt}
                createNewRoom={createNewRoom}
                toggleUrlbox={toggleUrlbox}
                urlBoxOpened={urlBoxOpened}
                toggleModal={toggleModal}
                isModalOpened={isModalOpened}
                joinRoom={joinRoom}
                userName={userName}
                userList={userList}
                getRoomInfos={getRoomInfos}
                roomTitle={room_title}
                selectPostIt={selectPostIt}
                postItStyles={postItStyles}
                editPostItStyle={editPostItStyle}
                selectedPostItId={selectedPostItId}
                openPictureSubmissionFormModal={openPictureSubmissionFormModal}
                modalType={modalType}
                submitPicture={submitPicture}
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;

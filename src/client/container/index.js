import React, {Component} from 'react';
import {connect} from 'react-redux';
import App from '../components/App.js';
import PostIt from '../components/PostIt.js';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import io from 'socket.io-client';
import ReduxThunk from 'redux-thunk';
import {
  roomCreation,
  roomTitle,
  postItCreation,
  postItLocation,
  postItValue,
  postItDeletion,
  openUrlbox,
  togglingUrlbox,
  togglingModal,
  userNameSubmission,
  userParticipation,
  userDisconnection
} from '../actions';

let socket = io.connect(`http://localhost:8080/`, {
  timeout: 300000
});

let room_id;
let dispatchMakeNewPostIt;
let dispatchUpdatePostItValue;
let dispatchUpdatePostItLocation;
let dispatchDeletePostIt;
let dispatchUserParticipation;
let dispatchUserDisconnection;

const dispatchMakeNewPostItPartial = (dispatch) => (id) => {
  dispatch(postItCreation(id));
};

const dispatchUpdatePostItValuePartial = (dispatch) => (id, value) => {
  dispatch(postItValue(id, value));
};

const dispatchUpdatePostItLocationPartial = (dispatch) => (id, left, top) => {
  dispatch(postItLocation(id, left, top));
};

const dispatchDeletePostItPartial = (dispatch) => (id) => {
  dispatch(postItDeletion(id));
};

const dispatchUserParticipationPartial = (dispatch) => (userList) => {
  dispatch(userParticipation(userList));
};

const dispatchUserDisconnectionPartial = (dispatch) => (disconnectedUserName) => {
  dispatch(userDisconnection(disconnectedUserName));
};

socket.on('postit creation', function(data) {
  dispatchMakeNewPostIt(data.postit_id);
});

socket.on('update users in room', function(userList) {
  dispatchUserParticipation(userList);
});

socket.on('update postit value', function(data) {
  dispatchUpdatePostItValue(data.postit_id, data.value);
});

socket.on('update postit location', function(data) {
  dispatchUpdatePostItLocation(data.postit_id, data.left, data.top);
});

socket.on('postit deletion', function(data) {
  dispatchDeletePostIt(data.postit_id);
});

socket.on('delete disconnected user', function(disconnectedUserName) {
  dispatchUserDisconnection(disconnectedUserName);
});

class AppContainer extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <App appState={this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    room_title: state.room_title,
    board_infos: state.board_infos,
    user_ids: state.user_ids,
    postIts: state.postIts,
    latestPostItId: state.latestPostItId,
    urlBoxOpened: state.urlBoxOpened,
    isModalOpened: state.isModalOpened,
    userName: state.userName,
    userList: state.userList
  };
};

const mapDispatchToProps = (dispatch) => {
  const history = createBrowserHistory({
    forceRefresh: true
  });
  dispatchMakeNewPostIt = dispatchMakeNewPostItPartial(dispatch);
  dispatchUpdatePostItValue = dispatchUpdatePostItValuePartial(dispatch);
  dispatchUpdatePostItLocation = dispatchUpdatePostItLocationPartial(dispatch);;
  dispatchDeletePostIt = dispatchDeletePostItPartial(dispatch);
  dispatchUserParticipation = dispatchUserParticipationPartial(dispatch);
  dispatchUserDisconnection = dispatchUserDisconnectionPartial(dispatch);

  return {
    onMount: () => {
      axios.get('/')
      .then(res => {
        console.log('onMount!!!!!!!!', res);
      });
    },
    createNewRoom: (room_title, e) => {
      axios.get(`/api/rooms/${room_title}/new`)
      .then(res => {
        history.push(`/room/${room_title}`);
        // dispatch(roomCreation(res));
      })
      .catch(err => {
        console.log('err', err);
      });
    },
    connectSocketWithRoomId: (room_id, user_name) => {
      socket.emit('room creation', {
        room_id,
        socket_id: socket.id,
        user_name
      });
      dispatch(userNameSubmission(user_name));
    },
    getRoomTitle: (e) => {
      const title = e.target.value;
      dispatch(roomTitle(title));
    },
    makePostIt: (id, e) => {
      socket.emit('postit creation', {
        socket_id: socket.id,
        postit_id: id
      });
      dispatch(postItCreation(id));
    },
    setStateOfPostItValue: (id, e) => {
      const value = e.target.value;

      socket.emit('update postit value', {
        socket_id: socket.id,
        postit_id: id,
        value
      });
      dispatch(postItValue(id, value));
    },
    setStateOfPostItLocation: (id, left, top) => {
      socket.emit('update postit location', {
        socket_id: socket.id,
        postit_id: id,
        left,
        top
      });
    },
    deletePostIt: (id, e) => {
      dispatch(postItDeletion(id));
      socket.emit('postit deletion', {
        socket_id: socket.id,
        postit_id: id
      });
    },
    toggleUrlbox: () => {
      dispatch(togglingUrlbox());
    },
    toggleModal: () => {
      dispatch(togglingModal());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

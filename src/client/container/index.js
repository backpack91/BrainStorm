import React, {Component} from 'react';
import {connect} from 'react-redux';
import App from '../components/App.js';
import PostIt from '../components/PostIt.js';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import io from 'socket.io-client';
import ReduxThunk from 'redux-thunk';
import _ from 'lodash';
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
  userDisconnection,
  bringingRoomInfos,
  postItSelection,
  postItStyle
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
let dispatchEditPostItStyle;

const dispatchMakeNewPostItPartial = (dispatch) => (id, room_id) => {
  dispatch(postItCreation(id, room_id));
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

const dispatchEditPostItStylePartial = (dispatch) => (postItId, prevStyles, styleOption, detail) => {
  dispatch(postItStyle(postItId, prevStyles, styleOption, detail));
}

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

socket.on('postit style edit', function(data) {
  console.log('socket height!1#@#@@#@!##!@', data.detail);
  dispatchEditPostItStyle(data.postItId, data.prevStyles, data.styleOption, data.detail);
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
    postIts: state.postIts,
    latestPostItId: state.latestPostItId,
    urlBoxOpened: state.urlBoxOpened,
    isModalOpened: state.isModalOpened,
    userName: state.userName,
    userList: state.userList,
    postItStyles: state.postItStyles,
    selectedPostItId: state.selectedPostItId
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
  dispatchEditPostItStyle = dispatchEditPostItStylePartial(dispatch);

  return {
    onMount: () => {
      axios.get('/')
      .then(res => {
        console.log('onMount..', res);
      });
    },
    createNewRoom: (room_title, e) => {
      if (room_title) {
        axios.get(`/api/rooms/${room_title}/new`)
        .then(res => {
          if (res.status === 200) {
            history.push(`/room/${room_title}`);
          } else if (res.status === 204) {
            alert('이미 존재하는 방 이름 입니다. 창의력을 발휘해 주세요 ;)');
          }
        })
        .catch(err => {
          console.log('err', err);
        });
      }
    },
    getRoomInfos: (room_title) => {
      room_id = room_title;

      axios.get(`/api/rooms/${room_title}/roomInfos`)
      .then(res => {
        dispatch(bringingRoomInfos(res.data));
      })
      .catch(err => {
      });
    },
    joinRoom: (room_id, user_name) => {
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
    makePostIt: (latestPostItId, room_id, e) => {
      socket.emit('postit creation', {
        room_id,
        socket_id: socket.id,
        postit_id: latestPostItId
      });

      axios.post(`/api/rooms/${room_id}/newPostIt`, {
        postit_id: latestPostItId
      })
      .then(res => {
        console.log('save changed infos >>', res);
      })
      .catch(err => {
        console.log('err', err);
      });

      dispatch(postItCreation(latestPostItId));
    },
    setStateOfPostItValue: (postit_id, room_title, postit_info, e) => {
      const value = e.target.value;
      postit_info.value = value;

      function requestUpdateValue() {
        axios.post(`/api/rooms/${room_title}/modifiedRoomInfos`, {
          postit_id,
          modified_postit: postit_info
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      }

      _.debounce(requestUpdateValue, 100)();
      socket.emit('update postit value', {
        room_id,
        socket_id: socket.id,
        postit_id,
        value
      });
      dispatch(postItValue(postit_id, value));
    },
    setStateOfPostItLocation: (postit_id, left, top, postit_info, room_title) => {
      postit_info.left = left;
      postit_info.top = top;

      function requestUpdateLocation() {
        axios.post(`/api/rooms/${room_title}/modifiedRoomInfos`, {
          postit_id,
          modified_postit: postit_info
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      }

      _.debounce(requestUpdateLocation, 100)();
      socket.emit('update postit location', {
        room_id,
        socket_id: socket.id,
        postit_id,
        left,
        top
      });
    },
    deletePostIt: (postit_id, e) => {
      axios.post(`/api/rooms/${room_id}/postItDeletion`, {
        postit_id,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

      dispatch(postItDeletion(postit_id));
      socket.emit('postit deletion', {
        room_id,
        socket_id: socket.id,
        postit_id
      });
    },
    toggleUrlbox: () => {
      dispatch(togglingUrlbox());
    },
    toggleModal: () => {
      dispatch(togglingModal());
    },
    selectPostIt: (postItId) => {
      dispatch(postItSelection(postItId));
    },
    editPostItStyle: (postItId, prevStyles, styleOption, detail, e) => {
      socket.emit('postit style edit', {
        room_id,
        postItId,
        prevStyles,
        styleOption,
        detail
      });
      dispatch(postItStyle(postItId, prevStyles, styleOption, detail));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

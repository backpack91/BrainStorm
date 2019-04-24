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
  postItStyle,
  pictureSubmissionForm,
  pictureSubmission
} from '../actions';

let socket = io.connect('http://10.3.20.217:8081/', {
  timeout: 6000000
});
// let socket = io.connect();

let ip = 'http://10.3.20.217:3000';
// let ip = '';
let room_id;
let dispatchMakeNewPostIt;
let dispatchUpdatePostItValue;
let dispatchUpdatePostItLocation;
let dispatchDeletePostIt;
let dispatchUserParticipation;
let dispatchUserDisconnection;
let dispatchEditPostItStyle;
let dispatchAttachImageToPostIt;

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
};

const dispatchAttachImageToPostItPartial = (dispatch) => (imageUrl, postItId) => {
  dispatch(pictureSubmission(imageUrl, postItId));
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
  dispatchEditPostItStyle(data.postItId, data.prevStyles, data.styleOption, data.detail);
});

socket.on('attach image to postit', function(data) {
  dispatchAttachImageToPostIt(data.imageUrl, data.postItId);
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
    selectedPostItId: state.selectedPostItId,
    modalType: state.modalType
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
  dispatchAttachImageToPostIt = dispatchAttachImageToPostItPartial(dispatch);
  return {
    onMount: () => {
      axios.get('/')
      .then(res => {
        console.log('onMount..', res);
      });
    },
    createNewRoom: (room_title, e) => {
      if (room_title) {
        axios.get(`${ip}/api/rooms/${room_title}/new`)
        .then(res => {
          if (res.status === 200) {
            history.push(`/room/${room_title}`);
          } else if (res.status === 204) {
            alert('이미 존재하는 방 이름 입니다.');
          }
        })
        .catch(err => {
          console.log('err', err);
        });
      }
    },
    getRoomInfos: (room_title) => {
      room_id = room_title;

      axios.get(`${ip}/api/rooms/${room_title}/roomInfos`)
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

      axios.post(`${ip}/api/rooms/${room_id}/newPostIt`, {
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

      axios.post(`${ip}/api/rooms/${room_title}/modifiedRoomInfos`, {
        postit_id,
        modified_postit: postit_info
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

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

      axios.post(`${ip}/api/rooms/${room_title}/modifiedRoomInfos`, {
        postit_id,
        modified_postit: postit_info
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

      socket.emit('update postit location', {
        room_id,
        socket_id: socket.id,
        postit_id,
        left,
        top
      });
    },
    deletePostIt: (postit_id, e) => {
      axios.post(`${ip}/api/rooms/${room_id}/postItDeletion`, {
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
      let modifiedStyle;
      let prevStylesCopy = prevStyles.slice();
      let styleObjInArrCopy;

      if (!prevStylesCopy[postItId]) {
        prevStylesCopy[postItId] = { postit_id: postItId };
      }
      styleObjInArrCopy = _.cloneDeep(prevStylesCopy[postItId]);

      switch(styleOption) {
        case 'fontSize':
          modifiedStyle = Object.assign(styleObjInArrCopy, {
            fontSize: detail
          });
          prevStylesCopy[postItId] = modifiedStyle;
          break;

        case 'color':
          modifiedStyle = Object.assign(styleObjInArrCopy, {
            color: detail
          });
          prevStylesCopy[postItId] = modifiedStyle;
          break;

        case 'backgroundColor':
          if (
            detail === '#697689'
            || detail === '#555555'
          ) {
            modifiedStyle = Object.assign(styleObjInArrCopy, {
              backgroundColor: detail,
              color: 'white'
            });
          } else {
            modifiedStyle = Object.assign(styleObjInArrCopy, {
              backgroundColor: detail,
              color: 'black'
            });
          }
          prevStylesCopy[postItId] = modifiedStyle;
          break;

        case 'boxSize':
          modifiedStyle = Object.assign(styleObjInArrCopy, {
            width: detail.width,
            height: detail.height
          });
          prevStylesCopy[postItId] = modifiedStyle;
          break;
      }

      axios.post(`${ip}/api/rooms/${room_id}/modifiedRoomInfos`, {
        postit_id: postItId,
        modified_postit_style: prevStylesCopy[postItId]
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

      socket.emit('postit style edit', {
        room_id,
        postItId,
        prevStyles,
        styleOption,
        detail
      });
      dispatch(postItStyle(postItId, prevStyles, styleOption, detail));
    },
    openPictureSubmissionFormModal : () => {
      dispatch(pictureSubmissionForm());
    },
    submitPicture: (imageUrl, selectedPostItId) => {
      dispatch(pictureSubmission(imageUrl, selectedPostItId));

      socket.emit('attach image to postit', {
        room_id,
        postItId: selectedPostItId,
        imageUrl
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

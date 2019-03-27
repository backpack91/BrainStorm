import {
  // ROOM_CREATION,
  ROOM_TITLE,
  POSTIT_CREATION,
  POSTIT_LOCATION,
  POSTIT_VALUE,
  POSTIT_DELETION,
  TOGGLING_URLBOX,
  TOGGLING_MODAL,
  USERNAME_SUBMISSION,
  USER_PARTICIPATION,
  USER_DISCONNECTION,
  BRINGING_ROOM_INFOS,
  POSTIT_SELECTION,
  POSTIT_STYLE
} from '../constants/actionTypes.js';

export function roomTitle(text) {
  return {
    type: ROOM_TITLE,
    room_title: text
  };
}

export function postItCreation(id) {
  return {
    type: POSTIT_CREATION,
    id,
    left: '',
    top: '',
    value: '',
  };
}

export function postItLocation(id, left, top) {
  return {
    type: POSTIT_LOCATION,
    id,
    left,
    top
  };
}

export function postItValue(id, value) {
  return {
    type: POSTIT_VALUE,
    id,
    value
  };
}

export function postItDeletion(id) {
  return {
    type: POSTIT_DELETION,
    id
  };
}

export function togglingUrlbox() {
  return {
    type: TOGGLING_URLBOX
  };
}

export function togglingModal() {
  return {
    type: TOGGLING_MODAL
  };
}

export function userNameSubmission(userName) {
  return {
    type: USERNAME_SUBMISSION,
    userName
  };
}

export function userParticipation(userList) {
  return {
    type: USER_PARTICIPATION,
    userList
  };
}

export function userDisconnection(disconnectedUserName) {
  return {
    type: USER_DISCONNECTION,
    disconnectedUserName
  };
}

export function bringingRoomInfos(roomInfos) {
  return {
    type: BRINGING_ROOM_INFOS,
    postIts: roomInfos.postIts,
    room_title: roomInfos.title,
    postItStyles: roomInfos.postItStyles
  };
}

export function postItSelection(postItId) {
  return {
    type: POSTIT_SELECTION,
    postItId
  };
}

export function postItStyle(postItId, prevStyles, styleOption, detail) {
  return {
    type: POSTIT_STYLE,
    postItId,
    styleOption,
    prevStyles,
    detail
  };
}

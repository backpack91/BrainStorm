import {
  ROOM_CREATION,
  ROOM_TITLE,
  POSTIT_CREATION,
  POSTIT_LOCATION,
  POSTIT_VALUE
} from '../constants/actionTypes.js';

export function roomCreation(roomData) {
  return  {
    type: ROOM_CREATION,
    room_title: roomData.title,
    board_infos: roomData.board_infos,
    user_ids: roomData.user_ids
  };
}

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

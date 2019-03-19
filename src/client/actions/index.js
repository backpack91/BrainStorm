import {
  ROOM_CREATION,
  ROOM_TITLE
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

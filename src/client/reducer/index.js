import {
  ROOM_CREATION,
  ROOM_TITLE
} from '../constants/actionTypes.js';

const initialStates = {};

export default function reducer (state = initialStates, action) {
  switch (action.type) {
    case ROOM_CREATION:
      return {
        // room_title: action.room_title,
        board_infos: action.board_infos,
        user_ids: action.user_ids
      };

    case ROOM_TITLE:
      return {
        room_title: action.room_title
      };

    default:
      return state;
  }
}

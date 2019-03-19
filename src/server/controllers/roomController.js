const Room = require('../models/rooms.js');
const mongoose = require('mongoose');
const { renderToString } = 'react-dom/server';

const ObjectId = mongoose.Types.ObjectId;

const createNewRoom = async function (req, res, next) {
  console.log('req.params>>>>>>', req.params);
  try {
    const room_title = String(req.params.room_title);
    const roomFound = await Room.findOne({title: room_title});

    if (
      roomFound !== null
        && roomFound !== undefined
        && Object.keys(roomFound).length
    ) {
      res.sendStatus(204);
    } else {
      const _id = new ObjectId();
      console.log('_id', _id);
      const roomCreation = await Room.create({
        _id,
        title: room_title,
        board_infos: [],
        user_ids: []
      });

      res.json({
        title: room_title,
        board_infos: [],
        user_ids: []
      });
    }
  } catch(err) {
    next(err);
  }
};

const sendInvitedRoomInfo = async function (req, res, next) {
  try {
    const roomFound = await Room.findOne({title: req.params.room_title});

    res.json({
      title: roomFound.title,
      board_infos: roomFound.board_infos,
      user_ids: roomFound.user_ids
    });
  } catch(err) {
    next(err);
  }
}

const renderSharingBoard = async function (req, res, next) {

}

module.exports = {
  createNewRoom,
  sendInvitedRoomInfo
};

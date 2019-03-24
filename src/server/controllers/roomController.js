const Room = require('../models/rooms.js');
const mongoose = require('mongoose');
const { renderToString } = 'react-dom/server';

const ObjectId = mongoose.Types.ObjectId;

const createNewRoom = async function (req, res, next) {
  try {
    const room_title = String(req.params.room_title);
    const roomFound = await Room.findOne({title: room_title});

    if (
      roomFound === null
        || roomFound === undefined
        || !Object.keys(roomFound).length
    ) {
      const _id = new ObjectId();
      const roomCreation = await Room.create({
        _id,
        title: room_title,
      });

      res.json({
        _id,
        title: room_title,
        postIts: {}
      });
    } else {
      res.sendStatus(204);
    }
  } catch(err) {
    console.log('err: ', err);
    next(err);
  }
};

const getRoomInfos = async function (req, res, next) {
  try {
    const roomFound = await Room.findOne({title: req.params.room_title});

    if (
      roomFound === null
        || roomFound === undefined
        || !Object.keys(roomFound).length
    ) {
      res.sendStatus(404);
    } else {
      res.json(roomFound);
    }

  } catch(err) {
    next(err);
  }
};

module.exports = {
  createNewRoom,
  sendInvitedRoomInfo
};

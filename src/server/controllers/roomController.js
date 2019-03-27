const Room = require('../models/rooms.js');
const mongoose = require('mongoose');
const { renderToString } = 'react-dom/server';

const ObjectId = mongoose.Types.ObjectId;

const createNewRoom = async function (req, res, next) {
  try {
    const room_title = String(req.params.room_title);
    const roomFound = await Room.findOne({title: room_title});

    if (roomFound === null) {
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
//스타일 객체 생성해주기!

const getRoomInfos = async function (req, res, next) {
  try {
    const roomFound = await Room.findOne({title: req.params.room_title});

    if (roomFound === null) {
      console.log('no info', roomFound);
      res.sendStatus(404);
    } else {
      res.json(roomFound);
    }

  } catch(err) {
    next(err);
  }
};

const updatePostItContent = async function (req, res, next) {
  try {
    const { modified_postit, postit_id, modified_postit_style } = req.body;
    console.log('room_title', req.params.room_title);
    if (modified_postit_style) {
      console.log('modified Style', modified_postit_style);
      console.log('req.body', req.body);
      console.log('edit postit style _ server');
      await Room.findOneAndUpdate({
        title: req.params.room_title,
        "postItStyles.postit_id":  postit_id
      },
      {
        $set: { "postItStyles.$": modified_postit_style }
      });
    } else if (modified_postit) {
      console.log('modified_postit', modified_postit);
      await Room.findOneAndUpdate({
        title: req.params.room_title,
        "postIts.postit_id":  postit_id
      },
      {
        $set: { "postIts.$": modified_postit }
      });
    }

    res.sendStatus('200');
    } catch(err) {
      next(err);
    }
};

const makeNewPostIt = async function (req, res, next) {
  try {
    const { postit_id } = req.body;

    await Room.findOneAndUpdate({
      title: req.params.room_title,
    },{
      $addToSet: {
        postIts: {
          postit_id,
          left: "",
          top: "",
          value: ""
        },
        postItStyles: {
          postit_id,
          width: '',
          height: '',
          color: '',
          backgroundColor: '',
          fontSize: ''
        }
      }
    });
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
};

const deletePostIt = async function (req, res, next) {
  try {
    const { postit_id } = req.body;

    await Room.findOneAndUpdate({
      title: req.params.room_title,
    },{
      $pull: { postIts: {postit_id: postit_id }}
    });
    res.sendStatus(200);
  } catch(err) {
    next(err);
  }
};

module.exports = {
  createNewRoom,
  getRoomInfos,
  updatePostItContent,
  makeNewPostIt,
  deletePostIt
};

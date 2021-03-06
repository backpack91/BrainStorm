const Room = require('../models/rooms.js');
const mongoose = require('mongoose');
const { renderToString } = 'react-dom/server';

const ObjectId = mongoose.Types.ObjectId;

const createNewRoom = async function (req, res, next) {
  try {
    console.log('create room Request is accepted!!!!')
    const room_title = String(req.params.room_title);
    const roomFound = await Room.findOne({title: room_title});
    console.log('roomFound?', roomFound);
    if (roomFound === null) {
      console.log('true');
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
    if (modified_postit_style) {
      await Room.findOneAndUpdate({
        title: req.params.room_title,
        "postItStyles.postit_id":  postit_id
      },
      {
        $set: { "postItStyles.$": modified_postit_style }
      });
    } else if (modified_postit) {
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
      $pull: {
        postIts: {postit_id: postit_id },
        postItStyles: {postit_id: postit_id}
      }
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

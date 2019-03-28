const Room = require('../models/rooms.js');
const fileUploader = require('../services/file-upload.js');
const mongoose = require('mongoose');

const attachImgToPostIt = function (req, res, next) {
  const ObjectId = mongoose.Types.ObjectId;
  const _id = new ObjectId();

  res.locals.fileId = _id;
  res.locals.fileCategory = 'postit_attach_image';
  res.locals.fileDirectory = 'postit_images';

  fileUploader.uploadPostItImages(req, res, async function (err) {
    if (err) {
      next(err);
    }
    try {
      await Room.findOneAndUpdate({
        title: req.params.room_title,
        "postIts.postit_id": req.query.selectedPostItId
      }, {
        $set: { "postIts.$.image": `https://s3.ap-northeast-2.amazonaws.com/brain-storm/postit_images/${_id}`}
      });

      res.json({ imageUrl: `https://s3.ap-northeast-2.amazonaws.com/brain-storm/postit_images/${_id}` });
    } catch(err) {
      next(err);
    }
  });
};

module.exports = {
  attachImgToPostIt
};

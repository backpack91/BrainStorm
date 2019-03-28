const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  postIts: [
    {
      postit_id: Number,
      left: String,
      top: String,
      value: String,
      image: String
    }
  ],
  postItStyles: [
    {
      postit_id: Number,
      width: String,
      height: String,
      color: String,
      backgroundColor: String,
      fontSize: String
    }
  ]
});

module.exports = mongoose.model('Rooms', RoomsSchema);

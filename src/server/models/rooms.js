const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  postIts: [
    {
      postit_id: Number,
      font_size: String,
      width: String,
      height: String,
      left: String,
      top: String,
      value: String
    }
  ]
});

module.exports = mongoose.model('Rooms', RoomsSchema);

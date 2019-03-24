const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  postIts: {
    id: {
      font_size: String,
      width: String,
      height: String,
      left: String,
      top: String,
      text: String,
      user_last_wrote: String
    }
  }
});

module.exports = mongoose.model('Rooms', RoomsSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  board_infos: Array,
  user_ids: Array
});

module.exports = mongoose.model('Rooms', RoomsSchema);

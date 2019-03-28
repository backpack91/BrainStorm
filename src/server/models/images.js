const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
  file: Object,
  image_preview_url: String
});

module.exports = mongoose.model('Images', ImagesSchema);

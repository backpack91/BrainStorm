const mongoose = require('mongoose');

module.exports = {
  connect (url) {
    mongoose.connect(url, { useNewUrlParser: true });

    const db = mongoose.connection;

    db.on('error', function (err) {
      console.log('Mongoose default connection error: ' + err);
    });

    db.once('open', function () {
      console.log('Connected to mongodb server');
    });
  }
};

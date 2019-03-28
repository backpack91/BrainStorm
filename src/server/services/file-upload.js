const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config/credentials.js');

const s3 = new aws.S3({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: 'ap-northeast-2'
});

const uploadPostItImages = (req, res, next) => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: 'brain-storm',
      acl: 'public-read',
      key: function (req, file, cb) {
        let fileNameWithDirectory;

        if (res.locals.fileDirectory) {
          fileNameWithDirectory = `${res.locals.fileDirectory}/${res.locals.fileId}`;
        } else {
          fileNameWithDirectory = `${res.locals.fileId}`;
        }

        cb(null, fileNameWithDirectory);
      }
    })
  }).single(res.locals.fileCategory)(req, res, next);
};

module.exports = { uploadPostItImages };

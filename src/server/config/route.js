const express = require('express');
const roomController = require('../controllers/roomController.js');
const fileController = require('../controllers/fileController.js');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/rooms/:room_title/new', roomController.createNewRoom);
router.get('/rooms/:room_title/roomInfos', roomController.getRoomInfos);
router.post('/rooms/:room_title/modifiedRoomInfos', jsonParser, roomController.updatePostItContent);
router.post('/rooms/:room_title/newPostIt', jsonParser, roomController.makeNewPostIt);
router.post('/rooms/:room_title/postItDeletion', jsonParser, roomController.deletePostIt);
router.post('/rooms/:room_title/newImage', jsonParser, fileController.attachImgToPostIt);

module.exports = router;

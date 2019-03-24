const express = require('express');
const roomController = require('../controllers/roomController.js');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/rooms/:room_title/new', roomController.createNewRoom);
router.get('/rooms/:room_title/roomInfos', roomController.getRoomInfos);
router.post('/rooms/:room_title/modifiedRoomInfos', jsonParser, roomController.updatePostItValue);

module.exports = router;

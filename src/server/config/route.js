const express = require('express');
const roomController = require('../controllers/roomController.js');
const router = express.Router();

router.get('/rooms/:room_title/new', roomController.createNewRoom);
router.get('/rooms/:room_title/roomInfos', roomController.getRoomInfos);

module.exports = router;

const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/chatController');

router.route('/')
    .get(chatController.getAllChat)
    .post(chatController.addChat);

module.exports = router;
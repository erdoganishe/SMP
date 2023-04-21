const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/regpage', 'login.html'));
});

router.get('/registration(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/regpage', 'registration.html'));
});

module.exports = router;  
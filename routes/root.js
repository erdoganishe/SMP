const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/recipe(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'recipe.html'));
});

router.get('/newRecipe(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'newRecipe.html'));
});



module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');
const fileUpload = require('express-fileupload');

router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/recipe(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'recipe.html'));
});

router.route('/newRecipe(.html)?')
    .get((req, res) => {res.sendFile(path.join(__dirname, '../views', 'newRecipe.html'));})
    .post(fileUpload({ createParentPath: true }), (req, res) => {
        const files = req.files;
        console.log(files);

        return res.json({ status: "logged", message: "logged"});
    });



module.exports = router;
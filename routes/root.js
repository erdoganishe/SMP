const express = require('express');
const router = express.Router();
const path = require('path');
const fileUpload = require('express-fileupload');

const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');

router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/recipe(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'recipe.html'));
});

router.route('/newRecipe(.html)?')
    .get((req, res) => { res.sendFile(path.join(__dirname, '../views', 'newRecipe.html')); })
    .post(fileUpload({ createParentPath: true }),
        filesPayloadExists,
        fileExtLimiter(['.png', '.jpg', 'jpeg', 'bmp', 'webp']),
        fileSizeLimiter,
        (req, res) => {
            const files = req.files;
            console.log(files);

            Object.keys(files).forEach(key => {
                const filePath = path.join(__dirname, '../public/img', 'test', /*`123${path.extname(files[key].name)}`*/ files[key].name);

                files[key].mv(filePath, (err) => {
                    if(err) return res.status(500).json({ status: "error", messoge: err})
                })
            })

            return res.json({ status: "success", message: Object.keys(files).toString() });
        });

router.post('/newRecipeArray', (req, res) => {
    
})

router.get('/roflpage(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'roflpage.html'));
});

module.exports = router;
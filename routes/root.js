const express = require('express');
const router = express.Router();
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const fileSaver = require('../middleware/fileSaver');

const foodController = require('../controllers/foodController');
const FoodRecipe = require('../model/FoodRecipe');

const verifyJWT = require('../middleware/verifyJWT');

router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/recipe(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'recipe.html'));
});

router.route('/newRecipe(.html)?')
    .get(/*verifyJWT, verifyRoles(ROLES_LIST.Editor),*/(req, res) => { 
        ///console.log('before file');
        res.sendFile(path.join(__dirname, '../views', 'newRecipe.html')); 
        //console.log('after file');
    })
    .post(/*verifyJWT, verifyRoles(ROLES_LIST.Editor),*/ fileUpload({ createParentPath: true }),
        filesPayloadExists,
        fileExtLimiter(['.png', '.jpg', 'jpeg', 'bmp', 'webp']),
        fileSizeLimiter,
        (req, res) => {
            const files = req.files;
            console.log(files);

            Object.keys(files).forEach(key => {
                const filePath = path.join(__dirname, '../public/img', 'test', /*`123${path.extname(files[key].name)}`*/ files[key].name);

                files[key].mv(filePath, (err) => {
                    if (err) return res.status(500).json({ status: "error", messoge: err })
                })
            })

            return res.json({ status: "success", message: Object.keys(files).toString() });
        });

router.post('/newRecipeArray'/*, verifyJWT, verifyRoles(ROLES_LIST.Editor)*/, async (req, res) => {

    // console.log(req.body.name);
    // console.log(req.body.difficulty);
    // console.log(req.body.time);
    // console.log();

    try {
        const result = await FoodRecipe.create({
            name: req.body.name,
            difficulty: req.body.difficulty,
            time: req.body.time,
            steps: [req.body.history, req.body.ingridients, ...req.body.steps, req.body.conclusion]
        });

        console.log(result.id);

        //rename and move img to folder
        let num = 1;
        var files = fs.readdirSync(path.join(__dirname, '../public/img/test/',));
        Object.keys(files).forEach(key => {
            if (num == 1) {
                fs.mkdirSync(path.join(__dirname, '../public/img/receipt_db/',
                    `${result.id}`));
                fs.rename(
                    path.join(__dirname, '../public/img/test/', files[key]),
                    path.join(__dirname,
                        '../public/img/front_img/',
                        `${result.id}${path.extname(files[key])}`), (err) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                );
            }
            if (num == 2) {

                fs.rename(path.join(__dirname, '../public/img/test/', files[key]),
                    path.join(__dirname, '../public/img/receipt_db/',
                        `${result.id}/history${path.extname(files[key])}`), (err) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                )
            };
            if (num == 3) {
                fs.rename(path.join(__dirname, '../public/img/test/', files[key]),
                    path.join(__dirname, '../public/img/receipt_db/',
                        `${result.id}/step${path.extname(files[key])}`), (err) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                )
            };
            num++;

        })

        res.json({ status: "success", message: "success" });
    } catch (err) {
        console.error(err);
    }
})

router.get('/roflpage(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'roflpage.html'));
});

router.get('/privatePage(.html)?',
    // verifyRoles(ROLES_LIST.User),
    // verifyJwT,
    (req, res) => {
        res.sendFile(path.join(__dirname, '../views', 'privatePage.html'));
    });

router.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'chat.html'));
})

// avatar or bg upload
router.post('/imgUpload',
    //   verifyJWT,
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png']),
    fileSizeLimiter,
    fileSaver)

module.exports = router;
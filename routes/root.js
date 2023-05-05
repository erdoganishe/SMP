const express = require('express');
const router = express.Router();
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');

const foodController = require('../controllers/foodController');
const FoodRecipe = require('../model/FoodRecipe');

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
                    if (err) return res.status(500).json({ status: "error", messoge: err })
                })
            })

            return res.json({ status: "success", message: Object.keys(files).toString() });
        });

router.post('/newRecipeArray', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.difficulty);
    console.log(req.body.time);
    console.log();

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
                fs.mkdirSync(path.join(__dirname, '../public/img/receipt_db/',
                `${result.id}`));
                
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

module.exports = router;
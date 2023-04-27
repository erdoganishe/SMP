const express = require('express');
const router = express.Router();
const foodController = require('../../controllers/foodController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const verifyJwT = require('../../middleware/verifyJWT');

router.use(verifyJwT);

router.route('/')
    .get(foodController.getAllFood)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), foodController.createNewFood)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), foodController.updateFood)
    .delete(verifyRoles(ROLES_LIST.Admin), foodController.deleteFood);

router.route('/:id')
    .get(foodController.getFood);

module.exports = router;
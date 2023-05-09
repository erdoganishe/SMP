const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const verifyJwT = require('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJwT, verifyRoles(ROLES_LIST.Admin),userController.getAllUser);
//     .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), verifyJwT, foodController.createNewFood)
//     .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), verifyJwT, foodController.updateFood)
//     .delete(verifyRoles(ROLES_LIST.Admin), verifyJwT, foodController.deleteFood);

router.route('/:id')
    .get(verifyJwT, verifyRoles(ROLES_LIST.User), userController.getUser);

module.exports = router;
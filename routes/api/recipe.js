const express = require('express');
const router = express.Router();
const recipeController = require('../../controllers/recipeController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const verifyJwT = require('../../middleware/verifyJWT');

router.route('/')
    .get(recipeController.getAllRecipe)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), verifyJwT, recipeController.createNewRecipe)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), verifyJwT, recipeController.updateRecipe)
    .delete(verifyRoles(ROLES_LIST.Admin), verifyJwT, recipeController.deleteRecipe);

router.route('/:id')
    .get(recipeController.getRecipe);

module.exports = router;
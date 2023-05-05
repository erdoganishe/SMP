const express = require('express');
const router = express.Router();
const foodRecipeController = require('../../controllers/foodRecipeController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const verifyJwT = require('../../middleware/verifyJWT');

router.route('/')
    .get(foodRecipeController.getAllFoodRecipe)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), verifyJwT, foodRecipeController.createNewFoodRecipe)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), verifyJwT, foodRecipeController.updateFoodRecipe)
    .delete(verifyRoles(ROLES_LIST.Admin), verifyJwT, foodRecipeController.deleteFoodRecipe);

router.route('/:id')
    .get(foodRecipeController.getFoodRecipe);

module.exports = router;
const express = require('express');
const router = express.Router();
const foodController = require('../../controllers/foodController');

router.route('/')
    .get(foodController.getAllFood)
    .post(foodController.createNewFood)
    .put(foodController.updateFood)
    .delete(foodController.deleteFood);

router.route('/:id')
    .get(foodController.getFood);

module.exports = router;
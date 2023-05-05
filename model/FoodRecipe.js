const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodRecipeSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    difficulty: {
        type: String,
        require: false
    },
    time: {
        type: String,
        require: false
    },
    steps: {
        type: [String],
        require: false
    }
});

module.exports = mongoose.model('FoodRecipe', foodRecipeSchema);
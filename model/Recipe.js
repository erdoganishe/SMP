const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    difficulty: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    steps: {
        type: [String],
        require: true
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);
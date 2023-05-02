const Recipe = require('../model/Recipe');

const getAllRecipe = async (req, res) => {
    const recipe = await Recipe.find();
    if(!recipe) return res.sendStatus(204).json({'message': 'No recipe at all!'});
    res.json(recipe)
}

const createNewRecipe = async (req, res) => {
    if(!req?.body?.difficulty || req?.body?.time || req?.body?.steps){
        return res.sendStatus(400).json({'message': 'Difficulty, time, steps are required!'});
    }

    try{
        const result = await Recipe.create({
            difficulty: req.body.difficulty,
            time: req.body.time,
            steps: req.body.steps
        });
        
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateRecipe = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID is required!'});
    }

    const recipe = await Recipe.findOne({ _id: req.body.id}).exec();

    if(!recipe){
        return res.status(204).json({"message": `No recipe with ID ${req.body.id}.`});
    }
    if(req.body?.difficulty) recipe.difficulty = req.body.difficulty;
    if(req.body?.time) recipe.time = req.body.time;
    if(req.body?.steps) recipe.steps = req.body.steps;
    
    const result = await recipe.save();
    res.json(result);
}

const deleteRecipe = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ 'message': 'Recipe ID required'});

    const recipe = await Recipe.findOne({ _id: req.body.id}).exec();
    if(!recipe){
        return res.status(204).json({"message": `No recipe with ID ${req.body.id}.`});
    }
    const result = await recipe.deleteOne({ _id: req.body.id});
    res.json(result);
}

const getRecipe = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ 'message': 'Recipe ID required'});

    const recipe = await Recipe.findOne({ _id: req.params.id}).exec();
    if(!recipe){
        return res.status(204).json({"message": `No recipe with ID ${req.params.id}.`});
    }
    res.json(recipe);
}

module.exports = {
    getAllRecipe: getAllRecipe,
    createNewRecipe: createNewRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe,
    getRecipe: getRecipe
}

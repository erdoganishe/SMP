const FoodRecipe = require('../model/FoodRecipe');

const getAllFoodRecipe = async (req, res) => {
    const foodRecipe = await FoodRecipe.find();
    if(!foodRecipe) return res.sendStatus(204).json({'message': 'No recipe at all!'});
    res.json(foodRecipe)
}

const createNewFoodRecipe = async (req, res) => {
    if(!req?.body?.name){
        return res.sendStatus(400).json({'message': 'Name are required!'});
    }

    try{
        const result = await FoodRecipe.create({
            name: req.body.name,
            difficulty: req.body?.difficulty,
            time: req.body?.time,
            steps: req.body?.steps
        });
        
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateFoodRecipe = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID is required!'});
    }

    const foodRecipe = await FoodRecipe.findOne({ _id: req.body.id}).exec();

    if(!foodRecipe){
        return res.status(204).json({"message": `No recipe with ID ${req.body.id}.`});
    }
    if(req.body?.name) foodRecipe.name = req.body.name;
    if(req.body?.difficulty) foodRecipe.difficulty = req.body.difficulty;
    if(req.body?.time) foodRecipe.time = req.body.time;
    if(req.body?.steps) foodRecipe.steps = req.body.steps;
    
    const result = await foodRecipe.save();
    res.json(result);
}

const deleteFoodRecipe = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ 'message': 'Recipe ID required'});

    const foodRecipe = await FoodRecipe.findOne({ _id: req.body.id}).exec();
    if(!foodRecipe){
        return res.status(204).json({"message": `No recipe with ID ${req.body.id}.`});
    }
    const result = await FoodRecipe.deleteOne({ _id: req.body.id});
    res.json(result);
}

const getFoodRecipe = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ 'message': 'Recipe ID required'});

    const foodRecipe = await FoodRecipe.findOne({ _id: req.params.id}).exec();
    if(!foodRecipe){
        return res.status(204).json({"message": `No recipe with ID ${req.params.id}.`});
    }
    res.json(foodRecipe);
}

module.exports = {
    getAllFoodRecipe: getAllFoodRecipe,
    createNewFoodRecipe: createNewFoodRecipe,
    updateFoodRecipe: updateFoodRecipe,
    deleteFoodRecipe: deleteFoodRecipe,
    getFoodRecipe: getFoodRecipe
}

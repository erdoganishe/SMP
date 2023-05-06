const jwt = require('jsonwebtoken');
const User = require('../model/User');

const getAllFood = async (req, res) => {
    const food = await User.find();
    if(!food) return res.sendStatus(204).json({'message': 'No food at all!'});
    res.json(food)
}

const createNewFood = async (req, res) => {
    if(!req?.body?.name){
        return res.sendStatus(400).json({'message': 'Name are required!'});
    }

    try{
        const result = await User.create({
            name: req.body.name
        });
        
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateFood = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID is required!'});
    }

    const food_one = await User.findOne({ _id: req.body.id}).exec();

    if(!food_one){
        return res.status(204).json({"message": `No food with ID ${req.body.id}.`});
    }
    if (req.body?.name) food_one.name = req.body.name;
    const result = await food_one.save();
    res.json(result);
}

const deleteFood = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({ 'message': 'Food ID required'});

    const food_one = await User.findOne({ _id: req.body.id}).exec();
    if(!food_one){
        return res.status(204).json({"message": `No food with ID ${req.body.id}.`});
    }
    const result = await food_one.deleteOne({ _id: req.body.id});
    res.json(result);
}

const getUser = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ 'message': 'User ID required'});
    
    const user = await User.findOne({ username: req.params.id}).exec();
    if(!user){
        return res.status(204).json({"message": `No User with ID ${req.params.id}.`});
    }
    res.json(user);
}

module.exports = {
    // getAllFood,
    // createNewFood,
    // updateFood,
    // deleteFood,
    getUser
}

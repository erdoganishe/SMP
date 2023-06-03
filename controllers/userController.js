const jwt = require('jsonwebtoken');
const User = require('../model/User');

const getAllUser = async (req, res) => {
    const user = await User.find();
    if(!user) return res.sendStatus(204).json({'message': 'No user at all!'});
    res.json(user)
}
//already have a register, no need to creatNew func

// const createNewUser = async (req, res) => {
//     if(!req?.body?.name){
//         return res.sendStatus(400).json({'message': 'Name are required!'});
//     }

//     try{
//         const result = await User.create({
//             name: req.body.name
//         });
        
//         res.status(201).json(result);
//     } catch (err) {
//         console.error(err);
//     }
// }

const updateUser = async (req, res) => {
    if (!req?.user) return res.status(400).json({ 'message': 'User ID required' });

    const user = await User.findOne({ username: req.user }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user with ID ${req.user}.` });
    }

    if (req.body?.rena) user.profile.real_name = req.body.rena;
    const result = await user.save();
    res.json(result);
}

// const deleteUser = async (req, res) => {
//     if(!req?.body?.id) return res.status(400).json({ 'message': 'Food ID required'});

//     const food_one = await User.findOne({ _id: req.body.id}).exec();
//     if(!food_one){
//         return res.status(204).json({"message": `No food with ID ${req.body.id}.`});
//     }
//     const result = await food_one.deleteOne({ _id: req.body.id});
//     res.json(result);
// }

const getUser = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ 'message': 'User ID required'});
    
    const user = await User.findOne({ username: req.params.id}).exec();
    if(!user){
        return res.status(204).json({"message": `No User with ID ${req.params.id}.`});
    }
    res.json(user);
}

module.exports = {
    getAllUser,
    updateUser,
    // createNewFood,
    // updateFood,
    // deleteFood,
    getUser
}

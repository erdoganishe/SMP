const data = {
    food: require('../model/food.json'),
    setFood: function (data) {this.food = data}
}

const getAllFood = (req, res) => {
    res.json(data.food);
}

const createNewFood = (req, res) => {
    const newFood = {
        id: data.food?.length ? data.food[data.food.length - 1].id + 1 : 1,
        name: req.body.name   
    }

    if(!newFood.name){
        return res.status(400).json({'message' : 'Name is requaired'});
    }

    data.setFood([...data.food, newFood]);

    res.status(201).json({"name": req.body.name});
}

const updateFood = (req, res) => {
    const food_one = data.food.find(food => food.id === parseInt(req.body.id));
    if(!food_one){
        return res.status(400).json({"message": `Food Id ${food_one.body.id} not found`});
    }
    if (req.body.name) food_one.name = req.body.name;
    //remove existed
    const filtredArray = data.food.filter(food => food.id !== parseInt(req.body.id));
    //add updated
    const unsortedArray = [...filtredArray, food_one];
    //sort = add new
    data.setFood(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.json(data.food);
}

const deleteFood = (req, res) => {
    const food_one = data.food.find(food => food.id === parseInt(req.body.id));
    if(!food_one){
        return res.status(400).json({"message": `Food Id ${req.body.id} not found`});
    }
    //remove existed
    const filtredArray = data.food.filter(food => food.id !== parseInt(req.body.id));
    //sort = add new
    data.setFood(filtredArray)
    res.json(data.food);
}

const getFood = (req, res) => {
    const food_one = data.food.find(food => food.id === parseInt(req.body.id));
    if(!food_one){
        return res.status(400).json({"message": `Food Id ${food_one.body.id} not found`});
    }
    res.json(food_one);
}

module.exports = {
    getAllFood,
    createNewFood,
    updateFood,
    deleteFood,
    getFood
}

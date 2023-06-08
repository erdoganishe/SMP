require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const personalCounter = require('./middleware/personalCounter');
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3500;

// connect to DB
connectDB();

// const Recipe = require('./model/Recipe');
// const Food = require('./model/Food');
const FoodRecipe = require('./model/FoodRecipe');
// const fs = require('fs');
// const { ObjectId } = require('mongodb');

// const func = async function () {
//   const foodRecipes = await FoodRecipe.find({});

//   foodRecipes.forEach(async (foodrec) => {
//     //const doc = FoodRecipe.findOne({_id: ObjectId(food.id.toString())});
//     //console.log(food.id);
//     //doc_id = ObjectId(food.id.toString()

//     const newId = await Food.findOne({ name: foodrec.name });
//     //console.log(newId.id);

//     const doc = await FoodRecipe.findById(foodrec.id);
//     //console.log(doc);
//     doc._id = new ObjectId(newId.id);
//     FoodRecipe.insertMany(doc);
//     FoodRecipe.findByIdAndRemove(foodrec.id);
//   })
// }

// func();

// const path = require('path');
// const Recipe = require('./model/Recipe');
const fuc = async function() {
  const difficulty = 'Середня';
const time = "30-40 хвилин";
const steps = [
"Пляцки львівські - це традиційна українська страва, яка є популярною в Львові та інших містах Західної України. Це тонкі блинчики з дріжджового тіста, які запікаються на пательні та подаються з різноманітними начинками. Львівські пляцки можуть бути солодкими або солоними, залежно від вибраної начинки.",
"Інгредієнти: 250 г пшеничного борошна<br>250 мл молока<br>2 яйця<br>1 столова ложка розтопленого вершкового масла<br>1 чайна ложка цукру<br>½ чайної ложки солі, рослинна олія для змащення пательні.",
"1. У миску просійте борошно. Додайте цукор та сіль. Добре перемішайте.",
"2. У іншій мисці розтріскуйте яйця та додайте молоко. Збийте яйця з молоком в однорідну суміш.",
"3. Поступово додавайте яйцеву суміш у миску з борошном, постійно помішуючи, щоб утворити гладке тісто.",
"4. Додайте розтоплене вершкове масло до тіста та знову перемішайте.",
"5. Розігрійте пательню на середньому вогні та змастіть її рослинною олією.",
"6. Ложкою налійте порцію тіста на пательню та розтягніть його по всій площі пательні, щоб утворився тонкий пляцок. Готуйте протягом 1-2 хвилин, доки нижня сторона стане золотистою, потім переверніть пляцок та готуйте ще 1-2 хвилини.",
"7. Повторюйте процес з рештою тіста, змащуючи пательню олією за потреби. Готові пляцки львівські подавайте гарячими з обраною начинкою.",
"Тепер ви знаєте, як приготувати ароматні та смачні пляцки львівські. Ця страва чудово підійде для сніданку, обіду або вечері. Експериментуйте зі своїми улюбленими начинками та насолоджуйтеся смаком української кухні!"
];
  const recipe = await FoodRecipe.findOne({ name: 'Пляцки львівські' }).exec();
  recipe.difficulty = difficulty;
  recipe.time = time;
  recipe.steps = steps;
  recipe.save().then((reci) => {
    console.log(reci.name);
  })
}
// fuc();

// Food.find({}).then((docs) => {
//     docs.forEach((doc) => {
//          fs.rename(path.join(__dirname, 'public', 'img', 'front_img', `${i}.jpg`), path.join(__dirname, 'public', 'img', 'front_img', `${doc.id}.jpg`), (err) => {
//             if(err) {
//                 i++;
//                 fs.rename(path.join(__dirname, 'public', 'img', 'front_img', `${i}.jpg`), path.join(__dirname, 'public', 'img', 'front_img', `${doc.id}.jpg`), (err) => {
//                     if(err) {
//                         i++;
//                     }
//                  });
//             }
//          });
//     });
// });

//console.log(readfile);



mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

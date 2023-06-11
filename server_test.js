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
  const time = "40-50 хвилин";
  const steps = [
  "Котлети по-київськи - це класична українська страва, яка відома своїм ніжним і соковитим смаком. Це смажені курячі котлети, в середині яких прихована начинка з вершкового масла та зелені. Котлети по-київськи є популярними українськими стравами і часто подаються на святкових застіллях або у ресторанах.",
  "Інгредієнти: 4 курячі філе<br>150 г вершкового масла<br>1 столова ложка зелені (петрушка, кроп, базилік)<br>2 яйця<br>1 склянка борошна<br>1 склянка біскуітних крихт<br>1 чайна ложка солі<br>½ чайної ложки чорного перцю<br>рослинна олія для смаження.",
  "1. Підготуйте начинку для котлет. Розтопіть вершкове масло та додайте нарізану зелень. Заморозьте масло з зеленню у холодильнику протягом 20-30 хвилин, доки не стане твердим.",
  "2. Розріжте курячі філе на невеликі шматочки. Розкрити філе тонким шаром м'яса.",
  "3. Вийміть заморожене масло з зеленню з холодильника і наріжте його на крижинки.",
  "4. Покладіть одну крижинку масла на кожний шар курячого філе. Зверніть філе в рулетик, забезпечуючи те, щоб масло було повністю приховано всередині.",
  "5. У окремій мисці змішайте борошно, біскуітні крихти, сіль та перець.",
  "6. Обережно обмакуйте котлети в яйцях, потім в борошні з крихтами, щоб повністю покрити їх усіма шарами.",
  "7. Розігрійте рослинну олію на середньому вогні у сковороді. Смажте котлети по-київськи до золотистого кольору з обох сторін.",
  "Тепер ви знаєте, як приготувати смачні котлети по-київськи. Це ніжні, соковиті та ароматні курячі котлети з вершковим маслом та зеленню всередині. Вони стануть чудовим додатком до будь-якого обіду або вечері. Спробуйте готувати котлети по-київськи вдома та насолоджуйтеся смаком української кухні!"
  ];
  const recipe = await FoodRecipe.findOne({ name: 'Котлети по-київськи' }).exec();
  recipe.difficulty = difficulty;
  recipe.time = time;
  recipe.steps = steps;
  recipe.save().then((reci) => {
    console.log(reci.name);
  }).catch(e => {
    console.log(e);
  })
}
 fuc();

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

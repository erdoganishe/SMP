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

//const path = require('path');
// const Recipe = require('./model/Recipe');
// const fuc = async function() {
//   const difficulty = 'Середня';
//   const time = "1 година";
//   const steps = [
//     "Борщ - це одна з найбільш відомих страв української кухні. Він складається з багатьох інгредієнтів, таких як картопля, морква, буряк, капуста, цибуля та м'ясо (зазвичай свинина або говядина).",
//     "500 грамів свинини<br>2-3 картоплини<br>1 цибуля<br>2-3 головки часнику<br>2-3 лаврових листа<br>Сіль та перець за смаком<br>3-4 літри води",
//     "Наріжте м'ясо на кубики та підсмажте його до золотистого кольору у глибокій каструлі або сковороді.",
//     "Додайте нарізану цибулю та підсмажте разом із м'ясом до м'якості.",
//     "Додайте нарізані овочі (картоплю, моркву, буряк та капусту) та підсмажте їх разом з м'ясом та цибулею протягом кількох хвилин.",
//     "Додайте нарізану капусту та тушкуйте її разом з іншими інгредієнтами протягом 10-15 хвилин.",
//     "Додайте нарізану зелень (петрушку та кріп) та додайте сіль та перець за смаком. Потім долийте воду та доведіть до кипіння.",
//     "Зменшіть вогонь та доведіть до готовності протягом близько 30-40 хвилин.",
//     "Подаємо зі сметаною та часником.",
//     "Борщ - це одна з найпопулярніших страв української кухні. Його можна знайти у більшості ресторанів, які пропонують національну кухню, та в домашніх колекціях рецептів. Борщ - це смачна, поживна та задовільна страва, яка відображає культурну спадщину України."
//   ]

//   const recipe = await FoodRecipe.findOne({ name: 'Борщ' }).exec();
//   recipe.difficulty = difficulty;
//   recipe.time = time;
//   recipe.steps = steps;
//   recipe.save().then((reci) => {
//     console.log(reci);
//   })
// }
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

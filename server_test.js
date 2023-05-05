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
// const fuc = async function() {
//   const difficulty = 'Легка';
//   const time = "30-40 хвилин";
//   const steps = [
//     "Мазурики - це польська національна страва, яка походить з провінції Мазовія. Їх зазвичай готують на святкові події та родинні обіди, а також можна знайти в пекарнях у всій Польщі. Вони складаються з рум'яного коржа, що виготовляється зі змішаного тіста на основі масла, маку та цукру, зверху прикрашеного густою глазур'ю та кокосовими стружками.", "300 г борошна<br>200 г масла<br>100 г цукру<br>2 яйця<br>2 ст. л. гіркого какао<br>1 ч. л. соди<br>1 ч. л. оцту<br>начинка (сир, повидло, варення, мак, горіхи тощо)<br>", "Розтопити масло.", "Змішати розтоплене масло з цукром та яйцями до однорідної маси.", "Додати борошно, гіркий какао, соду, оцет та замісити тісто.", "Розділити тісто на декілька частин та розкатати кожну з них на пласт товщиною близько 3-4 мм.", "Вирізати круги за допомогою склянки або форми.", "Покласти на кожний круг трохи начинки та скласти мазурик.", "Випікати у духовці при температурі 180 градусів Цельсія близько 15-20 хвилин, доки мазурики не стануть золотистого кольору.", "Мазурики - це смачне та популярне випічка зі східноєвропейської кухні, що може бути начинена різними інгредієнтами за бажанням. Хоча їх виготовлення може виглядати трохи складним, з нашою інструкцією ви зможете легко приготувати цю смакоту удома. Насолоджуйтесь!"
//   ]

//   const recipe = await FoodRecipe.findOne({ name: 'Мазурики' }).exec();
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

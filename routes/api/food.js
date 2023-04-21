const express = require('express');
const router = express.Router();
const data = {};
data.food = require('../../data/food.json');

router.route('/')
    .get((req, res) => {
        res.json(data.food);
    })
    .post((req, res) => {
        res.json({"name": req.body.name});
    })
    .put((req, res) => {
        res.json({"name": req.body.name});
    })
    .delete((req, res) => {
        res.json({"id": req.body.id});
    });

router.route('/:id')
    .get((req, res) => {
        res.json({"id": req.params.id});
    });

module.exports = router;
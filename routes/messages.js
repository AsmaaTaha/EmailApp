const express = require('express');
const router = express.Router();
const createerror = require('http-errors');
const Messages = require("../Models/Messages");

router.post('/', function (req, res, next) {
    Messages.create(req.body)
        .then(message => {
            res.send(message);
        })
        .catch(err => {
            next(createerror(400, err));
        })
});

router.get('/', function (req, res, next) {
    Messages.find({})
        .then(message => {
            res.send(message);
        })
        .catch(err => {
            next(createerror(500, err));
        })
});

router.patch('/:messId', (req, res, next) => {
    Messages.findByIdAndUpdate(req.params.messId, req.body, { new: true })
        .then(message => {
            res.send(message);
        })
        .catch(err => {
            next(createerror(500, err));
        })
})

router.delete('/:messId', (req, res, next) => {
    Messages.findByIdAndDelete(req.params.messId)
        .then(message => {
            res.send(message);
        })
        .catch(err => {
            next(createerror(500, err));
        })
})

module.exports = router;
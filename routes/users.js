const express = require('express');
const router = express.Router();
const createerror = require('http-errors');
const User = require("../Models/Users");
const middleware = require('../Middleware/authentication');
/* GET users listing. */
router.post('/', function (req, res, next) {
    User.create(req.body)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            next(createerror(400, err));
        })
});

router.post('/login', async (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) return next(createerror(400, "missing arguments"));
    const user = await User.findOne({ name });
    if (!user) return next(createerror(401));
    const isMatch = await user.VerifyPassword(password).catch(console.err)
    if (!isMatch) return next(createerror(401));
    res.send({
        token: await user.GenerateToken(),
        user
    }
    );
})
// middleware
router.use(middleware);

router.get('/', function (req, res, next) {
    User.find({})
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            next(createerror(500, err));
        })
});

router.patch('/:userId', (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            next(createerror(500, err));
        })
})
router.delete('/:userId', (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            next(createerror(500, err));
        })
})
router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            next(createerror(500, err));
        })
})

router.get('/profile', (req, res, next) => {
    res.send("profile");
})
module.exports = router;

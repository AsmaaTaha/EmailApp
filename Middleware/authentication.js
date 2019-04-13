const express = require('express');
const router = express.Router();
const createerror = require('http-errors');
const User = require("../Models/Users");

module.exports = async (req, res, next) => {
    //check if user sent token
    //bearer token
    //check if token is valid
    //retrieve user
    //attach currentuser to req
    //call next
    try {

        if (!req.headers.authorization) return next(createerror(401));
        const [, token] = req.headers.authorization.split(' ');
        const UserId = await User.VerifyToken(token);
        if (!UserId) next(createerror(401));
        req.user = UserId;
        next();
    }
    catch (err) {
        console.error(err);
        next(createerror(401));
    }
}


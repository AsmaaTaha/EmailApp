const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const secretKey = 'mySecretKey';
const saltRounds = 10;
var Schema = mongoose.Schema;
const util = require('util');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

var UserSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        createIndexes: { unique: true },
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: validator.isEmail,
        required: false,
        createIndexes: { unique: true },
        unique: true
    },
    age: {
        type: Number,
        min: 18,
        required: false
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: false
    },
    countries: {
        type: String,
        enum: ['eg', 'uk'],
        required: false
    }
},
    {
        // toJSON: {
        //     hide: 'password',
        //     transform: true,
        // },
        autoIndex: true
    }
);
//to hide the password
// UserSchema.options.toJSON.transform = function (doc, ret, options) {
//     if (options.hide) {
//         options.hide.split(' ').forEach((prop) => { delete ret[prop]; });
//     }
//     return ret;
// }
const hashPassword = password => bcrypt.hash(password, saltRounds);
//ha3ml hashing ll password lw el user by create gded aw el user ghyar fl password
UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.password = await hashPassword(this.password);
    }
    next();
})
UserSchema.method('VerifyPassword', function (password) {
    return bcrypt.compare(password, this.password);
})

UserSchema.method('GenerateToken', async function () {
    //el sign de btakhod el payload
    const token = await sign({ _id: this.id }, secretKey, { expiresIn: '2h' });
    return token;
})

UserSchema.method('DecodeToken', function (token) {
    return verify(token, secretKey)
})

UserSchema.static('VerifyToken', async function (token) {
    const curretuser = this;
    const decoded = await verify(token, secretKey);
    const userId = decoded._id;
    return curretuser.findById(userId);
})
var User = mongoose.model('User', UserSchema);
module.exports = User; 
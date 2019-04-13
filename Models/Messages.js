const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    From: {
        type: String,
        required: true
    },
    To: {
        type: String,
        required: true
    },
    Text: {
        type: String,
        required: true
    },
    DCreated: {
        type: Date,
        required: false
    }
});
var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
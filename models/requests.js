const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestsSchema = new Schema({
    senderEmail: {
        type: String,
        required: true,
    },
    receiverEmail: {
        type: String,
        required: true,
    },
    flag: {
        type: Boolean,
        default: false,
    },
    value: {
        type: Number,
        default: 0,
    }
});

const requests = mongoose.model('Requests', requestsSchema);

module.exports = requests;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    personId: {
        type: String, 
        required: true,
        unique: true,
    },
    friends: [{
        type: String, 
    }],
});

const friends = mongoose.model('Friends', personSchema);

module.exports = friends;

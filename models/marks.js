const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const marksSchema = new Schema({
    marks: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Marks', marksSchema);
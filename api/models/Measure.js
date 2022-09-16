const mongoose = require('mongoose');

const measureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Measure', measureSchema)
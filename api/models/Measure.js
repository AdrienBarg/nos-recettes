const mongoose = require('mongoose');

const measureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    alt: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Measure', measureSchema)
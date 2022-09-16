const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    defaultMeasure: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Measure'
    },
    active: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Ingredient', ingredientSchema)
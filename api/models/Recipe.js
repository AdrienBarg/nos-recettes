const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    title: {
        type: String,
        required : true
    },
    desc: {
        type: String
    },
    cookingTime: {
        type: Number
    },
    prepTime: {
        type: Number
    },
    steps: [{
        type: String
    }],
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ingredient'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    active: {
        type: Boolean,
        default: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema)
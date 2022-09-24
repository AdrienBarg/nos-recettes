const mongoose = require('mongoose')

const followingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    /*followingBooks: [{
        type: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            },
            author: {
                type: String,
            },
            _id: false
        },
        _id: false
    }],*/
    books: [{
        idBook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        title: {
            type: String
        },
        author: {
            type: String,
        },
        _id: false
    }],
    recipes: [{
        idRecipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        title: {
            type: String
        },
        author: {
            type: String,
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
        _id: false
    }],
    /*followingRecipes: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        _id: false
    }]*/
});

module.exports = mongoose.model('Following', followingSchema);
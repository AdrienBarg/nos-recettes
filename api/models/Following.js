const mongoose = require('mongoose')

const followingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    followingBooks: [{
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        _id: false
    }],
    followingRecipes: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        _id: false
    }]
});

module.exports = mongoose.model('Following', followingSchema);
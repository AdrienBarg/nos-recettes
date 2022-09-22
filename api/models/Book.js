const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    author: {
        type: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name: {
                type: String
            }
        },
        required: true,
        _id: false
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    editors: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name: {
                type: String
            }
        }],
        required: true,
        _id: false
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User' 
    }],
    status: {
        type: String,
        default: 'Private'
    },
    active: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema)
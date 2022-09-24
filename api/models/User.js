const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    roles: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Roles'
            }
        }],
        default: [{
            id: '63287b26daf5faf10ce9a16b'
        }],
        _id: false
    },
    books: [{
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        _id: false
    }],
    recipes: [{
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        _id: false
    }],
    active: {
        type: Boolean,
        default: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)
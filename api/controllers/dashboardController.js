const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const Following = require('../models/Following');
const Recipe = require('../models/Recipe');
const User = require('../models/User');

// @desc - Get my books & recipes data
// @route - GET /dashboard/
// @access - Private
const getMyCollection = async (req, res) => {
    
    const id = req.query.id

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'No ID.' })
    }

    const foundUser = await User.findById(id).populate('books.id').populate('recipes.id').exec()
    if(!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'ID incorrect.' })
    }
    const collection = {
        books: [],
        recipes: []
    }
    //console.log(foundUser.books)
    foundUser?.books.map((book) => {
        collection.books.push(book.id)
    })
    foundUser?.recipes.map((book) => {
        collection.books.push(book.id)
    })
    //collection.books = foundUser.books
    collection.recipes = foundUser.recipes

    res.json({collection});
};

// @desc - Get my bookmarks
// @route - GET /dashboard/
// @access - Private
const getMyBookmarks = async (req, res) => {
    const id = req.query.id

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'No ID.' })
    }

    const foundFollowing = await Following.findOne({userId: id})

    if(!foundFollowing) {
        return res.status(401).json({ message: 'Aucun favoris trouvés.' })
    }

    const books = foundFollowing?.books
    const recipes = foundFollowing?.recipes

    res.json({ books, recipes })
}

module.exports = {
    getMyCollection,
    getMyBookmarks
}
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');

// @desc - Get my recipes
// @route - GET /books/myBooks
// @access - Public
const getMyBooks = asyncHandler(async (req, res) => {

    const id = req.query.id
    
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'No ID.' })
    }

    const recipes = await Book.find({ 'author.id': author }).lean()
    if (!recipes?.length) {
        console.log(recipes)
        recipes = []
    }
    res.json(recipes)
});

// @desc - Get all books
// @route - GET /books
// @access - Private
const getAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find().lean()
    if (!books?.length) {
        return res.status(400).json({ message: 'Aucun livres trouvés.' })
    }
    res.json(books)
});

// @desc - Create new books
// @route - POST /books
// @access - Members
const createNewBook = asyncHandler(async (req, res) =>  {
    const { title, author, desc } = req.body
    
    // Confirm data
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author required.' })
    }
    const editors = author

    // Check for duplicate by same author
    const duplicateTitle = await Book.findOne({ 'title' : { '$regex': title, '$options': 'i'}, 'author.id': author.id }).lean().exec()
    if(duplicateTitle) {
        return res.status(409).json({ message: `Vous avez déjà créé un livre du nom de  '${title}'.` })
    }
    
    const bookObject = { title, author, editors, desc }
    // Create and store new book
    const book = await Book.create(bookObject)
    if (book) {
        res.status(201).json({ message: `Nouveau livre '${title}' créé.` })
    } else {
        res.status(400).json({ message: 'Données saisies incorrectes.'})
    }
});

module.exports = {
    getMyBooks,
    getAllBooks,
    createNewBook,
}
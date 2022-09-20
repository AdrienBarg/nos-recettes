const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');

// @desc - Get books for ID
// @route - GET /books/myBooks
// @access - Public
const getMyBooks = expressAsyncHandler(async (req, res) => {
    const { author } = req.body
    console.log(req.body)
    // Confirm data
    if (!author?.id) {
        return res.status(400).json({ message: 'No ID.' })
    }

    let books = await Book.find({ 'author.id': author.id }).lean()
    if (!books?.length) {
        console.log(books)
        books = []
    }
    res.json(books)
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
        return res.status(400).json({ message: 'Title and creator required.' })
    }
    const editors = author

    // Check for duplicate by same author
    const duplicateName = await Book.findOne({ 'name' : { '$regex': title, '$options': 'i'}, 'author' : author }).lean().exec()
    if(duplicateName) {
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
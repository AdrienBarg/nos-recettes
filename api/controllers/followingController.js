const Following = require('../models/Following')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

// @desc - Create or Update Following
// @route - PATCH /following
// @access - Private

const upsertFollowing = asyncHandler (async (req, res) => {

    const userId = req.body?.id
    const book = req.body?.book
    const recipe = req.body?.recipe
    const category = req.body?.recipe

    // Confirm ID
    if (!userId) {
        return res.status(400).json({ message: 'No user ID.' })
    }

    // Verify Ownership
    /*if (userId !== req.user) {
        return res.status(401).json({ message: 'Vous n\'avez pas l\autorisation de modifier un autre profil.' })
    }*/

    // Check for duplicates
    let following = await Following.findOne({ userId: userId }).exec();
    
    // if duplicate
    if (following) {
        // if user sent a book to add in bookmarks
        if (book) {
            // if this user already has some books in his bookmarks
            if (following?.books.length !== 0) {
                // if user already has THIS book in his bookrmarks
                if (following.books.some(el => {return el.idBook.valueOf() === book.idBook })) {
                    // Then remove it
                    following.books = following.books.filter( obj => {
                        return obj.idBook.valueOf() !== book.idBook
                    })
                } else {
                    following.books.push(book)
                }
                
            } else {
                following.books = [book]
            }
        }
        if (recipe) {
            // if this user already has some recipes in his bookmarks
            if (following?.recipes.length !== 0) {
                // if user already has THIS recipe in his bookrmarks
                if (following.recipes.some(el => {return el.idRecipe.valueOf() === recipe.idRecipe })) {
                    // Then remobe it
                    following.recipes = following.recipes.filter( obj => {
                        return obj.idRecipe.valueOf() !== recipe.idRecipe
                    })
                } else {
                    following.recipes.push(recipe)
                }
                
            } else {
                following.recipes = [recipe]
            }
        }                      
        
        const updatedMFollowing = await following.save()
        res.json({ message: `Following for  ${updatedMFollowing.userId} mis à jour.` })
    } else {
        const followingObject = { userId, books: book, recipes: recipe }
        
        const following = await Following.create(followingObject)
        if (following) {
            res.status(201).json({ message: `Ajouté aux favoris.` })
        } else {
            res.status(400).json({ message: 'Invalid data received.' })
        }
    }
});

module.exports = {
    upsertFollowing
}
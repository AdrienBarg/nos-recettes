const verifyOwnership = (req, res, next) => {
    
    if (req.user !== req?.body?.id) {
        return res.status(401).json({ message: 'Vous n\'avez pas l\'autorisation de modifier un autre profil.' })
    } else {
        next()
    }
}

module.exports = verifyOwnership
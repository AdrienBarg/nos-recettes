const express = require('express');
const router = express.Router();

const followingController = require('../controllers/followingController')
const verifyJWT = require('../middleware/verifyJWT');
const verifyOwnership = require('../middleware/verifyOwnership');

router.use(verifyJWT)

router.route('/')
    .patch([verifyJWT, verifyOwnership], followingController.upsertFollowing)


module.exports = router
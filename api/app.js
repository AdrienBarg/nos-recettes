require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./models/user.model')

const app = express();

app.use(cors());
app.use(express.json())

const uri = process.env.MONGO_URI;
const jwtSec = process.env.JWT_SEC_KEY;
mongoose.connect(uri)

app.post('/api/register', async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ satus: 'ok' });
    } catch (error) {
        res.json({ satus: 'error', error: 'whatever error duplicate' });
    }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if(user) {

        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, jwtSec)

        return res.json({ status: 'ok', user: true})
    } else {
        return res.json({ status: 'error', user: false})
    }
});

app.listen(1337, () => {
    console.log('Server started on 1337')
});
let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../db").getDb;

router.post('/:email/:pass', (req, res) => {
    const db = getDb();

    //TODO: get login parameters, check user identity and return user profile
    res.status(401).json({message: "login failed"}); // replace with your code
});

module.exports = router;

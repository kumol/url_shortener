const express = require('express');
const router = express.Router();
const userRoute = require('./routes/user');
const shortendUrlRoute = require('./routes/shortendurl');

router.use('/user', userRoute);
router.use('/url', shortendUrlRoute);

module.exports = router;
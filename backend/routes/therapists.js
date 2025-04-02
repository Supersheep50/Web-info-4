// routes/therapists.js
const express = require('express');
const router = express.Router();
const therapistsController = require('../controllers/therapistsController');

router.get('/', therapistsController.getAllTherapists);

module.exports = router;

const express = require('express');
const router = express.Router();
const therapistsController = require('../controllers/therapistsController');

console.log('✅ therapists.js loaded');

router.get('/', therapistsController.getAllTherapists);
router.delete('/:id', therapistsController.deleteTherapist);


module.exports = router;

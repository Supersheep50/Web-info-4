const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');

router.get('/', sessionsController.getAllSessions);
router.post('/', sessionsController.createSession);
router.put('/:id', sessionsController.updateSession);
router.delete('/:id', sessionsController.deleteSession);

module.exports = router;

const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

router.get('/', clientsController.getAllClients);
router.delete('/:id', clientsController.deleteClient);
router.post('/', clientsController.createClient);
router.put('/:id', clientsController.updateClient);

module.exports = router;

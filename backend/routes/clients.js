const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Clients route placeholder');
});

module.exports = router;

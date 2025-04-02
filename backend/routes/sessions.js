const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Sessions route placeholder');
});

module.exports = router;

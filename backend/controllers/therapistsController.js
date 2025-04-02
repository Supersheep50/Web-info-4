// controllers/therapistsController.js
const db = require('../db');

exports.getAllTherapists = (req, res) => {
  const query = 'SELECT * FROM therapists';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching therapists:', err);
      res.status(500).json({ error: 'Failed to retrieve therapists' });
    } else {
      res.json(results);
    }
  });
};

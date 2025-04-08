console.log('✅ therapistsController loaded');

const db = require('../db');

// ✅ GET all therapists
exports.getAllTherapists = (req, res) => {
  console.log('➡️  getAllTherapists triggered');

  const query = 'SELECT * FROM therapists';

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching therapists:', err);
      return res.status(500).json({ error: 'Failed to retrieve therapists' });
    }
    res.json(results);
  });
};

// ✅ DELETE therapist by ID
exports.deleteTherapist = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM therapists WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting therapist:', err);
      res.status(500).json({ error: 'Failed to delete therapist' });
    } else {
      res.json({ message: 'Therapist deleted' });
    }
  });
};

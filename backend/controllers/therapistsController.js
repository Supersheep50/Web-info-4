

const db = require('../db');

//  GET all therapists
exports.getAllTherapists = (req, res) => {
  console.log('➡️  getAllTherapists triggered');

  const query = 'SELECT * FROM therapists';

  db.query(query, (err, results) => {
    if (err) {
      console.error(' Error fetching therapists:', err);
      return res.status(500).json({ error: 'Failed to retrieve therapists' });
    }
    res.json(results);
  });
};

//  DELETE therapist by ID
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

exports.createTherapist = (req, res) => {
  const { title, name, email, location, years_of_practice, availability } = req.body;
  const query = `
    INSERT INTO therapists (title, name, email, location, years_of_practice, availability)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [title, name, email, location, years_of_practice, availability], (err, result) => {
    if (err) {
      console.error('Error creating therapist:', err);
      return res.status(500).json({ error: 'Failed to create therapist' });
    }
    res.status(201).json({ message: 'Therapist created', id: result.insertId });
  });
};

exports.updateTherapist = (req, res) => {
  const { id } = req.params;
  const { title, name, email, location, years_of_practice, availability } = req.body;

  const query = `
    UPDATE therapists 
    SET title = ?, name = ?, email = ?, location = ?, years_of_practice = ?, availability = ? 
    WHERE id = ?
  `;

  db.query(
    query,
    [title, name, email, location, years_of_practice, availability, id],
    (err, result) => {
      if (err) {
        console.error('Error updating therapist:', err);
        return res.status(500).json({ error: 'Failed to update therapist' });
      }
      res.json({ message: 'Therapist updated' });
    }
  );
};

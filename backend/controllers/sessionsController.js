
const db = require('../db');

exports.getAllSessions = (req, res) => {
    const query = `
        SELECT s.id, s.notes, s.date, s.length,
               t.name AS therapist_name, c.name AS client_name
        FROM sessions s
        JOIN therapists t ON s.therapist_id = t.id
        JOIN clients c ON s.client_id = c.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching sessions:", err);
            return res.status(500).json({ error: 'Failed to retrieve sessions' });
        }
        res.json(results);
    });
};

exports.createSession = (req, res) => {
    const { therapist_id, client_id, notes, date, length } = req.body;
    const query = `
        INSERT INTO sessions (therapist_id, client_id, notes, date, length)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [therapist_id, client_id, notes, date, length], (err, result) => {
        if (err) {
            console.error("Error creating session:", err);
            return res.status(500).json({ error: 'Failed to create session' });
        }
        res.status(201).json({ id: result.insertId });
    });
};

exports.updateSession = (req, res) => {
    const { id } = req.params;
    const { therapist_id, client_id, notes, date, length } = req.body;

    const query = `
        UPDATE sessions 
        SET therapist_id = ?, client_id = ?, notes = ?, date = ?, length = ?
        WHERE id = ?
    `;

    db.query(query, [therapist_id, client_id, notes, date, length, id], (err) => {
        if (err) {
            console.error("Error updating session:", err);
            return res.status(500).json({ error: 'Failed to update session' });
        }
        res.json({ message: 'Session updated' });
    });
};

exports.deleteSession = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM sessions WHERE id = ?', [id], (err) => {
        if (err) {
            console.error("Error deleting session:", err);
            return res.status(500).json({ error: 'Failed to delete session' });
        }
        res.json({ message: 'Session deleted' });
    });
};

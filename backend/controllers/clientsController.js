const db = require('../db');

// get all clients

exports.getAllClients = (req, res) => {

    const query = 'SELECT * FROM clients';

    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ Error fetching clients:', err);
            return res.status(500).json({ error: 'Failed to retrieve clients' });
        }
        res.json(results);
    }   );  
}

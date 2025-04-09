const db = require('../db');

// get all clients

exports.getAllClients = (req, res) => {

    const query = 'SELECT * FROM clients';

    db.query(query, (err, results) => {
        if (err) {
            console.error(' Error fetching clients:', err);
            return res.status(500).json({ error: 'Failed to retrieve clients' });
        }
        res.json(results);
    }   );  
};

exports.deleteClient = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM clients WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting client:', err);
            res.status(500).json({ error: 'Failed to delete client' });
        } else {
            res.json({ message: 'Client deleted' });
        }
    });
};

exports.createClient = (req, res) => {
    const { name, email, phone, regularity } = req.body;
    const query = `
        INSERT INTO clients (name, email, phone, regularity)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [name, email, phone, regularity], (err, result) => {
        if (err) {
            console.error('Error creating client:', err);
            return res.status(500).json({ error: 'Failed to create client' });
        }
        res.status(201).json({ message: 'Client created', id: result.insertId });
    });
};

exports.updateClient = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, regularity } = req.body;

    const query = `
        UPDATE clients 
        SET name = ?, email = ?, phone = ?, regularity = ? 
        WHERE id = ?
    `;

    db.query(
        query,
        [name, email, phone, regularity, id],
        (err, result) => {
            if (err) {
                console.error('Error updating client:', err);
                return res.status(500).json({ error: 'Failed to update client' });
            }
            res.json({ message: 'Client updated' });
        }
    );
}

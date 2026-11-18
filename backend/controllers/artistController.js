// Farsaad Kamran
// 23316673

const db = require('../db');

exports.getAll = (req, res) => {
    db.all('SELECT * FROM artists', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getOne = (req, res) => {
    db.get('SELECT * FROM artists WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: 'Not found' });
        res.json(row);
    });
};

exports.create = (req, res) => {
    const { name, genre, listeners } = req.body;
    db.run(
        'INSERT INTO artists (name, genre, listeners) VALUES (?, ?, ?)',
        [name, genre, listeners],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
};

exports.update = (req, res) => {
    const { name, genre, listeners } = req.body;
    db.run(
        'UPDATE artists SET name = ?, genre = ?, listeners = ? WHERE id = ?',
        [name, genre, listeners, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Updated' });
        }
    );
};

exports.remove = (req, res) => {
    db.run('DELETE FROM artists WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    });
};
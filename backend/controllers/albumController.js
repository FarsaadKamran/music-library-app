// Farsaad Kamran
// 23316673

const db = require('../db');

exports.getAll = (req, res) => {
    const sql = `
        SELECT albums.*, COALESCE(artists.name, 'Unknown Artist') AS artist_name
        FROM albums
        LEFT JOIN artists ON albums.artist_id = artists.id
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getOne = (req, res) => {
    const sql = `
        SELECT albums.*, COALESCE(artists.name, 'Unknown Artist') AS artist_name
        FROM albums
        LEFT JOIN artists ON albums.artist_id = artists.id
        WHERE albums.id = ?
    `;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: 'Not found' });
        res.json(row);
    });
};

exports.create = (req, res) => {
    const { name, year, listens, artist_id } = req.body;
    db.run(
        'INSERT INTO albums (name, year, listens, artist_id) VALUES (?, ?, ?, ?)',
        [name, year, listens, artist_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
};

exports.update = (req, res) => {
    const { name, year, listens, artist_id } = req.body;
    db.run(
        'UPDATE albums SET name = ?, year = ?, listens = ?, artist_id = ? WHERE id = ?',
        [name, year, listens, artist_id, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Updated' });
        }
    );
};

exports.remove = (req, res) => {
    db.run('DELETE FROM albums WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    });
};
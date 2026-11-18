// Farsaad Kamran
// 23316673

const db = require('../db');

exports.getAll = (req, res) => {
    const sql = `
        SELECT songs.*, COALESCE(albums.name, 'Unknown Album') AS album_name
        FROM songs
        LEFT JOIN albums ON songs.album_id = albums.id
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500). json({ error: err.message });
        res.json(rows);
    });
};

exports.getOne = (req, res) => {
    const sql = `
        SELECT songs.*, COALESCE(albums.name, 'Unknown Album') AS album_name
        FROM songs
        LEFT JOIN albums ON songs.album_id = albums.id
        WHERE songs.id = ?
    `;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ message: 'Not found' });
        res.json(row);
    });
};

exports.create = (req, res) => {
    const { name, year, album_id } = req.body;
    db.run(
        'INSERT INTO songs (name, year, album_id) VALUES (?, ?, ?)',
        [name, year, album_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
};

exports.update = (req, res) => {
    const { name, year, album_id } = req.body;
    db.run(
        'UPDATE songs SET name = ?, year = ?, album_id = ? WHERE id = ?',
        [name, year, album_id, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Updated' });
        }
    );
};

exports.remove = (req, res) => {
    db.run('DELETE FROM songs WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    });
};
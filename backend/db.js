// Farsaad Kamran
// 23316673

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('./data')) fs.mkdirSync('./data');

const db = new sqlite3.Database('./data/app.db', (err) => {
    if (err) console.error(err);
    else console.log('DB connected');
});

// IMPORTANT: enable foreign keys
db.run('PRAGMA foreign_keys = ON');

const sql = fs.readFileSync(path.join(__dirname, 'model.sql'), 'utf8');
db.exec(sql, (err) => {
    if (err) console.error('SQL error:', err);
    else {
        console.log('Database initialized');
        // Force insert sample artists if missing
        db.run(`INSERT OR IGNORE INTO artists (id, name, genre, listeners) VALUES 
            (1, 'Drake', 'Hip-Hop', 80000000),
            (2, 'Taylor Swift', 'Pop', 100000000)`);
        // Force insert sample albums
        db.run(`INSERT OR IGNORE INTO albums (id, name, year, listens, artist_id) VALUES 
            (1, 'Scorpion', 2018, 5000000, 1),
            (2, 'Certified Lover Boy', 2021, 4000000, 1),
            (3, '1989', 2014, 6000000, 2),
            (4, 'Midnights', 2022, 7000000, 2),
            (5, 'Red', 2012, 6500000, 2)`);
        // Force insert sample songs
        db.run(`INSERT OR IGNORE INTO songs (id, name, year, album_id) VALUES 
            (1, 'Gods Plan', 2018, 1),
            (2, 'In My Feelings', 2018, 1),
            (3, 'Way 2 Sexy', 2021, 2),
            (4, 'Blank Space', 2014, 3),
            (5, 'Style', 2014, 3),
            (6, 'Anti-Hero', 2022, 4),
            (7, 'Lavender Haze', 2022, 4),
            (8, 'All Too Well', 2012, 5),
            (9, '22', 2012, 5),
            (10, 'I Knew You Were Trouble', 2012, 5)`);
    }
});

module.exports = db;
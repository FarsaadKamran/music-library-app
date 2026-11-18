--- Farsaad Kamran ---
--- 23316673 ---

-- Artists
CREATE TABLE IF NOT EXISTS artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    genre TEXT,
    listeners INTEGER
);

-- Albums
CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    year INTEGER,
    listens INTEGER,
    artist_id INTEGER,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);

-- Songs
CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);

-- Sample Data (only if tables are empty)
INSERT OR IGNORE INTO artists (id, name, genre, listeners) VALUES
(1, 'Drake', 'Hip-Hop', 80000000),
(2, 'Taylor Swift', 'Pop', 100000000);

INSERT OR IGNORE INTO albums (id, name, year, listens, artist_id) VALUES
(1, 'Scorpion', 2018, 5000000, 1),
(2, 'Certified Lover Boy', 2021, 4000000, 1),
(3, '1989', 2014, 6000000, 2),
(4, 'Midnights', 2022, 7000000, 2),
(5, 'Red', 2012, 6500000, 2);

INSERT OR IGNORE INTO songs (id, name, year, album_id) VALUES
(1, 'Gods Plan', 2018, 1),
(2, 'In My Feelings', 2018, 1),
(3, 'Way 2 Sexy', 2021, 2),
(4, 'Blank Space', 2014, 3),
(5, 'Style', 2014, 3),
(6, 'Anti-Hero', 2022, 4),
(7, 'Lavender Haze', 2022, 4),
(8, 'All Too Well', 2012, 5),
(9, '22', 2012, 5),
(10, 'I Knew You Were Trouble', 2012, 5);
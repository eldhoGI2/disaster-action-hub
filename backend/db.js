const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./disaster.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      category TEXT
    )
  `);

  db.run(`
    INSERT INTO locations (name, latitude, longitude, category)
    SELECT 'Central Shelter', 13.0827, 80.2707, 'Shelter'
    WHERE NOT EXISTS (SELECT 1 FROM locations)
  `);
});

module.exports = db;
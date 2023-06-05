import Database from 'better-sqlite3';

// Create and connect to the SQLite database
const db = new Database(':memory:', { verbose: console.log });
db.pragma('journal_mode = WAL');

// Create a table for configurations
db.exec(
    'CREATE TABLE IF NOT EXISTS configurations (id INTEGER PRIMARY KEY AUTOINCREMENT, serverURL TEXT, password TEXT, budgetID TEXT)'
);

export function saveConfig(serverURL, password, budgetID) {
    const stmt = db.prepare(
        'INSERT INTO configurations (serverURL, password, budgetID) VALUES (?, ?, ?)'
    );
    const result = stmt.run(serverURL, password, budgetID);
    const configId = result.lastInsertRowid;
    return configId;
}

export function getConfig(configId) {
    const stmt = db.prepare('SELECT * FROM configurations WHERE id = ?');
    const row = stmt.get(configId);
    return row;
}
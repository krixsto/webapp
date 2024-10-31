import { DB } from './db';

export const createTables = (db: DB) => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        publishedAt TEXT,
        public INTEGER,
        status INTEGER,
        tags TEXT
        );
    `);

    console.log("Projects table created successfully.");
};
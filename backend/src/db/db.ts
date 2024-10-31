import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(__dirname, 'database.sqlite'));
export type DB = typeof db;

export default db;
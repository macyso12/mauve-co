import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'data', 'mauve.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    email      TEXT    NOT NULL,
    event_date TEXT    NOT NULL,
    package    TEXT    NOT NULL,
    addons     TEXT,
    message    TEXT,
    created_at TEXT    NOT NULL
  )
`);

const insertInquiry = db.prepare(`
  INSERT INTO inquiries (name, email, event_date, package, addons, message, created_at)
  VALUES (@name, @email, @event_date, @package, @addons, @message, @created_at)
`);

export { insertInquiry };

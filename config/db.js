import mysql from 'mysql';
import { promisify } from 'util';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database Connected');
});

const query = promisify(db.query).bind(db);

export default query;

import pgPromise from 'pg-promise';
import config from '../config';

const pgp = pgPromise();

const db = pgp({
  host: config.database.DB_HOST,
  port: 5432,
  database: config.database.DB_DATABASE_NAME,
  user: config.database.DB_USERNAME,
  password: config.database.DB_PASSWORD,
});


export default db;

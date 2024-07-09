-- migrations/002_user_language_schema.sql

CREATE TABLE user_languages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  language VARCHAR(50)
);

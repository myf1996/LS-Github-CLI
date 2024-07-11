-- migrations/002_user_language_schema.sql

CREATE TABLE user_languages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  language VARCHAR(50)
);

-- Create indexes
CREATE INDEX user_languages_user_id_index ON user_languages(user_id);
CREATE INDEX user_languages_language_index ON user_languages(language);
CREATE INDEX user_languages_language_user_id_index ON user_languages(language, user_id);

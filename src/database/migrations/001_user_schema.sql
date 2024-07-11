-- migrations/001_initial_schema.sql
CREATE TABLE users (
  login VARCHAR(100) UNIQUE NOT NULL,
  id SERIAL PRIMARY KEY,
  avatar_url VARCHAR(250),
  gravatar_id VARCHAR(250),
  url VARCHAR(250),
  html_url VARCHAR(250),
  followers_url VARCHAR(250),
  following_url VARCHAR(250),
  gists_url VARCHAR(250),
  starred_url VARCHAR(250),
  subscriptions_url VARCHAR(250),
  organizations_url VARCHAR(250),
  repos_url VARCHAR(250),
  events_url VARCHAR(250),
  received_events_url VARCHAR(250),
  type VARCHAR(250),
  site_admin VARCHAR(250),
  name VARCHAR(100),
  company VARCHAR(250),
  blog TEXT,
  location VARCHAR(100),
  email VARCHAR(100) NULL,
  hireable VARCHAR(100) NULL,
  bio TEXT,
  twitter_username VARCHAR(100) NULL,
  public_repos INTEGER,
  public_gists INTEGER,
  followers INTEGER,
  following INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX users_login_index ON users(login);
CREATE INDEX users_name_index ON users(name);

-- migrations/003_user_repositories_schema.sql

CREATE TABLE user_repositories (
  id SERIAL PRIMARY KEY,
  node_id VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  is_private BOOLEAN NOT NULL,
  user_id BIGINT NOT NULL,
  html_url VARCHAR(255) NOT NULL,
  description TEXT NULL,
  fork BOOLEAN NOT NULL,
  url VARCHAR(255) NOT NULL,
  forks_url VARCHAR(255),
  keys_url VARCHAR(255),
  collaborators_url VARCHAR(255),
  teams_url VARCHAR(255),
  hooks_url VARCHAR(255),
  issue_events_url VARCHAR(255),
  events_url VARCHAR(255),
  assignees_url VARCHAR(255),
  branches_url VARCHAR(255),
  tags_url VARCHAR(255),
  blobs_url VARCHAR(255),
  git_tags_url VARCHAR(255),
  git_refs_url VARCHAR(255),
  trees_url VARCHAR(255),
  statuses_url VARCHAR(255),
  languages_url VARCHAR(255),
  stargazers_url VARCHAR(255),
  contributors_url VARCHAR(255),
  subscribers_url VARCHAR(255),
  subscription_url VARCHAR(255),
  commits_url VARCHAR(255),
  git_commits_url VARCHAR(255),
  comments_url VARCHAR(255),
  issue_comment_url VARCHAR(255),
  contents_url VARCHAR(255),
  compare_url VARCHAR(255),
  merges_url VARCHAR(255),
  archive_url VARCHAR(255),
  downloads_url VARCHAR(255),
  issues_url VARCHAR(255),
  pulls_url VARCHAR(255),
  milestones_url VARCHAR(255),
  notifications_url VARCHAR(255),
  labels_url VARCHAR(255),
  releases_url VARCHAR(255),
  deployments_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  pushed_at TIMESTAMP NOT NULL,
  git_url VARCHAR(255),
  ssh_url VARCHAR(255),
  clone_url VARCHAR(255),
  svn_url VARCHAR(255),
  homepage VARCHAR(255),
  size INTEGER,
  stargazers_count INTEGER,
  watchers_count INTEGER,
  language VARCHAR(50),
  has_issues BOOLEAN,
  has_projects BOOLEAN,
  has_downloads BOOLEAN,
  has_wiki BOOLEAN,
  has_pages BOOLEAN,
  has_discussions BOOLEAN,
  forks_count INTEGER,
  mirror_url VARCHAR(255),
  archived BOOLEAN,
  disabled BOOLEAN,
  open_issues_count INTEGER,
  license VARCHAR(255),
  allow_forking BOOLEAN,
  is_template BOOLEAN,
  web_commit_signoff_required BOOLEAN,
  visibility VARCHAR(50),
  forks INTEGER,
  open_issues INTEGER,
  watchers INTEGER,
  default_branch VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

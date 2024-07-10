import db from "../database/dbConfig";
import { GithubRepo, GithubUser } from "../types/github";


export class UserService {
  constructor(){}

  /**
   * Add user information, user languages, and user repositories
   *  to the respective database tables (users, user_languages, 
   * and user_repositories).
  */
  async addUser(
    user: GithubUser,
    languages: string[],
    repositories: GithubRepo[]
  ): Promise <GithubUser> {
    
    // Insert user information into the users table in the database
    await db.one(
      `INSERT INTO users (
        login, id, avatar_url, gravatar_id, url, 
        html_url, followers_url, following_url, gists_url, starred_url, 
        subscriptions_url, organizations_url, repos_url, events_url, 
        received_events_url, type, site_admin, name, company, blog, location,
        email, hireable, bio, twitter_username, public_repos, 
        public_gists, followers, following, created_at, updated_at
      )
      VALUES (
        \${login}, \${id}, \${avatar_url}, \${gravatar_id}, \${url}, 
        \${html_url}, \${followers_url}, \${following_url}, \${gists_url}, 
        \${starred_url}, \${subscriptions_url}, \${organizations_url}, 
        \${repos_url}, \${events_url}, \${received_events_url}, \${type}, 
        \${site_admin}, \${name}, \${company}, \${blog}, \${location}, 
        \${email}, \${hireable}, \${bio}, \${twitter_username}, 
        \${public_repos}, \${public_gists}, \${followers}, \${following}, 
        \${created_at}, \${updated_at}
      ) RETURNING id`,
      {
        ...user
      }
    );

    // Insert user languages into the user_languages table in the database
    const languageQueries = languages.map(lang => 
      db.none(
        `INSERT INTO user_languages (user_id, language) 
        VALUES (\${user_id}, \${user_id})`, {
          user_id: user.id,
          language: lang
        })
    );
    
    await Promise.all(languageQueries);
    
    /**
     * Insert user repositories into the user_repositories 
     * table in the database
    */
    const repositoryQueries = repositories.map(repo =>
      db.none(
        `INSERT INTO user_repositories (
          id, node_id, name, full_name, is_private, user_id, html_url, 
          description, fork, url, forks_url, keys_url, collaborators_url, 
          teams_url, hooks_url, issue_events_url, events_url, assignees_url, 
          branches_url, tags_url, blobs_url, git_tags_url, git_refs_url, 
          trees_url, statuses_url, languages_url, stargazers_url, 
          contributors_url, subscribers_url, subscription_url, commits_url, 
          git_commits_url, comments_url, issue_comment_url, contents_url, 
          compare_url, merges_url, archive_url, downloads_url, issues_url, 
          pulls_url, milestones_url, notifications_url, labels_url, 
          releases_url, deployments_url, created_at, updated_at, pushed_at,
          git_url, ssh_url, clone_url, svn_url, homepage, size, 
          stargazers_count, watchers_count, language, has_issues, 
          has_projects, has_downloads, has_wiki, has_pages, has_discussions, 
          forks_count, mirror_url, archived, disabled, open_issues_count, 
          license, allow_forking, is_template, web_commit_signoff_required,
          visibility, forks, open_issues, watchers, default_branch
        ) VALUES (
          \${id}, \${node_id}, \${name}, \${full_name}, \${is_private}, 
          \${user_id}, \${html_url}, \${description}, \${fork}, \${url}, 
          \${forks_url}, \${keys_url}, \${collaborators_url}, \${teams_url}, 
          \${hooks_url}, \${issue_events_url}, \${events_url}, 
          \${assignees_url}, \${branches_url}, \${tags_url}, \${blobs_url}, 
          \${git_tags_url}, \${git_refs_url}, \${trees_url}, \${statuses_url}, 
          \${languages_url}, \${stargazers_url}, \${contributors_url}, 
          \${subscribers_url}, \${subscription_url}, \${commits_url}, 
          \${git_commits_url}, \${comments_url}, \${issue_comment_url}, 
          \${contents_url}, \${compare_url}, \${merges_url}, \${archive_url}, 
          \${downloads_url}, \${issues_url}, \${pulls_url}, \${milestones_url},
          \${notifications_url}, \${labels_url}, \${releases_url}, 
          \${deployments_url}, \${created_at}, \${updated_at}, \${pushed_at}, 
          \${git_url}, \${ssh_url}, \${clone_url}, \${svn_url}, \${homepage}, 
          \${size}, \${stargazers_count}, \${watchers_count}, \${language}, 
          \${has_issues}, \${has_projects}, \${has_downloads}, \${has_wiki}, 
          \${has_pages}, \${has_discussions}, \${forks_count}, \${mirror_url}, 
          \${archived}, \${disabled}, \${open_issues_count}, \${license}, 
          \${allow_forking}, \${is_template}, \${web_commit_signoff_required}, 
          \${visibility}, \${forks}, \${open_issues}, \${watchers}, 
          \${default_branch}
        )`,
        {
          ...repo, is_private: repo.private, user_id: user.id
        }
      )
    );
  
    await Promise.all(repositoryQueries);
    return {
      ...user,
      languages: languages
    };
  }

  /**
   * Retrieve all users from the database.
  */
  async getAllUser(): Promise<GithubUser[]> {
    return db.any(`
      SELECT 
      users.*, 
      array_agg(user_languages.language) AS languages 
      FROM users JOIN user_languages ON users.id = user_languages.user_id 
      GROUP BY users.id`
    );
  }

  /**
   * Retrieve all users from the database based 
   * on their location.
  */
  async getAllUserbyLocation(location: string): Promise<GithubUser[]> {
    return db.any(`
      SELECT 
      users.*, 
      array_agg(user_languages.language) AS languages 
      FROM users JOIN user_languages ON users.id = user_languages.user_id 
      WHERE users.location ILIKE \${location}
      GROUP BY users.id`, {
      location: `%${location}%`
    }
    );
  }

  /**
   * Retrieve all users from the database based 
   * on their programmig languages.
  */
  async getAllUserbyLanguage(language: string): Promise<GithubUser[]> {
    return db.any(`
      SELECT 
      users.*, 
      array_agg(user_languages.language) AS languages 
      FROM users JOIN user_languages ON users.id = user_languages.user_id 
      WHERE user_languages.language ILIKE \${language}
      GROUP BY users.id`, {
      language: `%${language}%`
    }
    );
  }
}
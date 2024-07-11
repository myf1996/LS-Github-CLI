import axios from "axios";
import { 
  GithubUser, 
  GithubUserLanguageAndRepo 
} from "../types/github";
import config from "../config";

const baseurl = config.github.baseurl;
const headers = {
  ...(
    config.github.token ? 
      { "Authorization": `Bearer ${config.github.token}` } : 
      {}
  ),
};

/**
 * Fetch user information from the GitHub API.
*/
export async function getUser(
  username: string
) : Promise <GithubUser> {
  const response = await axios.get(`${baseurl}/users/${username}`, { 
    headers 
  });
  return response.data;
};

/**
 * Fetches a user's repositories from the GitHub API and retrieves the 
 * programming languages used in each repository by using the `languages_url` 
 * attribute of each repository.
*/
export async function getUserLanguagesAndRepos(
  username: string
) : Promise <GithubUserLanguageAndRepo> {
  const repos = await axios.get(`${baseurl}/users/${username}/repos`, {
    headers
  });
  const languages = new Set<string>();
  for (const repo of repos.data) {
    const repoLanguages = await axios.get(repo.languages_url, {
      headers
    });
    Object.keys(repoLanguages.data).forEach(lang => languages.add(lang));
  }
  return {
    languages: Array.from(languages),
    repos: repos.data,
  };
};

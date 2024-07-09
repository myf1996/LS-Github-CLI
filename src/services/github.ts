import axios from 'axios';
import { GithubUser, GithubUserLanguageAndRepo } from '../types/github';
import config from '../config';

export class GithubService {
  private baseurl: string;

  constructor(){
    this.baseurl = config.github.baseurl;
  }

  async getUser(username: string): Promise <GithubUser> {
    const response = await axios.get(`${this.baseurl}/users/${username}`);
    return response.data;
  };

  async getUserLanguagesAndRepos(username: string): Promise <GithubUserLanguageAndRepo> {
    const repos = await axios.get(`${this.baseurl}/users/${username}/repos`);
    const languages = new Set<string>();
    for (const repo of repos.data) {
      const repoLanguages = await axios.get(repo.languages_url);
      Object.keys(repoLanguages.data).forEach(lang => languages.add(lang));
    }
    return {
      languages: Array.from(languages),
      repos: repos.data,
    };
  };
}

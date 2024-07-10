import axios from "axios";
import { GithubService } from "../services/github";
import { GithubUserLanguageAndRepo } from "../types/github";
import {
  mockRepoLanguages,
  mockRepos,
  mockUser,
} from "./__mocks__/types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("GithubService", () => {
  let githubService: GithubService;

  beforeAll(() => {
    githubService = new GithubService();
  });

  it("should fetch user information from GitHub", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

    const result = await githubService.getUser("myf1996");

    expect(result).toEqual(mockUser);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.github.com/users/myf1996"
    );
  });

  it("should fetch user languages and repositories from GitHub", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockRepos })
      .mockResolvedValueOnce({ data: mockRepoLanguages });

    const result: GithubUserLanguageAndRepo =
      await githubService.getUserLanguagesAndRepos("myf1996");

    expect(result.languages).toEqual(["JavaScript", "TypeScript"]);
    expect(result.repos).toEqual(mockRepos);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.github.com/users/myf1996/repos"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://api.github.com/repos/myf1996/LS-Github-CLI/languages"
    );
  });
});

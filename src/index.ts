
import { GithubService } from "./services/github";
import { UserService } from "./services/user";

const [, , command, ...args] = process.argv;

const main = async () => {
  try {
    const userService = new UserService();
    if (command === "add-user") {
      const githhubService = new GithubService();
      const [username] = args;
      const user = await githhubService.getUser(username);
      const userLanguagesAndRepos = 
        await githhubService.getUserLanguagesAndRepos(username);
      const userInfo = await userService.addUser(
        user, 
        userLanguagesAndRepos.languages, 
        userLanguagesAndRepos.repos,
      );
      console.log(userInfo);
    } else if (command === "get-users") {
      const users = await userService.getAllUser();
      console.log(users);
    } else if (command === "get-users-by-location") {
      const [location] = args;
      const users = await userService.getAllUserbyLocation(location);
      console.log(users);
    } else if (command === "get-users-by-language") {
      const [language] = args;
      const users = await userService.getAllUserbyLanguage(language);
      console.log(users);
    } else {
      console.error("Invalid Command");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

main();

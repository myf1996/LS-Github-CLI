import { 
  getUser, 
  getUserLanguagesAndRepos 
} from "./services/github";
import { 
  addUser, 
  getAllUser, 
  getAllUserbyLocation, 
  getAllUserbyLanguage 
} from "./services/user";

const [, , command, ...args] = process.argv;

const cliCommand = Object.freeze({
  ADD_USER: "add-user",
  GET_USERS: "get-users",
  GET_USERS_BY_LOCATION: "get-users-by-location",
  GET_USERS_BY_LANGUAGE: "get-users-by-language",
});

const main = async () => {
  try {
    if (command === cliCommand.ADD_USER ) {
      const [username] = args;
      const user = await getUser(username);
      const userLanguagesAndRepos = 
        await getUserLanguagesAndRepos(username);
      const userInfo = await addUser(
        user, 
        userLanguagesAndRepos.languages, 
        userLanguagesAndRepos.repos,
      );
      console.log(userInfo);
    } else if (command === cliCommand.GET_USERS ) {
      const users = await getAllUser();
      console.log(users);
    } else if (command === cliCommand.GET_USERS_BY_LOCATION ) {
      const [location] = args;
      const users = await getAllUserbyLocation(location);
      console.log(users);
    } else if (command === cliCommand.GET_USERS_BY_LANGUAGE) {
      const [language] = args;
      const users = await getAllUserbyLanguage(language);
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

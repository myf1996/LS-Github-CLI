
import { GithubService } from './services/github';
import { UserService } from './services/user';

const [, , command, ...args] = process.argv;

const main = async () => {
  try {
    const userService = new UserService()
    if (command === 'add-user') {
      console.log('add-user')
      const githhubService = new GithubService()
      const [username] = args;
      const user = await githhubService.getUser(username);
      const userLanguagesAndRepos = await githhubService.getUserLanguagesAndRepos(username);
      await userService.addUser(
        user, 
        userLanguagesAndRepos.languages, 
        userLanguagesAndRepos.repos,
      );
      console.log(user);
    } 
  } catch (error: any) { // Add Proper Error Type
    console.error('Error:', error.message);
  }
};

main();

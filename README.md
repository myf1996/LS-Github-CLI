<h1 align="center">Github User Management Service</h1>

## Description
This project is a GitHub User Management Service designed to fetch and store GitHub user information, including their repositories and programming languages. The service provides a set of commands to add users, retrieve user details, and filter users based on location and programming languages.


## Features
1. **Fetch User Information**: Retrieve detailed user information from GitHub's REST API.
2. **Store User Data**: Persist user details, repositories, and programming languages in a PostgreSQL database.
3. **Filter Users**: Query users by location and programming languages.
4. **Command**.
    - ```npm run add-user <username>```: Add a GitHub user to the database.
    -  ```npm run get-users```: Retrieve all users from the database.
    -  ```npm run get-users-by-location <location>```: Retrieve users based on a specific location.
    -  ```npm run get-users-by-language <language>```: Retrieve users based on their programming language

## Technologies Use
1. **NodeJS**: JavaScript runtime environment.
2. **TypeScript**: TypeScript for type safety and improved developer experience.
3. **PostgreSQL**: Relational database for storing user data.
4. **pg-promise**: PostgreSQL interface for Node.js.
5. **Docker**: Containerization for easy dataabase setup and deployment.
7. **Jest**: Testing framework for unit tests.
8. **ESLint**: Linter for maintaining code quality.

## Pre-requisite

```bash
node -v 18.14.0
npm -v 9.3.1
docker -v 24.0.2 (optional)
```

## Getting Started
1. Clone the repository.
2. npm install
3. Set up the database
    - Ensure Docker is installed and running.
    - Start the PostgreSQL container.
      - ```docker-compose up -d```
    - ```npm run migrate```
4. Set up ```.env``` file
```bash
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE_NAME=
DB_PORT=
GITHUB_BASE_URL=
GITHUB_TOKEN=
```

## Test
```
$ npm run test
```
## Rate Limit Note
- **Unauthorized Requests**: GitHub's REST API has a rate limit of 60 requests per hour for unauthorized requests.
- **Authorized Requests**: For authorized requests, the rate limit increases to 5,000 requests per hour.

## Project Structure
```
project/
├── src
│   ├── database
│   │   ├── migratios
│   │   │   ├──  001_user_schema.sql
│   │   │   ├──  002_user_language_schema.sql
│   │   │   ├──  003_user_repositories_schema.sql
│   │   ├── migrate.ts
│   │   ├── dbConfig.ts
│   ├── services
│   │   ├── github.ts
│   │   ├── user.ts
│   ├── tests
│   │   ├── github.test.ts
│   │   ├── user.test.ts
│   ├── types
│   │   ├── github.ts
│   │   ├── user.ts
│   ├── config.ts
│   └── index.ts
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── eslint.config.js
├── jest.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## Stay in touch

- Author - [Yassar Farooq](mailto:g.yassarfarooq@gmail.com)
- LinkedIn - [Yassar Farooq](https://linkedin.com/in/yassar-farooq)
- Github - [myf1996](https://github.com/myf1996/)


<h1 align="center">LS Github CLI</h1>

## Description



## Features
1. 
2. 
3. 
4. 

## Features Explaination


## Pre-requisite

```bash
node -v 18.14.0
npm -v 9.3.1
```

## Setup
1. Clone the repository.
2. Create Environment variable ```.env``` file
```bash
$ DB_HOST=
$ DB_USERNAME=
$ DB_PASSWORD=
$ DB_DATABASE_NAME=
$ DB_PORT=
$ GITHUB_BASE_URL=
```
3. npm install


## Test
```
$ npm run test
```

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
├── eslint.config.mjs
├── package.json
├── .env
├── .env.example
├── .mocharc
└── tsconfig.json
```


## Stay in touch

- Author - [Yassar Farooq](mailto:g.yassarfarooq@gmail.com)
- LinkedIn - [Yassar Farooq](https://linkedin.com/in/yassar-farooq)
- Github - [myf1996](https://github.com/myf1996/)


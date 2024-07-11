import "dotenv/config";

const config = {
  database: {
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
    DB_PORT: Number (process.env.DB_PORT) || 5432,
  },
  github: {
    baseurl: process.env.GITHUB_BASE_URL || "https://api.github.com",
    token: process.env.GITHUB_TOKEN,
  },
};

export default config;

import 'dotenv/config'; 

// This is the ESM-safe way to get the root directory
const root = process.cwd();

const processENV = process.env.TEST_ENV;
const env = processENV || "qa";
console.log(`Test environment is: ${env}`);

const config = {
  apiUrl: "https://conduit-api.bondaracademy.com/api",
  userEmail: "qapitest@test.com",
  userPassword: "qapitest",
};

if (env == "qa") {
  config.userEmail = "qapitest@test.com";
  config.userPassword = "qapitest";
}
if (env === "prod") {
  /*   if (!process.env.PROD_USERNAME || !process.env.PROD_PASSWORD) {
    throw Error(`Missing required environment variables`);
  } */
  config.userEmail = process.env.PROD_USERNAME as string;
  config.userPassword = process.env.PROD_PASSWORD as string;
}

export { config };

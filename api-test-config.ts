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
if (env == "prod") {
  config.userEmail = "pwtest@test.com";
  config.userPassword = "pwtest";
}

export { config };

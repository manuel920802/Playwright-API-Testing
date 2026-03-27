import { test, expect } from "@playwright/test";
let authToken: string;

test.beforeAll("Run before all tests", async ({ request }) => {
  const tokenResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: {
          email: "qapitest@test.com",
          password: "qapitest",
        },
      },
    },
  );
  const tokenResponseJSON = await tokenResponse.json();
  //Save the token in a variable to be able to use it to authenticate the following requests
  authToken = "Token " + tokenResponseJSON.user.token;
});

test.afterAll("Run after all tests", async () => {});

//Create new test with request fixture for API testing
test("Get Test Tags", async ({ request }) => {
  //Send a GET request to the endpoint and save the response in a variable
  const tagsResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/tags",
  );
  //Format the endpoint response as JSON
  const tagsResponseJSON = await tagsResponse.json();

  //Assert that the response status code is 200
  expect(tagsResponse.status()).toEqual(200);
  //Assert that first tag in the response is "Test"
  expect(tagsResponseJSON.tags[0]).toEqual("Test");
  //Assert that array length is 10 or less
  expect(tagsResponseJSON.tags.length).toBeLessThanOrEqual(10);

  //Print the JSON response to the console (Optional)
  console.log(tagsResponseJSON);
});

test("Get All Articles", async ({ request }) => {
  const articlesResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
  );
  const articlesResponseJSON = await articlesResponse.json();

  expect(articlesResponse.status()).toEqual(200);
  expect(articlesResponseJSON.articles.length).toBeLessThanOrEqual(10);
  expect(articlesResponseJSON.articlesCount).toEqual(10);
});

test("Create And Delete Article", async ({ request }) => {
  const newArticleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "Test article postman",
          description: "test description postman",
          body: "test article postman body",
          tagList: ["tag-postman"],
        },
      },
      headers: {
        Authorization: authToken,
      },
    },
  );
  const newArticleResponseJSON = await newArticleResponse.json();
  expect(newArticleResponse.status()).toEqual(201);
  expect(newArticleResponseJSON.article.title).toEqual("Test article postman");
  //Save the slug of the newly created article in a variable to be able to delete it later
  const slugId = newArticleResponseJSON.article.slug;

  //Get all articles and verify that the newly created article is present in the response
  const articlesResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    {
      //Add the authorization header to be able to fetch the newly created article from logged in user
      headers: {
        Authorization: authToken,
      },
    },
  );
  const articlesResponseJSON = await articlesResponse.json();
  expect(articlesResponse.status()).toEqual(200);
  expect(articlesResponseJSON.articles[0].title).toEqual(
    "Test article postman",
  );

  //Delete the newly created article
  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
    {
      headers: {
        Authorization: authToken,
      },
    },
  );
  expect(deleteArticleResponse.status()).toEqual(204);
});

test("Create, Update And Delete Article", async ({ request }) => {
  const newArticleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "QA NEW article postman",
          description: "test new description postman",
          body: "test new article postman body",
          tagList: ["tagnewpostman"],
        },
      },
      headers: {
        Authorization: authToken,
      },
    },
  );
  const newArticleResponseJSON = await newArticleResponse.json();
  expect(newArticleResponse.status()).toEqual(201);
  expect(newArticleResponseJSON.article.title).toEqual(
    "QA NEW article postman",
  );
  //Save the slug of the newly created article in a variable to be able to update anddelete it later
  const slugId = newArticleResponseJSON.article.slug;

  //Update the newly created article
  const updateArticleResponse = await request.put(
    `https://conduit-api.bondaracademy.com/api/articles/${slugId}`,
    {
      data: {
        article: {
          title: "QA Article EDIT postman",
          description: "Article EDIT Description postman",
          body: "Article body EDIT postman",
          tagList: ["QA"],
        },
      },
      headers: {
        Authorization: authToken,
      },
    },
  );
  const updateArticleResponseJSON = await updateArticleResponse.json();
  expect(updateArticleResponse.status()).toEqual(200);
  expect(updateArticleResponseJSON.article.title).toEqual(
    "QA Article EDIT postman",
  );
  //Save the updated slugId of the updated article in a variable to be able to delete it later, because the slug is changing after the update
  const newSlugId = updateArticleResponseJSON.article.slug;

  //Get all articles and verify that the newly created and updated article is present in the response
  const articlesResponse = await request.get(
    "https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0",
    {
      //Add the authorization header to be able to fetch the newly created article from logged in user
      headers: {
        Authorization: authToken,
      },
    },
  );
  const articlesResponseJSON = await articlesResponse.json();
  expect(articlesResponse.status()).toEqual(200);
  expect(articlesResponseJSON.articles[0].title).toEqual(
    "QA Article EDIT postman",
  );

  //Delete the newly created article
  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/articles/${newSlugId}`,
    {
      headers: {
        Authorization: authToken,
      },
    },
  );
  expect(deleteArticleResponse.status()).toEqual(204);
});

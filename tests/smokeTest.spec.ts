import { test } from "../utils/fixtures";
import { expect } from "../utils/custom-expect";

test("Get Articles", async ({ api }) => {
  const response = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(response.articles.length).shouldBeLessThanOrEqual(10);
  expect(response.articlesCount).shouldEqual(10);
});

test("Get Test Tags", async ({ api }) => {
  const response = await api.path("/tags").getRequest(200);

  expect(response.tags[0]).shouldEqual("Test");
  expect(response.tags.length).toBeLessThanOrEqual(10);
});

test("Create and Delete Article", async ({ api }) => {
  const createArticleResponse = await api
    .path("/articles")
    .body({
      article: {
        title: "Test article pwapi",
        description: "test description pwapi",
        body: "test article pwapi body",
        tagList: ["tag-pwapi"],
      },
    })
    .postRequest(201);
  expect(createArticleResponse.article.title).shouldEqual("Test article pwapi");
  const slugId = createArticleResponse.article.slug;

  const articlesResponse = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponse.articles[0].title).shouldEqual("Test article pwapi");

  await api
    .path(`/articles/${slugId}`)
    .deleteRequest(204);

  const articlesResponseTwo = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponseTwo.articles[0].title).not.shouldEqual(
    "Test article pwapi",
  );
});

test("Create, Update, and Delete Article", async ({ api }) => {
  const createArticleResponse = await api
    .path("/articles")
    .body({
      article: {
        title: "Test NEW article pwapi",
        description: "test description pwapi",
        body: "test article pwapi body",
        tagList: ["tag-pwapi"],
      },
    })
    .postRequest(201);
  expect(createArticleResponse.article.title).shouldEqual(
    "Test NEW article pwapi",
  );
  const slugId = createArticleResponse.article.slug;

  const articlesResponse = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponse.articles[0].title).shouldEqual(
    "Test NEW article pwapi",
  );

  const updateArticleResponse = await api
    .path(`/articles/${slugId}`)
    .body({
      article: {
        title: "Test EDITED article pwapi",
        description: "Test EDITED description pwapi",
        body: "Test EDITED article pwapi body",
        tagList: ["tag-pwapi"],
      },
    })
    .putRequest(200);

  expect(updateArticleResponse.article.title).shouldEqual(
    "Test EDITED article pwapi",
  );
  const newSlugId = updateArticleResponse.article.slug;

  const articlesResponseTwo = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponseTwo.articles[0].title).shouldEqual(
    "Test EDITED article pwapi",
  );

  await api
    .path(`/articles/${newSlugId}`)
    .deleteRequest(204);

  const articlesResponseThree = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponseThree.articles[0].title).not.shouldEqual(
    "Test EDITED article pwapi",
  );
});

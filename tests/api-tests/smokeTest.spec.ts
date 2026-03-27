import { test } from "../../utils/fixtures.js";
import { expect } from "../../utils/custom-expect.js";
import articleRequestPayload from "../../request-objects/POST-article.json" with { type: "json" };
import { faker } from "@faker-js/faker";
import { getNewRandomArticle } from "../../utils/data-generator.js";

test("Get Articles", async ({ api }) => {
  const response = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  await expect(response).shouldMatchSchema("tags", "GET_articles");
  expect(response.articles.length).shouldBeLessThanOrEqual(10);
  expect(response.articlesCount).shouldEqual(10);
});

test("Get Test Tags", async ({ api }) => {
  const response = await api.path("/tags").getRequest(200);

  await expect(response).shouldMatchSchema("tags", "GET_tags");
  expect(response.tags[0]).shouldEqual("Test");
  expect(response.tags.length).toBeLessThanOrEqual(10);
});

test("Create and Delete Article", async ({ api }) => {
  const articleRequest = getNewRandomArticle();
  const createArticleResponse = await api
    .path("/articles")
    .body(articleRequest)
    .postRequest(201);

  await expect(createArticleResponse).shouldMatchSchema(
    "articles",
    "POST_articles",
  );
  expect(createArticleResponse.article.title).shouldEqual(
    articleRequest.article.title,
  );
  const slugId = createArticleResponse.article.slug;

  const articlesResponse = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponse.articles[0].title).shouldEqual(
    articleRequest.article.title,
  );

  await api.path(`/articles/${slugId}`).deleteRequest(204);

  const articlesResponseTwo = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponseTwo.articles[0].title).not.shouldEqual(
    articleRequest.article.title,
  );
});

test("Create, Update, and Delete Article", async ({ api }) => {
  const articleTitle = faker.lorem.sentence(5);
  const articleRequest = JSON.parse(JSON.stringify(articleRequestPayload));
  articleRequest.article.title = articleTitle;
  const createArticleResponse = await api
    .path("/articles")
    .body(articleRequest)
    .postRequest(201);

  await expect(createArticleResponse).shouldMatchSchema(
    "articles",
    "POST_articles",
  );
  expect(createArticleResponse.article.title).shouldEqual(articleTitle);
  const slugId = createArticleResponse.article.slug;

  const articlesResponse = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponse.articles[0].title).shouldEqual(articleTitle);

  const articleTitleUpdated = faker.lorem.sentence(5);
  articleRequest.article.title = articleTitleUpdated;
  const updateArticleResponse = await api
    .path(`/articles/${slugId}`)
    .body(articleRequest)
    .putRequest(200);

  expect(updateArticleResponse.article.title).shouldEqual(articleTitleUpdated);
  const newSlugId = updateArticleResponse.article.slug;

  const articlesResponseTwo = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponseTwo.articles[0].title).shouldEqual(
    articleTitleUpdated,
  );

  await api.path(`/articles/${newSlugId}`).deleteRequest(204);

  const articlesResponseThree = await api
    .path("/articles")
    .params({ limit: 10, offset: 0 })
    .getRequest(200);

  expect(articlesResponseThree.articles[0].title).not.shouldEqual(
    articleTitleUpdated,
  );
});

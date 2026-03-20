import { APIRequestContext } from "@playwright/test";
import { APILogger } from "./logger";
import { test } from "@playwright/test";

export class RequestHandler {
  private request: APIRequestContext;
  private logger: APILogger;
  private baseUrl: string | undefined;
  private defaultBaseUrl: string;
  private apiPath: string = "";
  private queryParams: object = {};
  private apiHeaders: Record<string, string> = {};
  private apibody: object = {};
  private defaultAuthToken: string;
  private clearAuthFlag: Boolean | undefined;

  //Constructor to initialize the request handler with the API request context and the default base URL of the API
  constructor(
    request: APIRequestContext,
    apiBaseUrl: string,
    logger: APILogger,
    authToken: string = "",
  ) {
    this.request = request;
    this.defaultBaseUrl = apiBaseUrl;
    this.logger = logger;
    this.defaultAuthToken = authToken;
  }

  //Method to set the base URL of the API
  url(url: string) {
    this.baseUrl = url;
    return this;
  }

  //Method to set the path of the API endpoint
  path(path: string) {
    this.apiPath = path;
    return this;
  }

  //Method to set the query parameters of the API request`
  params(params: object) {
    this.queryParams = params;
    return this;
  }

  //Method to set the headers of the API request
  headers(headers: Record<string, string>) {
    this.apiHeaders = headers;
    return this;
  }

  //Method to set the body of the API request
  body(body: object) {
    this.apibody = body;
    return this;
  }

  //Method to clear authorization from header
  clearAuth() {
    this.clearAuthFlag = true;
    return this;
  }

  //Method to send a GET request to the API endpoint and return the response as JSON
  async getRequest(statusCode: number) {
    let responseJSON: any;

    const url = this.getUrl();
    await test.step(`GET request to: ${url}`, async () => {
      this.logger.logRequest("GET", url, this.getHeaders());
      const response = await this.request.get(url, {
        headers: this.getHeaders(),
      });
      this.cleanupFields();
      const actualStatus = response.status();
      responseJSON = await response.json();

      this.logger.logResponse(actualStatus, responseJSON);
      this.statusCodeValidator(actualStatus, statusCode, this.getRequest);
    });

    return responseJSON;
  }

  //Method to send a POST request to the API endpoint and return the response as JSON
  async postRequest(statusCode: number) {
    let responseJSON: any;

    const url = this.getUrl();
    await test.step(`POST request to: ${url}`, async () => {
      this.logger.logRequest("POST", url, this.getHeaders(), this.apibody);
      const response = await this.request.post(url, {
        headers: this.getHeaders(),
        data: this.apibody,
      });
      this.cleanupFields();
      const actualStatus = response.status();
      responseJSON = await response.json();

      this.logger.logResponse(actualStatus, responseJSON);
      this.statusCodeValidator(actualStatus, statusCode, this.postRequest);
    });

    return responseJSON;
  }

  //Method to send a PUT request to the API endpoint and return the response as JSON
  async putRequest(statusCode: number) {
    let responseJSON: any;

    const url = this.getUrl();

    await test.step(`PUT request to: ${url}`, async () => {
      this.logger.logRequest("PUT", url, this.getHeaders(), this.apibody);
      const response = await this.request.put(url, {
        headers: this.getHeaders(),
        data: this.apibody,
      });
      this.cleanupFields();
      const actualStatus = response.status();
      responseJSON = await response.json();

      this.logger.logResponse(actualStatus, responseJSON);
      this.statusCodeValidator(actualStatus, statusCode, this.putRequest);
    });

    return responseJSON;
  }

  //Method to send a DELETE request to the API endpoint
  async deleteRequest(statusCode: number) {
    const url = this.getUrl();

    await test.step(`DELETE request to: ${url}`, async () => {
      this.logger.logRequest("DELETE", url, this.getHeaders());
      const response = await this.request.delete(url, {
        headers: this.getHeaders(),
      });
      this.cleanupFields();
      const actualStatus = response.status();

      this.logger.logResponse(actualStatus);
      this.statusCodeValidator(actualStatus, statusCode, this.deleteRequest);
    });
  }

  private getUrl() {
    const url = new URL(
      `${this.baseUrl || this.defaultBaseUrl}${this.apiPath}`,
    );
    for (const [key, value] of Object.entries(this.queryParams)) {
      url.searchParams.append(key, value);
    }
    return url.toString();
  }

  //Method for validating the status code of each request
  private statusCodeValidator(
    actualStatus: number,
    expectedStatus: number,
    callingMethod: Function,
  ) {
    if (actualStatus !== expectedStatus) {
      const logs = this.logger.getRecentLogs();
      const error = new Error(
        `Expected status: ${expectedStatus}, but got: ${actualStatus}\n\nRecent API Activity: \n${logs}`,
      );
      Error.captureStackTrace(error, callingMethod);
      throw error;
    }
  }

  //Method to get right default value of the header
  private getHeaders() {
    if (!this.clearAuthFlag) {
      this.apiHeaders["Authorization"] =
        this.apiHeaders["Authorization"] || this.defaultAuthToken;
    }
    return this.apiHeaders;
  }

  //Method for clearing the api request fields after each call
  private cleanupFields() {
    this.apibody = {};
    this.apiHeaders = {};
    this.baseUrl = undefined;
    this.apiPath = "";
    this.queryParams = {};
    this.clearAuthFlag = false;
  }
}

/* Fluid interface design pattern allows to chain the methods together and create a more readable and maintainable code when making API requests in tests. 
It also allows to easily set different parameters, headers and body for different API requests without having to repeat the same code multiple times. */

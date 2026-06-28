# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\user.api.indi.spec.ts >> PUT API: update user
- Location: tests\api\user.api.indi.spec.ts:35:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 422
```

# Test source

```ts
  1  | import { expect, test } from "../../src/fixctures/apiFixture";
  2  | import { ApiHelper } from "../../utils/ApiHelper";
  3  | import { config } from "../../utils/env";
  4  | 
  5  | const TOKEN = config.apiToken;
  6  | let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
  7  | const timestamp = Date.now();
  8  | 
  9  | async function createUser(apiHelper: ApiHelper) {
  10 |     let userData = {
  11 |         name: `mahadevamma${timestamp}`,
  12 |         email: `mahadev_${timestamp}@dibbert.test`,
  13 |         gender: "female",
  14 |         status: "active"
  15 |     }
  16 |     let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
> 17 |     expect(response.status).toBe(201);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  18 |     return response.body;
  19 | }
  20 | 
  21 | test('GET API:get all User test', async ({ apiHelper }) => {
  22 |     let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
  23 |     expect(response.status).toBe(200);
  24 |     expect(response.statusText).toBe('OK');
  25 | })
  26 | 
  27 | test('Post API:create single User test', async ({ apiHelper }) => {
  28 |     let userResponse = await createUser(apiHelper);
  29 |     let userid = userResponse.id;
  30 |     let getResponse = await apiHelper.get(`/public/v2/users/${userid}`, AUTH_HEADER);
  31 |     expect(getResponse.status).toBe(200);
  32 |     expect(getResponse.statusText).toBe('OK');
  33 | })
  34 | 
  35 | test('PUT API: update user', async ({ apiHelper }) => {
  36 |     let userresponse = await createUser(apiHelper);
  37 |     let userid = userresponse.id;
  38 |     let userUpdatedData = {
  39 |         name: `mahadevamma update ${timestamp}`,
  40 |         gender: "female",
  41 |         status: "inactive"
  42 |     }
  43 |     let putresponse=await apiHelper.put(`/public/v2/users/${userid}`, userUpdatedData, AUTH_HEADER)
  44 |     expect(putresponse.status).toBe(200);
  45 |     expect(putresponse.body.name).toBe(userUpdatedData.name);
  46 |     expect(putresponse.body.status).toBe(userUpdatedData.status);
  47 |     let getResponse = await apiHelper.get(`/public/v2/users/${userid}`, AUTH_HEADER);
  48 |     expect(getResponse.status).toBe(200);
  49 |     expect(getResponse.statusText).toBe('OK');
  50 |     expect(getResponse.body.name).toBe(userUpdatedData.name);
  51 |     expect(getResponse.body.status).toBe(userUpdatedData.status);
  52 | })
  53 | 
  54 | test('Delete API: delete user', async ({ apiHelper }) => {
  55 |     let userresponse = await createUser(apiHelper);
  56 |     let userid = userresponse.id;
  57 |     let deleteresponse = await apiHelper.delete(`/public/v2/users/${userid}`, AUTH_HEADER);
  58 |     expect(deleteresponse.status).toBe(204);
  59 |     let getResponse = await apiHelper.get(`/public/v2/users/${userid}`, AUTH_HEADER);
  60 |     expect(getResponse.status).toBe(404);
  61 |     expect(getResponse.statusText).toBe('Not Found');
  62 | })
  63 | 
```
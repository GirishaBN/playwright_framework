# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\user.api.indi.spec.ts >> PUT API: update user
- Location: tests\api\user.api.indi.spec.ts:36:1

# Error details

```
TypeError: Cannot read properties of undefined (reading 'id')
```

# Test source

```ts
  1  | import { expect, test } from "../../src/fixctures/apiFixture";
  2  | import { ApiHelper } from "../../utils/ApiHelper";
  3  | import { config } from "../../utils/env";
  4  | 
  5  | const TOKEN = config.apiToken;
  6  | let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
  7  | let userid: number;
  8  | const timestamp = Date.now();
  9  | 
  10 | async function createUser(apiHelper: ApiHelper) {
  11 |     let userData = {
  12 |         name: `mahadevamma${timestamp}`,
  13 |         email: `mahadev_${timestamp}@dibbert.test`,
  14 |         gender: "female",
  15 |         status: "active"
  16 |     }
  17 |     let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
  18 |     expect(response.status).toBe(201);
  19 |     return response.body;
  20 | }
  21 | 
  22 | test('GET API:get all User test', async ({ apiHelper }) => {
  23 |     let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
  24 |     expect(response.status).toBe(200);
  25 |     expect(response.statusText).toBe('OK');
  26 | })
  27 | 
  28 | test('Post API:create single User test', async ({ apiHelper }) => {
  29 |     let Userresponse = await createUser(apiHelper);
  30 |     userid = Userresponse.body.id;
  31 |     let response = await apiHelper.get(`/public/v2/users/${userid}`, AUTH_HEADER);
  32 |     expect(response.status).toBe(200);
  33 |     expect(response.statusText).toBe('OK');
  34 | })
  35 | 
  36 | test('PUT API: update user', async ({ apiHelper }) => {
  37 |     let response = await createUser(apiHelper);
> 38 |     userid = response.body.id;
     |                            ^ TypeError: Cannot read properties of undefined (reading 'id')
  39 |     let userUpdatedData = {
  40 |         name: `mahadevamma update ${timestamp}`,
  41 |         gender: "female",
  42 |         status: "inactive"
  43 |     }
  44 |     await apiHelper.put(`/public/v2/users/${userid}`, userUpdatedData, AUTH_HEADER)
  45 |     expect(response.status).toBe(200);
  46 |     expect(response.body.name).toBe(userUpdatedData.name);
  47 |     expect(response.body.status).toBe(userUpdatedData.status);
  48 |     response = await apiHelper.get(`/public/v2/users/${userid}`, AUTH_HEADER);
  49 |     expect(response.status).toBe(200);
  50 |     expect(response.statusText).toBe('OK');
  51 |     expect(response.body.name).toBe(userUpdatedData.name);
  52 |     expect(response.body.status).toBe(userUpdatedData.status);
  53 | })
  54 | 
  55 | test('Delete API: delete user', async ({ apiHelper }) => {
  56 |     let userresponse = await createUser(apiHelper);
  57 |     userid = userresponse.body.id;
  58 |     let deleteresponse = await apiHelper.delete(`/public/v2/users/${userid}`, AUTH_HEADER);
  59 |     expect(deleteresponse.status).toBe(204);
  60 |     let getResponse = await apiHelper.get(`/public/v2/users/${userid}`, AUTH_HEADER);
  61 |     expect(getResponse.status).toBe(200);
  62 |     expect(getResponse.statusText).toBe('OK');
  63 |     expect(getResponse.body.name).toBe(userresponse.name);
  64 |     expect(getResponse.body.status).toBe(getResponse.status);
  65 | })
  66 | 
```
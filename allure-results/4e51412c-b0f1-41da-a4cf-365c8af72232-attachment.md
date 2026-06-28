# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\user.api.spe.spec.ts >> Delete API: delete user
- Location: tests\api\user.api.spe.spec.ts:37:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "204"
Received: 204
```

# Test source

```ts
  1  | import { expect, test } from "../../src/fixctures/apiFixture";
  2  | import { config } from "../../utils/env";
  3  | 
  4  | let TOKEN=config.apiToken;
  5  | let AUTH_HEADER={Authorization:`Bearer ${TOKEN}`};
  6  | let userid:string;
  7  | 
  8  | test('GET API:get all User test',async({apiHelper})=>{
  9  | let response=await apiHelper.get('/public/v2/users',AUTH_HEADER);
  10 | expect(response.status).toBe(200);
  11 | expect(response.statusText).toBe('OK');
  12 | })
  13 | 
  14 | test('Post API :create User',async({apiHelper})=>{
  15 | let userData={
  16 |         name: "revamma2",
  17 |         email: `rev2_${Date.now()}@dibbert.test`,
  18 |         gender: "female",
  19 |         status: "active"
  20 |     }
  21 | let response=await apiHelper.post('/public/v2/users',userData ,AUTH_HEADER);
  22 | expect(response.status).toBe(201);
  23 | userid=response.body.id;
  24 | console.log(userid);
  25 | })
  26 | 
  27 | test('Update API: update user',async({apiHelper})=>{
  28 | let userUpdatedData={
  29 |         name: "revamma update",
  30 |         gender: "female",
  31 |         status: "active"
  32 |     }
  33 | let response=await apiHelper.put(`/public/v2/users/8514154`,userUpdatedData,AUTH_HEADER);
  34 | expect(response.status).toBe(200);
  35 | })
  36 | 
  37 | test('Delete API: delete user',async({apiHelper})=>{
  38 | let response=await apiHelper.delet(`/public/v2/users/8514154`,AUTH_HEADER);
> 39 | expect(response.status).toBe('204');
     |                         ^ Error: expect(received).toBe(expected) // Object.is equality
  40 | })
```
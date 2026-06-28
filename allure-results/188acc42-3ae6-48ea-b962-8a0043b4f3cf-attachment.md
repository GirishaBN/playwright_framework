# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\user.api.spe.spec.ts >> e2e testing of user api >> Update API: update user
- Location: tests\api\user.api.spe.spec.ts:28:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | import { expect, test } from "../../src/fixctures/apiFixture";
  2  | import { config } from "../../utils/env";
  3  | 
  4  | let TOKEN=config.apiToken;
  5  | let AUTH_HEADER={Authorization:`Bearer ${TOKEN}`};
  6  | let userid:number;
  7  | test.describe.serial('e2e testing of user api',()=>{
  8  | 
  9  | test('GET API:get all User test',async({apiHelper})=>{
  10 | let response=await apiHelper.get('/public/v2/users',AUTH_HEADER);
  11 | expect(response.status).toBe(200);
  12 | expect(response.statusText).toBe('OK');
  13 | })
  14 | 
  15 | test('Post API :create User',async({apiHelper})=>{
  16 | let userData={
  17 |         name: "revamma2",
  18 |         email: `rev2_${Date.now()}@dibbert.test`,
  19 |         gender: "female",
  20 |         status: "active"
  21 |     }
  22 | let response=await apiHelper.post('/public/v2/users',userData ,AUTH_HEADER);
  23 | expect(response.status).toBe(201);
  24 | userid=response.body.id;
  25 | console.log(userid);
  26 | })
  27 | 
  28 | test('Update API: update user',async({apiHelper})=>{
  29 | let userUpdatedData={
  30 |         name: "revamma update",
  31 |         gender: "female",
  32 |         status: "active"
  33 |     }
  34 | let response=await apiHelper.put(`/public/v2/users/${userid}`,userUpdatedData,AUTH_HEADER);
  35 | console.log(userid);
> 36 | expect(response.status).toBe(200);
     |                         ^ Error: expect(received).toBe(expected) // Object.is equality
  37 | expect(response.body.name).toBe(userUpdatedData.name);
  38 | expect(response.body.status).toBe(userUpdatedData.status);
  39 | })
  40 | 
  41 | test('Delete API: delete user',async({apiHelper})=>{
  42 | let response=await apiHelper.delete(`/public/v2/users/${userid}`,AUTH_HEADER);
  43 | expect(response.status).toBe(204);
  44 | })
  45 | })
```
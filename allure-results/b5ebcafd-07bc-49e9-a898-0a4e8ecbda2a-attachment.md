# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\user.api.spe.spec.ts >> GET API:get all User test
- Location: tests\api\user.api.spe.spec.ts:6:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { expect, test } from "../../src/fixctures/apiFixture";
  2  | 
  3  | let TOKEN=process.env.AUTH_TOKEN;
  4  | let AUTH_HEADER={Authorization:`Bearer ${TOKEN}`};
  5  | 
  6  | test('GET API:get all User test',async({apiHelper})=>{
  7  | let response=await apiHelper.get('/public/v2/users',AUTH_HEADER);
> 8  | expect(response.status).toBe(200);
     |                         ^ Error: expect(received).toBe(expected) // Object.is equality
  9  | expect(response.statusText).toBe('OK');
  10 | })
```
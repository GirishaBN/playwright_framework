# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\user.api.spec.ts >> update user test
- Location: tests\api\user.api.spec.ts:32:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | import test, { expect } from "@playwright/test";
  2  | 
  3  | let AUTH_TOKEN={Authorization:'Bearer 297b2601f5cbd9883e29d41cbef195b166b8f575c4b9fde1374c0de1714c92fb'};
  4  | 
  5  | test('get user test',async({request})=>{
  6  | let response=await request.get('https://gorest.co.in/public/v2/users',{headers:AUTH_TOKEN});
  7  | //console.log(response);
  8  | let jsonBody=await response.json();
  9  | console.log('jsonbody:',jsonBody);
  10 | console.log('response status',response.status());
  11 | console.log('response status text',response.statusText());
  12 | expect(response.status()).toBe(200);
  13 | })
  14 | 
  15 | test('create use test',async({request})=>{
  16 |     let userData={
  17 |         name: "revamma2",
  18 |         email: `rev2_${Date.now()}@dibbert.test`,
  19 |         gender: "female",
  20 |         status: "active"
  21 |     }
  22 | let response=await request.post('https://gorest.co.in/public/v2/users',{
  23 |     headers:AUTH_TOKEN,
  24 |     data:userData
  25 | });
  26 | console.log(await response.json());
  27 | console.log(response.status());
  28 | console.log(response.statusText());
  29 | expect(response.status()).toBe(201);
  30 | })
  31 | 
  32 | test('update user test',async({request})=>{
  33 |     let updateUserdata={
  34 |     name: "Mahadevamma",
  35 |     email: `mahadev_${Date.now()}@dibbert.test`,
  36 |     gender: "female",
  37 |     status: "active"
  38 | }
  39 |     let response=await request.put('https://gorest.co.in/public/v2/users/8513270',{headers:AUTH_TOKEN,data: updateUserdata});
  40 |     let jsonBody=await response.json();
  41 |     console.log(jsonBody);
  42 |     console.log( response.status());
  43 |     console.log( response.statusText());
> 44 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  45 | })
  46 | 
  47 | test('Delete a user test',async({request})=>
  48 | {
  49 | let response =await request.delete('https://gorest.co.in//public/v2/users/8513270',{headers:AUTH_TOKEN});
  50 | console.log(response.status());
  51 | console.log(response.statusText());
  52 | expect(response.status()).toBe(204);
  53 | })
```
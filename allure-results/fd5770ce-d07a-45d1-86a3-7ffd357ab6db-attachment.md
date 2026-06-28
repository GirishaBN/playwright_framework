# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\amadeus.oauth2.spec.ts >> Get Location Data
- Location: tests\api\amadeus.oauth2.spec.ts:20:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 2
```

# Test source

```ts
  1  | import test, { expect } from "@playwright/test"
  2  | import { request } from "node:http";
  3  | 
  4  | 
  5  | test('generate the access token', async ({ request }) => {
  6  |     let response = await request.post('https://test.api.amadeus.com/v1/security/oauth2/token',
  7  |         {
  8  |             form: {
  9  |                 grant_type: 'client_credentials',
  10 |                 client_id: 'pUYP1Wr0MJmKmt3uSwI7fwcmYjcN7tub',
  11 |                 client_secret: 'VoRGUvlUWMsaFYsZ'
  12 |             }
  13 |         });
  14 |     expect(response.status()).toBe(200);
  15 |     let jsonResponse = await response.json();
  16 |     console.log(jsonResponse);
  17 |     console.log(jsonResponse.access_token);
  18 | })
  19 | 
  20 | test('Get Location Data', async ({ request }) => {
  21 |     let response = await request.get('https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE', 
  22 |         { headers: { Authorization: 'Bearer yAZbkYG0F2CxfhJwKoYSACVDmOFG' } });
  23 |     expect(response.status()).toBe(200);
  24 |     let jsonResponse=await response.json();
> 25 |     expect(jsonResponse.meta.count).toBe(200);
     |                                     ^ Error: expect(received).toBe(expected) // Object.is equality
  26 | })
```
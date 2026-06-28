# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\amadeus.oauth2.spec.ts >> generating auth token
- Location: tests\api\amadeus.oauth2.spec.ts:4:1

# Error details

```
TypeError: Cannot read properties of undefined (reading 'access_token')
```

# Test source

```ts
  1  | import test, { expect } from "@playwright/test"
  2  | 
  3  | 
  4  | test('generating auth token', async ({ request }) => {
  5  |     let response=await request.post('https://test.api.amadeus.com/v1/security/oauth2/token',
  6  |         {
  7  |             form: {
  8  |                 grant_type: 'client_credentials',
  9  |                 client_id: 'pUYP1Wr0MJmKmt3uSwI7fwcmYjcN7tub',
  10 |                 client_secret: 'VoRGUvlUWMsaFYsZ'
  11 |             }
  12 |         });
  13 |         expect(response.status()).toBe(200);
  14 |         let jsonResponse=await response.json();
  15 |         console.log(jsonResponse);
> 16 |         console.log(jsonResponse.body.access_token);
     |                                       ^ TypeError: Cannot read properties of undefined (reading 'access_token')
  17 | })
```
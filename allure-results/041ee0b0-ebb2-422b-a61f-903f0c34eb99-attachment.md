# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\user.api.schema.spec.ts >> GET User API Test
- Location: tests\api\user.api.schema.spec.ts:35:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import Ajv from "ajv";
  2  | import { expect, test } from "../../src/fixctures/apiFixture";
  3  | 
  4  | let userSchema = {
  5  |     "type": "object",
  6  |     "properties": {
  7  |         "id": {
  8  |             "type": "number"
  9  |         },
  10 |         "name": {
  11 |             "type": "string"
  12 |         },
  13 |         "email": {
  14 |             "type": "string"
  15 |         },
  16 |         "gender": {
  17 |             "type": "string"
  18 |         },
  19 |         "status": {
  20 |             "type": "string"
  21 |         }
  22 |     },
  23 |     "required": [
  24 |         "id",
  25 |         "name",
  26 |         "email",
  27 |         "gender",
  28 |         "status"
  29 |     ]
  30 | }
  31 | 
  32 | 
  33 | 
  34 | 
  35 | test('GET User API Test',async({apiHelper})=>{
  36 |     let endpoint='/public/v2/users';
  37 |     let data={
  38 |         "name": "Raju22",
  39 |         "email": "rajubuju12@dibbert.test",
  40 |         "gender": "male",
  41 |         "status": "active"
  42 |     }
  43 |     let token=process.env.API_TOKEN;
  44 |     let header={Authorization:`Bearer ${token}`};
  45 |     let userresponse=await apiHelper.post(endpoint,data,header);
  46 |     let userId=userresponse.body.id;
  47 |     let getUserResponse=await apiHelper.get(`/public/v2/users//${userId}`,header);
  48 |     let ajv = new Ajv();
  49 |     let validation=ajv.compile(userSchema);
> 50 |     expect(validation(getUserResponse)).toBeTruthy();
     |                                         ^ Error: expect(received).toBeTruthy()
  51 | })
```
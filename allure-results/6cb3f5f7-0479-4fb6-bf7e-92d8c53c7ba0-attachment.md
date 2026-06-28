# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\user.api.spe.spec.ts >> Update API: update user
- Location: tests\api\user.api.spe.spec.ts:24:1

# Error details

```
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

# Test source

```ts
  1  | import { APIRequestContext } from "@playwright/test";
  2  | 
  3  | export class ApiHelper {
  4  |     private readonly request: APIRequestContext;
  5  |     private readonly baseURL: string;
  6  | 
  7  |     constructor(request: APIRequestContext, baseURL: string) {
  8  |         this.request = request;
  9  |         this.baseURL = baseURL;
  10 |     }
  11 |     async get(endPoint: string, header?: Record<string, string>) {
  12 |         let response = await this.request.get(`${this.baseURL}${endPoint}`, { headers: header });
  13 |         return {
  14 |             status: response.status(),
  15 |             statusText: response.statusText(),
  16 |             body: await response.json()
  17 |         }
  18 |     }
  19 |     async post(endPoint: string, data:Object,header?: Record<string, string>) {
  20 |         let response = await this.request.post(`${this.baseURL}${endPoint}`, { headers: header,data:data });
  21 |         return {
  22 |             status: response.status(),
  23 |             statusText: response.statusText(),
  24 |             body: await response.json()
  25 |         }
  26 |     }
  27 |     async put(endPoint: string, data:Object,header?: Record<string, string>) {
  28 |         let response = await this.request.put(`${this.baseURL}${endPoint}`, { headers: header,data:data });
  29 |         return {
  30 |             status: response.status(),
  31 |             statusText: response.statusText(),
> 32 |             body: await response.json()
     |                   ^ SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
  33 |         }
  34 |     }
  35 |     async delet(endPoint: string, header?: Record<string, string>) {
  36 |         let response = await this.request.delete(`${this.baseURL}${endPoint}`, { headers: header });
  37 |         return {
  38 |             status: response.status(),
  39 |             statusText: response.statusText(),
  40 |         }
  41 |     }
  42 | }
```
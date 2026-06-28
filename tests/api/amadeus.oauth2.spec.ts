import test, { expect } from "@playwright/test"
import { config } from "../../config/env";
import { CsvHelper } from "../../utils/CsvHelper";
const tokenURL = config.tokenUrl;
const grant_type = config.grantType;
let client_id = config.clientId;
let client_secret = config.clientSecret;
let access_token: number;
test.beforeEach('generate the access token', async ({ request }) => {
    console.log(tokenURL, grant_type, client_id, client_secret);
    let response = await request.post(tokenURL,
        {
            form: {
                grant_type: grant_type,
                client_id: client_id,
                client_secret: client_secret
            }
        });
    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    access_token = jsonResponse.access_token;
    console.log(access_token);
})

let row=CsvHelper.readCsv<LoctaionData>('./src/data/api/airportData.csv');
row.forEach(data=>{
test('Get Location Data ${data.subtyp}-${data.keyword}', async ({ request }) => {
    let endpoint = '/v1/reference-data/locations';
    
    let queryParams = { subType: data.subtype, keyword: data.keyword, countryCode: data.countrycode };
    let response = await request.get(`${config.baseUri}${endpoint}`,
        { headers: { Authorization: `Bearer ${access_token}` }, params: queryParams });
    console.log(`access_token is ${access_token}`);
    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    expect(jsonResponse.meta.count).toBe(2);
})
})
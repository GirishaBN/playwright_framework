import { expect, test } from "../../src/fixctures/apiFixture";
import { config } from "../../config/env";

let TOKEN=config.apiToken;
let AUTH_HEADER={Authorization:`Bearer ${TOKEN}`};
let userid:number;
test.describe.serial('e2e testing of user api',()=>{

test('GET API:get all User test',async({apiHelper})=>{
let response=await apiHelper.get('/public/v2/users',AUTH_HEADER);
expect(response.status).toBe(200);
expect(response.statusText).toBe('OK');
})

test('Post API :create User',async({apiHelper})=>{
let userData={
        name: "revamma2",
        email: `rev2_${Date.now()}@dibbert.test`,
        gender: "female",
        status: "active"
    }
let response=await apiHelper.post('/public/v2/users',userData ,AUTH_HEADER);
expect(response.status).toBe(201);
userid=response.body.id;
console.log(userid);
})

test('Update API: update user',async({apiHelper})=>{
let userUpdatedData={
        name: "revamma update",
        gender: "female",
        status: "active"
    }
let response=await apiHelper.put(`/public/v2/users/${userid}`,userUpdatedData,AUTH_HEADER);
console.log(userid);
expect(response.status).toBe(200);
expect(response.body.name).toBe(userUpdatedData.name);
expect(response.body.status).toBe(userUpdatedData.status);
})

test('Delete API: delete user',async({apiHelper})=>{
let response=await apiHelper.delete(`/public/v2/users/${userid}`,AUTH_HEADER);
expect(response.status).toBe(204);
})
})
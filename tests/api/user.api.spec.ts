import test, { expect } from "@playwright/test";

let AUTH_TOKEN={Authorization:'Bearer 297b2601f5cbd9883e29d41cbef195b166b8f575c4b9fde1374c0de1714c92fb'};

test('get user test',async({request})=>{
let response=await request.get('https://gorest.co.in/public/v2/users',{headers:AUTH_TOKEN});
//console.log(response);
let jsonBody=await response.json();
console.log('jsonbody:',jsonBody);
console.log('response status',response.status());
console.log('response status text',response.statusText());
expect(response.status()).toBe(200);
})

test('create use test',async({request})=>{
    let userData={
        name: "revamma2",
        email: `rev2_${Date.now()}@dibbert.test`,
        gender: "female",
        status: "active"
    }
let response=await request.post('https://gorest.co.in/public/v2/users',{
    headers:AUTH_TOKEN,
    data:userData
});
console.log(await response.json());
console.log(response.status());
console.log(response.statusText());
expect(response.status()).toBe(201);
})

test('update user test',async({request})=>{
    let updateUserdata={
    name: "Mahadevamma",
    email: `mahadev_${Date.now()}@dibbert.test`,
    gender: "female",
    status: "active"
}
    let response=await request.put('https://gorest.co.in/public/v2/users/8513270',{headers:AUTH_TOKEN,data: updateUserdata});
    let jsonBody=await response.json();
    console.log(jsonBody);
    console.log( response.status());
    console.log( response.statusText());
    expect(response.status()).toBe(200);
})

test('Delete a user test',async({request})=>
{
let response =await request.delete('https://gorest.co.in//public/v2/users/8513270',{headers:AUTH_TOKEN});
console.log(response.status());
console.log(response.statusText());
expect(response.status()).toBe(204);
})
import Ajv from "ajv";
import { expect, test } from "../../src/fixctures/apiFixture";
import { config } from "../../config/env";

let userSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
}

test('GET User API Test',async({apiHelper})=>{
    let endpoint='/public/v2/users';
    let data={
        "name": "Raju22",
        "email": `rajubuju145${Date.now()+Math.random()}@dibbert.test`,
        "gender": "male",
        "status": "active"
    }
    let token=process.env.API_TOKEN;
    let header={Authorization:`Bearer ${token}`};
    console.log(header);
    console.log(config.apiBaseUri,);
    let userresponse=await apiHelper.post(endpoint,data,header);
    let userId=userresponse.body.id;
    console.log(userId);
    let getUserResponse=await apiHelper.get(`${endpoint}/${userId}`,header);
    console.log(getUserResponse.body);
    let ajv = new Ajv();
    let validation=ajv.compile(userSchema);
    expect(validation(getUserResponse.body)).toBeTruthy();
})
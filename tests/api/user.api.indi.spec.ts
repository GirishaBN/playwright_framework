import { expect, test } from "../../src/fixctures/apiFixture";
import { ApiHelper } from "../../utils/ApiHelper";
import { config } from "../../config/env";
const TOKEN = config.apiToken;
const AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

async function createUser(apiHelper: ApiHelper): Promise<UserResponse> {
    const unique = Date.now()+Math.random();
    const userData:CreateUserRequest = {
        name: `mahadevamma${unique}`,
        email: `mahadev_${unique}@dibbert.test`,
        gender: "female",
        status: "active"
    }
    const response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body as UserResponse;
}

test('GET API:get all User test', async ({ apiHelper }) => {
    const response = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
})

test('Post API:create single User test', async ({ apiHelper }) => {
    const userResponse = await createUser(apiHelper);
    const userId = userResponse.id;
    const getResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.statusText).toBe('OK');
})

test('PUT API: update user', async ({ apiHelper }) => {
    const userResponse = await createUser(apiHelper);
    const userId = userResponse.id;
    const userUpdatedData = {
        name: `mahadevamma update ${Date.now()+Math.random()}`,
        gender: "female",
        status: "inactive"
    }
    const putResponse=await apiHelper.put(`/public/v2/users/${userId}`, userUpdatedData, AUTH_HEADER)
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.name).toBe(userUpdatedData.name);
    expect(putResponse.body.status).toBe(userUpdatedData.status);
    const getResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.statusText).toBe('OK');
    expect(getResponse.body.name).toBe(userUpdatedData.name);
    expect(getResponse.body.status).toBe(userUpdatedData.status);
})

test('Delete API: delete user', async ({ apiHelper }) => {
    const userResponse = await createUser(apiHelper);
    const userid = userResponse.id;
    const deleteResponse = await apiHelper.delete(`/public/v2/users/${userid}`, AUTH_HEADER);
    expect(deleteResponse.status).toBe(204);
    const getResponse = await apiHelper.get(`/public/v2/users/${userid}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.statusText).toBe('Not Found');
})

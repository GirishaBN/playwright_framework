import { APIRequestContext } from "@playwright/test";

export class ApiHelper {
    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }
    async get(endPoint: string, header?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURL}${endPoint}`, { headers: header });
        return {
            status: response.status(),
            statusText: response.statusText(),
            body: await response.json()
        }
    }
    async post(endPoint: string, data:Object,header?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, { headers: header,data:data });
        return {
            status: response.status(),
            statusText: response.statusText(),
            body: await response.json()
        }
    }
    async put(endPoint: string, data:Object,header?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, { headers: header,data:data });
        return {
            status: response.status(),
            statusText: response.statusText(),
            body: await response.json()
        }
    }
    async delete(endPoint: string, header?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, { headers: header });
        return {
            status: response.status(),
            statusText: response.statusText(),
        }
    }
}
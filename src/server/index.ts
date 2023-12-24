import axios from "axios";
import type { Doc } from "../types";

//"http://localhost:3000"
//"https://658354714d1ee97c6bcdd68f.mockapi.io"

class HTTPRequest {
    uri: string;

    constructor() {
        this.uri = "https://658354714d1ee97c6bcdd68f.mockapi.io";
    }

    async get(address: string) {
        try {
            return await axios.get(this.uri + address);
        } catch(err: any) {
            console.log(err.message);
        }
    }

    async delete(address: string) {
        try {
            await axios.delete(this.uri + address);
        } catch(err: any) {
            console.log(err.message);
        }
    }

    async post(address: string, doc: Doc) {
        try {
            await axios.post(this.uri + address, doc);
        } catch(err: any) {
            console.log(err.message);
        }
    }

    async put(address: string, doc: Doc) {
        try {
            await axios.put(this.uri + address, doc);
        } catch(err: any) {
            console.log(err.message);
        }
    }
}

export default new HTTPRequest();
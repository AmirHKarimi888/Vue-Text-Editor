import axios from "axios";

axios.defaults.baseURL = "https://65e8b8bd4bb72f0a9c503a47.mockapi.io/";

class HttpRequests {

    async get(url: string) {
        try {
            return await axios.get(url);
        } catch (err: any) {
            console.log(err?.message)
        }
    }

    async post(url: string, data: object) {
        try {
            return await axios.post(url, data);
        } catch (err: any) {
            console.log(err?.message);
        }
    }

    async put(url: string, data: object) {
        try {
            return await axios.put(url, data);
        } catch (err: any) {
            console.log(err?.message);
        }
    }

    async delete(url: string) {
        try {
            return await axios.delete(url);
        } catch (err: any) {
            console.log(err?.message);
        }
    }
}

export default new HttpRequests();
import axios from "axios";

axios.defaults.baseURL = "https://658354714d1ee97c6bcdd68f.mockapi.io/";

class HttpReqests {

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

export default new HttpReqests();
import axios from "axios";
import { baseUrl } from "./baseUrl";

const publicHttp = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: (status) => {
        return status <= 500;
    }
});

export default publicHttp;

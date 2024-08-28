import axios from "axios";

const BASEURL = import.meta.env.VITE_ADVICE_BASE_URL;
const TIMEOUTMSG = "Waiting for too long... Aborted !"

const config = {
    baseURL: BASEURL,
    timeout: 30000,
    timeoutErrorMessage: TIMEOUTMSG,
};

const http = axios.create(config);

export default http;
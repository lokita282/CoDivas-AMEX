import axios from "axios";


export default axios.create({
    baseURL: `https://ez-rupi-api.up.railway.app/api`,

    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    mode: "cors"
});
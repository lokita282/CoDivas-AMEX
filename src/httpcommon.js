import axios from "axios";


export default axios.create({
    baseURL: `hosted be url`,


    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    mode: "cors"
});
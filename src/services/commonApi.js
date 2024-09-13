import axios from "axios";

const commonApi = (requestMethod, requestUrl, requestBody,reqHeader = null) => {
    const config = {
        method: requestMethod,
        url: requestUrl,
        data: requestBody,
        headers:reqHeader|| { "Content-Type": "application/json" ,
            
        }
    }
    return axios(config);
}

export default commonApi;



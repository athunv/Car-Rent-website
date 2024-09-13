import axios from "axios";

const commonApi2 = (reqMethod, reqUrl, reqBody = null, reqHeader = null) => {
    const config = {
        method: reqMethod,
        url: reqUrl,
        data: reqBody,
        headers: reqHeader || { 'content-type': 'multipart/form-data' },
    };
    return axios(config);
};

export default commonApi2;





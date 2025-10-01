import axios from "axios";
export const apiCall = async ({ method, url, data, callback }) => {
    console.log('method, url, data: ', method, url, data);
    try {
        const response = await axios({ method, url, data, });
        callback(response);
        console.log('response:', response);
    } catch (error) {
        console.error("ERROR:", error);
        callback(error.response);
    }
};

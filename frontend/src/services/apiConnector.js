import axios from 'axios';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const axiosInstance = axios.create({});


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
            if(error.response.status === 401){
                const response = await axios.post(`${BASE_URL}/users/refresh-token`, {userId: user._id})
    
                localStorage.setItem("accessToken", response.data.data.accessToken);
            }
        } catch (error) {
            localStorage.removeItem("user");
            return Promise.reject(error);
        }

        return axios(error.config)
    }
)



export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method,
        url,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
}

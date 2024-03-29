export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

export const requestConfig = (method, data, token=null, task=null) => {
    let config;

    if(task){
        config = {
            method,
            body: data,
            headers:{}
        }
    }else if(method === "DELETE" || data === null){
        config = {
            method,
            headers:{}
        }
    }else {
        config = {
            method,
            body: JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        }
    }

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}
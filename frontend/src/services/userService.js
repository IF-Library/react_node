import { api, requestConfig } from "../utils/config";

// see user profile 
const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);
    try {
        const res = await fetch(api + "/user/profile", config)
            .then((res) => res.json)
            .catch((err) => err);
        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
        return res;
    } catch (error) {
        console.log(error);
    }
}

const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token, true);
    try {
        const res = await fetch(api + "/user/", config)
            .then((res) => res.json)
            .catch((err) => err);
        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
        return res;
    } catch (error) {
        console.log(error);
    }
}
const userService = { profile, updateProfile };

export default userService;
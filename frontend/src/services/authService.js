import { api, requestConfig } from "../utils/config";

// Register a user
const register = async (data) => {
    const config = requestConfig("POST", data);

    try {
        const res = await fetch(api + "/user/register", config)
            .then((res) => res.json())
            .catch((err) => err);
        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
        return res;
    } catch (error) {   
        console.log(error);
    }
};

// Logout a user
const logout = () => {
    localStorage.removeItem("user");
};

// Sign in a user
const login = async (data) => {
    const config = requestConfig("POST", data);
    try {
        const res = await fetch(api + "/user/login", config)
            .then((res) => res.json())
            .catch((err) => err);
        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
        return res;
    } catch (error) {
        console.log(error);
    }
};

// export services functions
const authService = {
    register,
    logout,
    login,
};

export default authService;
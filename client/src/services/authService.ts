import API from "./api";

export const registerUser = async(
    name: string,
    email: string,
    password: string
) => {
    const {data} = await API.post("/auth/register", {
        name,
        email,
        password
    })

    return data;
}

export const loginUser = async(
    email: string,
    password: string
) => {
    const { data } = await API.post("/auth/login", {
        email,
        password
    })

    return data;
}

export const getMe = async () => {
    const {data} = await API.get("/auth/me");

    return data;
}

export const logoutUser = async () => {
    const { data } = await API.post("/auth/logout");

    return data;
}

export const getInterviewHistory = async () => {
    const {data} = await API.get("/interview/history");

    return data;
}
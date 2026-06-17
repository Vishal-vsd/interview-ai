import API from "./api"

export const getAdminStats = async() => {
    const {data} = await API.get("/admin/stats")

    return data;
}

export const getAllUsers = async() => {
    const {data} = await API.get("/admin/users")

    return data;
}

export const deleteUser = async(userId: string) => {
    const {data} = await API.delete(`/admin/users/${userId}`)

    return data;
}
import API from "./api"

export const getAdminStats = async() => {
    const {data} = await API.get("/admin/stats")

    return data;
}
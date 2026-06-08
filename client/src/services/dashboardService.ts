import API from "./api";

export const getInterviewStats = async() => {
    const {data} = await API.get("/interview/stats")

    return data;
}
import API from "./api"


export const generateInterview = async (role:string, difficulty:string) => {
    const {data} = await API.post("/interview/generate", {
        role,
        difficulty
    })

    return data;
}
import axios from "axios";

const apiClient = axios.create({
    baseURL:"http://localhost:5079/api",
    headers:{
        "Content-Type":"application/json"
    }
});

export const getIngredients = async () => {
    try{
        const response = await apiClient.get("/Ingredients");
        return response.data;
    } catch(error){
        console.log(error);
    }
}
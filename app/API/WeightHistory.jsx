import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { HISTORY_WEIGHT_BY_USER } from "../utils/constans";


export const getWeightHistoryByUserApi = async (idUser) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró el token de autenticación");
    
        const response = await axios.get(`${HISTORY_WEIGHT_BY_USER}/history/${idUser}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
    
        return response.data;
    } catch (error) {
        console.error(
        "❌ Error en la comunicación con la API de historial de peso:",
        error.response?.data || error.message
        );
        throw error;
    }
}



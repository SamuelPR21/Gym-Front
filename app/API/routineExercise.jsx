import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ROUTINE_EXCERSIE } from "../utils/constans";

export const getExcerisesByIdRoutine = async (idRoutine) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró el token de autenticación");
    
        const response = await axios.get(`${ROUTINE_EXCERSIE}/${idRoutine}/exercises`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
    
        return response.data;
    } catch (error) {
        console.error(
        "❌ Error al obtener los ejercicios de la rutina:",
        error.response?.data || error.message
        );
        throw error;
    }
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { EXERCISE } from "../utils/constans";


export const getExercisesByGroupMuscle = async (muscleGroup) => {

    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró el token de autenticación");
        
        console.log("🔹 Token de autenticación obtenido:", token);
    
        console.log("🔹 Obteniendo ejercicios para el grupo muscular:", muscleGroup);
    
        const response = await axios.get(`${EXERCISE}/muscle-group/${muscleGroup}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        console.log("✅ Ejercicios recibidos de la API:", response.data);
        return response.data;
    } catch (error) {
        console.error(
        "❌ Error en la comunicación de API de ejercicios:",
        error.response?.data || error.message
        );
        throw error;
    }
}
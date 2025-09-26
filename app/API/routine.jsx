import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_ROUTINE_BY_USER } from "../utils/constans";



export const getRoutineByUserApi = async (userId) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró el token de autenticación");
        
        console.log("🔹 Token de autenticación obtenido:", token);
    
        console.log("🔹 Obteniendo rutina para el usuario ID:", userId);
    
        const response = await axios.get(`${API_ROUTINE_BY_USER}/user/${userId}/routines`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        console.log("✅ Rutina recibida de la API:", response.data);
        return response.data;
    } catch (error) {
        console.error(
        "❌ Error en la comunicación de API de rutina:",
        error.response?.data || error.message
        );
        throw error;
    }
}

export const deleteRoutineApi = async (routineId) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró el token de autenticación");
        
        console.log("🔹 Token de autenticación obtenido:", token);
    
        console.log("🔹 Eliminando rutina ID:", routineId);
    
        const response = await axios.delete(`${API_ROUTINE_BY_USER}/${routineId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        console.log("✅ Rutina eliminada de la API:", response.data);
        return response.data;
    } catch (error) {
        console.error(
        "❌ Error en la comunicación de API al eliminar rutina:",
        error.response?.data || error.message
        );
        throw error;
    }
}


export const createRoutineApi = async (routineData) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró el token de autenticación");
        
        console.log("🔹 Token de autenticación obtenido:", token);
    
        console.log("🔹 Creando nueva rutina con datos:", routineData);
    
        const response = await axios.post(`${API_ROUTINE_BY_USER}/create`, routineData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        });
        
        console.log("✅ Nueva rutina creada en la API:", response.data);
        return response.data;
    } catch (error) {
        console.error(
        "Error en la comunicación de API al crear rutina:",
        error.response?.data || error.message
        );
        throw error;
    }
}

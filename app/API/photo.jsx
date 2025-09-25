import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PHOTO } from "../utils/constans";


export const getPhtoByUserApi = async (userId) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró el token de autenticación");
        
        console.log("🔹 Token de autenticación obtenido:", token);
    
        console.log("🔹 Obteniendo foto para el usuario ID:", userId);
    
        const response = await axios.get(`${PHOTO}/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        console.log("✅ Foto recibida de la API:", response.data);
        return response.data;
    } catch (error) {
        console.error(
        "❌ Error en la comunicación de API de foto:",
        error.response?.data || error.message
        );
        throw error;
    }
}


export const uploadPhotoApi = async (userId, image) => {
    try {
        if (!image || !image.uri) {
            throw new Error("La imagen no es válida o no tiene una URI.");
        }

        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró el token de autenticación");
        
        const formData = new FormData();
            formData.append("file", {
            uri: image.uri,
            type: image.mimeType || "image/jpeg",
            name: `profile.${image.uri.split(".").pop() || "jpg"}`,
         });

       console.log("🔹 Subiendo foto para el usuario ID:", userId);

        const response = await axios.post(`${PHOTO}/upload/${userId}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",

        },
        });
        
        console.log("✅ Foto subida a la API:", response.data);
        return response.data;
    } catch (error) {
        console.error(
        "❌ Error en la comunicación de API de foto:",
        error.response?.data || error.message
        );
        throw error;
    }
}


export const deletePhotoApi = async (userId) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No se encontró el token de autenticación");
        
        console.log("🔹 Token de autenticación obtenido:", token);
    
        console.log("🔹 Eliminando foto para el usuario ID:", userId);
    
        const response = await axios.delete(`${PHOTO}/delete/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        
        console.log("✅ Foto eliminada en la API:", response.data);
        return response.data;
    } catch (error) {
        console.error(
        "❌ Error en la comunicación de API de foto:",
        error.response?.data || error.message
        );
        throw error;
    }
}
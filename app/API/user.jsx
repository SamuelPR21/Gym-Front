import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_USER } from "../utils/constans";

/**
 * Guardar token en AsyncStorage
 */
export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
    console.log("✅ Token guardado en AsyncStorage:", token); 
  } catch (error) {
    console.error("❌ Error al guardar el token:", error);
  }
};

/**
 * Obtener token desde AsyncStorage
 */
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    console.log("✅ Token obtenido de AsyncStorage:", token); 
    return token ;
  } catch (error) {
    console.error("❌ Error al obtener el token:", error);
    return null;
  }
};

/**
 * Realizar login y obtener token desde la API
 */
export const loginApi = async (credentials) => {
  try {
    console.log("🔹 Enviando credenciales al backend:", credentials);

    const response = await axios.post(`${API_USER}/login`, credentials);
    const { token } = response.data;

    if (token) {
      console.log("✅ Token recibido de la API:", token);
       if (!token) throw new Error("No se recibió el token");
        await saveToken(token);
        return token;

    } else {
      throw new Error("No se recibió el token de autenticación.");
    }
  } catch (error) {
    console.error(
      "❌ Error en la comunicación de API de login:",
      error.response?.data || error.message
    );
    throw error;
  }
};

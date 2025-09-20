import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { getToken, loginApi } from "../API/user";

export const AuthContext = createContext({
  auth: null,
  login: () => {},
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setAuth({ token, user: decoded });
          } else {
            await logout();
          }
        } catch (e) {
          console.error("❌ Token inválido:", e);
          await logout();
        }
      }
      setLoading(false);
    })();
  }, []);
  

  const login = async (credentials) => {
    try {
      const token = await loginApi(credentials); // ahora es un string ✅
      const decoded = jwtDecode(token);
      await AsyncStorage.setItem("authToken", token);
      setAuth({ token, user: decoded });

      console.log("Usuario decodificado:", decoded);

    } catch (error) {
      if (error.response?.status === 403) {
        Alert.alert("Error", "Credenciales incorrectas");
      } else {
        Alert.alert("Error", "Ocurrió un problema al iniciar sesión");
      }
      console.error("Error en login:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setAuth(null);
      console.log("Sesión cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {loading ? (
        <Text>Cargando...</Text> // Aquí pon tu Splash o un loader
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

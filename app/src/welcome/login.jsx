import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LoginImg from '../../../assets/images/welcome.jpg';
import useAuth from '../../hook/useAuth';

export default function Login(props) {
  const { login } = useAuth();
  const { navigation } = props;

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    if (!formData.userName || !formData.password ) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      setLoading(true);
      // 👇 llamamos al contexto, que maneja API + guardado token
      await login({
        username: formData.userName,
        password: formData.password
      });
    } catch (error) {
      alert('Error en el inicio de sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={LoginImg}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.9 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Logo / Header */}
          <View className="h-56 relative items-center justify-center">
            <Text className="text-3xl font-extrabold text-white">SAM Gym</Text>
          </View>

          {/* Formulario */}
          <View className="flex-1 justify-center px-6 -mt-12">
            <View className="bg-[#0f1720]/90 rounded-3xl p-5 shadow-lg" style={{ shadowColor: '#000', shadowOpacity: 0.6, shadowRadius: 20, elevation: 12 }}>
              
              <Text className="text-white text-2xl font-bold mb-20">Bienvenido</Text>

              {/* Usuario */}
              <View className="mb-4">
                <Text className="text-gray-200 mb-2">Nombre de Usuario</Text>
                <TextInput
                  value={formData.userName}
                  onChangeText={(value) => setFormData({ ...formData, userName: value })}
                  placeholder="Nombre de Usuario"
                  placeholderTextColor="#ccc"
                  className="bg-[#0b1220] text-white px-4 py-3 rounded-xl"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Contraseña */}
              <View className="mb-2">
                <Text className="text-gray-200 mb-2">Contraseña</Text>
                <TextInput
                  value={formData.password}
                  onChangeText={(value) => setFormData({ ...formData, password: value })}
                  placeholder="••••••••"
                  placeholderTextColor="#ccc"
                  className="bg-[#0b1220] text-white px-4 py-3 rounded-xl"
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {/* Botón login */}
              <TouchableOpacity
                onPress={handleLogin} // ✅ ahora llama al login real
                className={`py-3 rounded-xl items-center justify-center ${loading ? 'opacity-70' : ''}`}
                style={{ backgroundColor: '#ff5a5f' }}
                disabled={loading}
              >
                <Text className="text-white font-bold">{loading ? 'Iniciando...' : 'Iniciar sesión'}</Text>
              </TouchableOpacity>

              {/* Ir a Register */}
              <View className="mt-6 items-center">
                <Text className="text-gray-400">¿No tienes cuenta?</Text>
                <TouchableOpacity className="mt-2" onPress={goToRegister}>
                  <Text className="text-[#ffd166] font-semibold">Crea una ahora</Text>
                </TouchableOpacity> 
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

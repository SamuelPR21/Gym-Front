import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import WelcomeImg from '../../../assets/images/welcome.jpg';

export default function Register(props) {

    
    const { navigation } = props;

    const goToLogin = () =>{
      navigation.navigate("InicioSesion")
    }
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        password: '',
        currentWeight: 0,
        goalWeight: 0,
        goal: '',
        dateBirth: new Date(),
      });
    
      const [showDatePicker, setShowDatePicker] = useState(false);
      const [loading, setLoading] = useState(false);
    
      const onRegister = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1200);
      };
    
      return (
        <SafeAreaView className="flex-1">
          {/* Imagen de fondo */}
          <ImageBackground
            source={WelcomeImg}
            style={{ flex: 1 }}
            imageStyle={{ opacity: 0.8 }}
          >
            <View className="flex-1 justify-center items-center px-6">
              <View className="bg-[#1a1f24]/90 w-full max-w-md rounded-3xl p-6 shadow-lg">
                <Text className="text-white text-3xl font-bold mb-6 text-center">Regístrate</Text>
    
                <View className="mb-4">
                  <Text className="text-gray-300 mb-2">Nombre Completo</Text>
                  <TextInput
                    value={formData.Name}
                    onChangeText={(value) => setFormData({ ...formData, Name: value })}
                    placeholder="Ingresa tu nombre"
                    placeholderTextColor="#6b7280"
                    className="bg-[#0b1220] text-white px-4 py-3 rounded-xl"
                  />
                </View>
    
                <View className="mb-4">
                  <Text className="text-gray-300 mb-2">Correo</Text>
                  <TextInput
                    value={formData.email}
                    onChangeText={(value) => setFormData({ ...formData, email: value })}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor="#6b7280"
                    className="bg-[#0b1220] text-white px-4 py-3 rounded-xl"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
    
                <View className="mb-4">
                  <Text className="text-gray-300 mb-2">Contraseña</Text>
                  <TextInput
                    value={formData.password}
                    onChangeText={(value) => setFormData({ ...formData, password: value })}
                    placeholder="••••••••"
                    placeholderTextColor="#6b7280"
                    className="bg-[#0b1220] text-white px-4 py-3 rounded-xl"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
    
                <View className="mb-4">
                  <Text className="text-gray-300 mb-2">Peso Actual (kg)</Text>
                  <TextInput
                    value={formData.currentWeight.toString()}
                    onChangeText={(value) =>
                      setFormData({ ...formData, currentWeight: parseInt(value, 10) || 0 })
                    }
                    placeholderTextColor="#6b7280"
                    className="bg-[#0b1220] text-white px-4 py-3 rounded-xl"
                    keyboardType="numeric"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-gray-300 mb-2">Peso Objetivo (kg)</Text>
                  <TextInput
                    value={formData.goalWeight.toString()}
                    onChangeText={(value) =>
                      setFormData({ ...formData, goalWeight: parseInt(value, 10) || 0 })
                    }
                    placeholderTextColor="#6b7280"
                    className="bg-[#0b1220] text-white px-4 py-3 rounded-xl"
                    keyboardType="numeric"
                  />
                </View>
    
                <View className="mb-4">
                  <Text className="text-gray-300 mb-2">Selecciona un Objetivo</Text>
                  <View className="bg-[#0b1220] rounded-xl">
                    <RNPickerSelect
                      value={formData.goal}
                      onValueChange={(value) => setFormData({ ...formData, goal: value })}
                      items={[
                        { label: 'Perder peso', value: 'lose_weight' },
                        { label: 'Ganar músculo', value: 'gain_muscle' },
                        { label: 'Mantener peso', value: 'maintain_weight' },
                      ]}
                      placeholder={{
                        label: 'Selecciona una opción...',
                        value: '',
                        color: '#6b7280',
                      }}
                      style={{
                        inputAndroid: {
                          color: 'white',
                          paddingHorizontal: 10,
                          paddingVertical: 12,
                          borderRadius: 10,
                          backgroundColor: '#0b1220',
                        },
                        inputIOS: {
                          color: 'white',
                          paddingHorizontal: 10,
                          paddingVertical: 12,
                          borderRadius: 10,
                          backgroundColor: '#0b1220',
                        },
                        placeholder: {
                          color: '#6b7280',
                        },
                      }}
                    />
                  </View>
                </View>
    
                <View className="mb-4">
                    <Text className="text-gray-300 mb-2">Fecha de Nacimiento</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className="bg-[#0b1220] py-3 px-4 rounded-xl"
                    >
                        <Text className="text-white">
                        {formData.dateBirth.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                        value={formData.dateBirth}
                        mode="date"
                        display="spinner"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                            setFormData({ ...formData, dateBirth: selectedDate });
                            }
                        }}
                        />
                    )}
                </View>

    
                <TouchableOpacity
                  onPress={goToLogin}
                  className={`py-3 rounded-xl items-center justify-center`}
                  style={{ backgroundColor: '#ff5a5f' }}
                  disabled={loading}
                >
                  <Text className="text-white font-bold">
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      );
}
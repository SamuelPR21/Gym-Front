import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { createRoutineApi } from "../../API/routine";
import useAuth from "../../hook/useAuth";

export default function CreateRutine() {

  const { auth } = useAuth();
  const user = auth?.user?.id;

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [routineName, setRoutineName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const hours = [...Array(24).keys()];
  const minutes = [...Array(60).keys()];
  const seconds = [...Array(60).keys()];

  const durationRoutineInMInutes = hour * 60 + minute + second / 60;


  const handleCreateRoutine = async () => {

    if (!routineName.trim() || durationRoutineInMInutes === 0 || description.trim() === "") {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
      
    }

    const today = new Date().toISOString().split("T")[0]; 
    const routineData = {
      routineName: routineName,
      user: user, 
      description: description,
      dateCreated: today, 
      duration: durationRoutineInMInutes.toFixed(0)
    }
    try {
      const response = await createRoutineApi(routineData);
      console.log("Rutina creada exitosamente:", response);

      setSuccessMessage("✅ Rutina creada con éxito");

      setRoutineName("");
      setDescription("");
      setHour(0);
      setMinute(0);
      setSecond(0);

      setTimeout(() => setSuccessMessage(""), 2000);

    } catch (error) {
      console.error("Error al crear la rutina:", error);
    }
  }

  return (

  

    <View className="flex-1 justify-center items-center bg-gray-900">
      
      <View className="flex-1 justify-center px-6 -mt-12">
        <View
          className="rounded-3xl p-6 shadow-lg"
          style={{
            backgroundColor: "#0f1720",
            shadowColor: "#000",
            shadowOpacity: 0.6,
            shadowRadius: 20,
            elevation: 12,
          }}
        >
          <Text className="text-white text-2xl font-bold mb-8">
            Creación de Rutina
          </Text>

          {/* Nombre */}
          <View className="mb-4">
            <TextInput
              placeholder="Nombre de Rutina"
              placeholderTextColor="#ccc"
              className="bg-[#0b1220] text-white px-4 py-3 rounded-xl"
              autoCapitalize="none"
              value={routineName}
              onChangeText={setRoutineName}
            />
          </View>

              {successMessage ? (
              <Text className="text-green-400 font-bold text-center mb-4">
                {successMessage}
              </Text>
            ) : null}

          {/* Descripción */}
          <View className="mb-6">
            <TextInput
              placeholder="Descripción"
              placeholderTextColor="#ccc"
              className="bg-[#0b1220] text-white px-4 py-3 rounded-xl"
              autoCapitalize="none"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <Text className="text-white text-2xl font-bold mb-6">Duración</Text>

          {/* Pickers */}
          <View className="flex-row justify-center space-x-4">
            {/* Horas */}
            <View className="rounded-2xl border border-gray-700 overflow-hidden">
              <WheelPickerExpo
                height={180}
                width={80}
                backgroundColor="transparent"
                initialSelectedIndex={0}
                items={hours.map((h) => ({
                  label: h.toString().padStart(2, "0"),
                  value: h,
                }))}
                onChange={({ item }) => setHour(item.value)}
              />
            </View>

            {/* Minutos */}
            <View className="rounded-2xl border border-gray-700 overflow-hidden">
              <WheelPickerExpo
                height={180}
                width={80}
                backgroundColor="transparent"
                initialSelectedIndex={0}
                items={minutes.map((m) => ({
                  label: m.toString().padStart(2, "0"),
                  value: m,
                }))}
                onChange={({ item }) => setMinute(item.value)}
              />
            </View>

            {/* Segundos */}
            <View className="rounded-2xl border border-gray-700 overflow-hidden">
              <WheelPickerExpo
                height={180}
                width={80}
                backgroundColor="transparent"
                initialSelectedIndex={0}
                items={seconds.map((s) => ({
                  label: s.toString().padStart(2, "0"),
                  value: s,
                }))}
                onChange={({ item }) => setSecond(item.value)}
              />
            </View>
          </View>

          {/* Texto del tiempo */}
          <Text className="text-yellow-400 text-xl font-bold mt-8 text-center">
            {hour.toString().padStart(2, "0")}:
            {minute.toString().padStart(2, "0")}:
            {second.toString().padStart(2, "0")}
          </Text>

          <Text className="text-yellow-400 text-xl font-bold mt-8 text-center">
            Entrenamiento en minutos: {durationRoutineInMInutes.toFixed(2)} 
          </Text>

          {/* Botón Crear */}
          <TouchableOpacity
            onPress={handleCreateRoutine}
            className="py-3 rounded-xl mt-8"
            style={{ backgroundColor: "#ff5a5f" }}
          >
            <Text className="text-white font-bold text-center">Crear</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

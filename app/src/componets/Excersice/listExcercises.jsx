import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddExercise from "../Routine/addExercise";
import ModalRoutineHome from "../Routine/modalRoutineHome";

export default function ListExcercises() {
  const [openModalListRoutine, setOpenModalListRoutine] = useState(false);
  const [openModalSetExercise, setOpenModalSetExercise] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const exercises = [
    { id: 1, name: "Press banca", group: "Pecho", image: "https://placehold.co/400x250/1f2937/FFF/png?text=Press+Banca" },
    { id: 2, name: "Dominadas", group: "Espalda", image: "https://placehold.co/400x250/1f2937/FFF/png?text=Dominadas" },
    { id: 3, name: "Sentadillas", group: "Piernas", image: "https://placehold.co/400x250/1f2937/FFF/png?text=Sentadillas" },
    { id: 4, name: "Press militar", group: "Hombros", image: "https://placehold.co/400x250/1f2937/FFF/png?text=Press+Militar" },
    { id: 5, name: "Curl bíceps", group: "Brazos", image: "https://placehold.co/400x250/1f2937/FFF/png?text=Curl+Biceps" },
    { id: 6, name: "Plancha abdominal", group: "Core", image: "https://placehold.co/400x250/1f2937/FFF/png?text=Plancha" },
  ];

  const handleAddToRoutine = (exercise) => {
    setSelectedExercise(exercise);
    setOpenModalListRoutine(true);
  };

  const handleSelectRoutine = (routine) => {
    setSelectedRoutine(routine);
    setOpenModalListRoutine(false);
    setOpenModalSetExercise(true);
  };

  const handleSaveExercise = (data) => {
    console.log("📌 Datos guardados:", data);
    setOpenModalSetExercise(false);
    setSelectedExercise(null);
    setSelectedRoutine(null);
  };

  const getGroupColor = (group) => {
    const colors = {
      Pecho: "#FF6B6B",
      Espalda: "#4ECDC4",
      Piernas: "#FFD166",
      Hombros: "#06D6A0",
      Brazos: "#118AB2",
      Core: "#9B5DE5",
    };
    return colors[group] || "#6c757d";
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        className="px-4 py-4"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="flex-row flex-wrap justify-between">
          {exercises.map((exercise) => (
            <View
              key={exercise.id}
              className="w-[48%] mb-5 rounded-2xl overflow-hidden shadow-lg shadow-black/50"
            >
              <LinearGradient
                colors={["#1f2937", "#111827"]}
                className="w-full h-56 justify-between"
              >
                {/* Imagen */}
                <Image
                  source={{ uri: exercise.image }}
                  className="w-full h-28"
                  resizeMode="cover"
                />

                {/* Contenido */}
                <View className="flex-1 px-3 py-3 justify-between">
                  <View>
                    <Text className="text-white text-sm font-bold mb-1" numberOfLines={1}>
                      {exercise.name}
                    </Text>

                    <View
                      className="self-start px-2 py-1 rounded-full"
                      style={{ backgroundColor: getGroupColor(exercise.group) + "33" }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: getGroupColor(exercise.group) }}
                      >
                        {exercise.group}
                      </Text>
                    </View>
                  </View>

                  {/* Botón */}
                  <TouchableOpacity
                    className="bg-yellow-500 py-2 rounded-lg items-center mt-2"
                    onPress={() => handleAddToRoutine(exercise)}
                  >
                    <Text className="text-gray-900 text-xs font-bold">Agregar</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal 1: seleccionar rutina */}
      <Modal
        visible={openModalListRoutine}
        animationType="slide"
        transparent
        onRequestClose={() => setOpenModalListRoutine(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-gray-900 rounded-t-3xl p-6 h-[80%]">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-lg font-bold">Seleccionar rutina</Text>
              <TouchableOpacity onPress={() => setOpenModalListRoutine(false)}>
                <Text className="text-red-500 font-bold text-lg">Cerrar</Text>
              </TouchableOpacity>
            </View>
            <ModalRoutineHome onSelectRoutine={handleSelectRoutine} />
          </View>
        </View>
      </Modal>

      {/* Modal 2: añadir series */}
      <Modal
        visible={openModalSetExercise}
        animationType="slide"
        transparent
        onRequestClose={() => setOpenModalSetExercise(false)}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-gray-900 rounded-t-3xl p-6 h-[80%]">
            <AddExercise
              exercise={selectedExercise}
              onClose={() => setOpenModalSetExercise(false)}
              onSave={handleSaveExercise}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

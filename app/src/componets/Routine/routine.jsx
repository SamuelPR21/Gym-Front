import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Torso from "../../../../assets/images/ImgRoutineExercise/back.jpg";
import Chest from "../../../../assets/images/ImgRoutineExercise/chest.jpg";
import Legs from "../../../../assets/images/ImgRoutineExercise/legs.jpg";
import Arms from "../../../../assets/images/ImgRoutineExercise/shoulders.jpg";
import AddExercise from "./addExercise";
import Exercise from "./exercise";

export default function Routine() {

  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdateExercise, setOpenModalUpdateExercise] = useState(false);
  const navigation = useNavigation();

  const exercises = [
    { name: "Press de banca", sets: 4, reps: 8, rest: "90s", tag: "Pecho" },
    { name: "Sentadillas", sets: 4, reps: 10, rest: "90s", tag: "Piernas" },
    { name: "Dominadas", sets: 4, reps: 8, rest: "120s", tag: "Espalda" },
    { name: "Press inclinado con mancuernas", sets: 3, reps: 10, rest: "60s" },
    { name: "Aperturas con mancuernas", sets: 3, reps: 12, rest: "60s" },
    { name: "Fondos en paralelas", sets: 3, reps: 10, rest: "60s" },
    { name: "Pull-over con mancuerna", sets: 3, reps: 12, rest: "60s" },
  ];

  const groupMuscleForTrainer = exercises[0]?.tag || "General";

  const muscleImageMap = {
    Pecho: Chest,
    Piernas: Legs,
    Espalda: Torso,
    Brazos: Arms,
  };

  const routineImage = muscleImageMap[groupMuscleForTrainer] || Torso;


  return (
    <View className="flex-1 bg-gray-900">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <ImageBackground
          source={routineImage}
          resizeMode="cover"
          className="h-60 w-full mt-6 rounded-b-3xl overflow-hidden"
        >
          <View className="flex-1 bg-black/50 items-center justify-center">
            <Text className="text-white text-3xl font-extrabold text-center px-4">
              Nombre personalizado de la rutina
            </Text>
            <Text className="text-yellow-400 text-lg font-semibold">
              Grupo: {groupMuscleForTrainer}
            </Text>
          </View>
        </ImageBackground>

        <View className="px-6 mt-8">
          {exercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setOpenModalUpdateExercise(true)}
              activeOpacity={0.8}
            >
              <View className="h-28 bg-gray-800 rounded-2xl border border-yellow-400 mb-4 px-4 py-3 shadow-lg relative">
                <Text className="text-white text-lg font-bold">
                  {exercise.name}
                </Text>
                <Text className="text-yellow-400 text-sm">{exercise.tag}</Text>
                <Text className="text-gray-400 text-sm">
                  {exercise.sets}x{exercise.reps} • Descanso: {exercise.rest}
                </Text>

                <TouchableOpacity className="bg-red-600 rounded-full w-8 h-8 items-center justify-center absolute top-2 right-2 shadow-lg">
                  <Text className="text-white text-lg font-bold">-</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
            className="bg-yellow-400 rounded-full w-16 h-16 items-center justify-center absolute bottom-10 left-10 shadow-lg"
            onPress={() => setOpenModal(true)}
        >
            <Text className="text-white text-3xl font-bold">+</Text>
        </TouchableOpacity>

        <Modal
            visible={openModal}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setOpenModal(false)}
        >
            <AddExercise onClose={() => setOpenModal(false)} />
        </Modal>

        <Modal
          visible={openModalUpdateExercise}
          animationType="slide"
          transparent
          onRequestClose={() => setOpenModalUpdateExercise(false)}
        >
           <View className="flex-1 bg-black/60 justify-end">
            <View className="bg-gray-900 rounded-t-3xl p-6 h-[80%]">
              
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity onPress={() => setOpenModalUpdateExercise(false)}>
                <Text className="text-blue-500 font-bold text-lg">Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOpenModalUpdateExercise(false)}>
                <Text className="text-red-500 font-bold text-lg">Cerrar</Text>
              </TouchableOpacity>
            </View>

          <Exercise />
            </View>
          </View>
        </Modal>
    </View>

    
  );
}

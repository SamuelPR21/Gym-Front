import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Torso from "../../../../assets/images/ImgRoutineExercise/back.jpg";
import Chest from "../../../../assets/images/ImgRoutineExercise/chest.jpg";
import Legs from "../../../../assets/images/ImgRoutineExercise/legs.jpg";
import Arms from "../../../../assets/images/ImgRoutineExercise/shoulders.jpg";
import { getExcerisesByIdRoutine } from "../../../API/routineExercise";
import useAuth from '../../../hook/useAuth';
import AddExercise from "./addExercise";
import Exercise from "./exercise";


export default function Routine() {

  const route = useRoute(); 
  const {idRoutineSelect} = route.params ;
  const {nameRoutineSelect} = route.params ;
  const { auth } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdateExercise, setOpenModalUpdateExercise] = useState(false);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        if (!auth?.user?.id || !idRoutineSelect) return;
        console.log(idRoutineSelect)
        const data = await getExcerisesByIdRoutine(idRoutineSelect);
        setExercises(data);
      } catch (error) {
        console.error("❌ Error al obtener ejercicios de la rutina:", error);
      }
    };
  
    fetchExercises();
  }, [auth, idRoutineSelect]);

  const groupMuscleForTrainer = exercises[0]?.tag || "General";

  const muscleImageMap = {
    Pectoral: Chest,
    Espalda: Torso,
    Biceps: Arms,
    Triceps: Arms,
    Hombros: Arms,
    Core: Torso,
    Cuádriceps: Legs,
    Isquiotibiales: Legs,
    Gemelos: Legs,
    Glúteos: Legs,
  };

  const routineImage = muscleImageMap[groupMuscleForTrainer] || Torso;


  return (
    <View className="flex-1 bg-gray-900">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {exercises.length > 0 ? (
          <>
            <ImageBackground
              source={routineImage}
              resizeMode="cover"
              className="h-60 w-full mt-6 rounded-b-3xl overflow-hidden"
            >
              <View className="flex-1 bg-black/50 items-center justify-center">
                <Text className="text-white text-3xl font-extrabold text-center px-4">
                  {nameRoutineSelect}
                </Text>
                <Text className="text-yellow-400 text-lg font-semibold">
                  Grupo(s): {groupMuscleForTrainer}
                </Text>
              </View>
            </ImageBackground>

            <View className="px-6 mt-8">
              {exercises.map((exercise, index) => (
                <TouchableOpacity
                  key={exercise.id || index}
                  onPress={() => setOpenModalUpdateExercise(true)}
                  activeOpacity={0.8}
                >
                  <View className="h-28 bg-gray-800 rounded-2xl border border-yellow-400 mb-4 px-4 py-3 shadow-lg relative">
                    <Text className="text-white text-lg font-bold">
                      {exercise.name}
                    </Text>
                    <Text className="text-yellow-400 text-sm">
                      {exercise.muscleGroup}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      {exercise.description}
                    </Text>

                    <TouchableOpacity className="bg-red-600 rounded-full w-8 h-8 items-center justify-center absolute top-2 right-2 shadow-lg">
                      <Text className="text-white text-lg font-bold">-</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View className="flex-1 justify-center items-center px-6">
            <ImageBackground
              source={routineImage}
              resizeMode="cover"
              className="h-60 w-full mt-6 rounded-b-3xl overflow-hidden"
            >
              <View className="flex-1 bg-black/50 items-center justify-center">
                <Text className="text-white text-3xl font-extrabold text-center px-4">
                  {nameRoutineSelect}
                </Text>
                <Text className="text-yellow-400 text-lg font-semibold">
                  Grupo(s): {groupMuscleForTrainer}
                </Text>
              </View>
            </ImageBackground>
            <Text className="text-white text-center text-lg mb-4">
              No hay ejercdsicios en esta rutina. ¡Agsrega algunos para empezar!
            </Text>
            
          </View>
        )}
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
                <Text className="text-blue-500 font-bold text-lg">Guardadd+r</Text>
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

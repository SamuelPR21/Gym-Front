import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { deleteRoutineApi, getRoutineByUserApi } from "../../../API/routine";
import { AuthContext } from "../../../context/authContext";

export default function ModalRoutineHome({onSelectRoutine, idRoutineSelect, nameRoutineSelect}) {

    const navigation = useNavigation();
    const { auth } = useContext(AuthContext);
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);

   
    const goToRoutine = (routineId, routineName) =>{
        navigation.navigate("Routine", { 
          idRoutineSelect: routineId, 
          nameRoutineSelect: routineName 
        });
      }

      useFocusEffect(
        useCallback(() => {
          const fetchRoutines = async () => {
            try {
              if (!auth?.user?.id) return;
              const data = await getRoutineByUserApi(auth.user.id);
              setRoutines(data);
            } catch (error) {
              console.error(" Error al obtener rutinas:", error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchRoutines();
        }, [auth])
      )
       
      const handleDeleteRoutine = (routineId) => {
        deleteRoutineApi(routineId)
          .then(() => {
            setRoutines((prevRoutines) =>
              prevRoutines.filter((routine) => routine.id !== routineId)
            );
          })
          .catch((error) => {
            console.error(" Error al eliminar la rutina:", error);
          });
      }  
    
      if (loading) {
        return (
          <View className="flex-1 justify-center items-center bg-black">
            <ActivityIndicator size="large" color="#FFD700" />
            <Text className="text-white mt-4">Cargando rutinas...</Text>
          </View>
        );
      }

    return (
        <View className="flex-1">
          <ScrollView vertical showsHorizontalScrollIndicator={false} className="px-6 mb-10">
            {routines.length > 0 ? (
              routines.map((routine, i) => (
                <TouchableOpacity
                  key={routine.id || i}
                  onPress={() =>
                    onSelectRoutine
                      ? onSelectRoutine(routine)
                      : goToRoutine(routine.id, routine.routineName)

                  }
                >
                  <View className="h-24 bg-gray-800 rounded-xl border-2 border-yellow-400 mb-4 justify-center px-4">
                    <Text className="text-white text-lg font-bold">{routine.routineName}</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="my-2 space-x-2">
                      <Text className="text-yellow-400 text-sm">
                        {routine.description || "Sin descripción"}
                      </Text>
                    </ScrollView>
                    <Text className="text-gray-400 text-sm">
                      ⏱ Duración: {routine.duration || "No especificada"}
                    </Text>
                    <TouchableOpacity 
                    onPress={() => handleDeleteRoutine(routine.id, routine.routineName)}
                      className="bg-red-600 rounded-full w-8 h-8 items-center justify-center absolute top-2 right-2 shadow-lg"
                    >
                      <Text className="text-white text-2xl font-bold">-</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-gray-400 text-center mt-10">No tienes rutinas registradas.</Text>
            )}
          </ScrollView>
        </View>
      );
}
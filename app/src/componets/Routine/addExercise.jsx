import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getExercisesByGroupMuscle } from "../../../API/exercise";
import useAuth from '../../../hook/useAuth';


export default function AddExercise({ onClose, onSave, exercise }) {

  const { auth } = useAuth();

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(exercise || null);

    // Si recibimos `exercise` desde fuera → ya está seleccionado
  const [group, setGroup] = useState(exercise?.group || "");
  const [series, setSeries] = useState([{ peso: "", reps: "" }]);


  useEffect(() => {
    const FetchExercises = async () => {
      try {
        if (!auth?.user?.id || !group) return;
        const data = await getExercisesByGroupMuscle(group);
        setExercises(data);
      } catch (error) {
        console.error("❌ Error al obtener ejercicios:", error);
      }
    }
    FetchExercises();
  },[group] );



  const addSeries = () => setSeries([...series, { peso: "", reps: "" }]);

  const handleChangeSeries = (index, field, value) => {
    const updated = [...series];
    updated[index][field] = value;
    setSeries(updated);
  };

  const handleSave = () => {
    const data = {
      exercise: selectedExercise,
      group,
      series,
    };
    onSave?.(data); // lo pasamos al padre si existe
    onClose();
  };

  return (
    <View className="flex-1 bg-gray-900 p-6">
      {!exercise && (
        <>
          <Text className="text-white text-2xl font-bold mb-6 text-center">
            Añadir Ejercicio
          </Text>

          <RNPickerSelect
            onValueChange={(val) => {
              setGroup(val);
              setSelectedExercise(null);
            }}
            items={[
              { label: "Pectoral", value: "Pectoral" },
              { label: "Espalda", value: "Espalda" },
              { label: "Biceps", value: "Biceps" },
              {label: "Triceps", value: "Triceps"},
              { label: "Hombros", value: "Hombros" },
              { label: "Core", value: "Core" },
              { label: "Cuadriceps", value: "Cuadriceps" },
              { label: "Isquiotibiales", value: "Isquiotibiales" },
              { label: "Gemelos", value: "Gemelos" },
              { label: "Gluteos", value: "Gluteos" },
            ]}
            placeholder={{
              label: "Selecciona un grupo muscular",
              value: "",
              color: "#9ca3af",
            }}
            style={{
              inputIOS: {
                color: "#fff",
                paddingVertical: 12,
                paddingHorizontal: 10,
                backgroundColor: "#1f2937",
                borderRadius: 8,
              },
              inputAndroid: {
                color: "#fff",
                paddingVertical: 8,
                paddingHorizontal: 10,
                backgroundColor: "#1f2937",
                borderRadius: 8,
              },
              placeholder: { color: "#9ca3af" },
            }}
          />

          {/* Lista de ejercicios SOLO si no recibimos uno ya */}
          <ScrollView className="flex-1 mt-6">
            {group &&
              exercises.map((ex) => (
                <TouchableOpacity
                  key={ex.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedExercise(ex)}
                >
                  <View
                    className={`h-28 ${
                      selectedExercise?.id === ex.id
                        ? "bg-yellow-600"
                        : "bg-gray-800"
                    } rounded-2xl border border-yellow-400 mb-4 px-4 py-3 shadow-lg flex-1 items-center justify-center`}
                  >
                    <Text className="text-white text-lg font-bold ">
                      {ex.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </>
      )}

      {/* 🔹 Siempre se muestra la parte de series */}
      {selectedExercise && (
        <View className="mt-6 flex-1">
          <Text className="text-white text-xl font-bold mb-4">
            Series para {selectedExercise.name}
          </Text>

          <ScrollView>
            {series.map((s, i) => (
              <View
                key={i}
                className="bg-gray-800 rounded-xl p-4 mb-3 flex-row justify-between"
              >
                <TextInput
                  placeholder="Peso (kg)"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  value={s.peso}
                  onChangeText={(val) => handleChangeSeries(i, "peso", val)}
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg flex-1 mr-2"
                />
                <TextInput
                  placeholder="Reps"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                  value={s.reps}
                  onChangeText={(val) => handleChangeSeries(i, "reps", val)}
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg flex-1 ml-2"
                />
              </View>
            ))}
          </ScrollView>

          {/* Botón para añadir series */}
          <TouchableOpacity
            className="bg-blue-600 py-3 rounded-xl mb-6"
            onPress={addSeries}
          >
            <Text className="text-white font-bold text-center">
              + Añadir Serie
            </Text>
          </TouchableOpacity>

          {/* Botones */}
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              className="bg-gray-600 flex-1 py-3 rounded-xl mr-2"
              onPress={onClose}
            >
              <Text className="text-white text-center font-bold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-yellow-400 flex-1 py-3 rounded-xl ml-2"
              onPress={handleSave}
              disabled={!selectedExercise}
            >
              <Text className="text-black text-center font-bold">Añadir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

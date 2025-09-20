import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ExerciseSeriesForm({ exerciseName, onCancel, onSave }) {
  const [series, setSeries] = useState([{ peso: "", reps: "" }]);

  const addSeries = () => setSeries([...series, { peso: "", reps: "" }]);

  const handleChangeSeries = (index, field, value) => {
    const updated = [...series];
    updated[index][field] = value;
    setSeries(updated);
  };

  const handleSave = () => {
    onSave(series);
  };

  return (
    <View>
      <Text className="text-white text-xl font-bold mb-4">
        Series para {exerciseName}
      </Text>

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

      {/* Botón para añadir series */}
      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-xl mb-6"
        onPress={addSeries}
      >
        <Text className="text-white font-bold text-center">+ Añadir Serie</Text>
      </TouchableOpacity>

      {/* Botones */}
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-gray-600 flex-1 py-3 rounded-xl mr-2"
          onPress={onCancel}
        >
          <Text className="text-white text-center font-bold">Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-yellow-400 flex-1 py-3 rounded-xl ml-2"
          onPress={handleSave}
        >
          <Text className="text-black text-center font-bold">Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Exercise() {
  const [series, setSeries] = useState([
    { posicion: 1, peso: "", reps: "" },
  ]);

  const handleChangeSeries = (index, field, value) => {
    const updated = [...series];
    updated[index][field] = value;
    setSeries(updated);
  };

  const addSerie = () => {
    setSeries([
      ...series,
      { posicion: series.length + 1, peso: "", reps: "" },
    ]);
  };

  const removeSerie = (index) => {
    const updated = series.filter((_, i) => i !== index);
    // Reindexar posiciones
    const reindexed = updated.map((s, i) => ({
      ...s,
      posicion: i + 1,
    }));
    setSeries(reindexed);
  };

  return (
    <View className="flex-1">
      <Text className="text-yellow-400 text-2xl font-bold mb-6 text-center">
        Press de Banca
      </Text>

      <ScrollView>
        {series.map((s, i) => (
          <View
            key={i}
            className="bg-gray-800 rounded-2xl border border-yellow-400 mb-4 px-4 py-3 shadow-lg"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-white text-lg font-bold mr-4 w-8 text-center">
                {s.posicion}
              </Text>

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

              <TouchableOpacity
                onPress={() => removeSerie(i)}
                className="bg-red-600 rounded-full w-8 h-8 items-center justify-center ml-2"
              >
                <Text className="text-white font-bold">-</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botón Añadir serie */}
      <TouchableOpacity
        onPress={addSerie}
        className="bg-yellow-400 py-3 rounded-xl mt-4 shadow-lg"
      >
        <Text className="text-black text-center font-bold text-lg">
          + Añadir Serie
        </Text>
      </TouchableOpacity>
    </View>
  );
}

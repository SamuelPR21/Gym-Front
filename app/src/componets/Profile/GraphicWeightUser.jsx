import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function GraphicWeightUser() {
  // Estado para el filtro de tiempo
  const [filter, setFilter] = useState("7d");

  // Datos de ejemplo según filtro
  const dataSets = {
    "7d": [70, 70.5, 71, 70.8, 71.2, 71, 71.5],
    "14d": [70, 70.5, 71, 70.8, 71.2, 71, 71.5, 72, 71.8, 72.2, 72, 72.5, 72.3, 72.7],
    "30d": [70, 70.2, 70.5, 70.8, 71, 71.2, 71.5, 71.8, 72, 72.3, 72.5, 72.7, 73, 73.2, 73.5, 73.8, 74, 74.2, 74.5, 74.7, 75],
  };

  const chartData = {
    labels: ["Día 1", "Día 2", "Día 3", "Día 4", "Día 5", "Día 6", "Día 7"],
    datasets: [
      {
        data: dataSets[filter],
        color: () => `#facc15`, // amarillo Tailwind
      },
    ],
  };

  return (
    <View className="mt-6 px-4">
      <Text className="text-lg font-bold text-yellow-400 mb-2">Progreso de Peso</Text>

      {/* Botones de filtro */}
      <View className="flex-row flex-wrap mb-4">
        {["7d", "14d", "30d"].map((f) => (
          <TouchableOpacity
            key={f}
            className={`px-3 py-1 rounded-lg mr-2 mb-2 ${
              filter === f ? "bg-yellow-400" : "bg-gray-700"
            }`}
            onPress={() => setFilter(f)}
          >
            <Text className={`${filter === f ? "text-black" : "text-white"}`}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Gráfica */}
      <LineChart
        data={chartData}
        width={screenWidth - 40} // ancho menos padding
        height={220}
        chartConfig={{
          backgroundColor: "#111827", // gray-900
          backgroundGradientFrom: "#1f2937", // gray-800
          backgroundGradientTo: "#1f2937",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(250, 204, 21, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
}

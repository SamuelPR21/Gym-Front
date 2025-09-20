import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const days = ["L", "M", "X", "J", "V", "S", "D"];

export default function DaysTrainning() {
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <View className="mt-6 px-4">
      <Text className="text-lg font-bold text-yellow-400 mb-3">
        Días de Entrenamiento
      </Text>

      {/* Fila de días */}
      <View className="flex-row justify-between mb-2">
        {days.map((day, index) => (
          <Text
            key={index}
            className="text-white font-semibold text-center flex-1"
          >
            {day}
          </Text>
        ))}
      </View>

      {/* Fila de checkboxes */}
      <View className="flex-row justify-between">
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mx-auto ${
              selectedDays.includes(day)
                ? "bg-yellow-400 border-yellow-400"
                : "border-gray-400"
            }`}
            onPress={() => toggleDay(day)}
          >
            {selectedDays.includes(day) && (
              <Text className="text-black font-bold">✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

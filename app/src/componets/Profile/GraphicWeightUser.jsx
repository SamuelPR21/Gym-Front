import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getWeightHistoryByUserApi } from "../../../API/WeightHistory";
import { AuthContext } from "../../../context/authContext";
import useAuth from '../../../hook/useAuth';

const screenWidth = Dimensions.get("window").width;

export default function GraphicWeightUser() {
  
  const { auth } = useAuth(AuthContext);

  const [history, setHistory] = useState([]); 
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);


  
  useEffect(() => {
    const fetchWeightHistory = async () => {
      try {
        if (!auth?.user?.id) return;
        const data = await getWeightHistoryByUserApi(auth.user.id);
        setHistory(data);
      } catch (error) {
        console.error("Error al obtener el historial de peso:", error);
      }
    };

    fetchWeightHistory();
  }, []);

  const filteredData = history.filter((item) => {
    const itemDate = new Date(item.date);
    if (startDate && itemDate < startDate) return false;
    if (endDate && itemDate > endDate) return false;
    return true;
  })

  const chartData = {
    labels: filteredData.map((item) =>
      new Date(item.date).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
      })
    ),
    datasets: [
      {
        data: filteredData.map((item) => item.weight),
        color: () => `#facc15`, // amarillo
      },
    ],
  };

  return (
    <View className="mt-6 px-4">
      <TouchableOpacity className="mb-2"
        onPress={() => setShowStartPicker(true)}
      >
        <Text className="text-lg font-bold text-yellow-400">
          {startDate
            ? `Inicio: ${startDate.toLocaleDateString()}`
            : "Seleccionar fecha inicio"}
        </Text>
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity 
        className="mb-2"
        onPress={() => setShowEndPicker(true)}
      >
        <Text className="text-lg font-bold text-yellow-400">
          {endDate
            ? `Fin: ${endDate.toLocaleDateString()}`
            : "Seleccionar fecha fin"}
        </Text>
      </TouchableOpacity>
     
      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
        />
      )}

      {
        filteredData.length > 0?(
          <LineChart
            data={chartData}
            width={screenWidth - 40} 
            height={220}
            chartConfig={{
              backgroundColor: "#111827", 
              backgroundGradientFrom: "#1f2937", 
              backgroundGradientTo: "#1f2937",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(250, 204, 21, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            bezier
            style={{ borderRadius: 16 }}
          />
        ) :(
          <Text className="text-white text-center mt-4">No hay datos. de peso en el rango de tiempo sleccionado.</Text>
        )
      }
      
    </View>
  );
}

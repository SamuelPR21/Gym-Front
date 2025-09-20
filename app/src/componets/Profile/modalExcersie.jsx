import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";


export default function ModalExercise({ name, img }) {


  const  navigation = useNavigation();


  return (
    <ImageBackground
      source={img}
      resizeMode="cover"
      className="w-52 h-52 rounded-2xl overflow-hidden mr-2"
    >
      <View className="flex-1 bg-black/40 items-center justify-center p-2">
        <Text className="text-white text-lg font-bold mb-2 text-center">
          {name}
        </Text>
        <TouchableOpacity
          className="bg-red-500 px-3 py-1 rounded-lg active:opacity-80"
          onPress={() => navigation.navigate("Exercise")}
        >
          <Text className="text-white text-sm font-semibold">Ver más</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

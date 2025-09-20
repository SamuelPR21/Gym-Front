import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function ModalAnalysis({ name, img, active }) {
  return (
    <ImageBackground
      source={img}
      resizeMode="cover"
      className={`${
        active ? "flex-[6]" : "flex-[2]"
      } h-64 rounded-xl border-2 border-yellow-400 overflow-hidden mr-2 transition-all duration-500 ease-in-out`}
    >
      {active && (
        <View className="flex-1 bg-black/40 items-center justify-center p-2">
          <Text className="text-white text-lg font-bold mb-2 text-center">
            {name}
          </Text>
          <TouchableOpacity className="bg-red-500 px-3 py-1 rounded-lg active:opacity-80">
            <Text className="text-white text-sm font-semibold">Ingresar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}

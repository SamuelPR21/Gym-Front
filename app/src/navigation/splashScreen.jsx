import { ActivityIndicator, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-4xl font-bold text-yellow-400 mb-4">
        MyApp
      </Text>
      <Text className="text-white mb-6">Cargando tu experiencia...</Text>
      <ActivityIndicator size="large" color="#FFD700" />
    </View>
  );
}

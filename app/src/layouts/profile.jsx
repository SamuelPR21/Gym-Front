import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileImage from "../../../assets/images/profile.jpeg";
import DaysTrainning from "../componets/Profile/daysTrainnig";
import Graphic from "../componets/Profile/GraphicWeightUser";
import ModalExercise from "../componets/Profile/modalExcersie";

import abdomenImg from "../../../assets/images/imgProfile/abs.jpg";
import espaldaImg from "../../../assets/images/imgProfile/back.jpg";
import bicepsImg from "../../../assets/images/imgProfile/biceps.jpg";
import cuadricepsImg from "../../../assets/images/imgProfile/cuadricpes.jpg";
import gemelosImg from "../../../assets/images/imgProfile/gemelos.jpg";
import gluteosImg from "../../../assets/images/imgProfile/gluteos.jpg";
import hombrosImg from "../../../assets/images/imgProfile/hombros.jpg";
import isquiotibialesImg from "../../../assets/images/imgProfile/isquitidiales.jpg";
import pectoralImg from "../../../assets/images/imgProfile/pectoral.jpg";
import tricepsImg from "../../../assets/images/imgProfile/triceps.jpg";

const muscleGroups = [
  "Pectoral",
  "Espalda",
  "Biceps",
  "Triceps",
  "Hombros",
  "Abdomen",
  "Cuádriceps",
  "Isquiotibiales",
  "Gemelos",
  "Glúteos",
];

const muscleGroupImages = {
  Pectoral: pectoralImg,
  Espalda: espaldaImg,
  Biceps: bicepsImg,
  Triceps: tricepsImg,
  Hombros: hombrosImg,
  Abdomen: abdomenImg,
  Cuádriceps: cuadricepsImg,
  Isquiotibiales: isquiotibialesImg,
  Gemelos: gemelosImg,
  Glúteos: gluteosImg,
};


export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="items-center mt-6">
          <Image
            source={ProfileImage}
            className="w-32 h-32 rounded-full border-4 border-yellow-400"
          />
          <Text className="text-xl font-bold text-white mt-3">Nombre Usuario</Text>
          <Text className="text-sm text-gray-400">Nombre Completo</Text>
        </View>

        <View className="mt-6 px-6">
          <Text className="text-base text-gray-200">Edad: 22</Text>
          <Text className="text-base text-gray-200">Peso Actual: 70kg</Text>
          <Text className="text-base text-gray-200">Peso Objetivo: 75kg</Text>
        </View>

        <Graphic />

        <DaysTrainning />

        <Text className="text-lg font-bold text-yellow-400 mt-6 mb-2 px-6">
          Grupos Musculares
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {muscleGroups.map((group, i) => (
            <ModalExercise key={i} name={group} img={muscleGroupImages[group]} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

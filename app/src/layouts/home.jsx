import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from "react-native";
import Img1 from "../../../assets/images/ImgAnalysis/f1.jpg";
import Img2 from "../../../assets/images/ImgAnalysis/f2.jpg";
import Img3 from "../../../assets/images/ImgAnalysis/f3.jpg";
import ProfileImage from '../../../assets/images/profile.jpeg';
import useAuth from '../../hook/useAuth';
import ModalAnalysis from '../componets/Analysis/modalAnalysis';
import ModalRoutineHome from '../componets/Routine/modalRoutineHome';

export default function Home() {

  const { auth } = useAuth();
  const nameAnalysis = [
    "Progreso Peso Corporal", 
    "Progreso por Grupo Muscular",
    "Constancia de Entrenamiento"
  ];

  const muscleGroupImages = {
    "Progreso Peso Corporal": Img1,
    "Progreso por Grupo Muscular": Img2,
    "Constancia de Entrenamiento": Img3,
  };

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % nameAnalysis.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
    let today = new Date();
    let birthDate = new Date(auth?.user?.dateOfBirth); 
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }


  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="flex-row items-center justify-between px-6 py-6 mt-14">
        <Image
          source={ProfileImage}
          className="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
        <View className="flex-1 px-4">
          <Text className="text-lg font-bold text-white">{auth?.user?.username}</Text>
          <Text className="text-sm text-gray-400">{auth?.user?.name}</Text>
        </View>
        <Text className="text-base font-semibold text-yellow-400">{age}</Text>
      </View>

      <Text className="text-lg font-bold text-yellow-400 mt-10 mb-4 px-6">
        Análisis
      </Text>

      <View className="flex-row w-full px-6">
        {nameAnalysis.map((group, i) => (
          <ModalAnalysis
            key={i}
            name={group}
            img={muscleGroupImages[group]}
            active={i === activeIndex}
          />
        ))}
      </View>

      <Text className="text-lg font-bold text-yellow-400 mt-10 mb-4 px-48 text-[16px]">
        Rutinas 
      </Text>
    
      <ModalRoutineHome />


    </ScrollView>
  );
}

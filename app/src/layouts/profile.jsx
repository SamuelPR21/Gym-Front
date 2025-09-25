import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { deletePhotoApi, getPhtoByUserApi } from "../../API/photo";
import { AuthContext } from "../../context/authContext";
import useAuth from '../../hook/useAuth';
import DaysTrainning from "../componets/Profile/daysTrainnig";
import Graphic from "../componets/Profile/GraphicWeightUser";
import ModalExercise from "../componets/Profile/modalExcersie";
import ModalUploadImage from "../componets/Profile/uploadImage";


import deleteImage from "../../../assets/Icons/eliminar.png";
import ProfileImage from "../../../assets/Icons/profile.png";
import uploadImage from "../../../assets/Icons/subir.png";
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

  const { auth } = useAuth(AuthContext);
  const [userPhoto, setUserPhoto] = useState(null); 
  const [openModalUpload, setOpenModalUpload] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (!auth?.user?.id) return;
        const photoUrl = await getPhtoByUserApi(auth.user.id);
        setUserPhoto(photoUrl); 
      } catch (error) {
        console.error("Error al obtener la foto del usuario:", error);
      }
    };

    fetchPhoto();
  }, [auth]);

  const handleDeletePhoto = async () => {
    try {
      if (!auth?.user?.id) return;
      await deletePhotoApi(auth.user.id);
      setUserPhoto(null); 
    } catch (error) {
      console.error("Error al eliminar la foto del usuario:", error);
    }
  }


  let today = new Date();
  let birthDate = new Date(auth?.user?.dateOfBirth); 
  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="items-center mt-6">
          <Image
              source={ userPhoto ? { uri: userPhoto } : ProfileImage } 
              className="w-32 h-32 rounded-full border-4 border-yellow-400"
          />
         <View className="flex-row mt-3 space-x-4">
            <TouchableOpacity 
              className="w-12 h-12 bg-yellow-400 rounded-full items-center justify-center"
              onPress={() => setOpenModalUpload(true)}
            >
             
              <Image source={uploadImage} className="w-6 h-6" />
            </TouchableOpacity>
            <ModalUploadImage
              visible={openModalUpload}
              onClose={() => setOpenModalUpload(false)}
              onUploaded={(newPhoto) => setUserPhoto(newPhoto)} 
            />  

            <TouchableOpacity 
              className="w-12 h-12 bg-red-500 rounded-full items-center justify-center"
              onPress={handleDeletePhoto}
            >
              <Image source={deleteImage} className="w-6 h-6" />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-bold text-white mt-3">{auth?.user?.username}</Text>
          <Text className="text-sm text-gray-400">{auth?.user?.name}</Text>
        </View>

        <View className="mt-6 px-6">
          <Text className="text-base text-gray-200">Edad: {age}</Text>
          <Text className="text-base text-gray-200">Peso Actual: {auth?.user?.currentWeights}kg</Text>
          <Text className="text-base text-gray-200">Peso Objetivo: {auth?.user?.goalWeights}kg</Text>
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

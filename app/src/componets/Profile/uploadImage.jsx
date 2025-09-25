import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { uploadPhotoApi } from "../../../API/photo";
import { AuthContext } from "../../../context/authContext";
import useAuth from "../../../hook/useAuth";

export default function UploadImage({ visible, onClose, onUploaded }) {
  const { auth } = useAuth(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if(visible)
      setSelectedImage(null);
  }, [visible]);
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a las fotos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ⚡ usa esto, ya que .MediaTypeOptions está deprecado
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!selectedImage) {
        alert("Por favor selecciona una imagen primero");
        return;
      }

      const response = await uploadPhotoApi(auth?.user?.id, selectedImage);
      onUploaded(response); 
      handleClose(); 
    } catch (err) {
      console.error("❌ Error al subir la imagen:", err);
    }
  };

  
  const handleClose = () => {
    setSelectedImage(null); 
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/70 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 w-80">
          <Text className="text-lg font-bold text-center mb-4">
            Subir nueva foto
          </Text>

          {selectedImage ? (
            <Image
              source={{ uri: selectedImage.uri }}
              className="w-40 h-40 self-center rounded-full mb-4"
            />
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              className="bg-gray-200 p-4 rounded-lg"
            >
              <Text className="text-center text-gray-700">
                Seleccionar de galería
              </Text>
            </TouchableOpacity>
          )}

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={handleClose}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!selectedImage}
              onPress={handleUploadImage}
              className={`px-4 py-2 rounded-lg ${
                selectedImage ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <Text className="text-white">Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}


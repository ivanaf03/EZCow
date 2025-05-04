import React from "react";

import { View, Text, Alert, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import CryptoJS from "crypto-js";

import CustomButton from "../../../components/basic/custom-button";
import CustomInput from "../../../components/basic/custom-input";
import CustomPasswordInput from "../../../components/basic/custom-password-input";
import { closeDatabase, getDatabase } from "../../../model/bd";
import TabTitle from "../../../components/tabs/tab-title";
import CustomTextDiv from "../../../components/basic/custom-text-div";
import CustomFormDiv from "../../../components/basic/custom-form-div";

const SERVER_URL = "http://192.168.1.29:2345";

const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

const DownloadDatabase = () => {
  const [formData, setFormData] = React.useState({
    deviceName: "",
    password: "",
  });

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownloadDatabase = async () => {

    if (!formData.deviceName || !formData.password) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    } 

    try {
      const fileUri = FileSystem.documentDirectory + "SQLite/ezcow.db";
      const tempUri = FileSystem.documentDirectory + "SQLite/temp_ezcow.db";

      const hashedPassword = hashPassword(formData.password);

      const response = await fetch(`${SERVER_URL}/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceName: formData.deviceName, password: hashedPassword }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.error ||
            "Error desconocido al descargar la base de datos"
        );
      }

      const fileData = await response.blob();
      const reader = new FileReader();

      reader.onload = async () => {
        const base64Data = reader.result.split(",")[1];
        await FileSystem.writeAsStringAsync(tempUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        closeDatabase();

        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(fileUri, { idempotent: true });
        }

        await FileSystem.moveAsync({
          from: tempUri,
          to: fileUri,
        });

        getDatabase();

        Alert.alert(
          "Éxito",
          "Base de datos descargada y reemplazada correctamente."
        );
      };

      reader.readAsDataURL(fileData);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Cargar base de datos del servidor" />
      <View className="flex items-center mt-8">
        <View className="w-[90%]">
          <CustomTextDiv>
            <Text className="text-c_white text-2xl font-Nunito_Medium">
              ◆ Cómo funciona la descarga?
            </Text>
            <Text className="mt-2 text-c_white text-md font-Nunito_Italic">
              Si tienes una copia de seguridad de tu base de datos subida al
              servidor, puedes introducir el nombre de dispositivo que usaste
              para subirla y la contraseña asociada. Recuerda, si descargas la
              base de datos, perderás tus datos a menos que hayas guardado una
              copia en el servidor.
            </Text>
          </CustomTextDiv>
        </View>
      </View>
      <View className="mt-8 px-4">
        <CustomFormDiv>
          <View>
            <CustomInput
              text="Nombre del dispositivo"
              placeholder="Nombre del dispositivo"
              value={formData.deviceName}
              onChangeText={handleChange("deviceName")}
            />
          </View>
          <View>
            <CustomPasswordInput
              text="Contraseña"
              placeholder="Contraseña"
              value={formData.password}
              onChangeText={handleChange("password")}
            />
          </View>
          <View>
            <CustomButton
              text="Descargar base de datos"
              onPress={handleDownloadDatabase}
              buttonTestID={"download-database-button"}
            />
          </View>
        </CustomFormDiv>
      </View>
    </ScrollView>
  );
};

export default DownloadDatabase;

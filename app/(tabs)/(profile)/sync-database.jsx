import React from "react";

import { View, Text, Alert, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import CryptoJS from "crypto-js";

import CustomButton from "../../../components/basic/custom-button";
import CustomInput from "../../../components/basic/custom-input";
import CustomPasswordInput from "../../../components/basic/custom-password-input";
import { closeDatabase, syncDatabase, getDatabase } from "../../../model/bd";
import TabTitle from "../../../components/tabs/tab-title";
import CustomTextDiv from "../../../components/basic/custom-text-div";
import CustomFormDiv from "../../../components/basic/custom-form-div";

const SERVER_URL = "http://192.168.1.29:2345";

const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

const SyncDatabase = () => {
  const [formData, setFormData] = React.useState({
    deviceName: "",
    password: "",
  });

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const dbPath = FileSystem.documentDirectory + "SQLite/ezcow.db";

  const handleUploadDatabase = async () => {

    if (!formData.deviceName || !formData.password) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      syncDatabase();
      closeDatabase();

      const fileInfo = await FileSystem.getInfoAsync(dbPath);
      if (!fileInfo.exists) {
        Alert.alert("Error", "No se encontró la base de datos local.");
        return;
      }

      const hashedPassword = hashPassword(formData.password);

      const fileUri = fileInfo.uri;
      const data = new FormData();
      data.append("deviceName", formData.deviceName);
      data.append("password", hashedPassword);
      data.append("file", {
        uri: fileUri,
        name: "ezcow.db",
        type: "application/octet-stream",
      });

      const response = await fetch(`${SERVER_URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Error desconocido");

      getDatabase();

      Alert.alert("Éxito", result.message);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Sincronizar base de datos" />
      <View className="flex items-center mt-8">
        <View className="w-[90%]">
          <CustomTextDiv>
            <Text className="text-c_white text-2xl font-Nunito_Medium">
              ◆ Cómo funciona la sincronización?
            </Text>
            <Text className="mt-2 text-c_white text-md font-Nunito_Italic">
              Si tienes una copia de seguridad de tu base de datos subida al servidor,
              puedes introducir el nombre de dispositivo que usaste para subirla
              y la contraseña asociada para actualizarla. También puedes utilizar un nuevo
              nombre de dispositivo y contraseña para guardar otra copia diferente.
              En cualquier caso, recuerda tus datos para poder recuperar tus
              copias de seguridad en un futuro.
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
              text="Guardar copia de seguridad"
              onPress={handleUploadDatabase}
              buttonTestID={"sync-database-button"}
            />
          </View>
        </CustomFormDiv>
      </View>
    </ScrollView>
  );
};

export default SyncDatabase;

import React from "react";

import { View, Text, ScrollView, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";

import CustomButton from "../../../components/basic/custom-button";
import CustomInput from "../../../components/basic/custom-input";
import CustomPasswordInput from "../../../components/basic/custom-password-input";
import icons from "../../../constants/icons";
import { changePassword } from "../../model/users";
import { useUser } from "../../../hooks/providers/user-provider";
import TabTitle from "../../../components/tabs/tab-title";
import CustomTextDiv from "../../../components/basic/custom-text-div";
import CustomFormDiv from "../../../components/basic/custom-form-div";

const ChangePassword = () => {
  const [formData, setFormData] = React.useState({
    actualPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const { user, login } = useUser();

  const handleChangePassword = async () => {
    if (user.password === null) {
      Alert.alert(
        "Error",
        "Solo podrás cambiar la contraseña si no has iniciado sesión con Google."
      );
      return;
    }

    if (
      !formData.actualPassword ||
      !formData.newPassword ||
      !formData.confirmNewPassword
    ) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    if (formData.newPassword.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (formData.actualPassword === formData.newPassword) {
      Alert.alert(
        "Error",
        "La nueva contraseña debe ser diferente a la actual."
      );
      return;
    }

    if (formData.actualPassword !== user.password) {
      Alert.alert("Error", "La contraseña actual no es correcta.");
      return;
    }

    try {
      await changePassword(user.email, formData.newPassword);
      login({ ...user, password: formData.newPassword });
      router.replace("profile");
    } catch (error) {
      Alert.alert(
        "Error",
        "Error al cambiar la contraseña. Inténtalo de nuevo."
      );
    }
  };

  return (
    <ScrollView className=" bg-c_dark_gray">
      <TabTitle text="Cambiar contraseña" />
      <View className="flex items-center mt-8">
        <View className="w-[90%]">
          <CustomTextDiv>
            <FontAwesomeIcon
              icon={icons.faTriangleExclamation}
              size={36}
              color="white"
            />
            <Text className="p-2 text-c_white text-center text-lg font-Nunito_Medium">
              Atención! Solo podrás cambiar la contraseña si no has iniciado
              sesión con Google
            </Text>
          </CustomTextDiv>
        </View>
      </View>
      <View className="mt-8 px-4">
        <CustomFormDiv>
          <View>
            <CustomInput
              text="Contraseña actual"
              placeholder="Contraseña actual"
              onChangeText={handleChange("actualPassword")}
            />
          </View>
          <View>
            <CustomPasswordInput
              text="Nueva contraseña"
              placeholder="Nueva contraseña"
              onChangeText={handleChange("newPassword")}
            />
          </View>
          <View>
            <CustomPasswordInput
              text="Confirmar nueva contraseña"
              placeholder="Confirmar nueva contraseña"
              onChangeText={handleChange("confirmNewPassword")}
            />
          </View>
          <View>
            <CustomButton
              text="Cambiar contraseña"
              onPress={handleChangePassword}
              buttonTestID="change-password-button"
            />
          </View>
        </CustomFormDiv>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

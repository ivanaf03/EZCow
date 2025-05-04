import React from "react";

import { Text, View, Alert, ScrollView } from "react-native";
import { router } from "expo-router";

import CustomInput from "../../components/basic/custom-input";
import CustomPasswordInput from "../../components/basic/custom-password-input";
import CustomButton from "../../components/basic/custom-button";
import CustomLink from "../../components/basic/custom-link";
import { insertUser, getUserByEmail } from "../../model/users";
import { useUser } from "../../store/user-provider";
import CustomAuthTitle from "../../components/auth/custom-auth-title";

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useUser();

  const checkPasswords = () => {
    return formData.password === formData.confirmPassword;
  };

  const checkPasswordLength = () => {
    return formData.password.length >= 8;
  };

  const checkEmail = () => {
    return formData.email.includes("@") && formData.email.includes(".");
  };

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return;
    }

    if (!checkEmail()) {
      Alert.alert("Error", "El email no es válido.");
      return;
    }

    if (!checkPasswordLength()) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!checkPasswords()) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      await insertUser(formData.name, formData.email, formData.password);
      const user = await getUserByEmail(formData.email);
      login({
        id: user.id,
        name: formData.name,
        password: formData.password,
        email: formData.email,
      });
      router.replace("livestock");
    } catch (error) {
      Alert.alert(
        "Error",
        "Error al registrar. Inténtalo de nuevo. Asegúrate de que no tengas ya una cuenta."
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <CustomAuthTitle text="Registrarse" />
      <View className="mx-4 border-l-2 border-r-2 border-c_light_blue rounded-2xl p-4">
        <View className="ml-2">
          <View className="w-full">
            <CustomInput
              text="Nombre de usuario"
              placeholder="Nombre"
              onChangeText={handleChange("name")}
            />
          </View>
          <View className="mt-10 w-full">
            <CustomInput
              text="Email"
              placeholder="Email"
              onChangeText={handleChange("email")}
            />
          </View>
          <View className="mt-10 w-full">
            <CustomPasswordInput
              text="Contraseña"
              placeholder="Contraseña"
              onChangeText={handleChange("password")}
            />
          </View>
          <View className="mt-10 w-full">
            <CustomPasswordInput
              text="Confirmar contraseña"
              placeholder="Contraseña"
              onChangeText={handleChange("confirmPassword")}
            />
          </View>
        </View>
        <View className="flex-row justify-center mt-12">
          <View className="w-[90%]">
            <CustomButton
              text="Registrarse"
              onPress={handleRegister}
              buttonTestID={"sign-up-button"}
            />
          </View>
        </View>
      </View>
      <View className="mt-8 w-full mb-14 flex-row justify-center items-center">
        <Text className="text-c_white text-xl font-Nunito_Medium text-center mr-2">
          Ya tienes una cuenta?
        </Text>
        <CustomLink
          text="Iniciar sesión"
          to="login"
          linkTestID={"sign-in-link"}
        />
      </View>
    </ScrollView>
  );
};

export default Register;

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
import {
  checkPasswords,
  checkPasswordLength,
  checkEmail,
} from "../../utils/form-checkers";
import CustomFormDiv from "../../components/basic/custom-form-div";
import CustomAuthNavigationLink from "../../components/auth/custom-auth-navigation-link";

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useUser();

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

    if (!checkEmail(formData.email)) {
      Alert.alert("Error", "El email no es válido.");
      return;
    }

    if (!checkPasswordLength(formData.password)) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!checkPasswords(formData.password, formData.confirmPassword)) {
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
      <View className="mt-8 px-4">
        <CustomFormDiv>
          <View>
            <CustomInput
              text="Nombre de usuario"
              placeholder="Nombre"
              onChangeText={handleChange("name")}
            />
          </View>
          <View>
            <CustomInput
              text="Email"
              placeholder="Email"
              onChangeText={handleChange("email")}
            />
          </View>
          <View>
            <CustomPasswordInput
              text="Contraseña"
              placeholder="Contraseña"
              onChangeText={handleChange("password")}
            />
          </View>
          <View>
            <CustomPasswordInput
              text="Confirmar contraseña"
              placeholder="Contraseña"
              onChangeText={handleChange("confirmPassword")}
            />
          </View>
          <View>
            <CustomButton
              text="Registarse"
              onPress={handleRegister}
              buttonTestID="sign-up-button"
            />
          </View>
        </CustomFormDiv>
      </View>
      <CustomAuthNavigationLink
        text="¿Ya tienes una cuenta?"
        linkText="Iniciar sesión"
        to="login"
        testID="sign-in-link"
      />
    </ScrollView>
  );
};

export default Register;

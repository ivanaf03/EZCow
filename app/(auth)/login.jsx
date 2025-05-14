import React from "react";

import { Text, View, Alert, ScrollView } from "react-native";
import { router } from "expo-router";
import CryptoJS from "crypto-js";
import * as Google from "expo-auth-session/providers/google";
import { jwtDecode } from "jwt-decode";

import CustomInput from "../../components/basic/custom-input";
import CustomGoogleButton from "../../components/auth/custom-google-button";
import CustomPasswordInput from "../../components/basic/custom-password-input";
import CustomButton from "../../components/basic/custom-button";
import CustomAuthNavigationLink from "../../components/auth/custom-auth-navigation-link";
import { getUserByEmail, insertUserGoogle } from "../../model/users";
import { useUser } from "../../store/user-provider";
import CustomAuthTitle from "../../components/auth/custom-auth-title";
import CustomFormDiv from "../../components/basic/custom-form-div";
import { checkPasswordLength, checkEmail } from "../../utils/form-checkers";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { login } = useUser();

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: undefined,
  });

  React.useEffect(() => {
    const handleGoogleLogin = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const decodedToken = jwtDecode(id_token);

        const name = decodedToken.name;
        const email = decodedToken.email;
        const googleId = decodedToken.sub;

        await insertUserGoogle(name, email, googleId);

        const user = await getUserByEmail(email);
        login({
          id: user.id,
          name: user.name,
          password: null,
          email: user.email,
        });
        router.replace("livestock");
      }
    };

    handleGoogleLogin();
  }, [response]);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
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

    try {
      const result = await getUserByEmail(formData.email);
      if (CryptoJS.SHA256(formData.password).toString() === result.password) {
        const userId = result.id;
        login({
          id: userId,
          name: result.name,
          password: formData.password,
          email: result.email,
        });
        router.replace("livestock");
      } else {
        Alert.alert("Error", "Contraseña incorrecta.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        error.message
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <CustomAuthTitle text="Iniciar sesión" />
      <View className="mt-8 px-4">
        <CustomFormDiv>
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
            <CustomButton
              text="Iniciar sesión"
              onPress={handleLogin}
              buttonTestID="sign-in-button"
            />
          </View>
          <View className="pt-10">
            <Text className=" text-c_white text-lg font-Nunito_Medium">
              O si prefieres, puedes iniciar sesión con Google:
            </Text>
            <View className="mt-6">
              <CustomGoogleButton
                text="Continuar con Google"
                onPress={() => promptAsync().catch((e) => console.log(e))}
                buttonTestID="sign-in-google-button"
              />
            </View>
          </View>
        </CustomFormDiv>
      </View>
      <CustomAuthNavigationLink
        text="Todavía no tienes una cuenta?"
        linkText="Registarse"
        to="register"
        testID="sign-up-link"
      />
    </ScrollView>
  );
};

export default Login;

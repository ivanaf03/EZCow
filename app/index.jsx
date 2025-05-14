import React from "react";

import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import CustomButton from "../components/basic/custom-button";

const App = () => {
  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray items-center">
      <Text className="mt-10 pt-8 text-c_white text-8xl font-Nunito_BlackItalic">
        EZCow
      </Text>
      <Text className="text-c_white text-2xl font-Nunito_LightItalic">
        Tu aplicación de gestión de ganado
      </Text>
      <Image
        source={require("../assets/images/logo.png")}
        className="w-96 h-96"
        testID="app-logo"
      />
      <View className="w-[75%] space-y-4">
        <View>
          <CustomButton
            text="Iniciar sesión"
            onPress={() => router.replace("login")}
          />
        </View>
        <View>
          <CustomButton
            text="Registrarse"
            onPress={() => router.replace("register")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

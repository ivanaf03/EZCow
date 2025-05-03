import React from "react";

import { Text, View, ActivityIndicator } from "react-native";
import CustomTextDiv from "../../components/basic/custom-text-div";

const OauthRedirect = () => {
  return (
    <View className="flex-1 bg-c_dark_gray justify-center items-center">
      <View className="[w-90%] space-y-8">
        <CustomTextDiv>
          <Text className="text-c_white text-2xl font-Nunito_MediumItalic">
            Iniciando sesión... Esto puede tardar unos segundos
          </Text>
        </CustomTextDiv>
        <ActivityIndicator size="large" color="c_light_blue" />
      </View>
    </View>
  );
};

export default OauthRedirect;

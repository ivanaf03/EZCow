import React from "react";

import { Text, View, ScrollView, Image } from "react-native";

import { useUser } from "../../../hooks/providers/user-provider";
import CustomPasswordView from "../../../components/basic/custom-password-view";
import TabTitle from "../../../components/tabs/tab-title";
import CustomTextDiv from "../../../components/basic/custom-text-div";

const Profile = () => {
  const { user } = useUser();

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Perfil" />
      <View className="flex items-center mt-8">
        <Image
          source={require("../../../assets/images/farmer-profile.png")}
          className="w-64 h-64"
          testID="app-logo"
        />
        <View className="mt-8 w-[90%]">
          <CustomTextDiv>
            <Text className="text-c_white text-2xl font-Nunito_Medium">
              {user.name}
            </Text>
            <Text className="mt-2 text-c_white text-sm font-Nunito_Italic">
              {user.email}
            </Text>
            <View className="mt-10 w-full">
              {user.password && (
                <CustomPasswordView
                  text="Ver contraseña"
                  value={user.password}
                />
              )}
            </View>
          </CustomTextDiv>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

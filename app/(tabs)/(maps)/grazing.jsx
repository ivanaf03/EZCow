import React from "react";

import { View, SafeAreaView } from "react-native";
import { router } from "expo-router";

import CustomButton from "../../../components/basic/custom-button";
import TabTitle from "../../../components/tabs/tab-title";

const Grazing = () => {
  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Ver pastoreo" />

      <View className="mx-4 mt-4 space-y-2">
        <View>
          <CustomButton
            text="Añadir al pastoreo"
            onPress={() => router.replace("grazing-form")}
            buttonTestID="grazing-form-button"
          />
        </View>
        <View className="flex-row items-center">
          <View className="w-[50%] pr-2">
            <CustomButton
              text="Ver ubicaciones"
              onPress={() => router.replace("fields")}
              buttonTestID={"fields-button"}
            />
          </View>
          <View className="w-[50%] pl-2">
            <CustomButton
              text="Ver parcelas"
              onPress={() => router.replace("cadastral-fields")}
              buttonTestID={"cadastral-fields-button"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Grazing;

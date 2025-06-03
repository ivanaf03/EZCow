import React from "react";

import { View, SafeAreaView, Text, FlatList } from "react-native";
import { router } from "expo-router";

import CustomButton from "../../../components/basic/custom-button";
import TabTitle from "../../../components/tabs/tab-title";
import { useUser } from "../../../store/user-provider";
import {
  getExitedGrazingByuserId,
  getGrazingByuserId,
  expireGrazing,
} from "../../../model/grazing";
import GrazingCard from "./grazing-card";

const Grazing = () => {
  const [grazing, setGrazing] = React.useState([]);
  const [exitedGrazing, setExitedGrazing] = React.useState([]);

  const { user } = useUser();

  React.useEffect(() => {
    loadGrazing();
    loadExitedGrazing();
  }, []);

  const loadGrazing = async () => {
    const res = await getGrazingByuserId(user.id);
    setGrazing(res);
  };

  const loadExitedGrazing = async () => {
    const res = await getExitedGrazingByuserId(user.id);
    setExitedGrazing(res);
  };

  const deleteGrazing = async (grazing) => {
    await expireGrazing(grazing.grazingId);
    await loadGrazing();
    await loadExitedGrazing();
  };

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
      <View className="flex-1">
        <View className="h-[50%]">
          <Text className="py-2 mx-2 font-Nunito_SemiBold text-c_white text-2xl border-b-2 border-c_white">
            Pastoreo actual
          </Text>
          <View>
            <FlatList
              data={grazing}
              keyExtractor={(item) => item.grazingId}
              renderItem={({ item }) => (
                <GrazingCard
                  grazing={item}
                  onDelete={deleteGrazing}
                  isExited={false}
                />
              )}
              showsVerticalScrollIndicator={true}
            />
          </View>
        </View>
        <View className="mt-12 pb-12 h-[40%]">
          <Text className="py-2 mx-2 font-Nunito_SemiBold text-c_white text-2xl border-b-2 border-c_white">
            Histórico
          </Text>
          <View className>
            <FlatList
              data={exitedGrazing}
              keyExtractor={(item) => item.grazingId}
              renderItem={({ item }) => (
                <GrazingCard
                  grazing={item}
                  onDelete={deleteGrazing}
                  isExited={true}
                />
              )}
              showsVerticalScrollIndicator={true}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Grazing;

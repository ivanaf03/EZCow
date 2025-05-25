import React from "react";

import { View, ScrollView, Alert } from "react-native";
import { router } from "expo-router";

import CustomInput from "../../../components/basic/custom-input";
import CustomButton from "../../../components/basic/custom-button";
import { insertGroup } from "../../../model/grazing";
import icons from "../../../constants/icons";
import CustomFormDiv from "../../../components/basic/custom-form-div";
import TabTitle from "../../../components/tabs/tab-title";
import CustomPressable from "../../../components/basic/custom-pressable";

const GroupForm = () => {
  const [formData, setFormData] = React.useState({
    name: "",
  });

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddGroup = async () => {
    try {
      if (!formData.name) {
        Alert.alert("Error", "Por favor, rellena todos los campos.");
        return;
      }

      await insertGroup(formData.name);

      router.replace("livestock");
    } catch (error) {
      Alert.alert("Error", "Error al añadir el grupo. Inténtalo de nuevo.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Añadir vacas" />
      <View className="items-center">
        <View className="mx-4 mt-4 w-[75%]">
          <CustomButton
            text="Ver censo"
            onPress={() => router.replace("livestock")}
            buttonTestID="livestock-button"
          />
        </View>
      </View>
      <View className="mt-4 px-4">
        <CustomFormDiv>
          <View>
            <CustomInput
              text="Nombre de grupo"
              placeholder="Nombre"
              onChangeText={handleChange("name")}
            />
          </View>
          <View>
            <CustomPressable
              text="Añadir"
              onPress={handleAddGroup}
              buttonTestID="handle-add-group-button"
              icon={icons.faPlus}
            />
          </View>
        </CustomFormDiv>
      </View>
    </ScrollView>
  );
};

export default GroupForm;

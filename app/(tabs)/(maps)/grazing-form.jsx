import React from "react";

import { View, SafeAreaView, Alert } from "react-native";
import { router } from "expo-router";

import CustomButton from "../../../components/basic/custom-button";
import TabTitle from "../../../components/tabs/tab-title";
import CustomFormDiv from "../../../components/basic/custom-form-div";
import CustomPicker from "../../../components/basic/custom-picker";
import { useUser } from "../../../store/user-provider";
import {
  getGroupNames,
  getFieldNames,
  insertGrazing,
  getFieldIdByName,
  getGroupIdByName,
} from "../../../model/grazing";
import CustomPressable from "../../../components/basic/custom-pressable";
import icons from "../../../constants/icons";

const GrazingForm = () => {
  const [groupNames, setGroupNames] = React.useState([]);
  const [fieldNames, setFieldNames] = React.useState([]);
  const [formData, setFormData] = React.useState({
    groupName: null,
    fieldName: null,
  });

  const { user } = useUser();

  React.useEffect(() => {
    loadGroupNames();
    loadFieldNames();
  }, []);

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const loadGroupNames = async () => {
    const res = await getGroupNames(user.id);
    setGroupNames(res);
  };

  const loadFieldNames = async () => {
    const res = await getFieldNames(user.id);
    setFieldNames(res);
  };

  const handleAddGrazing = async () => {
    if (!formData.groupName || !formData.fieldName) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return;
    }

    const groupId = await getGroupIdByName(formData.groupName);
    const fieldId = await getFieldIdByName(formData.fieldName);

    await insertGrazing(fieldId, groupId);

    router.replace("grazing");
  };

  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Crear grupo" />
      <View className="items-center">
        <View className="mx-4 mt-4 w-[75%]">
          <CustomButton
            text="Ver pastoreo"
            onPress={() => router.replace("grazing")}
            buttonTestID="grazing-button"
          />
        </View>
      </View>
      <View className="flex-1 mt-4 mx-2">
        <CustomFormDiv>
          <View>
            <CustomPicker
              text="Grupos"
              value={formData.groupName}
              onValueChange={handleChange("groupName")}
              options={groupNames}
              pickerTestID="group-picker"
            />
          </View>
          <View>
            <CustomPicker
              text="Fincas"
              value={formData.fieldName}
              onValueChange={handleChange("fieldName")}
              options={fieldNames}
              pickerTestID="field-picker"
            />
          </View>
          <View className="my-8">
            <CustomPressable
              text="Añadir"
              onPress={handleAddGrazing}
              buttonTestID="handle-add-grazing-button"
              icon={icons.faPlus}
            />
          </View>
        </CustomFormDiv>
      </View>
    </SafeAreaView>
  );
};

export default GrazingForm;

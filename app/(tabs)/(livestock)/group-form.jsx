import React from "react";

import { View, Alert, Text, FlatList } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import CustomInput from "../../../components/basic/custom-input";
import CustomButton from "../../../components/basic/custom-button";
import icons from "../../../constants/icons";
import CustomFormDiv from "../../../components/basic/custom-form-div";
import TabTitle from "../../../components/tabs/tab-title";
import CustomPressable from "../../../components/basic/custom-pressable";
import CustomPicker from "../../../components/basic/custom-picker";
import { useUser } from "../../../store/user-provider";
import { getAvailableCodeByUserId, getCowIdByCode } from "../../../model/cow";
import {
  insertGroup,
  insertCowInGroup,
  getGroupIdByName,
} from "../../../model/grazing";


const GroupForm = () => {
  const [cowCodes, setCowCodes] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
  });
  const [selectedCode, setSelectedCode] = React.useState(null);
  const [selectedCodes, setSelectedCodes] = React.useState([]);
  const [selectedCowIds, setSelectedCowIds] = React.useState([]);

  const { user } = useUser();

  React.useEffect(() => {
    loadCowCodes();
  }, []);

  const loadCowCodes = async () => {
    const cowCodes = await getAvailableCodeByUserId(user.id);
    setCowCodes(cowCodes);
  };

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddCow = async () => {
    if (!selectedCode) {
      Alert.alert("Error", "Selecciona una vaca para añadir.");
      return;
    }

    if (selectedCodes.includes(selectedCode)) {
      Alert.alert("Error", "Esta vaca ya ha sido añadida.");
      return;
    }

    const cowId = await getCowIdByCode(selectedCode);

    setSelectedCodes((prev) => [...prev, selectedCode]);
    setSelectedCowIds((prev) => [...prev, cowId]);
  };

  const handleAddGroup = async () => {
    try {
      if (!formData.name) {
        Alert.alert("Error", "Por favor, rellena todos los campos.");
        return;
      }

      if (selectedCodes.length === 0) {
        Alert.alert("Error", "Por favor, añade al menos una vaca.");
        return;
      }

      await insertGroup(formData.name);

      const groupId = await getGroupIdByName(formData.name);

      for (const id of selectedCowIds) {
        await insertCowInGroup(id, groupId);
      }

      router.replace("livestock");
    } catch (error) {
      Alert.alert("Error", "Error al añadir el grupo. Inténtalo de nuevo.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Crear grupo" />
      <View className="items-center">
        <View className="mx-4 mt-4 w-[75%]">
          <CustomButton
            text="Ver censo"
            onPress={() => router.replace("livestock")}
            buttonTestID="livestock-button"
          />
        </View>
      </View>
      <View className="mt-12 px-4 flex-1">
        <CustomFormDiv>
          <CustomInput
            text="Nombre de grupo"
            placeholder="Nombre"
            onChangeText={handleChange("name")}
          />
        </CustomFormDiv>
        <View className="mt-4 flex-row items-center justify-center space-x-2">
          <View className="w-[50%]">
            <CustomPicker
              text="Vacas"
              value={selectedCode}
              onValueChange={setSelectedCode}
              options={cowCodes}
              pickerTestID="cow-picker"
            />
          </View>
          <View className="mt-4">
            <CustomPressable
              text="Añadir vaca"
              onPress={handleAddCow}
              buttonTestID="add-cow-button"
              icon={icons.faPlus}
            />
          </View>
        </View>
        <View className="my-8">
          <CustomPressable
            text="Añadir grupo"
            onPress={handleAddGroup}
            buttonTestID="handle-add-group-button"
            icon={icons.faPlus}
          />
        </View>
        <FlatList
          data={selectedCodes}
          keyExtractor={(item) => item}
          numColumns={2}
          renderItem={({ item }) => (
            <View className="w-[50%] flex-row justify-center items-center my-2">
              <Text className="text-c_white text-center text-xl font-Nunito_Medium">
                <FontAwesomeIcon icon={icons.faCow} size={50} color="white" />{" "}
                {item}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default GroupForm;

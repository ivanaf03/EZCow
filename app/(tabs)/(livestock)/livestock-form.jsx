import React from "react";

import { View, ScrollView, Alert, Text } from "react-native";
import { router } from "expo-router";

import CustomInput from "../../../components/basic/custom-input";
import CustomCalendar from "../../../components/basic/custom-calendar";
import { useUser } from "../../../store/user-provider";
import CustomButton from "../../../components/basic/custom-button";
import {
  insertCow,
  getAvailableCowCodeByUserId,
  getCowIdByCode,
} from "../../../model/cow";
import CustomPicker from "../../../components/basic/custom-picker";
import icons from "../../../constants/icons";
import CustomFormDiv from "../../../components/basic/custom-form-div";
import TabTitle from "../../../components/tabs/tab-title";
import CustomPressable from "../../../components/basic/custom-pressable";

const LivestockForm = () => {
  const [formData, setFormData] = React.useState({
    code: "",
    name: "",
    entryDate: new Date(),
    gender: "Masculino",
    breed: "",
    phase: "Ternero",
    mother: "",
  });
  const [mothers, setMothers] = React.useState([]);

  const { user } = useUser();

  React.useEffect(() => {
    loadCowCodes();
  }, []);

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const checkEntryDate = () => {
    return formData.entryDate > new Date();
  };

  const loadCowCodes = async () => {
    const cowCodes = await getAvailableCowCodeByUserId(user.id);
    setMothers(["Desconocida", ...(cowCodes || [])]);
  };

  const handleAddCow = async () => {
    try {
      if (
        !formData.code ||
        !formData.name ||
        !formData.entryDate ||
        !formData.gender ||
        !formData.breed
      ) {
        Alert.alert("Error", "Por favor, rellena todos los campos.");
        return;
      }

      if (checkEntryDate()) {
        Alert.alert(
          "Error",
          "La fecha de incorporación no puede ser después de hoy."
        );
        return;
      }

      const cowId =
        formData.mother === "Desconocida"
          ? null
          : await getCowIdByCode(formData.mother);
      const formattedEntryDate = new Date(formData.entryDate)
        .toISOString()
        .split("T")[0];
      await insertCow(
        formData.code,
        formData.name,
        formattedEntryDate,
        formData.gender,
        formData.breed,
        formData.phase,
        user.id,
        cowId
      );

      loadCowCodes();

      router.replace("livestock");
    } catch (error) {
      Alert.alert("Error", "Error al añadir el animal. Inténtalo de nuevo.");
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
              text="Código de chapa"
              placeholder="Código"
              onChangeText={handleChange("code")}
            />
          </View>
          <View>
            <CustomInput
              text="Nombre de vaca"
              placeholder="Nombre"
              onChangeText={handleChange("name")}
            />
          </View>
          <View>
            <CustomCalendar
              text="Fecha de incorporación"
              date={formData.entryDate}
              onChange={handleChange("entryDate")}
            />
          </View>
          <View>
            <CustomPicker
              text="Género"
              value={formData.gender}
              onValueChange={handleChange("gender")}
              options={["Masculino", "Femenino"]}
              pickerTestID="gender-picker"
            />
          </View>
          <View>
            <CustomPicker
              text="Fase"
              value={formData.phase}
              onValueChange={handleChange("phase")}
              options={["Ternero", "Adulto"]}
              pickerTestID="phase-picker"
            />
          </View>
          <View>
            <CustomInput
              text="Raza"
              placeholder="Raza"
              onChangeText={handleChange("breed")}
            />
          </View>
          <View>
            <CustomPicker
              text="Madre"
              value={formData.mother}
              onValueChange={handleChange("mother")}
              options={mothers}
              pickerTestID="mother-picker"
            />
            <Text className="mt-2 text-c_white px-4 text-sm font-Nunito_LightItalic">
              Marcar como desconocida si el animal proviene de otra explotación
              o si la madre no está registrada en la explotación.
            </Text>
          </View>
          <View>
            <CustomPressable
              text="Añadir"
              onPress={handleAddCow}
              buttonTestID="handle-add-cow-button"
              icon={icons.faPlus}
            />
          </View>
        </CustomFormDiv>
      </View>
    </ScrollView>
  );
};

export default LivestockForm;

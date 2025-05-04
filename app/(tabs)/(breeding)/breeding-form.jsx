import React from "react";

import { View, ScrollView } from "react-native";
import { router } from "expo-router";

import CustomInput from "../../../components/basic/custom-input";
import CustomCalendar from "../../../components/basic/custom-calendar";
import CustomButton from "../../../components/basic/custom-button";
import { insertBreedingEvent } from "../../../model/breeding-events";
import CustomPicker from "../../../components/basic/custom-picker";
import CustomFormDiv from "../../../components/basic/custom-form-div";
import TabTitle from "../../../components/tabs/tab-title";
import {
  getAllCowIdsAndNamesAvailableByUserId,
} from "../../../model/cow";
import { useUser } from "../../../store/user-provider";

const BreedingForm = () => {
  const [formData, setFormData] = React.useState({
    cowName: "",
    eventName: "Celo",
    description: "",
    date: new Date(),
  });

  const [cowNames, setCowNames] = React.useState([{ id: "", name: "" }]);

  const { user } = useUser();

  React.useEffect(() => {
    loadCowNames();
  }, []);

  const loadCowNames = async () => {
    const names = await getAllCowIdsAndNamesAvailableByUserId(user.id);
    setCowNames(names);
  };

  const handleChange = (key) => async (value) => {
    if (key === "cowName") {
      const id = cowNames.find((cow) => cow.name === value).id;
      setFormData((prev) => ({ ...prev, [key]: id }));
    } else {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleAddBreedingEvent = async () => {
    const { cowName, eventName, description, date } = formData;
    const formattedDate = date.toISOString().split("T")[0];
    await insertBreedingEvent(cowName, eventName, description, formattedDate);
    router.replace("breeding");
  };

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Añadir evento de reproducción" />
      <View className="items-center">
        <View className="mx-4 mt-4 w-[75%]">
          <CustomButton
            text="Ver calendario de reproducción"
            onPress={() => router.replace("breeding")}
            buttonTestID="breeding-button"
          />
        </View>
      </View>
      <View className="mt-4 px-4">
        <CustomFormDiv>
          <View>
            <CustomPicker
              text="Nombre de la vaca"
              value={formData.cowName}
              onValueChange={handleChange("cowName")}
              options={cowNames.map((cow) => cow.name)}
            />
          </View>
          <View>
            <CustomPicker
              text="Tipo de evento"
              value={formData.eventName}
              onValueChange={handleChange("eventName")}
              options={[
                "Celo",
                "Inseminación",
                "Parto previsto",
                "Aborto",
                "Nacimiento hembra",
                "Nacimiento macho",
                "Cría muerta",
                "Parto distópico",
                "Aviso de secado",
                "Ojo al celo",
                "Vaca vacía",
                "Vaca dudosa",
                "Vaca dudosa (positivo)",
                "Vaca sucia",
                "Lavado",
                "Retención de placenta",
              ]}
            />
          </View>
          <View>
            <CustomInput
              text="Descripción"
              placeholder="Descripción"
              onChangeText={handleChange("description")}
            />
          </View>
          <View>
            <CustomCalendar
              text="Fecha"
              date={formData.date}
              onChange={handleChange("date")}
            />
          </View>
          <View>
            <CustomButton
              text="Añadir"
              onPress={handleAddBreedingEvent}
              buttonTestID="handle-add-breed-button"
            />
          </View>
        </CustomFormDiv>
      </View>
    </ScrollView>
  );
};

export default BreedingForm;

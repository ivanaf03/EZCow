import React from "react";

import { View, ScrollView } from "react-native";
import { router } from "expo-router";

import CustomInput from "../../../components/basic/custom-input";
import CustomCalendar from "../../../components/basic/custom-calendar";
import CustomButton from "../../../components/basic/custom-button";
import { insertHealthEvent } from "../../model/health-events";
import CustomPicker from "../../../components/basic/custom-picker";
import CustomFormDiv from "../../../components/basic/custom-form-div";
import TabTitle from "../../../components/tabs/tab-title";
import {
  getAllCowIdsAndNamesAvailableByUserId,
} from "../../model/cow";
import { useUser } from "../../../hooks/providers/user-provider";

const HealthForm = () => {
  const [formData, setFormData] = React.useState({
    cowName: "",
    eventName: "Vacuna",
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

  const handleAddHealthEvent = async () => {
    const { cowName, eventName, description, date } = formData;
    const formattedDate = date.toISOString().split("T")[0];
    await insertHealthEvent(cowName, eventName, description, formattedDate);
    router.replace("health");
  };

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Añadir evento de salud" />
      <View className="items-center">
        <View className="mx-4 mt-4 w-[75%]">
          <CustomButton
            text="Ver calendario de salud"
            onPress={() => router.replace("health")}
            buttonTestID="health-button"
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
                    "Vacuna",
                    "Enfermedad",
                    "Medicación",
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
              onPress={handleAddHealthEvent}
              buttonTestID="handle-add-health-button"
            />
          </View>
        </CustomFormDiv>
      </View>
    </ScrollView>
  );
};

export default HealthForm;

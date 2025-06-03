import React from "react";

import { Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { getAvailableCowNameById } from "../../../model/cow";

import icons from "../../../constants/icons";
import CustomPressable from "../../../components/basic/custom-pressable";

const CowCard = ({ cow, isExited, onDelete }) => {
  const [motherName, setMotherName] = React.useState("Desconocida");

  React.useEffect(() => {
    const getMotherName = async () => {
      if (cow.mother_fk !== null) {
        const name = await getAvailableCowNameById(cow.mother_fk);
        setMotherName(name);
      }
    };
    getMotherName();
  }, []);

  return (
    <View className="flex-col m-2 space-y-4 p-4 bg-c_light_gray rounded-xl border-r-4 border-c_light_blue">
      <View className="mb-2">
        <View className="px-4 flex-row items-center justify-between border-y-2 border-r-2 rounded-xl border-c_light_blue overflow-hidden">
          <Text className="text-c_white text-sm font-Nunito_Bold">
            <FontAwesomeIcon icon={icons.faCow} size={50} color="white" />
          </Text>
          <Text className="p-2 text-c_white text-2xl font-Nunito_Bold">
            {cow.name}
          </Text>
          {cow.gender === "Femenino" && (
            <FontAwesomeIcon icon={icons.faVenus} size={20} color="white" />
          )}
          {cow.gender === "Masculino" && (
            <FontAwesomeIcon icon={icons.faMars} size={20} color="white" />
          )}
        </View>
        <View className="ml-2 mt-2 flex-col justify-between">
          <View className="mb-2 flex-row items-center space-x-2">
            <Text className="text-c_light_blue text-xl font-Nunito_BoldItalic underline">
              {cow.code}
            </Text>
          </View>
          <View className="flex-col p-2 border-l-2 border-c_white rounded-lg">
            <Text className="text-c_white text-lg font-Nunito_Light">
              Se incorporó en:{" "}
              {new Date(cow.entryDate).toLocaleDateString("es-ES")}
            </Text>
            <Text className="text-c_white text-lg font-Nunito_Light">
              Raza: {cow.breed}
            </Text>
            <Text className="text-c_white text-lg font-Nunito_Light">
              Fase: {cow.phase}
            </Text>
            <Text className="text-c_white text-lg font-Nunito_Light">
              Es hijo/a de: {motherName}
            </Text>
          </View>
        </View>
      </View>

      {!isExited && (
          <CustomPressable
            text="Dar de baja"
            onPress={() => onDelete(cow)}
            buttonTestID="delete-cow-button"
            icon={icons.faTrash}
          />
      )}
    </View>
  );
};

export default CowCard;

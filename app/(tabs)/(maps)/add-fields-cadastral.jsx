import React from "react";

import { View, ScrollView, Text } from "react-native";
import { router } from "expo-router";

import CustomButton from "../../../components/basic/custom-button";
import CustomInput from "../../../components/basic/custom-input";
import { getFarmUbicationByUserId } from "../../../model/farm";
import { insertFieldCadastral } from "../../../model/field";
import { useUser } from "../../../store/user-provider";
import TabTitle from "../../../components/tabs/tab-title";
import CustomFormDiv from "../../../components/basic/custom-form-div";
import CustomPressable from "../../../components/basic/custom-pressable";
import icons from "../../../constants/icons";
import CustomTextDiv from "../../../components/basic/custom-text-div";

const AddFieldsCadastral = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    reference: "",
  });

  const { user } = useUser();

  React.useEffect(() => {
    const fetchLocation = async () => {
      const location = await getFarmUbicationByUserId(user.id);
      setSelectedLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    };

    fetchLocation();
  }, [user.id]);

  const handleChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveLocation = async () => {
    await insertFieldCadastral(formData.name, formData.reference, user.id);

    router.replace("cadastral-fields");
  };

  return (
    <ScrollView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Añadir una finca" />
      <View className="flex items-center mt-4">
        <View className="w-[75%]">
          <CustomButton
            text="Ver mis fincas"
            onPress={() => router.replace("fields")}
            buttonTestID={"fields-button"}
          />
        </View>
      </View>
      <View className="px-4 mt-4">
        <View className="mb-4">
          <CustomTextDiv>
            <Text className="text-c_white text-2xl font-Nunito_Medium">
              ◆ Referencias catastrales
            </Text>
            <Text className="mt-2 text-c_white text-md font-Nunito_Italic">
              Las referencias catastrales son una serie de letras y números que
              puedes obtener en el catastro o mediante el SigPac y identifican
              de forma única una finca. No se verán las fincas con referencias
              inexistentes.
            </Text>
          </CustomTextDiv>
        </View>
        <CustomFormDiv>
          <View className="my-4">
            <CustomInput
              text="Nombre de la finca"
              placeholder="Nombre"
              onChangeText={handleChange("name")}
              value={formData.name}
            />
          </View>
          <View className="mb-8">
            <CustomInput
              text="Referencia catastral"
              placeholder="Referencia"
              onChangeText={handleChange("reference")}
              value={formData.reference}
            />
          </View>
          <CustomPressable
            text="Añadir"
            onPress={handleSaveLocation}
            buttonTestID="add-field-button"
            icon={icons.faPlus}
          />
        </CustomFormDiv>
      </View>
    </ScrollView>
  );
};

export default AddFieldsCadastral;

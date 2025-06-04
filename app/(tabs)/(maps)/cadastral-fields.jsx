import React from "react";

import { View, SafeAreaView, FlatList } from "react-native";
import { router } from "expo-router";

import { useUser } from "../../../store/user-provider";
import { getAllFieldsByUserId, deleteFieldById } from "../../../model/field";
import { getUserCoordinatesById } from "../../../model/users";
import { fetchCadastral } from "../../../utils/map-cadastral-fetch";
import TabTitle from "../../../components/tabs/tab-title";
import CustomPressable from "../../../components/basic/custom-pressable";
import CustomAcceptDenyModal from "../../../components/basic/custom-accept-deny-modal";
import CadastralMapCard from "./cadastral-map-card";
import icons from "../../../constants/icons";
import CustomButton from "../../../components/basic/custom-button";

const CadastralFields = () => {
  const [fields, setFields] = React.useState([]);
  const [userCoordinates, setUserCoordinates] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [selectedField, setSelectedField] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const { user } = useUser();

  const loadFields = async () => {
    const res = await getAllFieldsByUserId(user.id);
    const cadastralFields = res.filter((f) => f.cadastralReference);

    const coords = await Promise.all(
      cadastralFields.map(async (f) => {
        try {
          return await fetchCadastral(f.cadastralReference);
        } catch {
          return null;
        }
      })
    );

    const enriched = cadastralFields
      .map((f, i) => ({ ...f, coordinates: coords[i] }))
      .filter((f) => f.coordinates && f.coordinates.length > 0);

    setFields(enriched);
  };

  const getUserCoords = async () => {
    const coords = await getUserCoordinatesById(user.id);
    setUserCoordinates(coords);
  };

  React.useEffect(() => {
    loadFields();
    getUserCoords();
  }, []);

  const confirmDeleteField = (field) => {
    setSelectedField(field);
    setModalVisible(true);
  };

  const handleAcceptDelete = async () => {
    if (selectedField) {
      await deleteFieldById(selectedField.id);
      setSelectedField(null);
      setModalVisible(false);
      loadFields();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Mis fincas (catastro)" />
      <View className="mx-4 mt-4 space-y-2">
        <View>
          <CustomPressable
            text="Añadir con referencia catastral"
            onPress={() => router.push("add-fields-cadastral")}
            icon={icons.faPlus}
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
              text="Ver pastoreo"
              onPress={() => router.replace("grazing")}
              buttonTestID={"grazing-button"}
            />
          </View>
        </View>
      </View>
      <View className="flex-1 mt-4 mx-2">
        <FlatList
          data={fields}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CadastralMapCard
              map={item}
              coordinates={item.coordinates}
              onDelete={confirmDeleteField}
              latitude={userCoordinates.latitude}
              longitude={userCoordinates.longitude}
            />
          )}
          showsVerticalScrollIndicator={true}
        />
      </View>
      <CustomAcceptDenyModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Borrar finca"
        text={`¿Estás seguro de que quieres borrar '${selectedField?.name}'?`}
        acceptText="Borrar"
        denyText="Cancelar"
        onAccept={handleAcceptDelete}
        onDeny={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default CadastralFields;

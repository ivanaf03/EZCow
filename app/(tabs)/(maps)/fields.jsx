import React from "react";

import { View, SafeAreaView, FlatList } from "react-native";
import { router } from "expo-router";

import { useUser } from "../../../store/user-provider";
import MapCard from "./map-card";
import { getAllFieldsByUserId, deleteFieldById } from "../../../model/field";
import icons from "../../../constants/icons";
import TabTitle from "../../../components/tabs/tab-title";
import CustomPressable from "../../../components/basic/custom-pressable";
import CustomAcceptDenyModal from "../../../components/basic/custom-accept-deny-modal";

const Fields = () => {
  const [fields, setFields] = React.useState([]);
  const [selectedField, setSelectedField] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const { user } = useUser();

  const loadFields = async () => {
    const res = await getAllFieldsByUserId(user.id);
    setFields(res);
  };

  React.useEffect(() => {
    loadFields();
  }, []);

  const confirmDeleteField = (field) => {
    setSelectedField(field);
    setModalVisible(true);
  };

  const handleAcceptDelete = async () => {
    if (selectedField) {
      await deleteFieldById(selectedField.id);
      await loadFields();
      setSelectedField(null);
      setModalVisible(false);
    }
  };

  const handleDenyDelete = () => {
    setSelectedField(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Mis fincas" />
      <View className="mt-4 mx-16">
        <CustomPressable
          text="Añadir una finca"
          onPress={() => router.push("add-fields")}
          buttonTestID="add-fields-button"
          icon={icons.faPlus}
        />
      </View>
      <View className="flex-1 mt-4">
        <FlatList
          data={fields}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MapCard map={item} onDelete={confirmDeleteField} />
          )}
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
        onDeny={handleDenyDelete}
      />
    </SafeAreaView>
  );
};

export default Fields;

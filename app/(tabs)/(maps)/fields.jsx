import React from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { router } from "expo-router";

import { useUser } from "../../../store/user-provider";
import { getAllFieldsByUserId, deleteFieldById } from "../../../model/field";
import MapCard from "./map-card";
import TabTitle from "../../../components/tabs/tab-title";
import CustomPressable from "../../../components/basic/custom-pressable";
import CustomAcceptDenyModal from "../../../components/basic/custom-accept-deny-modal";
import icons from "../../../constants/icons";
import CustomButton from "../../../components/basic/custom-button";

const Fields = () => {
  const [fields, setFields] = React.useState([]);
  const [selectedField, setSelectedField] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);

  const { user } = useUser();

  const loadFields = async () => {
    const res = await getAllFieldsByUserId(user.id);
    setFields(res.filter((f) => !f.cadastralReference));
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
      setSelectedField(null);
      setModalVisible(false);
      loadFields();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Mis fincas" />
      <View className="mx-4 mt-4 space-y-2">
        <View>
          <CustomPressable
            text="Añadir con ubicación"
            onPress={() => router.push("add-fields")}
            icon={icons.faPlus}
          />
        </View>
        <View className="flex-row items-center">
          <View className="w-[50%] pr-2">
            <CustomButton
              text="Ver parcelas"
              onPress={() => router.replace("cadastral-fields")}
              buttonTestID={"cadastral-fields-button"}
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
            <MapCard map={item} onDelete={confirmDeleteField} />
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

export default Fields;

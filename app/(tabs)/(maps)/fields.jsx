import React from "react";

import { View, SafeAreaView, FlatList } from "react-native";
import { router } from "expo-router";

import { useUser } from "../../../store/user-provider";
import MapCard from "./map-card";
import { getAllFieldsByUserId } from "../../../model/field";
import icons from "../../../constants/icons";
import TabTitle from "../../../components/tabs/tab-title";
import CustomPressable from "../../../components/basic/custom-pressable";

const Fields = () => {
  const [fields, setFields] = React.useState([]);

  React.useEffect(() => {
    const getFields = async () => {
      const res = await getAllFieldsByUserId(user.id);
      setFields(res);
    };

    getFields();
  }, []);

  const { user } = useUser();

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
          renderItem={({ item }) => <MapCard map={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Fields;

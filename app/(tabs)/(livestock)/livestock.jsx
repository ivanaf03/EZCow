import React from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";

import CustomButton from "../../../components/basic/custom-button";
import icons from "../../../constants/icons";
import CowCard from "./cow-card";
import {
  getAllCowsAvailableByUserId,
  getAllCowsAvailableByUserIdAndPhaseAndGender,
  getCalvesAvailableByUserId,
  setExitDateByCowId,
} from "../../../model/cow";
import { useUser } from "../../../store/user-provider";
import CustomPicker from "../../../components/basic/custom-picker";
import CustomSearchBar from "../../../components/basic/custom-search-bar";
import TabTitle from "../../../components/tabs/tab-title";
import CustomAcceptDenyModal from "../../../components/basic/custom-accept-deny-modal";
import CustomPressable from "../../../components/basic/custom-pressable";

const Livestock = () => {
  const [cows, setCows] = React.useState([]);
  const [allCows, setAllCows] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState("Todo");
  const [searchText, setSearchText] = React.useState("");
  const { user } = useUser();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedCow, setSelectedCow] = React.useState(null);

  React.useEffect(() => {
    loadCows();
  }, [filterValue]);

  const loadCows = async () => {
    let fetchedCows = [];
    if (filterValue === "Todo") {
      fetchedCows = await getAllCowsAvailableByUserId(user.id);
    } else if (filterValue === "Ternero") {
      fetchedCows = await getCalvesAvailableByUserId(user.id);
    } else if (filterValue === "Toro") {
      fetchedCows = await getAllCowsAvailableByUserIdAndPhaseAndGender(
        user.id,
        "Adulto",
        "Masculino"
      );
    } else if (filterValue === "Vaca") {
      fetchedCows = await getAllCowsAvailableByUserIdAndPhaseAndGender(
        user.id,
        "Adulto",
        "Femenino"
      );
    }
    setAllCows(fetchedCows);
    setCows(fetchedCows);
  };

  const handleShowCowsByName = (text) => {
    setSearchText(text);
    if (text === "") {
      setCows(allCows);
    } else {
      setCows(
        allCows.filter(
          (cow) =>
            cow.name && cow.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const confirmDeleteCow = (cow) => {
    setSelectedCow(cow);
    setModalVisible(true);
  };

  const handleAcceptDelete = async () => {
    if (selectedCow) {
      await setExitDateByCowId(selectedCow.id);
      await loadCows();
      setSelectedCow(null);
      setModalVisible(false);
    }
  };

  const handleDenyDelete = () => {
    setSelectedCow(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Censo" />
      <View className="items-center">
        <View className="flex-row justify-center items-center space-x-4 mt-4 w-[90%]">
          <View className="w-[50%]">
            <CustomPressable
              text="Dar de alta"
              onPress={() => router.push("livestock-form")}
              buttonTestID="livestock-form-button"
              icon={icons.faPlus}
            />
          </View>
          <View className="w-[50%]">
            <CustomPressable
              text="Crear grupo"
              onPress={() => router.push("group-form")}
              buttonTestID="group-form-button"
              icon={icons.faPlus}
            />
          </View>
        </View>
      </View>
      <View className="items-center">
        <View className="flex-row justify-center items-center space-x-4 mt-4 w-[90%]">
          <View className="w-[50%]">
            <CustomButton
              text="Ver grupos"
              onPress={() => router.push("groups")}
              buttonTestID="groups-button"
            />
          </View>
          <View className="w-[50%]">
            <CustomButton
              text="Ver histórico"
              onPress={() => router.push("livestock-historic")}
              buttonTestID="livestock-historic-button"
            />
          </View>
        </View>
      </View>
      <View className="flex items-center justify-center my-4">
        <View className="w-[90%] space-y-4">
          <View>
            <CustomPicker
              text="Filtrar por fase"
              value={filterValue}
              onValueChange={setFilterValue}
              options={["Todo", "Ternero", "Vaca", "Toro"]}
              pickerTestID="phase-picker"
            />
          </View>
          <View>
            <CustomSearchBar
              text="Buscar por nombre"
              value={searchText}
              onChangeText={handleShowCowsByName}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={cows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CowCard cow={item} isExited={false} onDelete={confirmDeleteCow} />
        )}
      />
      <CustomAcceptDenyModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Dar de baja"
        text={`Seguro que quieres dar de baja a '${selectedCow?.name}'?`}
        acceptText="Dar de baja"
        denyText="Volver"
        onAccept={handleAcceptDelete}
        onDeny={handleDenyDelete}
      />
    </SafeAreaView>
  );
};

export default Livestock;

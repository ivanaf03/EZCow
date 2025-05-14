import React from "react";

import { Text, View, SafeAreaView, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";

import CustomButton from "../../../components/basic/custom-button";
import icons from "../../../constants/icons";
import CowCard from "./cow-card";
import {
  getAllCalvesExitedByUserId,
  getAllCowsExitedByUserId,
  getAllCowsExitedByUserIdAndPhaseAndGender,
} from "../../../model/cow";
import { useUser } from "../../../store/user-provider";
import CustomPicker from "../../../components/basic/custom-picker";
import CustomSearchBar from "../../../components/basic/custom-search-bar";
import TabTitle from "../../../components/tabs/tab-title";

const LivestockHistoric = () => {
  const [cows, setCows] = React.useState([]);
  const [allCows, setAllCows] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState("Todo");
  const [searchText, setSearchText] = React.useState("");
  const { user } = useUser();

  React.useEffect(() => {
    loadCows();
  }, [filterValue]);

  const loadCows = async () => {
    let fetchedCows = [];
    if (filterValue === "Todo") {
      fetchedCows = await getAllCowsExitedByUserId(user.id);
    } else if (filterValue === "Ternero") {
      fetchedCows = await getAllCalvesExitedByUserId(user.id, "Ternero");
    } else if (filterValue === "Vaca") {
      fetchedCows = await getAllCowsExitedByUserIdAndPhaseAndGender(
        user.id,
        "Adulto",
        "Femenino"
      );
    } else if (filterValue === "Toro") {
      fetchedCows = await getAllCowsExitedByUserIdAndPhaseAndGender(
        user.id,
        "Adulto",
        "Masculino"
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
        allCows.filter((cow) =>
          cow.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Histórico" />
      <View className="flex-1 flex-col bg-c_dark_gray">
        <View className="items-center">
          <View className="mx-4 mt-4 w-[75%]">
            <CustomButton
              text="Ver censo"
              onPress={() => router.replace("livestock")}
              buttonTestID="livestock-button"
            />
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CowCard cow={item} isExited={true} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default LivestockHistoric;

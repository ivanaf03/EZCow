import React from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import CustomPressable from "../../../components/basic/custom-pressable";
import icons from "../../../constants/icons";
import {
  getCowsInGroup,
  deleteCowFromGroup,
  insertCowInGroup,
} from "../../../model/grazing";
import { getAvailableCodeByUserId, getCowIdByCode } from "../../../model/cow";
import { useUser } from "../../../store/user-provider";
import CustomPicker from "../../../components/basic/custom-picker";

const GroupCard = ({ group, onDelete }) => {
  const [cows, setCows] = React.useState([]);
  const [allCows, setAllCows] = React.useState([]);
  const [code, setCode] = React.useState("");

  const { user } = useUser();

  React.useEffect(() => {
    loadCows();
    loadCowCodes();
  }, [group]);

  const loadCowCodes = async () => {
    const cowCodes = await getAvailableCodeByUserId(user.id);
    setAllCows(cowCodes);
  };

  const loadCows = async () => {
    const fetchedCows = await getCowsInGroup(group.groupId);
    setCows(fetchedCows);
  };

  const handleDeleteCow = async (cowId) => {
    await deleteCowFromGroup(group.groupId, cowId);
    setCows((prevCows) => {
      const updatedCows = prevCows.filter((cow) => cow.cowId !== cowId);
      return updatedCows;
    });
  };

  const isCowInGroup = (code, groupId) => {
    return cows.some((cow) => cow.cowCode === code && cow.groupId === groupId);
  };

  const onAddCow = async (code) => {
    if (isCowInGroup(code, group.groupId)) {
      Alert.alert("Error", "La vaca ya está en este grupo.");
      return;
    }

    const cowId = await getCowIdByCode(code);
    await insertCowInGroup(cowId, group.groupId);
    await loadCows();
  };

  return (
    <View className="flex-col m-2 space-y-4 p-4 bg-c_light_gray rounded-xl border-r-4 border-c_light_blue">
      <Text className="text-c_white text-2xl font-Nunito_ExtraBold">
        {group.groupName}
      </Text>
      <View className="flex-row items-center justify-center space-x-4 my-4">
        <View className="flex-1 mx-2">
          <CustomPicker
            text="Añadir vacas"
            value={code}
            onValueChange={setCode}
            options={allCows}
            pickerTestID={`code-picker-${group.groupId}`}
          />
        </View>
        <View>
          <View className="pt-4">
            <CustomPressable
              text="Añadir"
              onPress={() => onAddCow(code)}
              buttonTestID={`add-cow-button-${group.groupId}`}
              icon={icons.faPlus}
            />
          </View>
        </View>
      </View>
      <View className="border-l-2 border-c_white rounded-lg p-2">
        <FlatList
          data={cows}
          keyExtractor={(item) => item.cowId.toString()}
          renderItem={({ item }) => (
            <View className="flex-row items-center p-2 justify-between">
              <View>
                <FontAwesomeIcon icon={icons.faCow} size={20} color="white" />
                <Text className="text-c_white text-sm font-Nunito_Medium">
                  {item.cowCode} ({item.cowName})
                </Text>
              </View>
              <CustomPressable
                text="Borrar vaca"
                onPress={() => handleDeleteCow(item.cowId)}
                buttonTestID="delete-cow-button"
                icon={icons.faTrash}
              />
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-c_white text-sm">
              No hay vacas en este grupo
            </Text>
          }
        />
      </View>
      <View className="mt-2">
        <CustomPressable
          text="Borrar grupo"
          onPress={() => onDelete(group)}
          buttonTestID="delete-group-button"
          icon={icons.faTrash}
        />
      </View>
    </View>
  );
};

export default GroupCard;

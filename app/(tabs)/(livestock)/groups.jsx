import React from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { router } from "expo-router";

import GroupCard from "./group-card";
import { getAllGroups, deleteGroup } from "../../../model/grazing";
import { useUser } from "../../../store/user-provider";
import CustomButton from "../../../components/basic/custom-button";
import TabTitle from "../../../components/tabs/tab-title";
import CustomAcceptDenyModal from "../../../components/basic/custom-accept-deny-modal";

const Groups = () => {
  const [groups, setGroups] = React.useState([]);
  const { user } = useUser();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(null);

  React.useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const fetchedGroups = await getAllGroups(user.id);
    setGroups(fetchedGroups);
  };

  const confirmDeleteGroup = (group) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const handleAcceptDelete = async () => {
    if (selectedGroup) {
      await deleteGroup(selectedGroup.groupId); 
      await loadGroups();
      setSelectedGroup(null);
      setModalVisible(false);
    }
  };

  const handleDenyDelete = () => {
    setSelectedGroup(null);
    setModalVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Grupos" />
      <View className="items-center">
        <View className="mx-4 mt-4 w-[75%]">
          <CustomButton
            text="Ver censo"
            onPress={() => router.replace("livestock")}
            buttonTestID="livestock-button"
          />
        </View>
      </View>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.groupId.toString()}
        renderItem={({ item }) => (
          <GroupCard group={item} onDelete={confirmDeleteGroup} />
        )}
      />
      <CustomAcceptDenyModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Borrar grupo"
        text={`Seguro que quieres borrar el grupo '${selectedGroup?.groupName}'?`}
        acceptText="Borrar"
        denyText="Volver"
        onAccept={handleAcceptDelete}
        onDeny={handleDenyDelete}
      />
    </SafeAreaView>
  );
};

export default Groups;

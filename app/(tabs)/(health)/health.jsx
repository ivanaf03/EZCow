import React from "react";

import { Text, View, SafeAreaView } from "react-native";

import TabTitle from "../../../components/tabs/tab-title";

const Health = () => {
  return (
    <SafeAreaView className="flex-1 bg-c_dark_gray">
      <TabTitle text="Salud" />
    </SafeAreaView>
  );
};

export default Health;

import React from "react";

import { Stack } from "expo-router";

import { initDatabase } from "../model/bd";
import UserProvider from "../store/user-provider";
import FontProvider from "../store/font-provider";

const RootLayout = () => {
  React.useEffect(() => {
    const initData = async () => {
      await initDatabase();
    };
    initData();
  }, []);

  return (
    <UserProvider>
      <FontProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </FontProvider>
    </UserProvider>
  );
};

export default RootLayout;

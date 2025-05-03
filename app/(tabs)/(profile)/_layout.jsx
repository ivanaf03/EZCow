import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { colors } from "../../../constants/colors";

const ProfileLayout = () => {
  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: colors.c_marine_blue,
          drawerInactiveTintColor: colors.c_light_gray,
          drawerActiveBackgroundColor: colors.c_white,
          drawerInactiveBackgroundColor: colors.c_white,
          drawerStyle: {
            width: 300,
            backgroundColor: colors.c_dark_gray,
          },
          drawerItemStyle: {
            backgroundColor: colors.c_white,
            marginVertical: 8,
          },
        }}
      >
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Datos de usuario",
            title: "Datos de usuario",
          }}
        />
        <Drawer.Screen
          name="change-password"
          options={{
            drawerLabel: "Cambiar contraseña",
            title: "Cambiar contraseña",
          }}
        />
        <Drawer.Screen
          name="sync-database"
          options={{
            drawerLabel: "Sincronizar base de datos",
            title: "Sincronizar base de datos",
          }}
        />
        <Drawer.Screen
          name="download-database"
          options={{
            drawerLabel: "Descargar base de datos",
            title: "Descargar base de datos",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default ProfileLayout;

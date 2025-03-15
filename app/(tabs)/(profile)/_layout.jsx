import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { colors } from '../../../constants/colors';

const ProfileLayout = () => {
    return (
        <GestureHandlerRootView>
            <Drawer 
                screenOptions={{
                    drawerActiveTintColor: colors.c_light_violet,
                    drawerInactiveTintColor: colors.c_layout,
                    drawerActiveBackgroundColor: colors.c_white,
                    drawerInactiveBackgroundColor: colors.c_white,
                    drawerStyle: {
                        width: 300,
                        backgroundColor: colors.c_dark_violet,
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
                    name="sync-database"
                    options={{
                        drawerLabel: "Sincronizar base de datos",
                        title: "Sincronizar base de datos",
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
};

export default ProfileLayout;
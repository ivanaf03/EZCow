import React from 'react';

import { Tabs } from 'expo-router';

import icons from '../../constants/icons';
import TabIcon from '../../components/tabs/tab-icon';
import { colors } from '../../constants/colors';

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.c_light_blue,
                tabBarInactiveTintColor: colors.c_marine_blue,
                tabBarStyle: {
                    backgroundColor: colors.c_light_gray,
                    height: 60,
                    paddingTop: 10,
                }
            }}
        >
            <Tabs.Screen 
            name="(livestock)"
            options= {{
                title: "Censo",
                headerShown: false,
                tabBarIcon: ({color, focused}) => (
                    <TabIcon
                        icon={icons.faCow}
                        color={color}
                        name="Censo"
                        focused={focused}
                    />
                )
            }}
            />
            <Tabs.Screen
                name="(maps)"
                options={{
                    title: "Mapas",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.faEarthEurope}
                            color={color}
                            name="Mapas"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="(breeding)"
                options={{
                    title: "Crianza",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.faHeart}
                            color={color}
                            name="Crianza"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="(health)"
                options={{
                    title: "Salud",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.faKitMedical}
                            color={color}
                            name="Salud"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="(profile)"
                options={{
                    title: "Perfil",
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.faUser}
                            color={color}
                            name="Perfil"
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
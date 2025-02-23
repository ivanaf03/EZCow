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
                tabBarActiveTintColor: colors.c_light_violet,
                tabBarInactiveTintColor: colors.c_white,
                tabBarStyle: {
                    backgroundColor: colors.c_layout,
                    height: 60,
                    paddingTop: 10,
                }
            }}
        >
            <Tabs.Screen 
            name="(livestock)/livestock"
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
                name="(maps)/maps"
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
                name="(breeding)/breeding"
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
                name="(health)/health"
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
        </Tabs>
    );
};

export default TabsLayout;
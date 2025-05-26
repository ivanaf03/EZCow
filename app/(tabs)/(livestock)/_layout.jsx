import React from 'react';

import { Stack } from 'expo-router';

const LivestockLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name="livestock" 
                options={{ 
                    headerShown: false 
                }} 
            />
            <Stack.Screen 
                name="livestock-form" 
                options={{ 
                    headerShown: false 
                }} 
            />
            <Stack.Screen 
                name="livestock-historic" 
                options={{ 
                    headerShown: false 
                }}
            />
            <Stack.Screen
                name="group-form"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="groups"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default LivestockLayout;
import React from 'react';

import { Stack } from 'expo-router';

const HealthLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name="health"
                options={{ 
                    headerShown: false 
                }} 
            />
            <Stack.Screen 
                name="health-form"
                options={{ 
                    headerShown: false 
                }} 
            />
        </Stack>
    );
};

export default HealthLayout;
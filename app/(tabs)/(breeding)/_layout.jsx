import React from 'react';

import { Stack } from 'expo-router';

const BreedingLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name="breeding"
                options={{ 
                    headerShown: false 
                }} 
            />
            <Stack.Screen 
                name="breeding-form"
                options={{ 
                    headerShown: false 
                }} 
            />
        </Stack>
    );
};

export default BreedingLayout;
import React from 'react';
import { Stack } from 'expo-router';
import { initDatabase } from './model/bd';

const RootLayout = () => {

    React.useEffect(() => {
        initDatabase();
    }, []);

    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="(auth)"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
};

export default RootLayout;
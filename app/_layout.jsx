import React from 'react';

import { Stack } from 'expo-router';

import { initDatabase } from './model/bd';
import UserProvider from '../hooks/providers/user-provider';

const RootLayout = () => {

    React.useEffect(() => {
        initDatabase();
    }, []);

    return (
        <UserProvider>
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
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
        </UserProvider>    
    );
};

export default RootLayout;
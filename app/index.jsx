import React from 'react';

import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import FontProvider from '../hooks/providers/font-provider';
import CustomButton from '../components/basic/custom-button';

const App = () => {
    return (
        <FontProvider>
            <SafeAreaView className="flex-1 bg-c_layout items-center">
                <Text className="mt-8 p-4 text-c_orange text-7xl font-Nunito_ExtraBold">
                    EZCow
                </Text>
                <Text className=" text-c_white text-xl font-Nunito_Bold">
                    Tu aplicación de gestión de ganado
                </Text>
                <Image
                    source={require('../assets/images/logo.png')}
                    className="w-96 h-1/2"
                    testID="app-logo"
                />
                <View className="flex-row flex-wrap justify-center mt-4">
                    <CustomButton text="Iniciar sesión" onPress={() => router.replace('login')} />
                    <CustomButton text="Registrarse" onPress={() => router.replace('register')} />
                </View>
                <Image
                    source={require('../assets/images/waves.png')}
                    className="absolute bottom-0 w-96 h-24"
                    testID="waves"
                />
            </SafeAreaView>
        </FontProvider>
    );
};

export default App;
import React from 'react';

import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CustomButton from '../components/basic/custom-button';

const App = () => {
    return (
            <SafeAreaView className="flex-1 bg-c_dark_gray items-center">
                <View className="p-4 mt-14 bg-c_light_gray items-center border-r-2 border-l-2 border-c_light_blue rounded-2xl">
                    <Text className="p-4 text-c_white text-8xl font-Nunito_Black">
                        EZCow
                    </Text>
                    <Text className=" text-c_white text-2xl font-Nunito_Italic">
                        Tu aplicación de gestión de ganado
                    </Text>
                </View>
                <View className="items-center justify-center">
                    <Image
                        source={require('../assets/images/logo.png')}
                        className="w-96 h-96"
                        testID="app-logo"
                    />
                </View>
                <View className="w-[75%]">
                    <CustomButton text="Iniciar sesión" onPress={() => router.replace('login')} />
                    <CustomButton text="Registrarse" onPress={() => router.replace('register')} />
                </View>
            </SafeAreaView>
    );
};

export default App;
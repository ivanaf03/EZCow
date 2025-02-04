import React from 'react';

import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FontProvider from '../hooks/providers/font-provider';
import CustomButton from '../components/basic/custom-button';

const App = () => {
    return (
        <FontProvider>
            <SafeAreaView className="flex-1 bg-c_layout items-center">
                <Text className="mt-8 p-4 text-c_orange text-8xl font-Nunito_ExtraBold">
                    EZCow
                </Text>
                <Text className=" text-c_white text-2xl font-Nunito_Bold">
                    Tu aplicación de gestión de ganado
                </Text>
                <Image
                    source={require('../assets/images/logo.png')}
                    className="w-1/2 h-1/2"
                />
                <View className="flex-row flex-wrap justify-center mt-4">
                    <CustomButton text="Iniciar sesión" onPress={() => {}} />
                    <CustomButton text="Registrarse" onPress={() => {}} />
                </View>
            </SafeAreaView>
        </FontProvider>
    );
};

export default App;
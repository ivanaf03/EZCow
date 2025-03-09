import React from 'react';

import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';

import FontProvider from '../hooks/providers/font-provider';
import CustomButton from '../components/basic/custom-button';

const sendFileToServer = async () => {
    try {
        const dbPath = FileSystem.documentDirectory + 'ezcow.db';

        console.log("the path is: " + dbPath);

        const file = await FileSystem.readAsStringAsync(dbPath, { encoding: FileSystem.EncodingType.Base64 });

        const formData = new FormData();
        formData.append('file', {
            uri: dbPath,
            type: 'application/octet-stream', 
            name: 'ezcow.db',
        });

        const response = await fetch('http://192.168.1.102:2345/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Archivo enviado exitosamente');
        } else {
            console.log('Error al enviar el archivo');
        }
    } catch (error) {
        console.error('Error al leer o enviar el archivo:', error);
    }
};

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
                <CustomButton text="Sync database" onPress={sendFileToServer} />
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
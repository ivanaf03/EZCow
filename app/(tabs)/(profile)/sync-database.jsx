import React, { useState } from 'react';

import { View, Text, Alert, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';

import CustomButton from '../../../components/basic/custom-button';
import CustomInput from '../../../components/basic/custom-input';
import CustomPasswordInput from '../../../components/basic/custom-password-input';
import { closeDatabase, syncDatabase, getDatabase } from '../../model/bd';

const SERVER_URL = "http://192.168.1.100:2345";

const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

const SyncDatabase = () => {
    const [deviceName, setDeviceName] = useState('');
    const [password, setPassword] = useState('');

    const dbPath = FileSystem.documentDirectory + 'SQLite/ezcow.db';

    const handleUploadDatabase = async () => {
        try {
            syncDatabase();
            closeDatabase();

            const fileInfo = await FileSystem.getInfoAsync(dbPath);
            if (!fileInfo.exists) {
                Alert.alert("Error", "No se encontró la base de datos local.");
                return;
            }

            const hashedPassword = hashPassword(password);

            const fileUri = fileInfo.uri;
            const formData = new FormData();
            formData.append("deviceName", deviceName);
            formData.append("password", hashedPassword);
            formData.append("file", {
                uri: fileUri,
                name: "ezcow.db",
                type: "application/octet-stream",
            });

            const response = await fetch(`${SERVER_URL}/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Error desconocido");

            getDatabase();

            Alert.alert("Éxito", result.message);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    const handleDownloadDatabase = async () => {
        try {
            const fileUri = FileSystem.documentDirectory + "SQLite/ezcow.db";
            const tempUri = FileSystem.documentDirectory + "SQLite/temp_ezcow.db";

            const hashedPassword = hashPassword(password);

            const response = await fetch(`${SERVER_URL}/download`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ deviceName, password: hashedPassword }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || "Error desconocido al descargar la base de datos");
            }

            const fileData = await response.blob();
            const reader = new FileReader();

            reader.onload = async () => {
                const base64Data = reader.result.split(",")[1];
                await FileSystem.writeAsStringAsync(tempUri, base64Data, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                closeDatabase();

                const fileInfo = await FileSystem.getInfoAsync(fileUri);
                if (fileInfo.exists) {
                    await FileSystem.deleteAsync(fileUri, { idempotent: true });
                }

                await FileSystem.moveAsync({
                    from: tempUri,
                    to: fileUri,
                });

                getDatabase();

                Alert.alert("Éxito", "Base de datos descargada y reemplazada correctamente.");
            };

            reader.readAsDataURL(fileData);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    return (
        <ScrollView className="flex-1 bg-c_dark_gray">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
                Sincronizar base de datos
            </Text>
            <View className="flex-1 flex-col p-4">
                <View className="p-4 bg-c_light_gray rounded-2xl">
                    <Text className="text-c_light_blue text-2xl font-Nunito_Medium">
                        ◆ Cómo funciona la sincronización?
                    </Text>
                    <Text className="mt-2 text-c_white text-sm font-Nunito_Italic">
                        Esta funcionalidad permite subir la base de datos a un servidor
                        para guardar los datos de tu explotación, por ejemplo, para recuperarlos
                        en otro dispositivo. Puedes hacer tantas copias de seguridad como quieras.
                        Si haces una copia de seguridad con el mismo nombre de dispositivo, se
                        sobreescribirá tu antigua base de datos en el servidor.
                    </Text>
                    <Text className="mt-2 text-c_white text-sm font-Nunito_Italic">
                    Si es la primera vez que haces una copia de seguridad, puedes poner la contraseña 
                    que desees. Es importante recordarla si se desea recuperar la copia de seguridad
                    en un futuro.
                    </Text>
                </View>
                <View className="mt-10 p-4 border-l-2 border-r-2 border-c_light_blue rounded-2xl">
                    <CustomInput
                        text="Nombre del dispositivo"
                        placeholder="Nombre del dispositivo"
                        value={deviceName}
                        onChangeText={setDeviceName}
                    />
                    <CustomPasswordInput
                        text="Contraseña"
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <View className="mt-8">
                        <CustomButton
                            text="Subir base de datos al servidor"
                            onPress={handleUploadDatabase}
                        />
                        <CustomButton
                            text="Sustituir base de datos local"
                            onPress={handleDownloadDatabase}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default SyncDatabase;

import React, { useState } from 'react';

import { View, Text, Alert } from 'react-native';
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
        <View className="flex-1 bg-c_background">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_ExtraBold border-b-2 border-c_white">
                Sincronizar base de datos
            </Text>
            <View className="flex-1 flex-col p-4">
                <Text className="mb-4 text-c_orange text-sm font-Nunito_Italic">
                    Si es la primera vez que se sincroniza la base de datos, 
                    se le debe dar un nombre a la base de datos. Es importante
                    recordar el nombre y la contraseña si se desea recuperar
                    en un futuro en otro dispositivo. Si ya se ha sincronizado,
                    para realizar cualquier acción se debe proporcionar el nombre
                    y la contraseña con la que se ha guardado.
                </Text>
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
    );
};

export default SyncDatabase;

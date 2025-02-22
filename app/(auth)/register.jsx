import React from 'react';

import { Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CustomInput from '../../components/basic/custom-input';
import CustomPasswordInput from '../../components/basic/custom-password-input';
import CustomButton from '../../components/basic/custom-button';
import CustomLink from '../../components/basic/custom-link';
import { insertUser } from '../model/users';

const Register = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const checkPasswords = () => {
        return password === confirmPassword;
    };

    const checkPasswordLength = () => {
        return password.length >= 8;
    };

    const checkEmail = () => {
        return email.includes('@') && email.includes('.');
    };

    const handleRegister = async () => {
        if(!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Por favor, rellena todos los campos.');
            return;
        }

        if(!checkEmail()) {
            Alert.alert('Error', 'El email no es válido.');
            return;
        }

        if(!checkPasswordLength()) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if(!checkPasswords()) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            await insertUser(name, email, password);            
            router.push('livestock');
        } catch (error) {
            Alert.alert('Error', 'Error al registrar. Inténtalo de nuevo. Asegúrate de que no tengas ya una cuenta.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-c_background">
            <Text className="mt-8 p-6 text-c_white text-5xl font-Nunito_ExtraBold">
                Registrarse
            </Text>
            <View className="ml-2">
                <View className="mt-10 mr-auto min-w-[300px]">
                    <CustomInput
                        text="Nombre de usuario"
                        placeholder="Nombre"
                        onChangeText={setName}
                    />
                </View>
                <View className="mt-10 mr-auto min-w-[300px]">
                    <CustomInput
                        text="Email"
                        placeholder="Email"
                        onChangeText={setEmail}
                    />
                </View>
                <View className="mt-10 mr-auto min-w-[300px]">
                    <CustomPasswordInput
                        text="Contraseña"
                        placeholder="Contraseña"
                        onChangeText={setPassword}
                    />
                </View>
                <View className="mt-10 mr-auto min-w-[300px]">
                    <CustomPasswordInput
                        text="Confirmar contraseña"
                        placeholder="Contraseña"
                        onChangeText={setConfirmPassword}
                    />
                </View>
            </View>
            <View className="flex-row justify-center mt-16">
                <View className="min-w-[230px] justify-center">
                    <CustomButton text="Registrarse" onPress={handleRegister} buttonTestID={"sign-up-button"} />
                </View>
            </View>
            <View className="mt-12 flex-row justify-center items-center">
                <Text className="text-c_white text-base font-Nunito_ExtraBold text-center mr-2">
                    Ya tienes una cuenta?
                </Text>
                <CustomLink text="Iniciar sesión" to="login" color="c_orange" linkTestID={"sign-in-link"} />
            </View>
        </SafeAreaView>
    );
};

export default Register;
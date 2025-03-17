import React from 'react';

import { Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CustomInput from '../../components/basic/custom-input';
import CustomPasswordInput from '../../components/basic/custom-password-input';
import CustomButton from '../../components/basic/custom-button';
import CustomLink from '../../components/basic/custom-link';
import { insertUser, getUserByEmail } from '../model/users';
import { useUser } from '../../hooks/providers/user-provider';

const Register = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const { login } = useUser();

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
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Por favor, rellena todos los campos.');
            return;
        }

        if (!checkEmail()) {
            Alert.alert('Error', 'El email no es válido.');
            return;
        }

        if (!checkPasswordLength()) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if (!checkPasswords()) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            await insertUser(name, email, password);
            const user = await getUserByEmail(email);
            login({ id: user.id, name: name, password: null, email: email });
            router.replace('livestock');
        } catch (error) {
            Alert.alert('Error', 'Error al registrar. Inténtalo de nuevo. Asegúrate de que no tengas ya una cuenta.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-c_dark_gray">
            <Text className="mt-6 p-6 text-c_white text-5xl font-Nunito_Bold">
                Registrarse
            </Text>
            <View className="mx-4 border-l-2 border-r-2 border-c_light_blue rounded-2xl p-4">
                <View className="ml-2">
                    <View className="w-full">
                        <CustomInput
                            text="Nombre de usuario"
                            placeholder="Nombre"
                            onChangeText={setName}
                        />
                    </View>
                    <View className="mt-10 w-full">
                        <CustomInput
                            text="Email"
                            placeholder="Email"
                            onChangeText={setEmail}
                        />
                    </View>
                    <View className="mt-10 w-full">
                        <CustomPasswordInput
                            text="Contraseña"
                            placeholder="Contraseña"
                            onChangeText={setPassword}
                        />
                    </View>
                    <View className="mt-10 w-full">
                        <CustomPasswordInput
                            text="Confirmar contraseña"
                            placeholder="Contraseña"
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                </View>
                <View className="flex-row justify-center mt-12">
                    <View className="w-[90%]">
                        <CustomButton text="Registrarse" onPress={handleRegister} buttonTestID={"sign-up-button"} />
                    </View>
                </View>
            </View>
            <View className="absolute bottom-0 w-full mb-14 flex-row justify-center items-center">
                <Text className="text-c_white text-base font-Nunito_Medium text-center mr-2">
                    Ya tienes una cuenta?
                </Text>
                <CustomLink text="Iniciar sesión" to="login" linkTestID={"sign-in-link"} />
            </View>
        </SafeAreaView>
    );
};

export default Register;
import React from 'react';

import { Text, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { router } from 'expo-router';
import CryptoJS from 'crypto-js';
import * as Google from 'expo-auth-session/providers/google';
import { jwtDecode } from 'jwt-decode';

import CustomInput from '../../components/basic/custom-input';
import CustomPasswordInput from '../../components/basic/custom-password-input';
import CustomButton from '../../components/basic/custom-button';
import icons from '../../constants/icons';
import CustomLink from '../../components/basic/custom-link';
import { getUserByEmail, insertUserGoogle } from '../model/users';
import { useUser } from '../../hooks/providers/user-provider';

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { login } = useUser();
    
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        iosClientId: undefined,
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const decodedToken = jwtDecode(id_token);
            
            const name = decodedToken.name;
            const email = decodedToken.email;
            const googleId = decodedToken.sub;

            insertUserGoogle(name, email, googleId);
            login({ name: name, password: null, email: email});
            router.push('livestock');
        }
    }, [response]);

    const checkPasswordLength = () => {
        return password.length >= 8;
    };

    const checkEmail = () => {
        return email.includes('@') && email.includes('.');
    };

    const handleLogin = async () => {
        if(!email || !password) {
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

        try {
            const result = await getUserByEmail(email);
            if (CryptoJS.SHA256(password).toString() === result.password) {
                login({ name: result.name, password: password, email: result.email});
                router.push('livestock');
            } else {
                Alert.alert('Error', 'Contraseña incorrecta.');
            }
        } catch (error) {
            Alert.alert('Error', 'Error al iniciar sesión. Inténtalo de nuevo. Comprueba que el email es correcto.');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-c_background">
            <Text className="mt-8 p-6 text-c_white text-5xl font-Nunito_ExtraBold">
                Iniciar sesión
            </Text>
            <View className="ml-2">
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
            </View>
            <View className="flex-row justify-center mt-16">
                <View className="min-w-[230px] justify-center">
                    <CustomButton text="Iniciar sesión" onPress={handleLogin} buttonTestID="sign-in-button"/>
                </View>
            </View>
            <Text className="text-c_white text-xl font-Nunito_ExtraBold mt-2 text-center">
                o
            </Text>
            <View className="mt-2 flex-row justify-center items-center">
                <FontAwesomeIcon
                    icon={icons.faGoogle}
                    size={25}
                    color="white"
                />
                <CustomButton 
                text="Continuar con Google" 
                onPress={() => promptAsync().catch((e) => console.log(e))}
                buttonTestID="sign-in-google-button"
                />
            </View>
            <View className="mt-12 flex-row justify-center items-center">
                <Text className="text-c_white text-base font-Nunito_ExtraBold text-center mr-2">
                    Todavía no tienes una cuenta?
                </Text>
                <CustomLink text="Regístrate" to="register" color="c_orange" linkTestID={"sign-up-link"} />
            </View>
        </SafeAreaView>
    );
};

export default Login;
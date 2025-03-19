import React from 'react';

import { Text, View, Alert, ScrollView } from 'react-native';
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
        const handleGoogleLogin = async () => {
            if (response?.type === 'success') {
                const { id_token } = response.params;
                const decodedToken = jwtDecode(id_token);

                const name = decodedToken.name;
                const email = decodedToken.email;
                const googleId = decodedToken.sub;

                await insertUserGoogle(name, email, googleId);

                const user = await getUserByEmail(email);
                login({ id: user.id, name: user.name, password: null, email: user.email });
                router.replace('livestock');
            }
        };

        handleGoogleLogin();
    }, [response]);

    const checkPasswordLength = () => {
        return password.length >= 8;
    };

    const checkEmail = () => {
        return email.includes('@') && email.includes('.');
    };

    const handleLogin = async () => {
        if (!email || !password) {
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

        try {
            const result = await getUserByEmail(email);
            if (CryptoJS.SHA256(password).toString() === result.password) {
                const userId = result.id;
                login({ id: userId, name: result.name, password: password, email: result.email });
                router.replace('livestock');
            } else {
                Alert.alert('Error', 'Contraseña incorrecta.');
            }
        } catch (error) {
            Alert.alert('Error', 'Error al iniciar sesión. Inténtalo de nuevo. Comprueba que el email es correcto.');
        }
    };

    return (
        <ScrollView className="flex-1 bg-c_dark_gray">
            <Text className="mt-6 p-6 text-c_white text-5xl font-Nunito_Bold">
                Iniciar sesión
            </Text>
            <View className="mx-4 border-l-2 border-r-2 border-c_light_blue rounded-2xl p-4">
                <View className="ml-2">
                    <View className="mt-10 mr-auto w-full">
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
                    <View className="flex-row justify-center mt-12">
                        <View className="w-[90%]">
                            <CustomButton text="Iniciar sesión" onPress={handleLogin} buttonTestID="sign-in-button" />
                        </View>
                    </View>
                </View>
                <View className="mt-10 border-t-2 border-c_light_blue border-dotted">
                </View>
                <View className="mt-10">
                    <Text className="text-c_white text-lg font-Nunito_Medium">
                        Si prefieres, puedes iniciar sesión con Google:
                    </Text>
                    <View className="mt-4 flex-row justify-center items-center">
                        <FontAwesomeIcon
                            icon={icons.faGoogle}
                            size={36}
                            color="white"
                        />
                        <CustomButton
                            text="Continuar con Google"
                            onPress={() => promptAsync().catch((e) => console.log(e))}
                            buttonTestID="sign-in-google-button"
                        />
                    </View>
                </View>
            </View>
            <View className="mt-8 w-full mb-10 flex-row justify-center items-center">
                <Text className="text-c_white text-base font-Nunito_Medium text-center mr-2">
                    Todavía no tienes una cuenta?
                </Text>
                <CustomLink text="Regístrate" to="register" linkTestID={"sign-up-link"} />
            </View>
        </ScrollView>
    );
};

export default Login;
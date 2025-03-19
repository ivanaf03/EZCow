import React from 'react';

import { View, Text, ScrollView, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { router } from 'expo-router';

import CustomButton from '../../../components/basic/custom-button';
import CustomInput from '../../../components/basic/custom-input';
import CustomPasswordInput from '../../../components/basic/custom-password-input';
import icons from '../../../constants/icons';
import { changePassword } from '../../model/users';
import { useUser } from '../../../hooks/providers/user-provider';

const ChangePassword = () => {

    const [actualPassword, setActualPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

    const { user, login } = useUser();

    const handleChangePassword = async () => {

        console.log(user);

        if (user.password === null) {
            Alert.alert('Error', 'Solo podrás cambiar la contraseña si no has iniciado sesión con Google.');
            return;
        }

        if (!actualPassword || !newPassword || !confirmNewPassword) {
            Alert.alert('Error', 'Por favor, rellena todos los campos.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        if (newPassword.length < 8) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if (actualPassword === newPassword) {
            Alert.alert('Error', 'La nueva contraseña debe ser diferente a la actual.');
            return;
        }

        if(actualPassword !== user.password) {
            Alert.alert('Error', 'La contraseña actual no es correcta.');
            return;
        }

        try {
            await changePassword(user.email, newPassword);
            login({ ...user, password: newPassword });
            router.replace('profile');
        } catch (error) {
            Alert.alert('Error', 'Error al cambiar la contraseña. Inténtalo de nuevo.');
        }
    };

    return (
        <ScrollView className="flex-1 bg-c_dark_gray">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
                Cambiar contraseña
            </Text>
            <View className="flex-row items-center mt-4 space-x-2 p-4 m-4 bg-c_light_gray rounded-2xl">
                <FontAwesomeIcon
                    icon={icons.faTriangleExclamation}
                    size={36}
                    color="white"
                />
                <Text className="flex-1 p-2 text-c_light_blue text-lg font-Nunito_Medium">
                    Solo podrás cambiar la contraseña si no has iniciado sesión con Google.
                </Text>
            </View>
            <View className="flex-1 flex-col p-4">
                <View className="mt-6 p-4 border-l-2 border-r-2 border-c_light_blue rounded-2xl">
                    <CustomInput
                        text="Contraseña actual"
                        placeholder="Contraseña actual"
                        onChangeText={setActualPassword}
                    />
                    <CustomPasswordInput
                        text="Nueva contraseña"
                        placeholder="Nueva contraseña"
                        onChangeText={setNewPassword}
                    />
                    <CustomPasswordInput
                        text="Confirmar nueva contraseña"
                        placeholder="Confirmar nueva contraseña"
                        onChangeText={setConfirmNewPassword}
                    />
                    <View className="mt-8">
                        <CustomButton
                            text="Cambiar contraseña"
                            onPress={handleChangePassword}
                            buttonTestID="change-password-button"
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ChangePassword;
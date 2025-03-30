import React from 'react';

import { Text, View, ScrollView, Image } from 'react-native';

import { useUser } from '../../../hooks/providers/user-provider';
import CustomPasswordView from '../../../components/basic/custom-password-view';

const Profile = () => {

    const { user } = useUser();

    return (
        <ScrollView className="flex-1 bg-c_dark_gray">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
                Perfil
            </Text>
            <View className="flex-1 flex-col p-4 items-center">
                <Image
                    source={require('../../../assets/images/farmer-profile.png')}
                    className="w-64 h-64"
                    testID="app-logo"
                />
                <View className="mt-4 p-4 w-[90%] bg-c_light_gray border-r-2 border-l-2 border-c_light_blue rounded-2xl">
                    <Text className="text-c_white text-2xl font-Nunito_Medium">
                        {user.name}
                    </Text>
                    <Text className="text-c_white text-sm font-Nunito_Italic">
                        {user.email}
                    </Text>
                    <View className="mt-10 w-full">
                        {user.password && <CustomPasswordView
                            text="Ver contraseña"
                            value ={user.password}
                        />}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;
import React from 'react';

import { Text, View, SafeAreaView } from 'react-native';

const Profile = () => {
    return (
        <SafeAreaView className="flex-1 bg-c_dark_gray">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
                Perfil
            </Text>
        </SafeAreaView>
    );
};

export default Profile;
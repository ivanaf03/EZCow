import React from 'react';

import { Text, View, ActivityIndicator } from 'react-native';

const OauthRedirect = () => {

    return (
        <View className="flex-1 bg-c_dark_gray justify-center">
            <View className="mt-10 mx-8 p-4 bg-c_light_gray items-center border-r-2 border-l-2 border-c_light_blue rounded-2xl">
            <Text className="p-2 text-c_white text-3xl font-Nunito-Medium">
                Iniciando sesión con Google. Esto puede llevar unos segundos...
            </Text>
            <ActivityIndicator size="large" color="c_light_blue" />
            </View>
        </View>
    );
};

export default OauthRedirect;
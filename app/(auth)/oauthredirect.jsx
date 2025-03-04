import React from 'react';

import { Text, View } from 'react-native';

const OauthRedirect = () => {

    return (
        <View className="flex-1 bg-c_background items-center justify-center">
            <Text className="mt-8 p-6 text-c_white text-3xl font-Nunito_BoldItalic">
                Iniciando sesión con Google. Esto puede llevar unos segundos...
            </Text>
        </View>
    );
};

export default OauthRedirect;
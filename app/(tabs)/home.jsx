import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = "hello@test.com";
            setUser(userData); 
        };

        fetchUser();
    }, []);

    return (
        <View className="flex-1 bg-c_background">
            <Text className="mt-8 p-6 text-c_white text-5xl font-Nunito_ExtraBold">
                {user ? `Bienvenido ${user}` : "Cargando..."}
            </Text>
        </View>
    );
};

export default Home;

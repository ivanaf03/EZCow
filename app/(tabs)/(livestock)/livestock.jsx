import React from 'react';

import { Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { router } from 'expo-router';

import CustomButton from '../../../components/basic/custom-button';
import icons from '../../../constants/icons';
import CowCard from './cow-card';
import { getAllCowsAvailableByUserId } from '../../model/cow';
import { useUser } from '../../../hooks/providers/user-provider';

const Livestock = () => {

    const [cows, setCows] = React.useState([]);

    const { user } = useUser();

    React.useEffect(() => {
        loadCows();
    }, [cows]);

    const loadCows = async () => {
        setCows(await getAllCowsAvailableByUserId(user.id));
    };

    return (
        <SafeAreaView className="flex-1 bg-c_background">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_ExtraBold border-b-2 border-c_white">
                Censo
            </Text>
            <View className="flex-1 bg-c_background">
                <View className="flex-row mt-2">
                    <CustomButton 
                        text={<View className="flex-row items-center">
                                <Text className=" text-c_white text-xl font-Nunito_Bold">
                                    Añadir vaca
                                </Text>
                                <View className="px-8">
                                    <FontAwesomeIcon
                                        icon={icons.faCirclePlus}
                                        size={25}
                                        color="white"
                                    />
                                </View>
                            </View>}
                        onPress={() => router.push('livestock-form')}
                        buttonTestID="sign-in-google-button"
                    />
                </View>
                <FlatList
                    data={cows}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CowCard cow={item} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default Livestock;
import React from 'react';

import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import CustomButton from '../../../components/basic/custom-button';
import icons from '../../../constants/icons';

const Livestock = () => {
    return (
        <SafeAreaView className="flex-1 bg-c_background">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_ExtraBold border-b-2 border-c_white">
                Censo
            </Text>
            <ScrollView className="flex-1 bg-c_background">
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
                        onPress={() => console.log('press')}
                        buttonTestID="sign-in-google-button"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Livestock;
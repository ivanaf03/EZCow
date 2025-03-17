import React from 'react';

import { Text, View, SafeAreaView, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { router } from 'expo-router';

import CustomButton from '../../../components/basic/custom-button';
import icons from '../../../constants/icons';
import CowCard from './cow-card';
import { getAllCowsAvailableByUserId, getMaleCowsAvailableByUserId, getFemaleCowsAvailableByUserId, getCalvesAvailableByUserId } from '../../model/cow';
import { useUser } from '../../../hooks/providers/user-provider';
import CustomPicker from '../../../components/basic/custom-picker';

const Livestock = () => {

    const [cows, setCows] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState('Todo');

    const { user } = useUser();

    React.useEffect(() => {
        loadCows();
    }, [cows, filterValue]);

    const loadCows = async () => {
        if(filterValue === 'Todo') {
            setCows(await getAllCowsAvailableByUserId(user.id));
        } else if(filterValue === 'Ternero') {
            setCows(await getCalvesAvailableByUserId(user.id));
        } else if(filterValue === 'Toro') {
            setCows(await getMaleCowsAvailableByUserId(user.id));
        } else if(filterValue === 'Vaca') {
            setCows(await getFemaleCowsAvailableByUserId(user.id));
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-c_dark_gray">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
                Censo
            </Text>
            <View className="flex-1 flex-col bg-c_dark_gray">
                <View className="flex-row mt-2">
                    <CustomButton 
                        text={<View className="flex-row items-center">
                                <Text className="text-c_white text-xl font-Nunito_Medium">
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
                        buttonTestID="livestock-form-button"
                    />
                </View>
                <View>
                    <CustomPicker
                        text="Filtrar por fase"
                        value="Todo"
                        onValueChange={setFilterValue}
                        options={['Todo', 'Ternero', 'Vaca', 'Toro']}
                        pickerTestID="phase-picker"
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
import React from 'react';

import { Text, View, SafeAreaView, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { router } from 'expo-router';

import CustomButton from '../../../components/basic/custom-button';
import icons from '../../../constants/icons';
import CowCard from './cow-card';
import { getAllCalvesExitedByUserId, getAllCowsExitedByUserId, getAllCowsExitedByUserIdAndPhaseAndGender } from '../../model/cow';
import { useUser } from '../../../hooks/providers/user-provider';
import CustomPicker from '../../../components/basic/custom-picker';
import CustomSearchBar from '../../../components/basic/custom-search-bar';

const LivestockHistoric = () => {
    const [cows, setCows] = React.useState([]);
    const [allCows, setAllCows] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState('Todo');
    const [searchText, setSearchText] = React.useState('');
    const { user } = useUser();

    React.useEffect(() => {
        loadCows();
    }, [filterValue]);

    const loadCows = async () => {
        let fetchedCows = [];
        if (filterValue === 'Todo') {
            fetchedCows = await getAllCowsExitedByUserId(user.id);
        } else if (filterValue === 'Ternero') {
            fetchedCows = await getAllCalvesExitedByUserId(user.id, 'Ternero');
        } else if (filterValue === 'Vaca') {
            fetchedCows = await getAllCowsExitedByUserIdAndPhaseAndGender(user.id, 'Adulto', 'Femenino');
        } else if (filterValue === 'Toro') {
            fetchedCows = await getAllCowsExitedByUserIdAndPhaseAndGender(user.id, 'Adulto', 'Masculino');
        }
        setAllCows(fetchedCows);
        setCows(fetchedCows);
    };

    const handleShowCowsByName = (text) => {
        setSearchText(text);
        if (text === '') {
            setCows(allCows);
        } else {
            setCows(allCows.filter((cow) => cow.name.toLowerCase().includes(text.toLowerCase())));
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-c_dark_gray">
            <Text className="mt-2 pt-4 mx-4 text-c_white text-4xl font-Nunito_Bold border-b-2 border-c_white">
                Histórico
            </Text>
            <View className="flex-1 flex-col bg-c_dark_gray">
                <View className="flex-row justify-center">
                    <View className="m-4 w-[80%]">
                        <CustomButton
                            text={<View className="flex-col items-center">
                                <View className="px-2">
                                    <FontAwesomeIcon
                                        icon={icons.faCow}
                                        size={30}
                                        color="white"
                                    />
                                </View>
                                <Text className="text-c_white text-lg font-Nunito_Medium">
                                    Ver censo
                                </Text>
                            </View>}
                            onPress={() => router.replace('livestock')}
                            buttonTestID="livestock-button"
                        />
                    </View>
                </View>
                <View>
                    <CustomPicker
                        text="Filtrar por fase"
                        value={filterValue}
                        onValueChange={setFilterValue}
                        options={['Todo', 'Ternero', 'Vaca', 'Toro']}
                        pickerTestID="phase-picker"
                    />
                </View>
                <CustomSearchBar
                    text="Buscar por nombre"
                    value={searchText}
                    onChangeText={handleShowCowsByName}
                />
                <FlatList
                    data={cows}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CowCard cow={item} isExited={true} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default LivestockHistoric;
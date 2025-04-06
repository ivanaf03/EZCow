import React from 'react';

import { Text, View, SafeAreaView, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { router } from 'expo-router';

import CustomButton from '../../../components/basic/custom-button';
import icons from '../../../constants/icons';
import CowCard from './cow-card';
import { getAllCowsAvailableByUserId, getAllCowsAvailableByUserIdAndPhaseAndGender, getCalvesAvailableByUserId } from '../../model/cow';
import { useUser } from '../../../hooks/providers/user-provider';
import CustomPicker from '../../../components/basic/custom-picker';
import CustomSearchBar from '../../../components/basic/custom-search-bar';

const Livestock = () => {
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
            fetchedCows = await getAllCowsAvailableByUserId(user.id);
        } else if (filterValue === 'Ternero') {
            fetchedCows = await getCalvesAvailableByUserId(user.id);
        } else if (filterValue === 'Toro') {
            fetchedCows = await getAllCowsAvailableByUserIdAndPhaseAndGender(user.id, 'Adulto', 'Masculino');
        } else if (filterValue === 'Vaca') {
            fetchedCows = await getAllCowsAvailableByUserIdAndPhaseAndGender(user.id, 'Adulto', 'Femenino');
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
                    <CustomButton
                        text="Ver histórico"
                        onPress={() => router.push('livestock-historic')}
                        buttonTestID="livestock-historic-button"
                    />
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
                    renderItem={({ item }) => <CowCard cow={item} isExited={false} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default Livestock;
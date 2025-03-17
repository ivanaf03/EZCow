import React from 'react';

import { View, ScrollView, Alert, Text } from 'react-native';
import { router } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import CustomInput from '../../../components/basic/custom-input';
import CustomCalendar from '../../../components/basic/custom-calendar';
import { useUser } from '../../../hooks/providers/user-provider';
import CustomButton from '../../../components/basic/custom-button';
import { insertCow, getAvailableCowCodeByUserId, getCowIdByCode } from '../../model/cow';
import CustomPicker from '../../../components/basic/custom-picker';
import icons from '../../../constants/icons';

const LivestockForm = () => {

    const [code, setCode] = React.useState('');
    const [name, setName] = React.useState('');
    const [entryDate, setEntryDate] = React.useState(new Date());
    const [gender, setGender] = React.useState('Masculino');
    const [breed, setBreed] = React.useState('');
    const [phase, setPhase] = React.useState('Ternero');
    const [mothers, setMothers] = React.useState([]);
    const [mother, setMother] = React.useState('Desconocida');

    const { user } = useUser();

    React.useEffect(() => {
        loadCowCodes();
    }, []);

    const checkEntryDate = () => {
        return entryDate > new Date();
    };

    const loadCowCodes = async () => {
        const cowCodes = await getAvailableCowCodeByUserId(user.id);
        setMothers(['Desconocida', ...(cowCodes || [])]);
    };

    const handleAddCow = async () => {
        try {
            if (!code || !name || !entryDate || !gender || !breed) {
                Alert.alert('Error', 'Por favor, rellena todos los campos.');
                return;
            }

            if (checkEntryDate()) {
                Alert.alert('Error', 'La fecha de incorporación no puede ser después de hoy.');
                return;
            }

            const cowId = mother === 'Desconocida' ? null : await getCowIdByCode(mother);
            const formattedEntryDate = new Date(entryDate).toISOString().split("T")[0];
            await insertCow(code, name, formattedEntryDate, gender, breed, phase, user.id, cowId);

            loadCowCodes();

            router.replace('livestock');
        } catch (error) {
            Alert.alert('Error', 'Error al añadir el animal. Inténtalo de nuevo.');
        }
    };

    return (
        <ScrollView className="flex-1 bg-c_dark_gray">
            <View className="mt-8 py-4 mx-4 space-y-4 items-center border-l-2 border-r-2 border-c_light_blue rounded-2xl">
                <View className="w-[90%]">
                    <CustomInput
                        text="Código de chapa"
                        placeholder="Código"
                        onChangeText={setCode}
                    />
                </View>
                <View className="w-[90%]">
                    <CustomInput
                        text="Nombre de vaca"
                        placeholder="Nombre"
                        onChangeText={setName}
                    />
                </View>
                <View className="w-[90%]">
                    <CustomCalendar
                        text="Fecha de incorporación"
                        date={entryDate}
                        onChange={setEntryDate}
                    />
                </View>
                <View className="w-[90%]">
                    <CustomPicker
                        text="Género"
                        value={gender}
                        onValueChange={setGender}
                        options={['Masculino', 'Femenino']}
                        pickerTestID="gender-picker"
                    />
                </View>
                <View className="w-[90%]">
                    <CustomPicker
                        text="Fase"
                        value={phase}
                        onValueChange={setPhase}
                        options={['Ternero', 'Adulto']}
                        pickerTestID="phase-picker"
                    />
                </View>
                <View className="w-[90%]">
                    <CustomInput
                        text="Raza"
                        placeholder="Raza"
                        onChangeText={setBreed}
                    />
                </View>
                <View className="w-[90%]">
                    <CustomPicker
                        text="Madre"
                        value={mother}
                        onValueChange={setMother}
                        options={mothers}
                        pickerTestID="mother-picker"
                    />
                    <Text className="text-c_white px-4 text-sm font-Nunito_LightItalic">
                        Marcar como desconocida si el animal proviene de otra explotación o si la madre
                        no está registrada en la explotación.
                    </Text>
                </View>
                <View className="mt-6 w-[90%]">
                    <CustomButton text="Añadir" onPress={handleAddCow} buttonTestID="handle-add-cow-button" />
                </View>
            </View>
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
        </ScrollView>
    );
};

export default LivestockForm;
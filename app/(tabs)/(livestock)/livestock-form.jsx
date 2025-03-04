import React from 'react';

import { View, SafeAreaView, Alert } from 'react-native';

import CustomInput from '../../../components/basic/custom-input';
import CustomCalendar from '../../../components/basic/custom-calendar';
import { useUser } from '../../../hooks/providers/user-provider';
import CustomButton from '../../../components/basic/custom-button';
import { insertCow, getAvailableCowCodeByUserId, getCowIdByCode } from '../../model/cow';
import CustomPicker from '../../../components/basic/custom-picker';
import { router } from 'expo-router';

const LivestockForm = () => {

    const [code, setCode] = React.useState('');
    const [name, setName] = React.useState('');
    const [entryDate, setEntryDate] = React.useState(new Date());
    const [gender, setGender] = React.useState('Masculino');
    const [breed, setBreed] = React.useState('');
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
            if(!code || !name || !entryDate || !gender || !breed) {
                Alert.alert('Error', 'Por favor, rellena todos los campos.');
                return;
            }

            if(checkEntryDate()) {
                Alert.alert('Error', 'La fecha de incorporación no puede ser después de hoy.');
                return;
            }

            const cowId = mother === 'Desconocida' ? null : await getCowIdByCode(mother);
            const formattedEntryDate = new Date(entryDate).toISOString().split("T")[0];
            await insertCow(code, name, formattedEntryDate, gender, breed, user.id, cowId);
    
            loadCowCodes();
    
            router.replace('livestock');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Error al añadir el animal. Inténtalo de nuevo.');
        }
    };    

    return (
        <SafeAreaView className="flex-1 bg-c_background">
            <View className="mt-8 space-y-4">
                <View>
                    <CustomInput
                        text="Código de chapa"
                        placeholder="Código"
                        onChangeText={setCode}
                    />
                </View>
                <View>
                    <CustomInput
                        text="Nombre de vaca"
                        placeholder="Nombre"
                        onChangeText={setName}
                    />
                </View>
                <View>
                    <CustomCalendar
                        text="Fecha de incorporación"
                        date= {entryDate}
                        onChange={setEntryDate}
                    />
                </View>
                <View>
                    <CustomPicker
                        text="Género"
                        value={gender}
                        onValueChange={setGender}
                        options={['Masculino', 'Femenino']}
                        pickerTestID="gender-picker"
                    />
                </View>
                <View>
                    <CustomInput
                        text="Raza"
                        placeholder="Raza"
                        onChangeText={setBreed}
                    />
                </View>
                <View>
                    <CustomPicker
                        text="Madre"
                        value={mother}
                        onValueChange={setMother}
                        options={mothers}
                        pickerTestID="mother-picker"
                    />
                </View>
            </View>
            <View className="mt-8 flex-row justify-center">
                <CustomButton text="Añadir" onPress={handleAddCow} buttonTestID="handle-add-cow-button"/>
            </View>
        </SafeAreaView>
    );
};

export default LivestockForm;
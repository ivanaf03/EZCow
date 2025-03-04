import React from 'react';

import { Pressable, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { getAvailableCowNameById, setExitDateByCowId } from '../../model/cow';

import icons from '../../../constants/icons';

const CowCard = ({ cow }) => {

    const [motherName, setMotherName] = React.useState('Desconocida');

    React.useEffect(() => {
        const getMotherName = async () => {
            if (cow.mother_fk !== null) {
                const name = await getAvailableCowNameById(cow.mother_fk);
                setMotherName(name);
            }
        };
        
        getMotherName();
    }, []);

    const handleDeleteCow = async (cowId) => {
        await setExitDateByCowId(cowId);
    };

    return (
        <View className="flex-col my-2 space-y-4 p-4 ml-[-10] mr-6 bg-c_white rounded-r-3xl border-4 border-c_dark_violet">
            <View>
                <View className="flex-row items-center space-x-4">
                    <Text className="text-c_layout text-sm font-Nunito_Bold">
                        <FontAwesomeIcon
                            icon={icons.faCow}
                            size={40}
                            color="black"
                        />
                    </Text>
                    <Text className="text-c_light_violet text-2xl font-Nunito_Bold">
                        {cow.name}
                    </Text>
                </View>
                <View className="flex-col justify-between">
                    <View className="flex-row items-center space-x-2">
                        <Text className="text-c_layout text-md font-Nunito_Bold">
                            Crotal:
                        </Text>
                        <Text className="text-c_layout text-md font-Nunito_BoldItalic">
                            {cow.code}
                        </Text>
                    </View>
                    <View className="flex-col">
                        <Text className="text-c_layout text-sm font-Nunito_Bold">
                            Fecha de incorporación: {new Date(cow.entryDate).toLocaleDateString('es-ES')}
                        </Text>
                        <Text className="text-c_layout  text-sm font-Nunito_Bold">
                            Sexo: {cow.gender}
                        </Text>
                        <Text className="text-c_layout  text-sm font-Nunito_Bold">
                            Raza: {cow.breed}
                        </Text>
                        <Text className="text-c_layout  text-sm font-Nunito_Bold">
                            Es hijo/a de: {motherName}
                        </Text>
                    </View>
                </View>
            </View>
            <Pressable 
                className="flex-row space-x-2 p-2 items-center border-2 rounded-2xl max-w-[135]" 
                onPress={() => handleDeleteCow(cow.id)}
                testID="delete-cow-button"
            >
                <FontAwesomeIcon
                    icon={icons.faTrash}
                    size={25}
                    color="red"
                />
                <Text className="text-c_layout text-lg font-Nunito_Bold">
                    Dar de baja
                </Text>
            </Pressable> 
        </View>
    );     
};

export default CowCard;
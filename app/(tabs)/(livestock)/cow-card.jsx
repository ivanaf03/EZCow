import React from 'react';

import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { getCowNameById } from '../../model/cow';

import icons from '../../../constants/icons';

const CowCard = ({ cow }) => {

    const [motherName, setMotherName] = React.useState('Desconocida');

    React.useEffect(() => {
        const getMotherName = async () => {
            if (cow.mother_fk !== null) {
                const name = await getCowNameById(cow.mother_fk);
                setMotherName(name);
            }
        };
        
        getMotherName();
    }, []);

    return (
        <View className="flex-col my-2 gap-x-2 p-4 bg-c_white rounded-r-full border-4 border-c_dark_violet">
            <View className="flex-row items-center space-x-4">
                <Text className="text-c_layout text-sm font-Nunito_Bold">
                    <FontAwesomeIcon
                        icon={icons.faCow}
                        size={40}
                        color="black"
                    />
                </Text>
                <Text className="text-c_green text-4xl font-Nunito_Bold">
                    {cow.name}
                </Text>
            </View>
            <View className="flex-col justify-between">
                <View className="flex-row items-center space-x-4">
                    <Text className="text-c_layout text-md font-Nunito_Bold">
                        Crotal:
                    </Text>
                    <Text className="text-c_orange text-md font-Nunito_Bold">
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
    );
};

export default CowCard;
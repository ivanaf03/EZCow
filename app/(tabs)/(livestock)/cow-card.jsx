import React from 'react';

import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { getAvailableCowNameById, setExitDateByCowId } from '../../model/cow';

import icons from '../../../constants/icons';
import CustomButton from '../../../components/basic/custom-button';

const CowCard = ({ cow, isExited }) => {

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
        <View className="flex-col m-2 space-y-4 p-4 bg-c_light_gray rounded-xl border-r-4 border-c_light_blue">
            <View className="mb-2">
                <View className="flex-row items-center space-x-4 border-y-2 border-r-2 rounded-xl border-c_light_blue overflow-hidden">
                    <Text className="text-c_white text-sm font-Nunito_Bold">
                        <FontAwesomeIcon
                            icon={icons.faCow}
                            size={50}
                            color="white"
                        />
                    </Text>
                    <Text className="p-2 text-c_white text-2xl font-Nunito_Bold">
                        {cow.name}
                    </Text>
                </View>
                <View className="ml-2 mt-2 flex-col justify-between">
                    <View className="mb-2 flex-row items-center space-x-2">
                        <Text className="text-c_light_blue text-lg font-Nunito_BoldItalic underline">
                            {cow.code}
                        </Text>
                    </View>
                    <View className="flex-col p-2 border-l-2 border-c_white rounded-lg">
                        <Text className="text-c_white text-xl font-Nunito_Medium mb-2">
                            Datos:
                        </Text>
                        <Text className="text-c_white text-sm font-Nunito_Medium">
                            Se incorporó en: {new Date(cow.entryDate).toLocaleDateString('es-ES')}
                        </Text>
                        <Text className="text-c_white  text-sm font-Nunito_Medium">
                            Sexo: {cow.gender}
                        </Text>
                        <Text className="text-c_white  text-sm font-Nunito_Medium">
                            Raza: {cow.breed}
                        </Text>
                        <Text className="text-c_white  text-sm font-Nunito_Medium">
                            Fase: {cow.phase}
                        </Text>
                        <Text className="text-c_white text-sm font-Nunito_Medium">
                            Es hijo/a de: {motherName}
                        </Text>
                    </View>
                </View>
            </View>
            {!isExited && <CustomButton
                text={<View className="flex-row items-center w-[65%]">
                    <View className="px-2">
                        <FontAwesomeIcon
                            icon={icons.faTrash}
                            size={30}
                            color="white"
                        />
                    </View>
                    <Text className="text-c_white text-lg font-Nunito_Medium">
                        Dar de baja
                    </Text>
                </View>}
                onPress={() => handleDeleteCow(cow.id)}
                buttonTestID="delete-cow-button"
            /> }
        </View>
    );
};

export default CowCard;
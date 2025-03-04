import React from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomCalendar = ({ text, date, onChange }) => {
    const [showPicker, setShowPicker] = React.useState(false);
    const [formattedDate, setFormattedDate] = React.useState(date.toLocaleDateString('es-ES'));

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleConfirm = (event, selectedDate) => {
        if (selectedDate) {
            setShowPicker(false);
            setFormattedDate(selectedDate.toLocaleDateString('es-ES'));
            onChange(selectedDate);
        }
    };

    return (
        <View className="m-2 gap-y-1">
            <Text className="text-c_white text-sm font-Nunito_Light">
                {text}:
            </Text>
            <Pressable 
                className="p-2 bg-c_white border-2 border-c_dark_violet rounded-full"
                onPress={togglePicker}
                testID="date-picker-button"
            >
                <Text>{formattedDate}</Text>
            </Pressable>
            {showPicker && (
                <DateTimePicker
                    is24Hour={true}
                    value={date}
                    onChange={handleConfirm}
                    mode="date"
                    testID="calendar"
                />
            )}
        </View>
    );
};

export default CustomCalendar;

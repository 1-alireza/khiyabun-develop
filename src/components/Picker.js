import React, {useState} from 'react';
import {Text, View, Modal, Pressable, StyleSheet, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "./KhiyabunIcons";

const Picker = ({type, size, placeHolder}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const showPickerModal = () => {
        setShowPicker(true);
    };

    const handleChange = (event, selectedValue) => {
        const currentValue = selectedValue || date;
        setDate(currentValue);
        setShowPicker(false);

        if (type === 'date') {
            setSelectedDateTime(currentValue.toISOString().split('T')[0]);
        } else if (type === 'time') {
            setSelectedDateTime(currentValue.toTimeString().slice(0, 5));
        }
    };

    return (
        <View>
            <Pressable
                style={[styles.wrapper, size === 1 ? {width: Dimensions.get('window').width / 2 - 10} : {width: "100%"}]}
                onPress={showPickerModal}>

                {!selectedDateTime ? <Text style={styles.text}>{placeHolder}</Text> :
                    <Text>{selectedDateTime}</Text>}
                <KhiyabunIcons name="calender-outline" size={24} color={colors.onSurface}/>
            </Pressable>

            {showPicker && <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={type}
                is24Hour={true}
                display="default"
                onChange={handleChange}
            />}

        </View>
    );
};

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 8,
            height: 50,
            padding: 12,
            marginTop: 8,
            borderWidth: 1,
            borderColor: colors.outlineSurface,
            backgroundColor: colors.surfaceContainerLowest,
        },
        text: {
            fontFamily: "dana-regular",
            fontSize: 14,
            textAlign: 'left',
            lineHeight: 20,
            color: colors.onSurfaceLowest,
        },
    });
};

export default Picker;
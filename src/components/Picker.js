import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "./KhiyabunIcons";
import CustomText from "./CustomText";
import PersianDatePicker from "./JalaliDate";

const Picker = ({type, calenderType = "en", size, placeHolder, label, supportText, customStyles, onDateChange}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const showPickerModal = () => {
        setShowPicker(true);
    };

    const handleChangeGregorian = (event, selectedValue) => {
        const currentValue = selectedValue || date;
        let formattedDateTime;
        if (type === 'date') {
            formattedDateTime = currentValue.toISOString().split('T')[0];
        } else if (type === 'time') {
            formattedDateTime = currentValue.toTimeString().slice(0, 5);
        }
        setSelectedDateTime(formattedDateTime);
        if (onDateChange && formattedDateTime) {
            onDateChange(formattedDateTime);
        }
        setDate(currentValue);
        setShowPicker(false);
    };

    const handleChangeJalali = (date) => {
        onDateChange(date);
        setSelectedDateTime(date);
        setShowPicker(false);

    }

    return (
        <>
            <View style={customStyles}>
                {label &&
                <CustomText
                    size={14} color={colors.onSurface} lineHeight={16}
                    textAlign={'left'} customStyle={{marginBottom: -5, marginLeft: 3}}>
                    {label}
                </CustomText>
                }
                <Pressable
                    style={[styles.wrapper, size === 1 ? {width: Dimensions.get('window').width / 2 - 10} : {width: "100%"}]}
                    onPress={showPickerModal}>
                    {!selectedDateTime ?
                        <CustomText size={14} color={colors.onSurfaceLowest} textAlign={'left'} lineHeight={24}>
                            {placeHolder}
                        </CustomText> :
                        <CustomText size={14} color={colors.onSurface} weight={'bold'} textAlign={'left'}
                                    lineHeight={24}>
                            {selectedDateTime}
                        </CustomText>}
                    <KhiyabunIcons name="calender-outline" size={24} color={colors.onSurface}/>
                </Pressable>

                {showPicker && calenderType === "en" && <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={type}
                    is24Hour={true}
                    display="default"
                    onChange={handleChangeGregorian}
                />}
                {supportText &&
                <CustomText
                    size={12} color={colors.onSurfaceLow} lineHeight={16}
                    textAlign={'left'} customStyle={{marginTop: 3, marginLeft: 3}}>
                    {supportText}
                </CustomText>}
            </View>

            {showPicker && calenderType === "fa" &&
                <PersianDatePicker
                    onDateChange={(jalaliDate) => handleChangeJalali(jalaliDate)}
                    // selectedDate={jToday}
                />
            }
        </>

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
    });
};

export default Picker;

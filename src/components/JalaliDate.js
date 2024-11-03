import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import DatePicker from '@mohamadkh75/react-native-jalali-datepicker';
import {colors} from "react-native-elements";
import {useTheme} from "@react-navigation/native";
import gStyles from "../global-styles/GlobalStyles";


const PersianDatePicker = ({onDateChange, selectedDate, startDate = '1403/06/01'}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    return (
        <DatePicker
            style={{
                width: '95%',
                height: '90%',
                alignSelf: 'center',
                backgroundColor: colors.surfaceContainerLowest,
                borderWidth: 1.5,
                borderColor: colors.onSurfaceLowest,
                borderRadius: 10,
                elevation: 0.3,
                position: "absolute",
                top: 10,

            }}
            selected={selectedDate}
            dateSeparator='/'
            minDate={startDate}
            maxDate='1420/1/18'
            headerContainerStyle={{
                height: '15%',
                backgroundColor: colors.surfaceContainerLowest,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                paddingVertical: 10
            }}
            yearMonthBoxStyle={{
                width: '30%',
                height: '75%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10
            }}
            yearMonthTextStyle={{fontSize: 22, color: colors.onSurfaceLowest}}
            iconContainerStyle={{
                backgroundColor: colors.primaryContainer,
                borderRadius: 100,
                width: 30,
                height: 30
            }}
            backIconStyle={{
                width: 15,
                height: 15,
                resizeMode: 'center',
                tintColor: colors.darkPrimary
            }}
            nextIconStyle={{
                width: 15,
                height: 15,
                resizeMode: 'center',
                tintColor: colors.darkPrimary
            }}
            eachYearStyle={{
                width: 110,
                height: 82,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.surfaceContainerLowest,
                marginTop: '1.5%',
                marginBottom: 5,
                marginHorizontal: '1.5%',
                borderRadius: 10,
                elevation: 0.5
            }}
            eachYearTextStyle={{
                fontSize: 16,
                color: colors.onSurfaceLowest
            }}
            eachMonthStyle={{
                width: `${88 / 3}%`,
                height: `${88 / 4}%`,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "red",
                marginBottom: '3%',
                borderRadius: 10,
                elevation: 0.3
            }}
            eachMonthTextStyle={{fontSize: 16, color: 'white'}}
            weekdaysContainerStyle={{height: '10%'}}
            weekdayStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            weekdayTextStyle={{
                fontSize: 14,
                color: colors.onSurfaceLowest,
                marginBottom: 5,
                fontFamily: gStyles.fontBold.fontFamily

            }}
            borderColor='#4bcffa'
            dayStyle={{
                width: `${100 / 7}%`,
                justifyContent: 'center',
                alignItems: 'center',
                aspectRatio: 1
            }}
            selectedDayStyle={{
                width: '70%',
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
            }}
            selectedDayColor={colors.primary}
            dayTextStyle={{
                fontSize: 16
                ,
                fontFamily: gStyles.fontBold.fontFamily
            }}
            selectedDayTextColor='white'
            dayTextColor='#4bcffa'
            disabledTextColor='#4bcffa66'
            onDateChange={onDateChange}
        />
    );
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({});
};


export default PersianDatePicker;
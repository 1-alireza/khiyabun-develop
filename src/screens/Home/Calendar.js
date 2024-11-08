import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Dimensions} from 'react-native';
import {useTheme} from "@react-navigation/native";
import {useSelector} from "react-redux";
import CustomText from "../../components/CustomText";

const Calendar = () => {
    const lang = useSelector(state => state.language.language);
    const styles = useThemedStyles();
    const [activeDay, setActiveDay] = useState(3);
    const [hasUnread, setHasUnread] = useState(5);
    const {colors} = useTheme();
    const handleDayPress = (index) => {
        setActiveDay(index);
    };

    const today = new Date();

    const formatDateToParts = (date, locale, options) => {
        const formatter = new Intl.DateTimeFormat(locale, options);
        const parts = formatter.formatToParts(date);
        const result = {};
        parts.forEach(part => {
            result[part.type] = part.value;
        });
        return result;
    };

    const formatDate = (date, lang) => {
        const locale = lang === 'fa' ? 'fa-IR' : 'en-US';
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            calendar: lang === 'fa' ? 'persian' : 'gregory'
        };
        return formatDateToParts(date, locale, options);
    };

    const todayParts = formatDate(today, lang);
    const year = lang === 'fa' ? todayParts.yearName : todayParts.year;
    const month = todayParts.month;

    const dates = [];
    const weekdays = lang === 'fa' ? ['ی شنبه', 'د شنبه', 'س شنبه', 'چ شنبه', 'پ شنبه', 'جمعه', 'شنبه']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = -3; i <= 3; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateParts = formatDate(date, lang);
        const dateNum = dateParts.day;
        const dayName = weekdays[date.getDay()];

        dates.push({
            day: dayName,
            date: dateNum,
        });
    }

    return (
        <View style={styles.container}>

            <CustomText size={19} color={colors.onSurface} weight={'bold'} lineHeight={30}>{month} {year}</CustomText>

            <View style={{flexDirection: 'row'}}>
                {dates.map((date, i) => (
                    <Pressable
                        style={[styles.weekDaysWrapper, activeDay === i && styles.activeDay]}
                        key={i}
                        onPress={() => handleDayPress(i)}
                    >
                        <CustomText
                            size={10} color={colors.onSurfaceLowest} weight={'bold'} lineHeight={16}
                            textAlign={'center'} customStyle={activeDay === i && styles.activeDayText}>
                            {date.day}
                        </CustomText>
                        <CustomText size={20} color={colors.onSurface} lineHeight={30} letterSpacing={0.2}
                                    customStyle={activeDay === i && styles.activeDayText}>
                            {date.date}
                        </CustomText>
                        {/*<View style={[styles.todayBadge, hasUnread === i && styles.activeDayBadge]}></View>*/}
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        container: {
            marginBottom: 20,
            marginTop: 10,
        },
        weekDaysWrapper: {
            width: (Dimensions.get('window').width - 58) / 7,
            height: 64,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.surfaceContainerLowest,
            paddingVertical: 12,
            paddingHorizontal: 0,
            marginVertical: 0,
            marginHorizontal: 2,
            borderRadius: 6,
        },
        todayBadge: {
            width: 6,
            height: 6,
            margin: 0,
            borderRadius: 16,
            borderTopLeftRadius: 16,
            backgroundColor: colors.primary,
            alignContent: 'center',
            opacity: 0,
        },
        activeDayBadge: {
            opacity: 1,
        },
        activeDay: {
            backgroundColor: colors.primary,
        },
        activeDayText: {
            color: colors.textOn,
        },

    });
};

export default Calendar;

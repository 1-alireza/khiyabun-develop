import DateTimePicker from "@react-native-community/datetimepicker";
import React, {forwardRef, useEffect, useState} from "react";
import {I18nManager, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import CustomText from "./CustomText";
import {useTheme} from "@react-navigation/native";
import stylesheet from "react-native-web/dist/exports/StyleSheet";
import gStyles from "../global-styles/GlobalStyles";
import KhiyabunIcons from "./KhiyabunIcons";

const TimePicker = forwardRef((
    {
        customStyle,
        label = "",
        placeholder,
        leftIcon,
        onTimeChange,
        onRemoveTime,
        isDisabled = false,
        hasError,
        errorText
    }, ref) => {
    const {colors} = useTheme();
    const styles = useThemedStyles();

    const [showPicker, setShowPicker] = useState(false);
    const [initTime, setInitTime] = useState(new Date());
    const [timeValue, setTimeValue] = useState(''); // حالت جدید برای نگه‌داشتن زمان انتخاب شده

    useEffect(()=>{
        if(isDisabled) {
            setTimeValue("")
        }
    },[isDisabled])
    const onShowHandler = () => {
        if(!isDisabled) {
            setShowPicker(true);
        }
    }
    const onChangeStartDate = (event, selectedDate) => {
        if (event.type === 'dismissed' || !selectedDate) {
            setShowPicker(false);
            return;
        }
        const formattedTime = selectedDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        setShowPicker(false);
        setTimeValue(formattedTime);

        if (onTimeChange) {
            onTimeChange(formattedTime);
        }
        ref.current.setNativeProps({text: formattedTime});
    };
    const onRemoveHandler = () => {
        onRemoveTime("");
        setTimeValue("");
    }
    return (
        <>
            {label &&
                <CustomText
                    size={14} color={colors.onSurface} lineHeight={16}
                    textAlign={'left'}
                    customStyle={{marginBottom: 5, marginLeft: 3}}
                >
                    {label}
                </CustomText>
            }
            <TouchableOpacity
                onPress={onShowHandler}
                style={[gStyles.inputContainer, styles.inputContainer, customStyle,hasError? {borderColor: colors.error}:'']}
                activeOpacity={1}>
                {leftIcon &&
                    <KhiyabunIcons
                        name={leftIcon}
                        size={20}
                        color={hasError?colors.error:isDisabled?colors.outlineLow:colors.onSurfaceLow}/>
                }
                <TextInput
                    ref={ref}
                    style={[gStyles.input, styles.input ,{color:hasError?colors.error:timeValue?colors.onSurface:colors.onSurfaceLowest}]}
                    value={timeValue}
                    placeholderTextColor={hasError?colors.error:isDisabled?colors.outlineLowest:colors.onSurfaceLowest}
                    editable={false}
                    placeholder={placeholder}
                />
                {timeValue &&
                    <TouchableOpacity onPress={onRemoveHandler} activeOpacity={1}>
                        <KhiyabunIcons
                            name="close-circle-outline"
                            size={20}
                            color={hasError?colors.error:colors.onSurfaceLow}/>
                    </TouchableOpacity>
                }
            </TouchableOpacity>

            {hasError &&
                <CustomText size={10} customStyle={{paddingHorizontal: 5,color:colors.error}}>{errorText}</CustomText>
            }
            {showPicker &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={initTime}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStartDate}
                />
            }
        </>
    )
});

const useThemedStyles = () => {
    const {colors} = useTheme();
    const isRTL = I18nManager.isRTL;

    return stylesheet.create({
        inputContainer: {
            flexDirection: (isRTL)?'row-reverse':'row',
            backgroundColor: colors.surfaceContainerLowest,
            borderColor: colors.outlineSurface,
        },
        input: {
            paddingHorizontal:3
        },
    })
}

export default TimePicker;

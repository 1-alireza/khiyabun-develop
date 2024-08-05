import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import { Dropdown } from 'react-native-element-dropdown';
import KhiyabunIcons from "./KhiyabunIcons";

const CustomDropdown = ({
        data,
        icon,
        label,
        callBackFunction,
        placeHolder = "country",
        searchPlaceHolder = "search",
        defaultValue = null,
        style
    }) => {

    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    const [value, setValue] = useState(defaultValue);
    const [isFocus, setIsFocus] = useState(false);


    const renderLabel = () => {
        return (
            <Text style={[styles.label, isFocus && {color: colors.primary}]}>
                {label}
            </Text>
        );
    };

    const onChangeHandler = item => {
        setValue(item.value);
        setIsFocus(false);
        callBackFunction(item.value);
    }

    return (
        <View style={[styles.container,style]}>
            {label?renderLabel():''}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: colors.primary }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? t(placeHolder) : t(placeHolder)}
                searchPlaceholder={t(searchPlaceHolder)}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={onChangeHandler}
                renderLeftIcon={() => (
                    icon &&
                    <KhiyabunIcons
                        style={styles.icon}
                        color={isFocus ? colors.primary : colors.onSurfaceLowest}
                        name={icon}
                        size={20}
                    />
                )}
            />
        </View>
    );
};
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            paddingVertical: 16,
            width: '100%'
        },
        dropdown: {
            height: 48,
            borderColor: colors.outlineSurface,
            backgroundColor: colors.surfaceContainerLowest,
            borderWidth: 1,
            borderRadius: 8,
            padding: 10
        },
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            color: colors.onSurfaceLowest,
            backgroundColor: colors.surfaceContainerLowest,
            left: 10,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },
        placeholderStyle: {
            fontSize: 14,
            color: colors.onSurfaceLowest
        },
        selectedTextStyle: {
            fontSize: 14,
            color: colors.onSurfaceLowest,
            backgroundColor: colors.surfaceContainerLowest
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 14,
            color: colors.onSurfaceLowest,
            backgroundColor: colors.surfaceContainerLowest
        },
    });
}

export default CustomDropdown;

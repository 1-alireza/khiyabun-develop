import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Dropdown} from 'react-native-element-dropdown';
import KhiyabunIcons from "./KhiyabunIcons";
import gStyles from "../global-styles/GlobalStyles";

const CustomDropdown = ({
                            data,
                            icon,
                            label,
                            callBackFunction,
                            placeHolder = "country",
                            searchPlaceHolder = "search",
                            defaultValue = null,
                            style,
                            dropDownStyle,
                            search=false
                        }) => {

    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    const [value, setValue] = useState(defaultValue);
    const [isFocus, setIsFocus] = useState(false);
    const [isSelected, setIsSelected] = useState(false);


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
        setIsSelected(true);
        callBackFunction(item.value);
    }

    return (
        <View style={[styles.container, style]}>
            {label ? renderLabel() : ''}
            <Dropdown
                itemContainerStyle={{
                    backgroundColor: colors.surfaceContainerLowest,
                }}
                selectedItemStyle={{
                    backgroundColor: colors.outlineLowest,
                }}

                itemTextStyle={{
                    color: colors.onSurfaceLowest,
                }}

                style={[styles.dropdown, isFocus && {borderColor: colors.primary}, isSelected && {borderColor: colors.primary}, dropDownStyle]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[styles.selectedTextStyle,isSelected && {color: colors.primary}]}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={search}
                fontFamily={gStyles.fontMain.fontFamily}
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
                        color={isSelected ? colors.primary : colors.onSurfaceLowest}
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
            padding: 10,
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
            color: colors.onSurfaceLowest,
            fontFamily:gStyles.fontMain.fontFamily
        },
        selectedTextStyle: {
            fontSize: 14,
            color: colors.onSurfaceLowest,
            backgroundColor: 'transparent',
            fontFamily:gStyles.fontMain.fontFamily
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

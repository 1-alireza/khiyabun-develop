import React from 'react';
import {Text, StyleSheet, I18nManager} from 'react-native';
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import KhiyabunIcons from "../components/KhiyabunIcons";
import gStyles from "../global-styles/GlobalStyles";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useTheme} from "@react-navigation/native";
import CustomText from "./CustomText";

const CustomMenu = ({
                        items, triggerIcon = {
        name: "more-bold",
        size: 20
    }, width = 220
                    }) => {
    const userToken = useSelector(state => state.login.token);
    const {colors} = useTheme();
    const {t, i18n} = useTranslation();
    const isRTL = I18nManager.isRTL;
    const styles = useThemedStyles(colors, width)
    return (
        <Menu>
            <MenuTrigger>
                <KhiyabunIcons name={triggerIcon.name} size={triggerIcon.size} color={colors.onSurface}/>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={isRTL ? styles.popUpRTl : styles.popUp}>
                {items.map((item, index) => (
                    <MenuOption
                        key={index}
                        style={[styles.popUpOption, item.style]}
                        onSelect={item.onSelect}
                    >
                        <KhiyabunIcons name={item.icon} size={20} color={colors.onSurfaceHigh}/>
                        <CustomText size={16} lineHeight={24} color={colors.onSurfaceHigh}>
                            {t(item.text)}
                        </CustomText>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    );
};

const useThemedStyles = (colors, width) => {
    return StyleSheet.create({
        popUpRTl: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            position: "relative",
            left: 0,
            marginLeft: 155,
            paddingRight: 20,
            width: width
        },
        popUp: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
        },
        popUpOption: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "flex-start",
            height: 57,
            gap: 8,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            paddingVertical: 8,
            paddingHorizontal: 12

        },
        popUpOptionText: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurfaceHigh
        },

    });
};


export default CustomMenu;
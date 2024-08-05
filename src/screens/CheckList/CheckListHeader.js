import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {I18nManager, StyleSheet, Text} from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React from "react";

export default function CheckListHeader() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)

    return (
        <Menu>
            <MenuTrigger>
                <KhiyabunIcons name={"sort-descending-outline"} size={20} color={colors.onSurface}/>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.popUp}>
                <MenuOption style={styles.popUpOption} onSelect={() => console.log("item")}>
                    <KhiyabunIcons name={"calender-outline"} size={20} color={colors.onSurfaceHigh}/>
                    <Text style={styles.popUpOptionText}>{t("sort_by_date")}</Text>
                </MenuOption>
                <MenuOption style={styles.popUpOption} onSelect={() => console.log("item")}>
                    <KhiyabunIcons name={"small-caps-outline"} size={20} color={colors.onSurfaceHigh}/>
                    <Text style={styles.popUpOptionText}>{t("sort_by_title")}</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}

const useThemedStyles = (colors, isRtl) => {
    return StyleSheet.create({
        popUp: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            width:"55%"
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
            fontFamily: 'dana-regular',
            color: colors.onSurfaceHigh
        },
    });
};

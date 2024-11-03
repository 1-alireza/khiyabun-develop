import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { I18nManager, StyleSheet, Text } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React from "react";
import gStyles from "../../global-styles/GlobalStyles";
import CustomMenu from "../../components/customMenu";

export default function CheckListHeader() {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const menuItems = [
        {
            text: "sort_by_date",
            onSelect: () => console.log("createDate"),
            icon: "calender-outline"
        },
        {
            text: "sort_by_title",
            onSelect: () => console.log("title"),
            icon: "small-caps-outline"
        },
    ];


    const triggerIcon = {
        name: "sort-descending-outline",
        size: 20
    }
    return (
        <CustomMenu items={menuItems} triggerIcon={triggerIcon} />
    )
}



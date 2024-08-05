import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, Pressable} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, {useState} from "react";
import AddFormCard from "./AddFormCard";
import CustomDropdown from "../../components/CustomDropdown";


function FloorData() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const supportOptions = [
        {label: "Start a conversation", value: "Start a conversation"},
        {label: "Report a bug", value: "Report a bug"},
        {label: "Features request", value: "Features request"},
        {label: "Talk to cofounders", value: "Talk to cofounders"},
    ]

    return (
        <AddFormCard header={t("floor")}>
            <CustomDropdown style={styles.customDropdown} data={supportOptions} placeHolder={t("floor_num")}/>
            <CustomDropdown style={styles.customDropdown} data={supportOptions}  placeHolder={t("property_floor")}/>
            <CustomDropdown style={styles.customDropdown} data={supportOptions}  placeHolder={t("total_units")}/>
        </AddFormCard>

    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        customDropdown: {
            paddingVertical:10
        }
    });
};
export default FloorData
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, Pressable} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, {useState} from "react";
import {CheckBox} from "@rneui/themed"
import AddFormCard from "./AddFormCard";
import Input from "../../components/Input";


function AddDetails() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)


    return (
        <AddFormCard header={t("address_details")}>
            <View style={styles.checkBoxWrapper}>
                <Input placeholder={t("your_address")} customStyles={styles.input}></Input>
                <View style={styles.inputWrapper}>
                    <Input placeholder={t("zip_code")} customStyles={{width: "49%"}}
                    />
                    <Input placeholder={t("postal_code")} customStyles={{width: "49%"}}
                    />
                </View>
            </View>

        </AddFormCard>

    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardWrapper: {
            paddingHorizontal: 4,
            width: "50%"
        },
        input: {
            marginVertical: 10
        },
        inputWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 2,
        },

    });
};
export default AddDetails
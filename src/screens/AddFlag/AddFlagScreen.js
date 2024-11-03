import Card from "../../components/Card";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, Platform} from "react-native";
import FlagStatus from "./FlagStatus";
import FlagsCategory from "./FlagsCategory";
import FlagTitle from "./FlagTitle";
import React, {useState} from "react";
import FlagMap from "./FlagMap";
import Button from "../../components/Button";

export default function AddFlagScreen({navigation}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)

    return (
        <>
            <View style={styles.mainView}>
                <Card>
                    <FlagStatus/>
                    <FlagsCategory/>
                    <FlagTitle/>
                    {/*<FlagMap/>*/}
                </Card>

            </View>
            <Button
                onPress={() => {
                    navigation.navigate("AddedPlace");
                    if (Platform.OS !== 'android') window.history.pushState({}, 'AddedPlace');
                }}
                label={t("confirm")}
                sizeButton="large"
                width={90}
                typeButton="full"
                colorButton="primary"
                isBorder={true}
                borderColor="light"
                style={styles.confirmButton}
                styleText={styles.confirmButtonTextStyle}
            />
        </>

    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
        },
        confirmButton: {
            position: "absolute",
            bottom: 10,
            marginLeft: 20
        },
        confirmButtonTextStyle: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.textOn
        }
    });
};
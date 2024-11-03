import React, {useEffect, useRef, useState} from "react";
import {View, Text, StyleSheet, Platform} from "react-native"
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Linking} from 'react-native';
import BaseLogin from "../../components/BaseLogin";
import Button from "../../components/Button";
import gStyles from '../../global-styles/GlobalStyles';

const LoginScreen = ({navigation}) => {
    const handleOpenNotificationSettings = async () => {
        await Linking.openSettings();
    };
    const {t} = useTranslation();
    const styles = useThemedStyles();

    const signInHandler = async () => {
        navigation.navigate("LoginWithMobile");
        if (Platform.OS !== 'android') window.history.pushState({}, 'LoginWithMobile');
    }


    return (
        <BaseLogin
            title={t("welcome")}
            description={t("login_description")}
            bottomContent={t("buy_account_text")}
        >
            <Button
                onPress={signInHandler}
                label={t('sign_in')}
                styleText={{lineHeight:24}}
            />
            <View style={styles.notAccountWrapper}>
                <Text style={styles.textNotAccount}>
                    {t('not_account')}
                </Text>
                <Button
                    onPress={() => {
                        navigation.navigate("Register");
                        if (Platform.OS !== 'android') window.history.pushState({}, 'Register');
                    }}
                    typeButton="full"
                    sizeButton="small"
                    colorButton="secondary"
                    label={t('sign_up')}
                    width={20}
                    style={styles.singUpButton}
                    styleText={styles.singUpText}
                />
            </View>
        </BaseLogin>
    );
}

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        notAccountWrapper: {
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
            justifyContent: "center"
        },
        textNotAccount: {
            ...gStyles.fontMain,
            color: colors.onSurface
        },
        singUpButton: {
            marginTop: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            height: "auto"
        },
        singUpText: {
            ...gStyles.fontBold
        }
    });
};

export default LoginScreen;

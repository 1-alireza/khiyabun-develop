import React from "react";
import {View, StyleSheet, Platform} from "react-native"
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import BaseLogin from "../../components/BaseLogin";
import Button from "../../components/Button";
import EnteredMobileSection from "./EnterMobileSection";
import CustomText from "../../components/CustomText";
import gStyles from "../../global-styles/GlobalStyles";

export const SignInWithUserName = ({navigation}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <CustomText customStyle={styles.textNotAccount}>{t("or")}</CustomText>
            <Button
                onPress={() => {
                    navigation.navigate("LoginWithUsername");
                    if (Platform.OS !== 'android') window.history.pushState({}, 'LoginWithUsername');
                }}
                label={t('login_with_username')}
                typeButton="full"
                sizeButton="small"
                colorButton="secondary"
                styleText={styles.singUpText}
            />
        </View>
    )
};


const LoginWithMobileScreen = ({navigation}) => {
    const {t} = useTranslation();
    return (
        <BaseLogin
            title={t("enter_mobile_title")}
            description={t("enter_mobile_description")}
            bottomContent={<SignInWithUserName navigation={navigation}/>}
        >
            <EnteredMobileSection navigation={navigation} typeSend="login"/>
        </BaseLogin>
    );
}
const useThemedStyles = (colors) => {

    return StyleSheet.create({
        notAccountWrapper: {
            flexDirection: "row",
            justifyContent:"center",
            marginTop: 10,
            width:"100%",
            direction: "rtl"
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
            ...gStyles.fontMain
        },
        phone_number:{
            width: "100%",
            marginBottom: 15
        }
    });
};

export default LoginWithMobileScreen;

import {useTheme} from "@react-navigation/native";
import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {postRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";
import CustomDropdown from "../../components/CustomDropdown";
import Input from "../../components/Input";
import Button from "../../components/Button";
import gStyles from "../../global-styles/GlobalStyles";
import {COUNTRY_CODE} from "../../utils/constant";

const EnteredMobileSection = ({navigation, typeSend}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    const [phoneEntered, setPhoneEntered] = useState("");
    const [countryCode, setCountryCode] = useState("98");
    const [loader, setLoader] = useState(false);
    const selectCountry = (country) => {
        setCountryCode(country);
    }
    const onChangePhoneHandler = (value) => {
        setPhoneEntered(value);
    }

    const getSmsCode = async () => {
        setLoader(true);
        try {
            let api,
                body = {mobileNumber: phoneEntered};
            switch (typeSend) {
                case "register":
                    api = 'users/send_verification_code';
                    break;
                case "forget-password":
                    api = 'users/reset_password_send_code';
                    break;
                default:
                    api = 'users/login_send_code';
            }
            const response = await postRequest(api, body, false);
            if (response.statusCode === 200) {
                errorHandling(response, "confirm");
                navigation.navigate('SmsVerify', {
                    phone_number: phoneEntered,
                    type_send: typeSend,
                    country_code: countryCode
                })
            } else {
                errorHandling(response, "warning");
            }
        } catch (e) {
            errorHandling(t("default_error"), "error");
        }
        setLoader(false);
    }
    const redirectHandler = () => {
        if (typeSend === "register") {
            navigation.goBack()
        } else {
            navigation.navigate("Register")
        }
    }

    return (
        <>
            <CustomDropdown
                data={COUNTRY_CODE}
                callBackFunction={selectCountry}
                defaultValue={countryCode}
            />
            <Input customStyles={styles.phoneNumber}
                   type="number"
                   placeholder={t("phone_number")}
                   prefixNumber={'+' + countryCode}
                   maxLength={11}
                   onChangeText={onChangePhoneHandler}
                   value={phoneEntered}
            />
            <Button
                onPress={getSmsCode}
                label={t('verify')}
                sizeButton="medium"
                disabled={!(phoneEntered.trim().length === 11)}
                showLoader={loader}
            />
            {(typeSend === "register" || typeSend === "login") &&
                <View style={styles.hasAccountWrapper}>
                    <Text style={styles.textHasAccount}>
                        {(typeSend === "register") ? t('have_account') : t('not_account')}
                    </Text>
                    <Button
                        onPress={redirectHandler}
                        typeButton="full"
                        sizeButton="small"
                        colorButton="secondary"
                        label={(typeSend === "register") ? t('sign_in') : t('sign_up')}
                        width={20}
                        style={styles.singUpButton}
                        styleText={styles.singUpText}
                    />
                </View>
            }
        </>
    )
}

const useThemedStyles = (colors) => {

    return StyleSheet.create({
        hasAccountWrapper: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            width: "100%",
            direction: "rtl"
        },
        textHasAccount: {
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurface
        },
        singUpButton: {
            marginTop: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            height: "auto"
        },
        singUpText: {
            fontFamily: gStyles.fontBold.fontFamily,
            marginTop: -1
        },
        phoneNumber: {
            width: "100%",
            marginBottom: 15
        }
    });
};

export default EnteredMobileSection;


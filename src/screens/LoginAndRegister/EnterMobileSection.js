import {useTheme} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {I18nManager, Platform, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {getRequest, postRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";
import CustomDropdown from "../../components/CustomDropdown";
import Input from "../../components/Input";
import Button from "../../components/Button";
import gStyles from "../../global-styles/GlobalStyles";
import {MOBILE_START_REGEX} from "../../utils/constant";
import CustomText from "../../components/CustomText";

const EnteredMobileSection = ({navigation, typeSend}) => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    const [phoneEntered, setPhoneEntered] = useState("");
    const [countryCode, setCountryCode] = useState("00");
    const [countryCodes, setCountryCodes] = useState([]);
    useEffect(() => {
        const getCountriesCode = async () => {
            let api = "countries";
            let response = await getRequest(api, {}, "");
            let countriesCode = response.data.map((item) => (
                    {label: item.name, value: item.code}
                )
            )
            // console.log("response get countries code", countriesCode);
            setCountryCodes(countriesCode);
        };
        getCountriesCode();
    }, [])

    const [loading, setLoading] = useState(false);
    const selectCountry = (country) => {
        setCountryCode(country);
        setPhoneEntered("");
    }
    const onChangePhoneHandler = (value) => {
        setPhoneEntered(value);
    }
    const getSmsCode = async () => {
        setLoading(true);
        try {
            let mobile = "+" + countryCode + phoneEntered;
            if (countryCode === "98") {
                mobile = "+" + countryCode + (phoneEntered.replace(/^0/, ""));
            }
            let api,
                body = {mobileNumber: mobile};
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
            const response = await postRequest(api, body, "");
            if (response.statusCode === 200) {
                errorHandling(response, "confirm");
                navigation.navigate("SmsVerify",{
                    phone_number: phoneEntered,
                    type_send: typeSend,
                    country_code: countryCode
                });
                if (Platform.OS !== 'android') window.history.pushState({}, 'SmsVerify');
            } else {
                errorHandling(response, "warning");
            }
        } catch (e) {
            errorHandling(t("default_error"), "error");
        }
        setLoading(false);
    }
    const redirectHandler = () => {
        if (typeSend === "register") {
            navigation.goBack()
        } else {
            navigation.navigate("Register");
            if (Platform.OS !== 'android') window.history.pushState({}, 'Register');
        }
    }
    let disabledButton = !(
        (countryCode === "98" && MOBILE_START_REGEX.test(phoneEntered) && phoneEntered.length >= 10) ||
        (countryCode !== "98" && countryCode !== "00" && phoneEntered.length > 6)
    );
    return (
        <>
            <CustomDropdown
                search={true}
                data={countryCodes}
                callBackFunction={selectCountry}
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
                disabled={disabledButton}
                showLoading={loading}
            />
            {(typeSend === "register" || typeSend === "login") &&
                <View style={styles.hasAccountWrapper}>
                    <CustomText color={colors.onSurface}>
                        {(typeSend === "register") ? t('have_account') : t('not_account')}
                    </CustomText>
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
            marginBottom: 15,
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
        }
    });
};

export default EnteredMobileSection;


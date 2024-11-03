import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import Button from "../../components/Button";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import gStyles from "../../global-styles/GlobalStyles";
import {postRequest} from "../../utils/sendRequest";
import CustomToast from "../../components/CustomToast";
import i18n from "i18next";
import {errorHandling} from "../../utils/errorHandling";

const ReSendSmsTimer = ({initialTime,phoneNumber,typeSend}) => {
    const {t} = useTranslation();
    const styles = useThemedStyles();
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(true);
    const intervalRef = useRef(null);
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    const [minutes, seconds] = prevTime.split(':').map(Number);
                    let newMinutes = minutes;
                    let newSeconds = seconds - 1;

                    if (newSeconds < 0) {
                        newMinutes -= 1;
                        newSeconds = 59;
                    }

                    if (newMinutes < 0) {
                        clearInterval(intervalRef.current);
                        return '00:00';
                    }

                    const formattedMinutes = newMinutes < 10 ? `0${newMinutes}` : newMinutes;
                    const formattedSeconds = newSeconds < 10 ? `0${newSeconds}` : newSeconds;

                    return `${formattedMinutes}:${formattedSeconds}`;
                });
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    useEffect(() => {
        if (time === '00:00') {
            setIsRunning(false);
        }
    }, [time]);

    const restTimer = async () => {
        try {
            let api,
                body = {
                    mobileNumber: phoneNumber
                };
            console.log(body);
            switch (typeSend){
                case "register":
                    api = 'users/send_verification_code';
                    break;
                case "change-password":
                    api = 'users/reset_password_send_code';
                    break;
                default:
                    api = 'users/login_send_code';
            }
            let response = await postRequest(api, body,"");
            console.log("resend sms response:", response);
            if (response.statusCode === 200) {
                errorHandling(response,"confirm");
                setTime(initialTime)
                setIsRunning(true);
            } else {
                errorHandling(response,"error");
            }
        }
        catch (e){
            errorHandling(t("default_error"),"error");
        }
    }
    return (
        <View style={styles.container}>
            {time !== '00:00' && (<Text style={styles.timer}>{t("resend_in")} {time}</Text>)}
            {time === '00:00' && (
                <Button
                    onPress={restTimer}
                    label={t("resend_code")}
                    sizeButton="small"
                    width={33}
                    typeButton="full"
                    colorButton="transparent"
                    style={styles.reSendButton}
                />
            )}
        </View>
    );
};
const useThemedStyles = () => {
    const {colors} = useTheme();
    return StyleSheet.create({
        container: {
            width: "100%",
            marginBottom: 20
        },
        timer: {
            fontFamily: (I18nManager.isRTL)?gStyles.danaPersianNumber.fontFamily: gStyles.fontMain.fontFamily,
            fontSize: 14,
            color: colors.onSurface
        },
        reSendButton: {
            paddingHorizontal: 0,
            paddingVertical: 0,
            height: "auto",
            justifyContent: "flex-start",
            alignItems: "flex-start"
        }
    });
}

export default ReSendSmsTimer;

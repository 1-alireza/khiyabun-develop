import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import React, {useState} from "react";
import Input from "../../components/Input";

const SecurityPassSheet = ({isVisible, onClose}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [securityPass, setSecurityPass] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const icon = isPasswordVisible ? "visibility-outline" : "visibility-off-outline"


    const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);


    const getPassword = (password) => setSecurityPass(password);


    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("Enter_your_password")}</Text>
            </View>
            <View style={styles.sheetBody}>
                <Input placeholder={"Password"}
                       iconFunctionCallBack={togglePasswordVisibility}
                       secureTextEntry={!isPasswordVisible}
                       supportText={"Forgot password?"}
                       rightIcon={icon}
                       onChangeText={getPassword}
                />
            </View>
            <View style={styles.sheetOptions}>
                <Button label={t("cancel")} sizeButton={"small"} style={styles.cancelButton} width={40}
                        styleText={styles.cancelButtonText} onPress={onClose}/>
                <Button label={t("Continue")} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={60} onPress={onClose}
                        isBorder={true} borderColor={colors.primaryOutline}/>
            </View>
        </Sheet>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetBody: {
            paddingBottom: 16,
            flexDirection: "column",
            gap: 8,
            width: "100%",
            height: 120
        },
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",

            bottom: 0,
            marginBottom: 20,
            width: "100%",
        },
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center"
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },
        cancelButton: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            justifyContent: "center",
            alignItems: "center"
        },
        cancelButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        sheetHeaderText: {
            paddingHorizontal: 16,
            color: colors.onSurface,
            fontFamily: "dana-bold",
            lineHeight: 24
        },

    });
};


export default SecurityPassSheet;
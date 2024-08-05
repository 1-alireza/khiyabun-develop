import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useTranslation} from 'react-i18next'; // استفاده از useTranslation برای دسترسی به توابع مدیریت زبان
import {useDispatch, useSelector} from "react-redux";
import * as Updates from 'expo-updates';
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../utils/i18n";
import {useTheme} from "@react-navigation/native";
import {changeLanguageState} from "../redux/slices/languageSlice";
import Sheet from "./Sheet";
import {LANGUAGE_KEY} from "../utils/constant";

import gStyles from "../global-styles/GlobalStyles";
import globalStyles from "../global-styles/GlobalStyles";

const LanguageSwitcher = ({isVisible,onClose}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language.language);
    const {t} = useTranslation();

    const changeLanguage = async (lang) => {
        try {
            await AsyncStorage.setItem(LANGUAGE_KEY, lang);
            await i18n.changeLanguage(lang); // تغییر زبان با استفاده از تابع changeLanguage از مدیریت زبان
            dispatch(changeLanguageState(lang));
            await Updates.reloadAsync();
        } catch (e) {
            console.error("languageSwitcher");
            console.error(e);
        }
        onClose()
    };

    return (
        <Sheet isOpen={isVisible}  fitContent={true} onClose={onClose} modalHeight={230} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("language")}</Text>
            </View>
            <View style={styles.modalBody}>
                <Pressable style={[language === "en" ? styles.activeLanguage : styles.languageButton]}
                           onPress={() => changeLanguage("en")}>
                    <Text
                        style={[language === "en" ? styles.activeLanguageButtonText : styles.languageButtonText]}>English</Text>
                </Pressable>
                <Pressable style={[language === "fa" ? styles.activeLanguage : styles.languageButton]}
                           onPress={() => changeLanguage("fa")}>
                    <Text
                        style={[language === "fa" ? styles.activeLanguageButtonText : styles.languageButtonText]}>فارسی</Text>
                </Pressable>
                <Pressable style={[language === "ar" ? styles.activeLanguage : styles.languageButton]}
                           onPress={() => changeLanguage("ar")}>
                    <Text
                        style={[language === "ar" ? styles.activeLanguageButtonText : styles.languageButtonText]}>العربیه</Text>
                </Pressable>
            </View>
        </Sheet>

    );
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        modalBody: {
            width: "100%",
            flexDirection: "column",
            gap: 8

        },
        test:{
            padding:0
        },
        languageButton: {
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center"
        },
        languageButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily:gStyles.fontMain.fontFamily,
            color: colors.darkPrimary
        },
        activeLanguage: {
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: colors.darkPrimary,
            justifyContent: "center",
            alignItems: "center"
        },
        activeLanguageButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily:gStyles.fontMain.fontFamily,
            color: colors.textOn

        },
        directionIconStyle: {
            color: colors.onSurface
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginBottom:12,
            justifyContent: "center",
            alignItems: "center"
        },
        sheetHeaderText: {
            paddingHorizontal: 16,
            color:colors.onSurface,
            fontFamily:gStyles.fontBold.fontFamily,
            lineHeight:24
        },


    });
};


export default LanguageSwitcher;

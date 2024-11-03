import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Switch, Pressable, StyleSheet, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../redux/slices/themeSlice";
import {useTheme} from "@react-navigation/native";
import ToggleSwitch from 'toggle-switch-react-native'
import {useTranslation} from "react-i18next";
import gStyles from "../global-styles/GlobalStyles";
import CustomText from "./CustomText";


const ChangeThemeSwitcher = () => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const [isOn, setIsOn] = useState(false)
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.darkTheme);

    const toggleDarkMode = async () => {
        setIsOn(!isOn);
        dispatch(toggleTheme(!isDarkMode ? "dark" : "light"));
        // ذخیره تنظیمات تاریک یا روشن بودن تم در AsyncStorage
        await AsyncStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    return (
        <Pressable style={styles.ChangeThemeSwitcherWrapper}>
            <CustomText size={16} lineHeight={24} customStyle={styles.ChangeThemeSwitcherText}
                        color={colors.onSurfaceHigh}>
                {t("darkmode")}
            </CustomText>
            <ToggleSwitch
                isOn={isOn}
                onColor={colors.primary}
                offColor={colors.onSurfaceLowest}
                size="medium"
                onToggle={toggleDarkMode}
            />

        </Pressable>

    );
};


const useThemedStyles = (colors) => {
    const fontSizeScale = useSelector((state) => state.fontSizeSlice.fontSizeScale);
    let height = 56
    if (fontSizeScale === 3) {
        height = height * 1.1
    }
    if (fontSizeScale === 4) {
        height = height * 1.2
    }
    if (fontSizeScale === 5) {
        height = height * 1.3
    }
    return StyleSheet.create({
        ChangeThemeSwitcherWrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            height: height,
        },
        ChangeThemeSwitcherText: {
            paddingHorizontal: 8,
        }
    });
};
export default ChangeThemeSwitcher;

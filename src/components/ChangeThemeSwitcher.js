import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Switch, Pressable, StyleSheet, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../redux/slices/themeSlice";
import {useTheme} from "@react-navigation/native";
import ToggleSwitch from 'toggle-switch-react-native'
import {useTranslation} from "react-i18next";


const ChangeThemeSwitcher = () => {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const[isOn,setIsOn]=useState(false)
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
            <Text style={styles.ChangeThemeSwitcherText}>
                {t("darkmode")}
            </Text>
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
    return StyleSheet.create({
        ChangeThemeSwitcherWrapper: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            height: 56,

        },
        ChangeThemeSwitcherText: {
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            paddingHorizontal: 8,
            color: colors.onSurfaceHigh
        }
    });
};
export default ChangeThemeSwitcher;

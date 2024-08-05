import {View, StyleSheet, Text, Pressable} from "react-native";
import React from "react";
import {useTheme} from "@react-navigation/native";
import ToggleSwitch from "toggle-switch-react-native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import gStyles from "../../global-styles/GlobalStyles";

const NotificationsSettingItem = ({icon, title, isOn, disabled, onToggle, lastItem, cStyle}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    return (
        <Pressable style={[styles.container, {borderBottomWidth: lastItem ? 0 : 1}, cStyle]}>
            <View style={styles.wrapper}>
                <KhiyabunIcons name={icon} size={18} color={colors.secondary}/>
                <Text allowFontScaling={false} style={styles.text}>{title}</Text>
            </View>
            <ToggleSwitch
                isOn={isOn}
                onColor={colors.primary}
                thumbOnStyle={styles.thumbOn}
                trackOnStyle={styles.trackOn}
                offColor={disabled ? colors.disabled : colors.surfaceContainerLowest}
                thumbOffStyle={disabled ? styles.thumbDisabled : styles.thumbOff}
                trackOffStyle={disabled ? styles.trackDisabled : styles.trackOff}
                onToggle={disabled ? undefined : onToggle}
                disabled={disabled}
            />
        </Pressable>
    );
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 70,
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomColor: colors.outlineSurface,
        },
        wrapper: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        text: {
            ...gStyles.fontMain,
            color: colors.onSurfaceHigh,
            fontSize: 16,
            lineHeight: 24,
            textAlign: "left",
        },
        thumbOn: {
            backgroundColor: colors.surfaceContainerLowest,
            height: 24,
            width: 24,
            borderRadius: 100
        },
        trackOn: {
            backgroundColor: colors.primary,
            width: 52,
            height: 32,
        },
        thumbOff: {
            height: 16,
            width: 16,
            backgroundColor: colors.primary,
        },
        trackOff: {
            width: 52,
            height: 32,
            backgroundColor: colors.surfaceContainerLowest,
            borderWidth: 2,
            borderColor: colors.primaryOutline,
        },
        thumbDisabled: {
            height: 16,
            width: 16,
            backgroundColor: colors.onDisabled,
        },
        trackDisabled: {
            width: 52,
            height: 32,
            backgroundColor: colors.disabledSurface,
            borderWidth: 2,
            borderColor: colors.outlineDisabled,
        },
    });
};

export default NotificationsSettingItem;
import {View, StyleSheet, Pressable} from "react-native";
import React from "react";
import {useTheme} from "@react-navigation/native";
import ToggleSwitch from "toggle-switch-react-native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import CustomText from "../../components/CustomText";

const NotificationsSettingItem = ({icon, title, isOn, disabled, onToggle, lastItem, cStyle}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    return (
        <Pressable style={[styles.container, {borderBottomWidth: lastItem ? 0 : 1}, cStyle]}>
            <View style={styles.wrapper}>
                <KhiyabunIcons name={icon} size={18} color={colors.secondary}/>
                <CustomText
                    size={15} color={colors.onSurfaceHigh} lineHeight={24} textAlign={'left'}>
                    {title}
                </CustomText>
            </View>
            <ToggleSwitch
                isOn={isOn}
                onColor={disabled ? colors.disabled : colors.primary}
                thumbOnStyle={disabled ? styles.thumbOnDisabled : styles.thumbOn}
                trackOnStyle={disabled ? styles.trackOnDisabled : styles.trackOn}
                offColor={disabled ? colors.disabled : colors.surfaceContainerLowest}
                thumbOffStyle={disabled ? styles.thumbOffDisabled : styles.thumbOff}
                trackOffStyle={disabled ? styles.trackOffDisabled : styles.trackOff}
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
        trackOnDisabled: {
            width: 52,
            height: 32,
            backgroundColor: '#a8b5ef',

        },
        thumbOnDisabled: {
            height: 24,
            width: 24,
            borderRadius: 100,
            backgroundColor: colors.surfaceContainerLowest,
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
        thumbOffDisabled: {
            height: 16,
            width: 16,
            backgroundColor: colors.onDisabled,
        },
        trackOffDisabled: {
            width: 52,
            height: 32,
            backgroundColor: colors.disabledSurface,
            borderWidth: 2,
            borderColor: colors.outlineDisabled,
        },
    });
};

export default NotificationsSettingItem;
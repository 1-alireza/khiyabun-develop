import React from 'react';
import {useTheme} from "@react-navigation/native";
import {View, Text, StyleSheet, TouchableOpacity, I18nManager} from 'react-native';
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import KhiyabunIcons from "../../components/KhiyabunIcons";

const TimesheetHeader = ({onLeftIconPress}) => {
    const styles = useThemedStyles();
    const {colors} = useTheme();
    const exportExcel = (item) => {
        console.log("Edit action for item:", item);
    };

    const exportPdf = () => {
        console.log("Share action");
    };

    return (
        <View style={styles.header}>

            <TouchableOpacity activeOpacity={0.7} onPress={onLeftIconPress}>
                <KhiyabunIcons name={I18nManager.isRTL ? "arrow-right-outline" : "arrow-left-outline"}
                               size={24} color={colors.onSurface}/>
            </TouchableOpacity>

            <Text style={styles.title}>Timesheet</Text>

            <Menu style={styles.ripple}>
                <MenuTrigger>
                    <KhiyabunIcons style={styles.rippleIcon} name={"more-bold"} size={24} color={colors.onSurface}/>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.popUp}>
                    <MenuOption style={styles.popUpOption} onSelect={() => exportExcel()}>
                        <KhiyabunIcons name={"export-outline"} size={20} color={colors.onSurfaceHigh}/>
                        <Text style={styles.popUpOptionText}>Export to Excel</Text>
                    </MenuOption>
                    <MenuOption style={styles.popUpOption} onSelect={() => exportPdf()}>
                        <KhiyabunIcons name={"export-outline"} size={20} color={colors.onSurfaceHigh}/>
                        <Text style={styles.popUpOptionText}>Export to PDF</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>

        </View>
    );
};

const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 10,
            height: 60,
            backgroundColor: colors.surfaceContainerLowest,
        },
        title: {
            fontFamily: "dana-bold",
            textAlign: 'center',
            fontWeight: "500",
            lineHeight: 24,
            fontSize: 16,
            color: colors.onSurfaceHigh,
        },
        ripple: {
            borderRadius: 20,
            overflow: "hidden",
        },
        rippleIcon: {
            padding: 5,
        },
        popUp: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
        },
        popUpOption: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "flex-start",
            height: 50,
            gap: 8,
            paddingHorizontal: 12
        },
        popUpOptionText: {
            fontFamily: 'dana-regular',
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 24,
            color: colors.onSurfaceHigh
        },
    });
};

export default TimesheetHeader;

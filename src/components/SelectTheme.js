
import Sheet from "./Sheet";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Button from "./Button";
import React from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";

function SelectTheme({isVisible,onClose}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} modalHeight={410} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("theme")}</Text>
            </View>
            <View style={styles.sheetBody}>
                <View style={styles.colorOptionsWrapper}>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#A4F7DA"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#00D496"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#008856"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#FDE796"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#EAB100"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#9C6F00"}]}>
                    </Pressable>
                </View>
                <View style={styles.colorOptionsWrapper}>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#FFE3BD"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#FFA210"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#C55900"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#FFD2CA"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#FF6C58"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#D82505"}]}>
                    </Pressable>
                </View>
                <View style={styles.colorOptionsWrapper}>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#DFD9FF"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#A390F6"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#735FCD"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#C5E3FF"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#3D9FFF"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#006AEA"}]}>
                    </Pressable>
                </View>
                <View style={styles.colorOptionsWrapper}>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#B2F5F4"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#17CCD1"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#00848E"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#C7F59E"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#82C823"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#4E8100"}]}>
                    </Pressable>
                </View>
                <View style={styles.colorOptionsWrapper}>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#FFD1ED"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#F96BBB"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#BB408B"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#DCE2E3"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#8492A5"}]}>
                    </Pressable>
                    <Pressable style={[styles.colorOptions, {backgroundColor: "#657189"}]}>
                    </Pressable>
                </View>
            </View>
            <View style={styles.sheetOptions}>
                <Button label={t("cancel")} sizeButton={"small"} style={styles.cancelButton} width={38}
                        styleText={styles.cancelButtonText} onPress={onClose}/>
                <Button label={t("select")} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={60} onPress={onClose}
                        isBorder={true} borderColor={colors.primaryOutline}/>
            </View>
        </Sheet>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        appOption: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            height: 56,

        },
        appActionText: {
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            paddingHorizontal: 8,
            color: colors.onSurfaceHigh
        },
        sheetBody: {
            paddingBottom: 16,
            flexDirection: "column",
            gap: 8,
            width:"100%",
            height:330
        },
        colorOptions: {
            width: 50,
            height: 50,
            borderRadius: 4,
        },
        colorOptionsWrapper: {
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
        },
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            width:"100%",
            position:"absolute",
            bottom:10

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
        directionIconStyle: {
            color: colors.onSurface
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginVertical:8,
            justifyContent: "center",
            alignItems: "center"
        },
        sheetHeaderText: {
            paddingHorizontal: 16,
            color:colors.onSurface,
            fontFamily:"dana-bold",
            lineHeight:24
        },
    });
};

export default SelectTheme
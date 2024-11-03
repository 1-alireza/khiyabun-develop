import Sheet from "./Sheet";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Button from "./Button";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import gStyles from "../global-styles/GlobalStyles"
import CustomText from "./CustomText";

function SelectTheme({isVisible, onClose}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const [selectedColor, setSelectedColor] = useState('')


    const handleChangeTheme = (color) => {
        setSelectedColor(color)
        console.log(color)
    }

    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} modalHeight={410} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <CustomText lineHeight={16} weight={"bold"} color={colors.onSurface}>{t("theme")}</CustomText>
            </View>
            <View style={styles.sheetBody}>
                <View style={styles.colorOptionsWrapper}>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#A4F7DA"}
                                backgroundColor={"#A4F7DA"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#00D496"}
                                backgroundColor={"#00D496"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#008856"}
                                backgroundColor={"#008856"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#FDE796"}
                                backgroundColor={"#FDE796"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#EAB100"}
                                backgroundColor={"#EAB100"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#9C6F00"}
                                backgroundColor={"#9C6F00"}/>
                </View>
                <View style={styles.colorOptionsWrapper}>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#FFE3BD"}
                                backgroundColor={"#FFE3BD"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#FFA210"}
                                backgroundColor={"#FFA210"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#C55900"}
                                backgroundColor={"#C55900"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#FFD2CA"}
                                backgroundColor={"#FFD2CA"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#FF6C58"}
                                backgroundColor={"#FF6C58"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#D82505"}
                                backgroundColor={"#D82505"}/>
                </View>
                <View style={styles.colorOptionsWrapper}>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#DFD9FF"}
                                backgroundColor={"#DFD9FF"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#A390F6"}
                                backgroundColor={"#A390F6"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#735FCD"}
                                backgroundColor={"#735FCD"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#C5E3FF"}
                                backgroundColor={"#C5E3FF"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#3D9FFF"}
                                backgroundColor={"#3D9FFF"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#006AEA"}
                                backgroundColor={"#006AEA"}/>
                </View>
                <View style={styles.colorOptionsWrapper}>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#B2F5F4"}
                                backgroundColor={"#B2F5F4"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#17CCD1"}
                                backgroundColor={"#17CCD1"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#00848E"}
                                backgroundColor={"#00848E"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#C7F59E"}
                                backgroundColor={"#C7F59E"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#82C823"}
                                backgroundColor={"#82C823"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#4E8100"}
                                backgroundColor={"#4E8100"}/>
                </View>
                <View style={styles.colorOptionsWrapper}>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#FFD1ED"}
                                backgroundColor={"#FFD1ED"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#F96BBB"}
                                backgroundColor={"#F96BBB"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#BB408B"}
                                backgroundColor={"#BB408B"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#DCE2E3"}
                                backgroundColor={"#DCE2E3"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#8492A5"}
                                backgroundColor={"#8492A5"}/>
                    <ColorItems callBack={handleChangeTheme} isSelected={selectedColor === "#657189"}
                                backgroundColor={"#657189"}/>
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

const ColorItems = ({backgroundColor, callBack, isSelected}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    return (
        <Pressable
            style={[isSelected ? styles.selectedColorOptions : styles.colorOptions, {backgroundColor: backgroundColor}]}
            onPress={() => {
                callBack(backgroundColor)
            }}>
        </Pressable>
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
            fontFamily: gStyles.fontMain.fontFamily,
            paddingHorizontal: 8,
            color: colors.onSurfaceHigh
        },
        sheetBody: {
            paddingBottom: 16,
            flexDirection: "column",
            gap: 8,
            width: "100%",
            height: 330
        },
        colorOptions: {
            width: 50,
            height: 50,
            borderRadius: 4,
        },
        selectedColorOptions: {
            width: 50,
            height: 50,
            borderRadius: 4,
            borderWidth: 4,
            borderColor:
                "blue",
            borderStyle: "solid"
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
            width: "100%",
            position: "absolute",
            bottom: 10

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
            fontFamily: gStyles.fontMain.fontFamily,
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
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.darkPrimary
        },
        directionIconStyle: {
            color: colors.onSurface
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
            fontFamily: gStyles.fontBold.fontFamily,
            lineHeight: 24
        },
    });
};

export default SelectTheme
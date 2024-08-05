import {Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import ErrandTitlesData from "./ErrandTitlesData";
import ErrandSummarized from "./ErrandSummarized";
import ErrandFile from "./ErrandFile";
import ErrandDistance from "./ErrandDistance";
import ErrandPaceChart from "./ErrandPaceChart";
import ErrandTableData from "./ErrandTableData";
import React from "react";
import Button from "../../components/Button";
import {log} from "expo/build/devtools/logger";



export default function ErrandDetailsScreen({route}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    return (
        <ScrollView style={styles.mainView}>
            <ErrandTitlesData/>
            <ErrandSummarized/>
            <ErrandFile />
            <ErrandDistance/>
            <ErrandPaceChart/>
            <ErrandTableData/>
            <View style={styles.sheetOptions}>
                <Button label={t("delete_shift")} sizeButton={"small"} style={styles.cancelButton} width={50}
                        styleText={styles.cancelButtonText} onPress={() => console.log("text")}/>
                <Button label={t("edit_shift")} sizeButton={"medium"}
                        style={styles.selectButton}
                        styleText={styles.selectButtonText} width={50}
                        onPress={() => console.log("text")}
                        isBorder={true} borderColor={colors.primaryOutline}/>
            </View>
        </ScrollView>

    )
}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
        },
        errandDataTitleWrapper: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 16
        },
        errandDataTitle: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow
        },
        errandDataText: {
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurface
        },
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginVertical: 10,
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
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:"transparent"
        },
        cancelButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkError
        },



    });
};

import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import AddedPlaceInfo from "./AddedPlaceInfo";
import AddedPlaceMap from "./AddedPlaceMap";
import AddedPlaceCheckList from "./AddedPlaceCheckList";
import AddedPlaceNotes from "./AddedPlaceNotes";
import AddedPlaceAttachments from "./AddedPlaceAttachments";
import AddedPlaceForms from "./AddedPlaceForms";
import React from "react";
import Button from "../../components/Button";

export default function AddedPlaceScreen({navigation}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)

    return (
        <ScrollView contentContainerStyle={styles.mainView}>
            <AddedPlaceInfo/>
            {/*<AddedPlaceMap/>*/}
            <AddedPlaceNotes/>
            <AddedPlaceCheckList/>
            <AddedPlaceAttachments/>
            <AddedPlaceForms/>
            <View style={styles.sheetOptions}>
                <Button label={t("delete_shift")} sizeButton={"medium"} style={styles.cancelButton} width={50}
                        styleText={styles.cancelButtonText} onPress={() => console.log("text")}/>
                <Button label={t("finished")} sizeButton={"medium"}
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
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 5
        },
        confirmButton: {
            position: "absolute",
            bottom: 10,
            marginLeft: 20
        },
        confirmButtonTextStyle: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.textOn
        },
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center"
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.textOn
        },
        cancelButton: {
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.primaryContainer
        },
        cancelButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap:4,
            marginTop: 20,
            marginBottom: 10,
            width: "90%",
        },
    });
};
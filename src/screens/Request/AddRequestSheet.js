import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import React from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Button from "../../components/Button";

const AddRequestSheet = ({isVisible, onClose, Callback}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const getReqType=(reqType)=>{
        Callback(reqType)
    }
    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("request_type")}</Text>
            </View>
            <View style={styles.sheetBody}>
                <Button label={t("time_off_request")} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} onPress={()=>getReqType("timeOff")} width={100}
                        isBorder={true} borderColor={colors.primaryOutline}/>
                <Button label={t("commuting_request")} sizeButton={"medium"} onPress={()=>getReqType("commuting")} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={100}
                        isBorder={true} borderColor={colors.primaryOutline}/>
                <Button
                    label={t("business_trip_request")} sizeButton={"medium"} onPress={()=>getReqType("businessTrip")} style={styles.selectButton}
                    styleText={styles.selectButtonText} width={100}
                    isBorder={true} borderColor={colors.primaryOutline}/>

            </View>
        </Sheet>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetBody: {
            flexDirection: "column",
            gap: 8,
            width: "100%",
            paddingVertical: 8
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
            fontFamily: "dana-bold",
            lineHeight: 24
        },
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center",

        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkPrimary
        },


    });
};


export default AddRequestSheet;
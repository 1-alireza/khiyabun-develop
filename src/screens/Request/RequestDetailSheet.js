import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import React from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Button from "../../components/Button";
import {log} from "expo/build/devtools/logger";

const RequestDetailSheet = ({isVisible, onClose, item}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const RequestLocations = () => {
        item.locations.map((location) => {

        })
    }
    return (
        <Sheet isOpen={isVisible} contentWrapperStyle={styles.modal} fitContent={true} onClose={onClose}
               snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t(item.type + " request")}</Text>
            </View>
            <View style={styles.sheetBody}>
                <View style={styles.requestInfo}>
                    <Text style={styles.dataTitleText}>
                        Policy
                    </Text>
                    <Text style={styles.dataText}>
                        {item.type}
                    </Text>
                </View>
                <View style={styles.requestInfo}>
                    <Text style={styles.dataTitleText}>
                        Date
                    </Text>
                    <Text style={styles.dataText}>
                        {item.date}
                    </Text>
                </View>
                {item.type !== "Business trip" && (
                    <View style={styles.requestInfo}>
                        <Text style={styles.dataTitleText}>
                            Time
                        </Text>
                        <Text style={styles.dataText}>
                            {item.time}
                        </Text>
                    </View>
                )}

                {item.type === "Business trip" && (
                    <View style={styles.locationWrapper}>
                        {item.locations.map((location) => (
                            <View style={styles.location}>
                                <KhiyabunIcons name={"pin-drop-outline"} color={colors.darkPrimary}/>
                                <Text style={styles.locationText}>{location}</Text>
                            </View>
                        ))
                        }
                    </View>

                )}

                <View style={styles.requestInfo}>
                    <Text style={styles.dataTitleText}>
                        Total time requested
                    </Text>
                    <Text style={styles.dataText}>
                        {item.totalTimeRequested}
                    </Text>
                </View>
                <View style={styles.requestInfo}>
                    <Text style={styles.dataTitleText}>
                        Requested status
                    </Text>
                    <Text
                        style={item.status === "Pending" ? styles.pendingStatus : item.status === "Approved" ? styles.ApprovedStatus : styles.DeclinedStatus}>
                        {item.status}
                    </Text>
                </View>
                {item.type !== "Business trip" && (
                    <View style={styles.requestInfo}>
                        <Text style={styles.dataTitleText}>
                            Approved by
                        </Text>
                        <Text style={styles.dataText}>
                            {item.ApprovedBy}
                        </Text>
                    </View>
                )}

            </View>
            {item.status === "pending" && (
                <Button label={t("cancel_note")} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={100}
                        isBorder={true} borderColor={colors.primaryOutline} onPress={() => console.log("dfghj")}/>
            )}

        </Sheet>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        modal: {
            paddingLeft: 22,
            paddingRight: 22,
            paddingTop: 22,
        },
        sheetBody: {
            flexDirection: "column",
            gap: 8,
            width: "100%",
            backgroundColor: colors.surface,
            borderRadius: 8,
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
        requestInfo: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 16
        },
        dataTitleText: {
            color: colors.onSurfaceLow,
            fontSize: 14,
            lineHeight: 20
        },
        dataText: {
            color: colors.onSurface,
            fontSize: 14,
            lineHeight: 20
        },
        pendingStatus: {
            color: colors.darkWarning,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: "500",
            backgroundColor: colors.warningContainer,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 100,
            justifyContent: "flex-start",
            alignItems: "center",
            textAlignVertical: "center"
        },
        DeclinedStatus: {
            color: colors.darkError,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: "500",
            backgroundColor: colors.confirmContainer,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 100,
            justifyContent: "flex-start",
            alignItems: "center",
            textAlignVertical: "center"
        },
        ApprovedStatus: {
            color: colors.darkWarning,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: "500",
            backgroundColor: colors.errorContainer,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 100,
            justifyContent: "flex-start",
            alignItems: "center",
            textAlignVertical: "center"
        },
        location: {
            backgroundColor: colors.primaryContainer,
            paddingVertical: 6,
            paddingHorizontal: 12,
            flexDirection: "row",
            gap: 4,
            borderRadius: 100,
            justifyContent: "flex-start",
            alignItems: "center",
            textAlignVertical: "center"
        },
        locationWrapper: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 4
        },
        locationText: {
            color: colors.darkPrimary,
            fontSize: 12,
            lineHeight: 16,
            fontWeight: "500",

        },
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.errorOutline,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.darkError
        },


    });
};


export default RequestDetailSheet;
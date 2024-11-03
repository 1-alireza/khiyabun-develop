import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {I18nManager, Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import React, {useState} from "react";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import Button from "../../components/Button";
import jalaali from "jalaali-js";
import {putRequest} from "../../utils/sendRequest";
import {errorHandling} from "../../utils/errorHandling";
import {useSelector} from "react-redux";
import CustomText from "../../components/CustomText";
import CustomModal from "../../components/CustomModal";

const RequestDetailSheet = ({isVisible, onClose, item, callBack}) => {
    if (!item) return
    console.log(item)
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const startDate = new Date(item.startTime);
    const endDate = new Date(item.endTime);
    const isRTL = I18nManager.isRTL;
    const userToken = useSelector(state => state.login.token);

    const getJalaliDate = (date) => {
        console.log(date)
        const jalaliDate = jalaali.toJalaali(date);
        const dayJalali = jalaliDate.jd;
        const monthJalali = getJalaliMonthName(jalaliDate.jm);
        const yearJalali = jalaliDate.jy;
        return `${dayJalali} ${monthJalali} ${yearJalali}`;
    }
    let startJalaliDate = getJalaliDate(startDate)
    let endJalaliDate = getJalaliDate(endDate)

    function getJalaliMonthName(monthNumber) {
        const monthNames = [
            "فروردین", "اردیبهشت", "خرداد", "تیر",
            "مرداد", "شهریور", "مهر", "آبان",
            "آذر", "دی", "بهمن", "اسفند"
        ];
        return monthNames[monthNumber - 1];
    }

    const options = {
        day: '2-digit', // Day of the month (e.g., 16)
        month: 'short', // Short month name (e.g., Nov)
        year: 'numeric', // Full year (e.g., 2023)
        locale: 'en-US', // Set the locale to Iranian Persian
    };
    const formattedStartDate = startDate.toLocaleString('en-US', options);
    const formattedEndDate = endDate.toLocaleString('en-US', options);

    const toggleCancelModal = () => setIsCancelModalVisible(!isCancelModalVisible);

    const RequestInfoSheetFooter = () => {
        return (
            <>
                {item.workRequestStatus === "PENDING" ? (
                    <View style={styles.footerContainer}>
                        <Button label={t("cancel_note")} sizeButton={"medium"} style={styles.selectButton}
                                styleText={styles.selectButtonText} width={90}
                                isBorder={true} borderColor={colors.primaryOutline} onPress={toggleCancelModal}/>
                    </View>
                ) : ""}
            </>

        )
    }

    const RequestLocations = () => {
        item.locations.map((location) => {

        })
    }

    const cancelRequest = async () => {
        try {
            let res = await putRequest(`work_request/cancel?id=${item.id}`, {}, userToken)
            console.log("CANCELED REQ ", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")
            } else {
                errorHandling(res, "warning")

            }
        } catch (e) {
            errorHandling(res, "error")

        } finally {
            toggleCancelModal()
            onClose()
            callBack()

        }
    }

    const CancelModal = () => {
        return (
            <CustomText size={14} lineHeight={24} color={colors.onSurfaceHigh}>
                {t("cancel_request_warning")}
            </CustomText>
        )
    }


    return (
        <>
            <Sheet isOpen={isVisible}
                   contentWrapperStyle={styles.modal}
                   fitContent={true}
                   onClose={onClose}
                   snapPoint={500}
                   footerComponent={<RequestInfoSheetFooter/>}
            >
                <View style={styles.sheetHeader}>

                    <CustomText lineHeight={16} weight={"bold"}
                                color={colors.onSurface}>{item.workRequestType + " " + t("request")}</CustomText>
                </View>
                <View style={styles.sheetBody}>
                    <View style={styles.requestInfo}>
                        <CustomText lineHeight={20} size={14}
                                    color={colors.onSurfaceLow}>{t("request_type")}</CustomText>

                        <CustomText lineHeight={20} size={14}
                                    color={colors.onSurface}>{item.workRequestType}</CustomText>
                    </View>
                    <View style={styles.requestInfo}>
                        <CustomText lineHeight={20} size={14}
                                    color={colors.onSurfaceLow}>{t("start_date")}</CustomText>

                        <CustomText lineHeight={20} size={14}
                                    color={colors.onSurface}>{isRTL ? startJalaliDate : formattedStartDate}</CustomText>
                    </View>
                    <View style={styles.requestInfo}>

                        <CustomText lineHeight={20} size={14}
                                    color={colors.onSurfaceLow}>{t("finish_date")}</CustomText>

                        <CustomText lineHeight={20} size={14}
                                    color={colors.onSurface}>{isRTL ? endJalaliDate : formattedEndDate}</CustomText>

                    </View>
                    {item.workRequestType === "مرخصی" || item.workRequestType === "Time off" && (
                        item.isDaily ? (
                            <View style={styles.requestInfo}>
                                <CustomText lineHeight={20} size={14}
                                            color={colors.onSurfaceLow}>{t("duration")}</CustomText>
                                <CustomText lineHeight={20} size={14}
                                            color={colors.onSurface}>{item.isDaily ? t("full_day") : "2 hours"}</CustomText>
                            </View>

                        ) : ""

                    )}

                    {item.type === "Business trip" && (
                        <View style={styles.locationWrapper}>
                            {item.locations.map((location) => (
                                <View style={styles.location}>
                                    <KhiyabunIcons name={"pin-drop-outline"} color={colors.darkPrimary}/>
                                    <CustomText lineHeight={16} size={12}
                                                color={colors.darkPrimary}>{location}</CustomText>
                                </View>
                            ))
                            }
                        </View>

                    )}

                    <View style={styles.requestInfo}>

                        <CustomText lineHeight={20} size={14}
                                    color={colors.onSurfaceLow}>{t("total_time_requested")}</CustomText>
                        <CustomText lineHeight={20} size={14}
                                    color={colors.onSurface}>{item.numberOfWorkingHours + t("hours")}</CustomText>

                    </View>
                    <View style={styles.requestInfo}>
                        <CustomText lineHeight={20} size={14}
                                    color={colors.onSurfaceLow}>{t("request_status")}</CustomText>
                        <Text
                            style={item.workRequestStatus === "workRequestStatus" ? styles.workRequestStatus : item.status === "Approved" ? styles.ApprovedStatus : styles.DeclinedStatus}>
                            {item.workRequestStatus}
                        </Text>
                    </View>
                    {item.type !== "Business trip" && item.workRequestStatus !== "PENDING" +
                        "" && (
                            <View style={styles.requestInfo}>
                                <CustomText lineHeight={20} size={14}
                                            color={colors.onSurfaceLow}>Approved by</CustomText>
                                <CustomText lineHeight={20} size={14}
                                            color={colors.onSurface}>{item.ApprovedBy || "_"}</CustomText>

                            </View>
                        )}

                </View>
                <View style={styles.sheetBody}>
                    <View style={styles.requestInfo}>
                        <CustomText customStyle={{textAlign: "justify"}} lineHeight={20} size={14}
                                    color={colors.onSurfaceLow}>{t("note")} : <CustomText lineHeight={20} size={14}
                                                                                          color={colors.onSurface}>{item.note}
                        </CustomText>
                        </CustomText>
                    </View>


                </View>

            </Sheet>
            <CustomModal type={"warning"}
                         isVisible={isCancelModalVisible}
                         onClose={toggleCancelModal}
                         width={80}
                         cancelButtonText={t("cancel")}
                         actionButtonText={t("confirm")}
                         hasCloseIcon={true}
                         modalBody={<CancelModal/>}
                         modalTitle={t("delete_note")}
                         actionCallback={cancelRequest}/>
        </>

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
            paddingVertical: 8,
            marginBottom: 16
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        requestInfo: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 16
        },
        noteInfo: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
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
            marginBottom: 10,

        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            color: colors.darkError
        },
        footerContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }


    });
};


export default RequestDetailSheet;
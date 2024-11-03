import { useTheme } from "@react-navigation/native";
import { I18nManager, Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import jalaali, { toJalaali } from "jalaali-js";
import { getRequest } from "../../utils/sendRequest";
import { useSelector } from "react-redux";
import CustomText from "../../components/CustomText";

function Request({ item, onPress }) {
    const { t, i18n } = useTranslation();
    const { colors } = useTheme();
    const styles = useThemedStyles(colors)
    const isRTL = I18nManager.isRTL;
    const userToken = useSelector(state => state.login.token);


    function formatDateString(dateString) {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const timeString = date.toLocaleTimeString([], options).replace(':00', '').replace('AM', 'am').replace('PM', 'pm');
        return `${month}/${day} from ${timeString}`;
    }


    const formatJalaliDateString = (dateString) => {
        const date = new Date(dateString);

        // Check for invalid date
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        // Convert to Jalali Date
        const jalaliDate = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());

        // Get hours and minutes
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours < 12 ? 'ق.ظ' : 'ب.ظ'}`;
        return `${jalaliDate.jm}/${jalaliDate.jd} ${formattedTime}`;
    };

    const startDate = formatDateString(item.startTime)
    const finishDate = formatDateString(item.endTime)
    const startJalaliDate = formatJalaliDateString(item.startTime)
    const finishJalaliDate = formatJalaliDateString(item.endTime)


    const getRequestData = async (finishDate) => {
        const body = {
            startDate: startDate,
            endDate: finishDate
        }
        console.log(body)
        let res = await getRequest(`work_request/by_id?id=${item.id}`, body, userToken)
        console.log(typeof res.data.hours)
        setRequestedHours(res.data.hours)
        console.log("request", res)

    }


    const requestTime = () => {
        if (isRTL) return startJalaliDate + " تا " + finishJalaliDate
        if (!isRTL) return startDate + " to " + finishDate
    }
    const isFullDay = !item.isDaily ? `${t("full_day")}` : ""


    return (
        <Pressable style={styles.request} onPress={() => onPress(item)}>
            <View style={styles.requestData}>
                <CustomText color={colors.onSurfaceHigh} size={16} lineHeight={24}>
                    {t(item.workRequestType) + " > " + t(item.subType)}
                </CustomText>
                <CustomText color={colors.onSurfaceLow} size={12} lineHeight={16} customStyle={styles.requestTime}>
                    {requestTime() + " " + isFullDay}
                </CustomText>

            </View>
            <CustomText>

            </CustomText>
            <CustomText
                size={12}
                lineHeight={16}
                customStyle={item.workRequestStatus === "PENDING" ? styles.pendingStatus : item.workRequestStatus === "APPROVED" ? styles.ApprovedStatus : styles.DeclinedStatus}>
                {t(item.workRequestStatus)}
            </CustomText>
        </Pressable>
    )
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        request: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            paddingVertical: 8
        },
        pendingStatus: {
            color: colors.darkWarning,
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
            fontWeight: "500",
            backgroundColor: colors.errorContainer,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 100,
            justifyContent: "flex-start",
            alignItems: "center",
            textAlignVertical: "center"
        },

        requestTime: {
            maxWidth: 200
        },
        requestData: {
            paddingHorizontal: 8,
            gap: 4
        }
    });
};


export default Request
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View, Text} from "react-native";
import Card from "../../components/Card";
import KhiyabunIcons from "../../components/KhiyabunIcons";

function AddedPlaceInfo() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    return (
        <Card customStyle={styles.card}>
            <View style={styles.cardWrapper}>
                <View style={styles.cardHeaderWrapper}>
                    <Text style={styles.cardHeader}>
                        {t("info")}
                    </Text>
                </View>
                <View style={styles.dataWrapper}>
                    <Text style={styles.listTitle}>{t("status")}:</Text>
                    <Text style={styles.listData}>{t("Private")}</Text>
                </View>
                <View style={styles.dataWrapper}>
                    <Text style={styles.listTitle}>{t("flag")}:</Text>
                    <Text style={styles.listDataType}>{t("house")}</Text>
                </View>
            </View>
        </Card>

    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardWrapper: {
            paddingHorizontal: 4,
        },
        card: {
            width: "90%"
        },
        cardHeaderWrapper: {
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        cardHeader: {
            fontFamily: "dana-bold",
            fontSize: 16,
            color: colors.primary,
            lineHeight: 24,
        },
        dataWrapper: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 6,
            marginVertical: 4
        },
        listTitle: {
            color: colors.onSurfaceLow,
            fontSize: 14,
            lineHeight: 20,
            fontFamily: "dana-regular",
        },
        listData: {
            color: colors.onSurface,
            fontSize: 14,
            lineHeight: 20,
            fontFamily: "dana-regular",
            fontWeight: "400"
        },
        listDataType: {
            color: colors.confirm,
            fontSize: 14,
            lineHeight: 20,
            fontFamily: "dana-regular",
            fontWeight: "400"
        }


    });
};
export default AddedPlaceInfo
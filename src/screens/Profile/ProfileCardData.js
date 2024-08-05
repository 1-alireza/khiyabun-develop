import {I18nManager, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import gStyles from "../../global-styles/GlobalStyles";

function ProfileCardData({title, data}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const isRTL = I18nManager.isRTL;
    const styles = useThemedStyles(colors, isRTL)


    return (
        <View style={styles.dataWrapper}>
            <Text style={styles.listTitle}>{t(title)}:</Text>
            <Text style={styles.listData}>{t(data)}</Text>
        </View>
    )

}

const useThemedStyles = (colors, isRTL) => {
    return StyleSheet.create({
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
            fontFamily: isRTL ? gStyles.danaPersianNumber.fontFamily : gStyles.fontMain.fontFamily
        },
        listData: {
            color: colors.onSurface,
            fontSize: 14,
            lineHeight: 20,
            fontFamily: isRTL ? gStyles.danaPersianNumber.fontFamily : gStyles.fontMain.fontFamily,
            fontWeight: "400",

        }

    });
};

export default ProfileCardData
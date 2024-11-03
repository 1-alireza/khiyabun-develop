import {I18nManager, StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import gStyles from "../../global-styles/GlobalStyles";
import CustomText from "../../components/CustomText";

function ProfileCardData({title, data}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const isRTL = I18nManager.isRTL;
    const styles = useThemedStyles(colors, isRTL)


    return (
        <View style={styles.dataWrapper}>
            <CustomText size={14} lineHeight={24} color={colors.onSurfaceLow}>{t(title)}:</CustomText>
            <CustomText size={14} lineHeight={24} color={colors.onSurface} >{t(data)}</CustomText>
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

    });
};

export default ProfileCardData
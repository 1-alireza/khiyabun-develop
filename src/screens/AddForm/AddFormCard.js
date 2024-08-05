import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, Text} from "react-native";
import Card from "../../components/Card";
import gStyles from "../../global-styles/GlobalStyles"

export default function AddFormCard({header, children}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    return (
        <Card customStyle={styles.card}>
            <Text style={styles.cardHeader}>
                {header}
            </Text>
            {children}
        </Card>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        cardHeader: {
            color: colors.onSurface,
            fontSize: 16,
            lineHeight: 24,
            paddingLeft: 8,
            paddingTop: 8,
            fontFamily: gStyles.fontBold.fontFamily
        },
        card:{
            width:"90%",
            marginHorizontal:16
        }
    });
};

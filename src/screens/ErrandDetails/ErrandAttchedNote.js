import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {StyleSheet, View} from "react-native";
import Card from "../../components/Card";


export default function () {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    return (
        <View>
            <Text style={styles.text}>
                {t("note")}
            </Text>
            <Card>
                <Text style={styles.text}>
                    11 apartments were checked talked to 5 owners
                </Text>
            </Card>
        </View>
    )
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        text: {
            fontSize:14,
            lineHeight:20,
            color:colors.onSurface
        }
    });
};

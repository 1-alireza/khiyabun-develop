import {Image, StyleSheet, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";

export default function ErrandFile() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const trackImage = require("../../../assets/img/errandData.png")
    const customImage = require("../../../assets/img/Rectangle.png")
    return (
        <View style={styles.photoWrapper}>
            <Image source={trackImage} style={styles.routeImg}/>
            <Image source={customImage} style={styles.uploadedImg}/>
        </View>
    )
}
const useThemedStyles = (colors) => {
    return StyleSheet.create({
        photoWrapper: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-between",
            marginTop: 8,
            paddingHorizontal: 4
        },
        routeImg: {
            width: "70%",
            borderRadius: 4
        },
        uploadedImg: {
            width: "28%",
            borderRadius: 4
        }
    });
};

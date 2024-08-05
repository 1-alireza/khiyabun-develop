import {View, Text, StyleSheet, Image, I18nManager} from "react-native"
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import gStyles from "../../global-styles/GlobalStyles";
import {useSelector} from "react-redux";


function HomeProfileUI({text, name}) {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);


    return (

        <View style={styles.wrapper}>
            <Image source={require("../../../assets/img/3d_avatar_21.png")}
                   style={styles.Image}/>
            <View>
                <Text style={styles.text}>
                    {text}
                </Text>
                <Text style={styles.name}>
                    {name}
                </Text>
            </View>
        </View>
    );
}

const useThemedStyles = (colors) => {
    const lang = useSelector(state => state.language.language);
    return StyleSheet.create({
        wrapper: {
            flexDirection: "row",
            // justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
            marginVertical: 10,
            flex: 1
        },
        Image: {
            width: 40,
            height: 40,
            borderRadius: 100,
            overflow: "hidden",
        },
        name: {
            ...gStyles.fontBold,
            fontSize: 14,
            color: colors.onSurface,
            lineHeight: 20,
            fontWeight: "700"
        },
        text: {

            fontFamily: (lang === 'fa') ? gStyles.danaPersianNumber.fontFamily : gStyles.fontMain.fontFamily,
            fontSize: 12,
            color: colors.onSurface,
            lineHeight: 16,
            fontWeight: "400"
        },

    });
};

export default HomeProfileUI;
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from "@react-navigation/native";
import gStyles from "../global-styles/GlobalStyles";
import {useSelector} from "react-redux";

const Badge = ({text, width, height, badgeStyle, fontSize}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors, fontSize, width, height);

    return (
        <View style={[styles.wrapper, badgeStyle]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}
const useThemedStyles = (colors, fontSize, width, height, fontFamily) => {
    const lang = useSelector(state => state.language.language);

    return StyleSheet.create({
        wrapper: {
            borderRadius: 100,
            backgroundColor: colors.darkPrimary,
            width: (width) ? width : 6,
            height: (height) ? height : 6
        },
        text: {
            fontFamily: (lang === 'fa') ? gStyles.danaPersianNumber.fontFamily : gStyles.fontBold.fontFamily,
            textAlign: 'center',
            color: colors.white,
            fontSize: fontSize ? fontSize : 12,
        }
    });
};
export default Badge;

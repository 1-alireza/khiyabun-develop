import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from "@react-navigation/native";
import CustomText from "./CustomText";

const Badge = ({text, width, height, badgeStyle, fontSize}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors, width, height);

    return (
        <View style={[styles.wrapper, badgeStyle]}>
            <CustomText
                size={fontSize ? fontSize : 12} weight={'bold'} color={colors.white}
                textAlign={'center'}>
                {text}
            </CustomText>
        </View>
    )
}
const useThemedStyles = (colors, width, height) => {
    return StyleSheet.create({
        wrapper: {
            borderRadius: 100,
            backgroundColor: colors.darkPrimary,
            width: (width) ? width : 6,
            height: (height) ? height : 6
        }
    });
};
export default Badge;

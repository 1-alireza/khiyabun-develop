import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from "@react-navigation/native";


const Card = ({children,customStyle}) => {
    const styles = useThemedStyles();
    return (
        <View style={[styles.card,customStyle]}>
            {children}
        </View>
    )
}
const useThemedStyles = () => {
    const {colors} = useTheme();

    return StyleSheet.create({
        card: {
            flexDirection: "column",
            backgroundColor: colors.surfaceContainerLowest,
            padding: 8,
            borderRadius: 8,
            width:"100%",
            marginVertical: 5,

        }
    });
};

export default Card;

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";

const CustomProgressBar = ({progress}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    return (
        <>
            {progress>0&&(
                <View style={styles.container}>
                    <View
                        style={[styles.bar, { width: `${progress}%` }]}
                    />
                </View>
            )}

        </>

    )
        ;
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            height: 10,
            backgroundColor:colors.surfaceContainerLowest,
            borderRadius:8,
            overflow: 'hidden',
            position:"absolute",
            borderWidth:1,
            borderColor:colors.primary,
            top:10,
            right:22,
            width:"90%"
        },
        bar: {
            height: '100%',
            backgroundColor: colors.primary,
            borderRadius: 5,
        },
    });
};


export default CustomProgressBar;
import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "./KhiyabunIcons";

const Chips = ({text, height, width, type, transparent, iconL, iconR, customStyle}) => {
    const theme = useColorScheme();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    let backgroundColor, textColor;
    if (type === 'confirm') {
        if (transparent) {
            backgroundColor = styles.confirmTransparent;
        } else {
            backgroundColor = styles.confirm;
        }
    } else if (type === 'error') {
        if (transparent) {
            backgroundColor = styles.errorTransparent;
        } else {
            backgroundColor = styles.error;
        }
    } else if (type === 'surface') {
        backgroundColor = styles.surface;
    } else if (type === 'warning') {
        if (transparent) {
            backgroundColor = styles.warningTransparent;
        } else {
            backgroundColor = styles.warning;
        }
    } else {
        if (transparent) {
            backgroundColor = styles.primaryTransparent;
        } else {
            backgroundColor = styles.primary;
        }
    }

    if (transparent) {
        if (type === 'confirm') {
            textColor = styles.textConfirm;
        } else if (type === 'error') {
            textColor = styles.textError;
        } else if (type === 'warning') {
            textColor = styles.textWarning;
        } else {
            textColor = styles.textPrimary;
        }
    } else {
        if (type === 'surface' && theme === "light") {
            textColor = styles.textBlack;
        } else {
            textColor = styles.textWhite;
        }
    }
    return (
        <View style={[
            styles.wrapper,
            backgroundColor,
            {
                width: (width) ? width : "auto",
                height: (height) ? height : 32,
            },
            ...(customStyle ? [customStyle] : []),
        ]}>
            <Text allowFontScaling={false} style={[styles.text, textColor]}>
                {iconR && <KhiyabunIcons name={iconR} size={12} color={textColor}/>}
                {text}
                {iconL && <KhiyabunIcons name={iconL} size={12} color={textColor}/>}
            </Text>
        </View>
    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        wrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            gap: 4,
            paddingHorizontal: 12,
        },
        text: {
            textAlign: 'center',
            fontFamily: "dana-bold",
            fontSize: 12,
            lineHeight: 16,
        },
        primary: {
            backgroundColor: colors.primary
        },
        confirm: {
            backgroundColor: colors.confirm
        },
        error: {
            backgroundColor: colors.error
        },
        surface: {
            backgroundColor: colors.surface
        },
        warning: {
            backgroundColor: colors.warning
        },
        primaryTransparent: {
            backgroundColor: colors.infoContainer
        },
        confirmTransparent: {
            backgroundColor: colors.confirmContainer
        },
        errorTransparent: {
            backgroundColor: colors.errorContainer
        },
        warningTransparent: {
            backgroundColor: colors.warningContainer
        },
        textWhite: {
            color: colors.white
        },
        textBlack: {
            color: colors.black
        },
        textConfirm: {
            color: colors.darkConfirm
        },
        textError: {
            color: colors.darkError
        },
        textWarning: {
            color: colors.darkWarning
        },
        textPrimary: {
            color: colors.darkPrimary
        }

    });
};

export default Chips;
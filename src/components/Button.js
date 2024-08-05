import React from "react";
import {ActivityIndicator, Pressable, StyleSheet, Text} from "react-native";
import {useTheme} from "@react-navigation/native";

const Button = (
    {
        onPress,
        label,
        typeButton = 'full',
        sizeButton = 'large',
        colorButton = 'primary',
        isBorder= false,
        borderColor= "light",
        width = 100,
        disabled,
        style,
        styleText,
        showLoader
    }) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    let rippleColor,
        classButton = [],
        classText = [];
    classText.push(styles.text);

    if (colorButton === 'primary') {
        classButton.push(styles.bgPrimary);
        classText.push(styles.textWhite);
    }
    else if(colorButton === 'dark'){
        classButton.push(styles.bgDarkPrimary);
        classText.push(classText,styles.textWhite);
    }
    else if(colorButton === "light") {
        classButton.push(styles.bgPrimaryContainer);
        classText.push(styles.textDarkPrimary);
    }
    else {
        classButton.push(styles.bgTransparent);
        classText.push(styles.textDarkPrimary);

    }
    if (sizeButton === 'small') {
        classText.push(styles.smallText);
    }
    else if (sizeButton === 'medium') {
        classText.push(styles.mediumText);
    }
    else {
        classText.push(styles.largeText);
    }

    if (typeButton === 'circle') {
        classButton.push(styles.circleCommonStyles);
        if (sizeButton === 'small') {
            classButton.push(styles.circleSmall)
        }
        else if (sizeButton === 'medium') {
            classButton.push(styles.circleMedium)
        }
        else {
            classButton.push(styles.circleLarge)
        }
    }
    else {
        classButton.push(styles.commonStyles);
        classButton.push({width: width + '%'});
        if (sizeButton === 'small') {
            classButton.push(styles.small)
        } else if (sizeButton === 'medium') {
            classButton.push(styles.medium)
        } else {
            classButton.push(styles.large)
        }

    }
    if(isBorder){
        if(borderColor === "dark"){
            classButton.push(styles.borderDarkPrimary);
        }
        else {
            classButton.push(styles.borderPrimaryOutline);
        }
    }
    if(style){
        classButton.push(style)
    }
    if(styleText){
        classText = [...classText,styleText]
    }

    const onPressHandler = () => {
        onPress();
    }
    const onPressHandlerDelay = () => {
        console.log("press and hold button")
    }

    return (
        <Pressable
            onLongPress={onPressHandlerDelay}
            delayLogPress={1000}
            style={({pressed}) => [
                styles.wrapper,
                classButton,
                {
                    opacity: disabled ? .5: pressed ? .8: 1
                }
            ]}
            // style={classButton}
            disabled={disabled}
            onPress={onPressHandler}
            // android_ripple={{
            //     color: rippleColor,
            // }}
        >
            <Text style={classText}>{label}</Text>
            {showLoader &&
            <ActivityIndicator
                color={colors.primary}
                style={{
                    position: "absolute",
                    borderRadius: 50,
                    backgroundColor: colors.primaryContainer
                }}/>
            }

        </Pressable>
    )
}
const useThemedStyles = (colors) => {

    return StyleSheet.create({
        wrapper:{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position:"relative"
        },
        text: {
            // fontFamily: 'iran-sans',
            fontFamily: 'dana-regular',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent:"center"
        },
        textWhite: {
            color: colors.white
        },
        textDarkPrimary: {
            color: colors.darkPrimary
        },
        smallText: {
            fontSize: 14
        },
        mediumText: {
            fontSize: 16
        },
        largeText: {
            fontSize: 20
        },

        commonStyles: {
            borderRadius: 8,
            paddingHorizontal: 24,
            gap: 8
        },
        small: {
            height: 36,
            paddingVertical: 8
        },
        medium: {
            height: 48,
            paddingVertical: 12
        },
        large: {
            height: 62,
            paddingVertical: 16
        },

        circleCommonStyles: {
            borderRadius: 100,
            gap: 8
        },
        circleSmall: {
            width: 32,
            height: 32,
            padding: 8

        },
        circleMedium: {
            width: 48,
            height: 48,
            padding: 12
        },
        circleLarge: {
            width: 56,
            height: 56,
            padding: 16
        },

        bgTransparent:{
            backgroundColor: "transparent"
        },
        bgPrimary:{
            backgroundColor: colors.primary
        },
        bgDarkPrimary:{
            backgroundColor: colors.darkPrimary
        },
        bgPrimaryContainer:{
            backgroundColor: colors.primaryContainer
        },

        borderDarkPrimary: {
            borderWidth: 1,
            borderColor: colors.darkPrimary,
        },
        borderPrimaryOutline: {
            borderWidth: 1,
            borderColor: colors.primaryOutline,
        },

        opacity: {
            opacity: '50%'
        },
    });
};

export default Button;

import React from "react";
import {StyleSheet, Text} from "react-native";
import gStyles from "../global-styles/GlobalStyles";
import {useTheme} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {changeFontScale} from "../redux/slices/fontSizeSlice";

const CustomText = ({
                        size = 14,
                        color,
                        weight,
                        lineHeight=20,
                        letterSpacing = 0,
                        textAlign = 'left',
                        lines,
                        fontScaling = false,
                        selectable = false,
                        customStyle,
                        children,
                    }) => {
    const {colors} = useTheme();
    const fontSizeScale = useSelector((state) => state.fontSizeSlice.fontSizeScale);

    let newSize
    let newlineHeight
    if (size <= 32) {
        if (fontSizeScale === 1) {
            newSize = size * 0.75
            newlineHeight = lineHeight * 0.75
        }
        if (fontSizeScale === 2) {
            newSize = size
            newlineHeight = lineHeight * 1

        }
        if (fontSizeScale === 3) {
            newSize = size * 1.1
            newlineHeight = lineHeight * 1.1

        }
        if (fontSizeScale === 4) {
            newSize = size * 1.2
            newlineHeight = lineHeight * 1.2

        }
        if (fontSizeScale === 5) {
            newSize = size * 1.3
            newlineHeight = lineHeight * 1.3
        }
    }
    return (
        <Text
            allowFontScaling={fontScaling}
            selectable={selectable}
            numberOfLines={lines}
            style={[
                {
                    fontFamily: weight === 'bold' ? gStyles.fontBold.fontFamily : gStyles.fontMain.fontFamily,
                    fontSize: newSize,
                    color: color ? color : colors.onSurfaceLow,
                    lineHeight: newlineHeight,
                    letterSpacing: letterSpacing,
                    textAlign: textAlign,
                },
                customStyle
            ]}
        >
            {children}
        </Text>
    );
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        
    });
}


export default CustomText;

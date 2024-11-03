import {Text, Pressable, View, StyleSheet} from "react-native"
import {useTranslation} from "react-i18next";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import {I18nManager} from 'react-native';
import gStyle from "../../global-styles/GlobalStyles"
import CustomText from "../../components/CustomText";
import {useSelector} from "react-redux";

function BoardCard({title, place, pressable = true, textStyle, secondaryText, children, onPress, icon, iconStyle}) {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const {t} = useTranslation();
    const isRTL = I18nManager.isRTL;


    if (secondaryText) {
        if (pressable) {
            return <Pressable
                style={place === "middle" ? styles.appOption : place === "first" ? styles.appOptionFirst : styles.appOptionLast}
                onPress={onPress}>
                <View style={styles.textWrapper}>
                    <CustomText lineHeight={20} size={16} customStyle={textStyle}>
                        {t(title)}
                    </CustomText>
                    <CustomText lineHeight={20} size={12}
                                customStyle={styles.secondaryText}>{secondaryText}</CustomText>
                </View>
                {isRTL ?
                    <KhiyabunIcons name="direction-left-bold" size={24} style={iconStyle}/>

                    :
                    <KhiyabunIcons name="direction-right-bold" size={24} style={iconStyle}/>

                }
                {/*<KhiyabunIcons name="direction-right-bold" size={24} style={iconStyle}/>*/}
                {children}
            </Pressable>
        } else {
            return <View
                style={place === "middle" ? styles.appOption : place === "first" ? styles.appOptionFirst : styles.appOptionLast}
                onPress={onPress}>
                <View style={styles.textWrapper}>
                    <CustomText lineHeight={20} size={16} customStyle={textStyle}>
                        {t(title)}
                    </CustomText>
                    <CustomText lineHeight={20} size={16}
                                customStyle={styles.secondaryText}>{secondaryText}</CustomText>
                </View>
                {isRTL ?
                    <KhiyabunIcons name="direction-left-bold" size={24} style={iconStyle}/>

                    :
                    <KhiyabunIcons name="direction-right-bold" size={24} style={iconStyle}/>

                }
                {children}
            </View>
        }

    } else {
        if (pressable) {
            return <Pressable
                style={place === "middle" ? styles.appOption : place === "first" ? styles.appOptionFirst : styles.appOptionLast}
                onPress={onPress}>
                <View style={styles.textWrapper}>
                    <CustomText lineHeight={20} size={16} customStyle={textStyle}>
                        {t(title)}
                    </CustomText>
                </View>
                {isRTL ?
                    <KhiyabunIcons name="direction-left-bold" size={24} style={iconStyle}/>

                    :
                    <KhiyabunIcons name="direction-right-bold" size={24} style={iconStyle}/>

                }
                {children}
            </Pressable>
        } else {
            return <View
                style={place === "middle" ? styles.appOption : place === "first" ? styles.appOptionFirst : styles.appOptionLast}
                onPress={onPress}>
                <View style={styles.textWrapper}>
                    <CustomText lineHeight={20} size={16} customStyle={textStyle}>
                        {t(title)}
                    </CustomText>
                </View>
                {isRTL ?
                    <KhiyabunIcons name="direction-left-bold" size={24} style={iconStyle}/>

                    :
                    <KhiyabunIcons name="direction-right-bold" size={24} style={iconStyle}/>

                }
                {children}
            </View>
        }
    }

}

const useThemedStyles = (colors) => {
    const fontSizeScale = useSelector((state) => state.fontSizeSlice.fontSizeScale);
    let height = 56
    if (fontSizeScale === 3) {
        height = height * 1.1
    }
    if (fontSizeScale === 4) {
        height = height * 1.2
    }
    if (fontSizeScale === 5) {
        height = height * 1.3
    }

    return StyleSheet.create({
        textWrapper: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start"
        },
        secondaryText: {
            fontWeight: "400",
            color: colors.onSurfaceLow,
            paddingHorizontal: 8,
            fontFamily: gStyle.fontMain.fontFamily,
        },
        appOption: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            height: height

        },
        appOptionFirst: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            height: height
        },
        appOptionLast: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            height: height
        },

    });
};
export default BoardCard
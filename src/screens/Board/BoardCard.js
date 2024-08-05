import {Text, Pressable, View, StyleSheet} from "react-native"
import {useTranslation} from "react-i18next";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import {useTheme} from "@react-navigation/native";
import {I18nManager} from 'react-native';
import gStyle from "../../global-styles/GlobalStyles"

function BoardCard({title, place, pressable = true, textStyle, secondaryText, children, onPress, icon, iconStyle}) {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const {t} = useTranslation(); // دریافت توابع ترجمه و مدیریت زبان
    const isRTL = I18nManager.isRTL;

    if (secondaryText) {
        if (pressable) {
            return <Pressable
                style={place === "middle" ? styles.appOption : place === "first" ? styles.appOptionFirst : styles.appOptionLast}
                onPress={onPress}>
                <View style={styles.textWrapper}>
                    <Text style={textStyle}>
                        {t(title)}
                    </Text>
                    <Text style={styles.secondaryText}>{secondaryText}</Text>
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
                    <Text style={textStyle}>
                        {t(title)}
                    </Text>
                    <Text style={styles.secondaryText}>{secondaryText}</Text>
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
                    <Text style={textStyle}>
                        {t(title)}
                    </Text>
                </View>
                <KhiyabunIcons name={icon} size={24} style={iconStyle}/>
                {children}
            </Pressable>
        } else {
            return <View
                style={place === "middle" ? styles.appOption : place === "first" ? styles.appOptionFirst : styles.appOptionLast}
                onPress={onPress}>
                <View style={styles.textWrapper}>
                    <Text style={textStyle}>
                        {t(title)}
                    </Text>
                </View>
                <KhiyabunIcons name={icon} size={24} style={iconStyle}/>
                {children}
            </View>
        }

    }

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        textWrapper: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start"
        },
        secondaryText: {
            fontWeight: "400",
            fontSize: 12,
            lineHeight: 16,
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
            height: 56,

        },
        appOptionFirst: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderBottomColor: colors.outlineSurface,
            borderBottomWidth: 1,
            height: 56,
        },
        appOptionLast: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
            paddingHorizontal: 12,
            height: 56,
        },

    });
};
export default BoardCard
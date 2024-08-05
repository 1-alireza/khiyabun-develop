import {Alert, Linking, Pressable, StyleSheet, Text, View} from "react-native";
import KhiyabunIcons from "./KhiyabunIcons";
import React from "react";
import {useTheme} from "@react-navigation/native";
import ExternalLink from "./ExternalLink";


function ListItem({text, iconName, place, isExternalLink=true,onPress}) {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    return (
        <>
        {isExternalLink?
            <ExternalLink url={"https://www.varzesh3.com/"}>
                <View
                    style={place === "middle" ? styles.appOption : place === "first" ? styles.appOptionFirst : styles.appOptionLast}>
                    <View style={styles.textWrapper}>
                        <KhiyabunIcons name={iconName} size={24} style={styles.icon}/>
                        <Text style={styles.appActionText}>
                            {text}
                        </Text>
                    </View>
                </View>
            </ExternalLink>
        :
        <Pressable
                    style={place === "middle" ? styles.appOption : place === "first" ? styles.appOptionFirst : styles.appOptionLast} onPress={onPress}>
                    <View style={styles.textWrapper}>
                        <KhiyabunIcons name={iconName} size={24} style={styles.icon}/>
                        <Text style={styles.appActionText}>
                            {text}
                        </Text>
                    </View>
                </Pressable>
        }
        </>


    )
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        mainView: {
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        textWrapper: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
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
        appActionText: {
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            paddingHorizontal: 8,
            color: colors.onSurfaceHigh
        },
        icon: {
            color: colors.secondary
        }
    });
};
export default ListItem
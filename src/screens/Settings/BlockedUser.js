import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import React from "react";
import avatar from "../../../assets/img/3d_avatar_21.png";


function BlockedUser({item}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)

    return (
        <Pressable style={styles.blockUser}>
            <View style={styles.userData}>
                {item.photo!=="undefined"&&(
                    <Image source={avatar} style={styles.avatarImage} />

                )}
                {item.photo==="undefined"&&(
                    <View style={styles.contactProfile}>
                        <Text style={styles.contactShortName}>
                            M
                        </Text>
                    </View>
                )}
                <View>
                    <Text style={styles.username}>
                        {item.name}
                    </Text>
                    <Text style={styles.userDistance}>
                        {item.distance}
                    </Text>
                </View>

            </View>
            <Pressable onPress={()=>alert("user unblocked")}>
                <Text style={styles.unBlock}>
                    {t("Unblock")}
                </Text>
            </Pressable>
        </Pressable>
    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        blockUser: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: "space-between",
            padding: 8
        },
        contactProfile: {
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
        },
        contactShortName: {
            fontFamily: "dana-bold",
            fontSize: 18,
            color: colors.surfaceContainerLowest,
            marginTop: 4
        },
        userData: {
            flexDirection: "row",
            alignItems: "center",
            gap: 16
        },
        username: {
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular",
            color: colors.onSurface

        },
        userDistance: {
            fontFamily: "dana-bold",
            fontSize: 14,
            lineHeight: 20,
            color: colors.onSurfaceLow
        },
        unBlock:{
            color:colors.darkPrimary,
            fontFamily:"dana-bold",
            fontSize:14,
            lineHeight:20
        },
        avatarImage: {
            width: 40,
            height: 40,
            borderRadius: 50,
            overflow: "hidden",
        },
    });
};

export default BlockedUser
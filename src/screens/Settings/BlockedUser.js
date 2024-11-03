import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import React from "react";
import avatar from "../../../assets/img/3d_avatar_21.png";
import gStyles from "../../global-styles/GlobalStyles";
import CustomText from "../../components/CustomText";

function BlockedUser({item}) {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)

    return (
        <Pressable style={styles.blockUser}>
            <View style={styles.userData}>
                {item.photo !== "undefined" && (
                    <Image source={avatar} style={styles.avatarImage}/>

                )}
                {item.photo === "undefined" && (
                    <View style={styles.contactProfile}>
                        <CustomText size={18} color={colors.surfaceContainerLowest} customStyle={styles.contactShortName} >
                            M
                        </CustomText>
                    </View>
                )}
                <View>
                    <CustomText size={16} lineHeight={24}  color={colors.onSurface}  weight={"bold"}  >
                        {item.name}
                    </CustomText>
                    <CustomText size={14} lineHeight={20} weight={"bold"}  color={colors.onSurfaceLow}  >
                        {item.distance}
                    </CustomText>
                </View>

            </View>
            <Pressable onPress={() => alert("user unblocked")}>
                <CustomText size={14} lineHeight={20} weight={"bold"}  color={colors.darkPrimary}  >
                    {t("Unblock")}
                </CustomText>
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
            marginTop: 4
        },
        userData: {
            flexDirection: "row",
            alignItems: "center",
            gap: 16
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
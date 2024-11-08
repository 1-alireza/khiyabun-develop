import {View, Text, StyleSheet, Image, Pressable, I18nManager} from "react-native"
import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import React, {useState} from "react";
import * as ImagePicker from "expo-image-picker"
import gStyles from "../../global-styles/GlobalStyles";
import {useSelector} from "react-redux";
import CustomText from "../../components/CustomText";

const avatar = require("../../../assets/img/3d_avatar_21.png");


function BoardProfile({onPress, editable}) {
    const {t} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const [image, setImage] = useState(null);
    const isRTL = I18nManager.isRTL;
    const profileData = useSelector((state) => state.profile.profileData);
    console.log(profileData)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            cameraType: "front"
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
        if (result.cancelled) {
            console.log(result.assets)
        }
    };

    return (<Pressable onPress={onPress} style={[styles.profileDataWrapper, editable ? {paddingHorizontal: 12} : ""]}>
        <Image source={profileData.profilePicture ? {uri: `http://${profileData.profilePicture.downloadUrl}`} : avatar}
               style={styles.avatarImage}/>
        <View style={styles.profileData}>
            <CustomText size={16} lineHeight={24} weight={"bold"} color={colors.onSurface}>
                {isRTL ? `  سلام!  ${profileData.firstName}` : `Hi!, ${profileData.firstName}`}
            </CustomText>
            <CustomText size={10} color={colors.onSurfaceLow} lineHeight={16}>
                {profileData.phone||"-"}
            </CustomText>
        </View>
        {editable ?
            <Pressable onPress={pickImage}>
                <KhiyabunIcons name="edit-outline" size={24} color={colors.onSurface}/>
            </Pressable>
            : ""}

    </Pressable>)
}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        profileDataWrapper: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 8,
            marginTop: 10,
            paddingHorizontal: 24,
            paddingVertical: 8,
        },
        avatarImage: {
            width: 56,
            height: 56,
            borderRadius: 50,
            overflow: "hidden",
        },
        profileData: {
            flexDirection: "column",
            gap: 2,
            flex: 1,
        },
        userPhoneNumberText: {
            fontSize: 10,
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.onSurfaceLow,
            lineHeight: 16,
        },
    });
};

export default BoardProfile
import {View, StyleSheet, Image} from "react-native"
import {useTheme} from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import React from "react";


function HomeProfile({imgUrl, text, name}) {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    return (
        <View style={styles.wrapper}>
            <Image source={imgUrl ? {uri: imgUrl} : require("../../../assets/img/3d_avatar_21.png")}
                   style={styles.Image}/>
            <View>
                <CustomText size={11} color={colors.onSurface}
                            lineHeight={16}>
                    {text}
                </CustomText>
                <CustomText size={13} color={colors.onSurface}
                            lineHeight={20} weight={'bold'}>
                    {name}
                </CustomText>
            </View>
        </View>
    );
}

const useThemedStyles = () => {
    return StyleSheet.create({
        wrapper: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginVertical: 10,
            flex: 1
        },
        Image: {
            width: 40,
            height: 40,
            borderRadius: 100,
            overflow: "hidden",
        },
    });
};

export default HomeProfile;
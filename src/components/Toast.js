import React, {useEffect, useState} from "react";
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import Card from "./Card";
import KhiyabunIcons from "./KhiyabunIcons";
import Button from "./Button";
import gStyles from "./../global-styles/GlobalStyles";
import CustomToast from "./CustomToast";
import {LinearProgress} from "react-native-elements";
import i18n from "i18next";
import CustomText from "./CustomText";

const Toast = ({type, text}) => {
    const [progress, setProgress] = useState(0);

    const {colors} = useTheme();
    const styles = useThemedStyles(colors);

    useEffect(() => {
        let subs = true;
        if (progress < 1.5) {
            setTimeout(() => {
                if (subs) {
                    setProgress(progress + 0.05);
                }
            }, 150);
        }
        return () => {
            subs = false;
        };
    }, [progress]);
    let color;
    switch (type) {
        case "warning":
            color = colors.warning;
            break;
        case "confirm":
            color = colors.confirm;
            break;
        case "error":
            color = colors.error;
            break;
        default:
            color = colors.info;
    }

    const onCloseHandler = () =>{
        setProgress(0);
        CustomToast.hide();
    }
    return (
        <Card customStyle={[gStyles.row, styles.toast, (Platform.OS === 'ios') ? styles.shadow : styles.elevation]}>
            {/*<LinearProgress*/}
            {/*    color={color}*/}
            {/*    style={[styles.progressBar, styles.progressBarRtl]}*/}
            {/*    value={progress}*/}
            {/*    variant="determinate"*/}
            {/*/>*/}
            <View style={[styles.progressBar,{backgroundColor:color}]}/>
            <View style={[gStyles.col_10, styles.content]}>
                <KhiyabunIcons name="info-circle-bold" size={16} color={color}/>
                <CustomText customStyle={styles.messages}>
                    {text}
                </CustomText>
            </View>
            <Button onPress={onCloseHandler}
                    label={<KhiyabunIcons name="close-outline" size={16} color={colors.onSurfaceLow}/>}
                    sizeButton="small"
                    width={0}
                    typeButton="full"
                    colorButton="transparent"
                    style={[gStyles.col_1, styles.close_wrapper]}
            />
        </Card>
    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        toast: {
            display: "flex",
            justifyContent: "space-between",
            width: 328,
            minHeight: 56,
            paddingVertical: 12,
            paddingHorizontal: 8,
            overflow: "hidden",
            shadowColor: colors.black,
            backgroundColor: colors.surfaceContainerLowest,
            borderRadius: 8,
            zIndex: 2,
        },
        progressBarRtl: {
            transform: [{scaleX: -1}],
        },
        progressBar: {
            position: "absolute",
            top: 0,
            right: 0,
            width: 328,
            height:4,
            borderRadius: 8
        },
        content: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5
        },
        messages: {
            ...gStyles.fontMain,
            width: "100%",
            fontSize: 13,
            textAlign: "justify",
            color: colors.onSurface
        },
        close_wrapper: {
            flexDirection: "row",
            // height: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 0,
            paddingHorizontal: 0
        },
        info: {
            borderColor: colors.info
        },
        shadow: {
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowOpacity: 0.2,
            shadowRadius: 0,
        },
        elevation: {
            elevation: 7,
        }
    });
}

export default Toast;

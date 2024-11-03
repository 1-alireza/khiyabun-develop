import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import {CheckBox} from '@rneui/themed';
import React, {useEffect, useState} from "react";
import gStyles from "../../global-styles/GlobalStyles";
import CustomText from "../../components/CustomText";
import {getRequest,putRequest} from "../../utils/sendRequest";
import {useSelector} from "react-redux";
import {errorHandling} from "../../utils/errorHandling";

const PhoneNumberSheet = ({isVisible, onClose}) =>{
    const userToken = useSelector(state => state.login.token);
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [selectedIndex, setIndex] = useState(0);
    const [everyoneSeesPhoneNumber, setEveryoneSeesPhoneNumber] = useState(true);


    useEffect(() => {
        getAppSettings()
    }, []);

    const getAppSettings = async () => {
        console.log("sdf")
        let res = await getRequest("app_settings",{},userToken)
        if(res.statusCode===200){
            if(res.data.everyoneSeesPhoneNumber){
                setIndex(0)
            }else{
                setIndex(1)

            }
        }
        console.log("user phone", res)

    }
    const changeAppSettings = async () => {
        console.log("sdf")
        const body={
            everyoneSeesPhoneNumber:selectedIndex === 0
        }
        console.log(body)

        try{
            let res = await putRequest("app_settings",body,userToken)
            console.log("user phone updated", res)
            if (res.statusCode === 200) {
                errorHandling(res, "confirm")

            } else {
                console.log("warning")
                errorHandling(res, "warning")
            }
        }catch (e){
            errorHandling(res, "error")

        }finally {
            onClose()
        }



    }
    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <CustomText lineHeight={16} weight={"bold"}
                            color={colors.onSurface}>{t("Who_can_see_my_phone_number?")}</CustomText>
            </View>
            <View style={styles.sheetBody}>
                <View>
                    <View style={styles.phoneVisibility}>
                        <CheckBox
                            iconRight={false}
                            size={20}
                            checked={selectedIndex === 0}
                            onPress={() => setIndex(0)}
                            iconType="material-community"
                            checkedIcon="radiobox-marked"
                            uncheckedIcon="radiobox-blank"
                            containerStyle={styles.radio}
                            checkedColor={colors.primary}
                            title={t("everybody")}
                            fontFamily={gStyles.fontMain.fontFamily}
                            textStyle={styles.phoneVisibilityText}

                        />

                    </View>
                    <View style={styles.phoneVisibility}>
                        <CheckBox
                            iconRight={false}
                            size={20}
                            checked={selectedIndex === 1}
                            onPress={() => setIndex(1)}
                            iconType="material-community"
                            checkedIcon="radiobox-marked"
                            uncheckedIcon="radiobox-blank"
                            containerStyle={styles.radio}
                            checkedColor={colors.primary}
                            title={t("nobody")}
                            fontFamily={gStyles.fontMain.fontFamily}
                            textStyle={styles.phoneVisibilityText}

                        />
                    </View>
                </View>
            </View>
            <View style={styles.sheetOptions}>
                <Button label={"cancel"} sizeButton={"small"} style={styles.cancelButton} width={40}
                        styleText={styles.cancelButtonText} onPress={onClose}/>
                <Button label={"Save"} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={60} onPress={changeAppSettings}
                        isBorder={true} borderColor={colors.primaryOutline}/>
            </View>
        </Sheet>


    )

}

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        sheetBody: {
            paddingBottom: 16,
            flexDirection: "column",
            gap: 8,
            width: "100%",
            height: 150
        },
        sheetOptions: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            bottom: 0,
            marginBottom: 20,
            width: "100%",
        },
        selectButton: {
            borderRadius: 8,
            backgroundColor: colors.primaryContainer,
            justifyContent: "center",
            alignItems: "center"
        },
        selectButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.darkPrimary
        },
        cancelButton: {
            borderRadius: 8,
            backgroundColor: colors.surfaceContainerLowest,
            justifyContent: "center",
            alignItems: "center"
        },
        cancelButtonText: {
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily,
            color: colors.darkPrimary
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        phoneVisibility: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",

        },
        phoneVisibilityText: {
            color: colors.onSurfaceHigh,
            fontSize: 16,
            lineHeight: 24,
            fontFamily: gStyles.fontMain.fontFamily
        },
        radio: {
            backgroundColor: "transparent",
        },
    });
};


export default PhoneNumberSheet;
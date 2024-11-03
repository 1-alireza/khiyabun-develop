import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import {useTranslation} from 'react-i18next';
import Sheet from "../../components/Sheet";
import {useTheme} from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import KhiyabunIcons from "../../components/KhiyabunIcons";
import CustomText from "../../components/CustomText";
import {useDispatch, useSelector} from "react-redux";
import {changeFontScale} from "../../redux/slices/fontSizeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LANGUAGE_KEY} from "../../utils/constant";

const FontSizeSheet = ({isVisible, onClose}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const fontSizeScale = useSelector((state) => state.fontSizeSlice.fontSizeScale);
    const [fontSize, setFontSize] = useState(16);
    const isRTL = I18nManager.isRTL;
    const handleFontSizeChange = async (value) => {
        dispatch(changeFontScale(value))
        await AsyncStorage.setItem("userFontSize", value.toString());
    };
    const getFont=async ()=>{
        let usersFontSize = await AsyncStorage.getItem("userFontSize")
        console.log(usersFontSize,'gj')
    }
    getFont()


    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} modalHeight={220} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <CustomText lineHeight={16} weight={"bold"} color={colors.onSurface}>{t("Font")}</CustomText>
            </View>
            <View style={styles.modalBody}>
                <View style={styles.messages}>
                    <View style={styles.sentTextWrapper}>
                        <CustomText size={14} lineHeight={24} color={colors.textOn}
                                    customStyle={[styles.sentText, {fontSize}]}>
                            {t("welcome")}

                        </CustomText>
                        <CustomText size={12} lineHeight={16} color={colors.surfaceContainerHigh}>
                            11:22
                        </CustomText>
                        <KhiyabunIcons name={"double-tick-outline"} size={16} color={colors.surfaceContainerHigh}/>
                    </View>
                    <View style={styles.sentTextWrapper}>
                        <CustomText size={14} lineHeight={24} color={colors.textOn}
                                    customStyle={[styles.sentText, {fontSize}]}>
                            {t("welcome")}
                        </CustomText>
                        <CustomText size={12} lineHeight={16} color={colors.surfaceContainerHigh}>
                            11:22
                        </CustomText>
                        <KhiyabunIcons name={"double-tick-outline"} size={16} color={colors.surfaceContainerHigh}/>
                    </View>
                </View>
                <View style={styles.contentView}>
                    <CustomText size={10} color={colors.onSurface}>
                        Aa
                    </CustomText>
                    <View style={styles.sliderWrapper}>
                        <Slider
                            value={fontSizeScale}
                            onValueChange={handleFontSizeChange}
                            maximumValue={5}
                            minimumValue={1}
                            step={1}
                            minimumTrackTintColor={colors.primary} // Customize according to your theme
                            maximumTrackTintColor="#ccc" // Customize as needed
                            thumbTintColor="#0085cb" // Customize as needed
                            style={styles.slider} // Styling for the slider
                            inverted={isRTL} // Invert slider based on RTL
                        />
                    </View>
                    <CustomText size={24} customStyle={styles.bigText} color={colors.onSurface}>
                        Aa
                    </CustomText>

                </View>
            </View>
        </Sheet>
    );
};

const useThemedStyles = (colors) => {
    return StyleSheet.create({
        modalBody: {
            width: "100%",
            flexDirection: "column",
            gap: 8,
        },
        sentTextWrapper: {
            width: "fit-content",
            height: "fit-content",
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 8,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
            backgroundColor: colors.darkPrimary,
            padding: 8,
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 4,
            marginTop: 3,
        },
        sentText: {
            marginTop: 5
        },
        contentView: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5
        },
        sheetHeader: {
            backgroundColor: colors.surfaceContainerLowest,
            marginHorizontal: 16,
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center"
        },
        bigText: {
            width: "10%",
            marginBottom: 5,
        },
        sliderWrapper: {
            width: "80%", // Adjust width for the slider
        },
        slider: {
            height: 40, // Ensure the slider has a height for visibility
        },
    });
};

export default FontSizeSheet;
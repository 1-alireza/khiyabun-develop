import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import Sheet from "../../components/Sheet";
import {useTheme} from "@react-navigation/native";
import {Slider, Icon} from '@rneui/themed';
import {color} from "react-native-elements/dist/helpers";
import KhiyabunIcons from "../../components/KhiyabunIcons";
import globalStyles from "../../global-styles/GlobalStyles";

const FontSizeSheet = ({isVisible, onClose}) => {
    const {colors} = useTheme();
    const styles = useThemedStyles(colors);
    const {t, i18n} = useTranslation();
    const [fontSize, setFontSize] = useState(16); // Default font size

    const handleFontSizeChange = (value) => {
        setFontSize(value);
    };

    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} modalHeight={220} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("Font")}</Text>
            </View>
            <View style={styles.modalBody}>
                <View style={styles.messages}>
                    <View style={styles.sentTextWrapper}>
                        <Text style={[styles.sentText, {fontSize}]}>
                            Lorem Ipsum is simply dummy
                        </Text>
                        <Text style={styles.sentTextDate}>
                            11:22
                        </Text>
                        <KhiyabunIcons name={"double-tick-outline"} size={16} color={colors.surfaceContainerHigh}/>
                    </View>
                    <View style={styles.sentTextWrapper}>
                        <Text style={[styles.sentText, {fontSize}]}>
                            Lorem Ipsum is simply dummy
                        </Text>
                        <Text style={styles.sentTextDate}>
                            11:22
                        </Text>
                        <KhiyabunIcons name={"double-tick-outline"} size={16} color={colors.surfaceContainerHigh}/>
                    </View>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.bigText}>Aa</Text>
                    <View style={{width: "80%"}}>
                        <Slider
                            value={fontSize}
                            onValueChange={handleFontSizeChange}
                            maximumValue={20}
                            minimumValue={10}
                            step={4}
                            allowTouchTrack
                            trackStyle={{marginHorizontal: 5}}
                            thumbStyle={{
                                height: 20,
                                width: 20,
                                backgroundColor: 'blue',
                                color: "red",
                            }}
                        />
                    </View>
                    <Text style={styles.smallText}>Aa</Text>

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
            borderTopLeftRadiusRadius: 8,
            backgroundColor: colors.darkPrimary,
            padding: 8,
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 4,
            marginTop: 3,
        },
        sentTextDate: {
            fontSize: 12,
            lineHeight: 16,
            color: colors.surfaceContainerHigh
        },
        sentText: {
            fontSize: 14,
            lineHeight: 24,
            color: colors.textOn,
            fontFamily: 'dana-regular',
            marginTop:5
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
        sheetHeaderText: {
            paddingHorizontal: 16,
            color: colors.onSurface,
            fontFamily: globalStyles.fontBold.fontFamily,
            lineHeight: 24
        },
        smallText: {
            width: "10%",
            fontSize: 10,
            color:colors.onSurface
        },
        bigText: {width: "10%",
            fontSize: 24,
            marginBottom: 5,
            color:colors.onSurface
        }

    });
};


export default FontSizeSheet;

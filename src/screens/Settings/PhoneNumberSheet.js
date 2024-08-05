import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Sheet from "../../components/Sheet";
import Button from "../../components/Button";
import {CheckBox} from '@rneui/themed';
import React, {useState} from "react";

const PhoneNumberSheet = ({isVisible, onClose}) => {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [selectedIndex, setIndex] = useState(0);

    return (
        <Sheet isOpen={isVisible} fitContent={true} onClose={onClose} snapPoint={500}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetHeaderText}>{t("Who_can_see_my_phone_number?")}</Text>
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

                        />
                        <Pressable onPress={() => setIndex(0)}>
                            <Text style={styles.phoneVisibilityText}>
                                {t("everybody")}
                            </Text>
                        </Pressable>
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

                        />
                        <Pressable onPress={() => setIndex(1)}>
                            <Text style={styles.phoneVisibilityText}>
                                {t("nobody")}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.sheetOptions}>
                <Button label={"cancel"} sizeButton={"small"} style={styles.cancelButton} width={40}
                        styleText={styles.cancelButtonText} onPress={onClose}/>
                <Button label={"Save"} sizeButton={"medium"} style={styles.selectButton}
                        styleText={styles.selectButtonText} width={60} onPress={onClose}
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
            fontFamily: "dana-regular",
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
            fontFamily: "dana-regular",
            color: colors.darkPrimary
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
            fontFamily: "dana-bold",
            lineHeight: 24
        },
        phoneVisibility: {
            flexDirection:"row",
            justifyContent: "flex-start",
            alignItems: "center",

        },
        phoneVisibilityText: {
            color: colors.onSurfaceHigh,
            fontSize: 16,
            lineHeight: 24,
            fontFamily: "dana-regular"
        },
        radio: {
            backgroundColor: "transparent",
        },
    });
};



export default PhoneNumberSheet;
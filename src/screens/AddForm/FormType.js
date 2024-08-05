import {useTheme} from "@react-navigation/native";
import {I18nManager, ScrollView, StyleSheet, View} from "react-native";
import {ButtonGroup} from "@rneui/themed";
import {useState} from "react";
import {useTranslation} from "react-i18next";

function FormScreen() {
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const isRTL = I18nManager.isRTL;
    let buttonArray=isRTL?['فروش', 'اجاره', 'پیش فروش']:['Sale', 'Rent', 'New launch']

    return (
        <ButtonGroup
            buttons={buttonArray}
            selectedIndex={selectedIndex}
            onPress={(value) => {
                setSelectedIndex(value);
            }}
            containerStyle={styles.container}
            textStyle={styles.buttonText}
            buttonContainerStyle={styles.buttonContainer}
            selectedButtonStyle={styles.activeButton}
            selectedTextStyle={styles.buttonText}
            buttonStyle={styles.normalButton}
        />
    )
}


const useThemedStyles = (colors) => {
    return StyleSheet.create({
        container: {
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            borderBottomRightRadius: 100,
            borderBottomLeftRadius: 100,
        },
        title: {
            fontSize: 16,
            lineHeight: 24,
            color: colors.primary,
        },
        activeButton: {
            backgroundColor: colors.primaryContainer
        },
        buttonText: {
            fontSize: 12,
            lineHeight: 16,
            color: colors.onPrimaryContainer
        },
        normalButton: {
            backgroundColor: colors.surfaceContainerLowest,
        },
    });
};


export default FormScreen
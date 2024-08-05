import {useTranslation} from "react-i18next";
import {useTheme} from "@react-navigation/native";
import {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {ButtonGroup} from "@rneui/themed";


export default function FlagStatus (){
    const {t, i18n} = useTranslation();
    const {colors} = useTheme();
    const styles = useThemedStyles(colors)
    const [selectedIndex, setSelectedIndex] = useState(0);

    return(

        <View style={styles.statusWrapper}>
            <Text style={styles.title}>
                {t("status")}
            </Text>
            <ButtonGroup
                buttons={['Public', 'Private']}
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
        </View>
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
        statusWrapper: {
            borderBottomColor:colors.outlineSurface,
            borderBottomWidth:1,
            paddingBottom:8,
            marginBottom:10

        }
    });
};